import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Webhook handler
const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Verify webhook secret if provided
  const webhookSecret = process.env.WEBHOOK_SECRET;
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
    const { event: eventType, payload } = body;
    
    if (!eventType || !payload) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid webhook format' }),
      };
    }
    
    console.log(`Processing webhook: ${eventType}`, payload);
    
    // Log webhook receipt
    await supabase
      .from('sync_logs')
      .insert({
        table_name: payload.table || 'external',
        operation: 'webhook_received',
        record_id: payload.id,
        sync_status: 'success',
        synced_at: new Date().toISOString()
      });
    
    // Process webhook based on event type
    switch (eventType) {
      case 'booking_created':
        await handleBookingCreated(payload);
        break;
      case 'booking_updated':
        await handleBookingUpdated(payload);
        break;
      case 'client_created':
        await handleClientCreated(payload);
        break;
      default:
        console.log(`No handler for event type: ${eventType}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Log error
    await supabase
      .from('error_logs')
      .insert({
        action: 'process_webhook',
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

// Handler for booking created event
async function handleBookingCreated(payload: any) {
  console.log('Handling booking created webhook', payload);
  
  // Example: Create notification for new booking
  if (payload.client_id) {
    try {
      const { data: client } = await supabase
        .from('clients')
        .select('email, name')
        .eq('id', payload.client_id)
        .single();
        
      if (client) {
        await supabase
          .from('notifications')
          .insert({
            type: 'booking_created',
            title: 'New Booking Created',
            message: `A new booking has been created for ${client.name}`,
            recipient_id: payload.client_id,
            recipient_email: client.email,
            channel: 'email',
            status: 'pending',
            booking_id: payload.id
          });
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
}

// Handler for booking updated event
async function handleBookingUpdated(payload: any) {
  console.log('Handling booking updated webhook', payload);
  
  // Example: Create notification for booking status change
  if (payload.old_record && 
      payload.record && 
      payload.old_record.status !== payload.record.status) {
    
    try {
      const { data: client } = await supabase
        .from('clients')
        .select('email, name')
        .eq('id', payload.record.client_id)
        .single();
        
      if (client) {
        await supabase
          .from('notifications')
          .insert({
            type: 'booking_status_changed',
            title: `Booking ${payload.record.status.charAt(0).toUpperCase() + payload.record.status.slice(1)}`,
            message: `Your booking for ${new Date(payload.record.session_date).toLocaleDateString()} has been ${payload.record.status}.`,
            recipient_id: payload.record.client_id,
            recipient_email: client.email,
            channel: 'email',
            status: 'pending',
            booking_id: payload.record.id
          });
      }
    } catch (error) {
      console.error('Error creating booking status notification:', error);
    }
  }
}

// Handler for client created event
async function handleClientCreated(payload: any) {
  console.log('Handling client created webhook', payload);
  
  // Example: Create welcome notification
  try {
    await supabase
      .from('notifications')
      .insert({
        type: 'welcome',
        title: 'Welcome to Garda Racing Yacht Club',
        message: 'Thank you for joining Garda Racing Yacht Club. We look forward to providing you with unforgettable sailing experiences.',
        recipient_id: payload.id,
        recipient_email: payload.email,
        channel: 'email',
        status: 'pending'
      });
  } catch (error) {
    console.error('Error creating welcome notification:', error);
  }
}

export { handler };