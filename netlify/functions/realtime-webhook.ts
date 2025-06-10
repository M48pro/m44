import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Realtime webhook handler
const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Verify webhook secret if provided
  const webhookSecret = process.env.REALTIME_WEBHOOK_SECRET;
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
    
    console.log(`Processing realtime webhook: ${type}`, { record, schema, table });
    
    // Log webhook receipt
    await supabase
      .from('sync_logs')
      .insert({
        table_name: table || 'unknown',
        operation: type,
        record_id: record?.id,
        sync_status: 'success',
        synced_at: new Date().toISOString()
      });
    
    // Process based on table and event type
    if (table === 'bookings') {
      if (type === 'INSERT') {
        await handleNewBooking(record);
      } else if (type === 'UPDATE') {
        await handleBookingUpdate(record, body.old_record);
      }
    } else if (table === 'clients') {
      if (type === 'INSERT') {
        await handleNewClient(record);
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Realtime webhook processed successfully' }),
    };
  } catch (error) {
    console.error('Error processing realtime webhook:', error);
    
    // Log error
    await supabase
      .from('error_logs')
      .insert({
        action: 'process_realtime_webhook',
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

// Handler for new booking
async function handleNewBooking(booking: any) {
  console.log('Handling new booking webhook', booking);
  
  try {
    // Example: Update client statistics
    if (booking.client_id) {
      const { data: client } = await supabase
        .from('clients')
        .select('total_bookings, total_spent')
        .eq('id', booking.client_id)
        .single();
        
      if (client) {
        await supabase
          .from('clients')
          .update({
            total_bookings: (client.total_bookings || 0) + 1,
            total_spent: (client.total_spent || 0) + booking.amount,
            last_booking: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', booking.client_id);
      }
    }
    
    // Example: Update yacht status if assigned
    if (booking.yacht_id) {
      await supabase
        .from('yachts')
        .update({
          status: 'booked',
          next_booking: booking.session_date,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.yacht_id);
    }
  } catch (error) {
    console.error('Error handling new booking:', error);
  }
}

// Handler for booking update
async function handleBookingUpdate(booking: any, oldBooking: any) {
  console.log('Handling booking update webhook', { booking, oldBooking });
  
  try {
    // Example: Handle status change
    if (booking.status !== oldBooking.status) {
      // If cancelled, update yacht status
      if (booking.status === 'cancelled' && booking.yacht_id) {
        await supabase
          .from('yachts')
          .update({
            status: 'available',
            next_booking: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', booking.yacht_id);
      }
      
      // If confirmed, create notification
      if (booking.status === 'confirmed' && booking.client_id) {
        const { data: client } = await supabase
          .from('clients')
          .select('email')
          .eq('id', booking.client_id)
          .single();
          
        if (client) {
          await supabase
            .from('notifications')
            .insert({
              type: 'booking_confirmed',
              title: 'Booking Confirmed',
              message: `Your booking for ${new Date(booking.session_date).toLocaleDateString()} at ${booking.session_time} has been confirmed.`,
              recipient_id: booking.client_id,
              recipient_email: client.email,
              channel: 'email',
              status: 'pending',
              booking_id: booking.id
            });
        }
      }
    }
  } catch (error) {
    console.error('Error handling booking update:', error);
  }
}

// Handler for new client
async function handleNewClient(client: any) {
  console.log('Handling new client webhook', client);
  
  try {
    // Example: Create welcome notification
    await supabase
      .from('notifications')
      .insert({
        type: 'welcome',
        title: 'Welcome to Garda Racing Yacht Club',
        message: 'Thank you for joining Garda Racing Yacht Club. We look forward to providing you with unforgettable sailing experiences.',
        recipient_id: client.id,
        recipient_email: client.email,
        channel: 'email',
        status: 'pending'
      });
  } catch (error) {
    console.error('Error handling new client:', error);
  }
}

export { handler };