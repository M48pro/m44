import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Storage webhook handler
const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Verify webhook secret if provided
  const webhookSecret = process.env.STORAGE_WEBHOOK_SECRET;
  const providedSecret = event.headers['x-webhook-secret'];
  
  if (webhookSecret && providedSecret !== webhookSecret) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { record, schema, table, type } = body;
    
    console.log(`Processing storage webhook: ${type}`, { record, schema, table });
    
    // Log webhook receipt
    await supabase
      .from('sync_logs')
      .insert({
        table_name: 'storage',
        operation: type,
        record_id: record?.id,
        sync_status: 'success',
        synced_at: new Date().toISOString()
      });
    
    // Process storage event
    switch (type) {
      case 'INSERT':
        await handleFileUploaded(record);
        break;
      case 'UPDATE':
        await handleFileUpdated(record);
        break;
      case 'DELETE':
        await handleFileDeleted(record);
        break;
      default:
        console.log(`No handler for storage event type: ${type}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Storage webhook processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing storage webhook:', error);
    
    // Log error
    await supabase
      .from('error_logs')
      .insert({
        action: 'process_storage_webhook',
        error_message: error instanceof Error ? error.message : String(error),
        error_stack: error instanceof Error ? error.stack : undefined,
        context: { body: event.body },
        timestamp: new Date().toISOString()
      });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// Handler for file uploaded event
async function handleFileUploaded(record: any) {
  console.log('Handling file uploaded webhook', record);
  
  // Example: Create notification for file upload
  if (record.bucket_id === 'booking-documents') {
    try {
      // Get file metadata
      const { data: fileData } = await supabase.storage
        .from(record.bucket_id)
        .getPublicUrl(record.name);
        
      // Create notification for admin
      await supabase
        .from('notifications')
        .insert({
          type: 'file_uploaded',
          title: 'New Document Uploaded',
          message: `A new document "${record.name}" has been uploaded to the booking-documents bucket.`,
          channel: 'internal',
          status: 'pending'
        });
    } catch (error) {
      console.error('Error creating file upload notification:', error);
    }
  }
}

// Handler for file updated event
async function handleFileUpdated(record: any) {
  console.log('Handling file updated webhook', record);
  
  // Example: Log file update
  try {
    await supabase
      .from('sync_logs')
      .insert({
        table_name: 'storage',
        operation: 'file_updated',
        record_id: record.id,
        sync_status: 'success',
        synced_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error logging file update:', error);
  }
}

// Handler for file deleted event
async function handleFileDeleted(record: any) {
  console.log('Handling file deleted webhook', record);
  
  // Example: Log file deletion
  try {
    await supabase
      .from('sync_logs')
      .insert({
        table_name: 'storage',
        operation: 'file_deleted',
        record_id: record.id,
        sync_status: 'success',
        synced_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Error logging file deletion:', error);
  }
}

export { handler };