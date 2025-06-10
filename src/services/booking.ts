import { supabase, type Booking, type Client, type BookingWithClient } from './supabase';
import toast from 'react-hot-toast';

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookingDate: string;
  timeSlot: string;
  participants: number;
  specialRequests?: string;
  agreeTerms: boolean;
  agreeMarketing: boolean;
}

export const bookingService = {
  async createBooking(formData: BookingFormData): Promise<BookingWithClient | null> {
    try {
      const totalAmount = formData.participants * 199;
      
      // Step 1: Handle client - check if exists or create new one
      let client = await this.getOrCreateClient({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });

      if (!client) {
        toast.error('Failed to create or retrieve client information. Please try again.');
        return null;
      }

      // Step 2: Create the booking with correct field mapping
      const bookingData = {
        client_id: client.id,
        session_date: formData.bookingDate,
        session_time: formData.timeSlot,
        amount: totalAmount,
        notes: formData.specialRequests || null,
        status: 'pending' as const,
        payment_status: 'pending' as const
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select(`
          *,
          client:clients(*)
        `)
        .single();

      if (error) {
        console.error('Error creating booking:', error);
        toast.error('Failed to create booking. Please try again.');
        return null;
      }

      // Update client's booking statistics
      await this.updateClientStats(client.id, totalAmount);

      // Send confirmation email
      await this.sendConfirmationEmail(data, client);
      
      toast.success('Booking created successfully! Check your email for confirmation.');
      return data;
    } catch (error) {
      console.error('Error in createBooking:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return null;
    }
  },

  async getOrCreateClient(clientData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<Client | null> {
    try {
      // First, try to find existing client by email
      const { data: existingClient, error: findError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientData.email)
        .single();

      if (existingClient && !findError) {
        // Update existing client with latest info if needed
        const updatedData: Partial<Client> = {};
        const fullName = `${clientData.firstName} ${clientData.lastName}`;
        
        if (existingClient.name !== fullName) {
          updatedData.name = fullName;
        }
        if (existingClient.phone !== clientData.phone) {
          updatedData.phone = clientData.phone;
        }

        if (Object.keys(updatedData).length > 0) {
          const { data: updated, error: updateError } = await supabase
            .from('clients')
            .update(updatedData)
            .eq('id', existingClient.id)
            .select()
            .single();

          if (updateError) {
            console.error('Error updating client:', updateError);
            return existingClient; // Return existing client even if update fails
          }
          return updated;
        }

        return existingClient;
      }

      // Create new client if not found
      const newClientData = {
        name: `${clientData.firstName} ${clientData.lastName}`,
        email: clientData.email,
        phone: clientData.phone,
        language: 'en', // Default language, could be detected from browser
        segment: 'new' as const,
        total_bookings: 0,
        total_spent: 0,
        lead_source: 'website'
      };

      const { data: newClient, error: createError } = await supabase
        .from('clients')
        .insert(newClientData)
        .select()
        .single();

      if (createError) {
        console.error('Error creating client:', createError);
        return null;
      }

      return newClient;
    } catch (error) {
      console.error('Error in getOrCreateClient:', error);
      return null;
    }
  },

  async updateClientStats(clientId: string, bookingAmount: number): Promise<void> {
    try {
      // Get current client stats
      const { data: client, error: fetchError } = await supabase
        .from('clients')
        .select('total_bookings, total_spent')
        .eq('id', clientId)
        .single();

      if (fetchError || !client) {
        console.error('Error fetching client for stats update:', fetchError);
        return;
      }

      // Update stats
      const { error: updateError } = await supabase
        .from('clients')
        .update({
          total_bookings: (client.total_bookings || 0) + 1,
          total_spent: (client.total_spent || 0) + bookingAmount,
          last_booking: new Date().toISOString(),
          segment: (client.total_bookings || 0) >= 3 ? 'vip' : 'active'
        })
        .eq('id', clientId);

      if (updateError) {
        console.error('Error updating client stats:', updateError);
      }
    } catch (error) {
      console.error('Error in updateClientStats:', error);
    }
  },

  async getBooking(id: string): Promise<BookingWithClient | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          client:clients(*),
          yacht:yachts(id, name)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching booking:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getBooking:', error);
      return null;
    }
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating booking status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateBookingStatus:', error);
      return false;
    }
  },

  async sendConfirmationEmail(booking: BookingWithClient, client: Client): Promise<void> {
    // In a real application, this would trigger a Supabase Edge Function
    // that sends an email using a service like SendGrid or Resend
    console.log('Sending confirmation email for booking:', booking.id);
    
    // For now, we'll just log the email content
    const emailContent = {
      to: client.email,
      subject: `Booking Confirmation - ${booking.id}`,
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${client.name},</p>
        <p>Your yacht racing experience has been confirmed!</p>
        <h3>Booking Details:</h3>
        <ul>
          <li>Reference: ${booking.id}</li>
          <li>Date: ${new Date(booking.session_date).toLocaleDateString()}</li>
          <li>Time: ${booking.session_time}</li>
          <li>Total Amount: €${booking.amount}</li>
        </ul>
        <p>We look forward to seeing you on Lake Garda!</p>
        <p>Best regards,<br>Garda Racing Yacht Club</p>
      `
    };
    
    console.log('Email content:', emailContent);
  },

  validateBookingForm(formData: BookingFormData): string[] {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.bookingDate) errors.push('Booking date is required');
    if (!formData.timeSlot) errors.push('Time slot is required');
    if (formData.participants < 1 || formData.participants > 8) {
      errors.push('Participants must be between 1 and 8');
    }
    if (!formData.agreeTerms) errors.push('You must agree to the terms and conditions');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }

    // Date validation (must be in the future)
    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.push('Booking date must be in the future');
    }

    return errors;
  }
};