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
      console.log('Creating booking with data:', formData);
      
      const totalAmount = formData.participants * 199;
      
      // Step 1: Handle client - check if exists or create new one
      let client = await this.getOrCreateClient({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      });

      if (!client) {
        console.error('Failed to create or retrieve client');
        toast.error('Failed to create or retrieve client information. Please try again.');
        return null;
      }

      console.log('Client created/retrieved:', client);

      // Step 2: Get an available yacht (optional - we can assign later)
      const availableYacht = await this.getAvailableYacht(formData.bookingDate);
      console.log('Available yacht:', availableYacht);

      // Step 3: Create the booking with correct field mapping
      const bookingData = {
        client_id: client.id,
        yacht_id: availableYacht?.id || null, // Optional yacht assignment
        session_date: formData.bookingDate,
        session_time: formData.timeSlot,
        amount: totalAmount,
        notes: formData.specialRequests || null,
        status: 'pending' as const,
        payment_status: 'pending' as const
      };

      console.log('Creating booking with data:', bookingData);

      // Create booking without trying to select related data immediately
      const { data: bookingResult, error: bookingError } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select('*')
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        toast.error(`Failed to create booking: ${bookingError.message}`);
        return null;
      }

      console.log('Booking created successfully:', bookingResult);

      // Step 4: Fetch the complete booking with related data
      const { data: completeBooking, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          client:clients(*),
          yacht:yachts(id, name)
        `)
        .eq('id', bookingResult.id)
        .single();

      if (fetchError) {
        console.error('Error fetching complete booking:', fetchError);
        // Return basic booking data even if we can't fetch related data
        const basicBooking = {
          ...bookingResult,
          client: client,
          yacht: availableYacht
        } as BookingWithClient;
        
        // Still update stats and send email
        await this.updateClientStats(client.id, totalAmount);
        if (availableYacht) {
          await this.updateYachtStatus(availableYacht.id, 'booked', formData.bookingDate);
        }
        await this.sendConfirmationEmail(basicBooking, client);
        
        toast.success('Booking created successfully! Check your email for confirmation.');
        return basicBooking;
      }

      // Step 5: Update client's booking statistics
      await this.updateClientStats(client.id, totalAmount);

      // Step 6: Update yacht status if assigned
      if (availableYacht) {
        await this.updateYachtStatus(availableYacht.id, 'booked', formData.bookingDate);
      }

      // Step 7: Send confirmation email
      await this.sendConfirmationEmail(completeBooking, client);
      
      toast.success('Booking created successfully! Check your email for confirmation.');
      return completeBooking;
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
      console.log('Getting or creating client:', clientData);
      
      // First, try to find existing client by email
      const { data: existingClients, error: findError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientData.email);

      if (findError) {
        console.error('Error finding client:', findError);
        // Continue to create new client if find fails
      }

      const existingClient = existingClients && existingClients.length > 0 ? existingClients[0] : null;

      if (existingClient) {
        console.log('Found existing client:', existingClient);
        
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
          const { data: updatedClients, error: updateError } = await supabase
            .from('clients')
            .update(updatedData)
            .eq('id', existingClient.id)
            .select('*');

          if (updateError) {
            console.error('Error updating client:', updateError);
            return existingClient; // Return existing client even if update fails
          }
          return updatedClients && updatedClients.length > 0 ? updatedClients[0] : existingClient;
        }

        return existingClient;
      }

      // Create new client if not found
      const newClientData = {
        name: `${clientData.firstName} ${clientData.lastName}`,
        email: clientData.email,
        phone: clientData.phone,
        language: 'ru', // Set based on current UI language
        segment: 'new' as const,
        total_bookings: 0,
        total_spent: 0,
        lead_source: 'website'
      };

      console.log('Creating new client:', newClientData);

      const { data: newClients, error: createError } = await supabase
        .from('clients')
        .insert(newClientData)
        .select('*');

      if (createError) {
        console.error('Error creating client:', createError);
        return null;
      }

      const newClient = newClients && newClients.length > 0 ? newClients[0] : null;
      console.log('New client created:', newClient);
      return newClient;
    } catch (error) {
      console.error('Error in getOrCreateClient:', error);
      return null;
    }
  },

  async getAvailableYacht(bookingDate: string): Promise<{ id: string; name: string } | null> {
    try {
      const { data: yachts, error } = await supabase
        .from('yachts')
        .select('id, name')
        .eq('status', 'available')
        .limit(1);

      if (error) {
        console.log('No available yacht found or error:', error);
        return null;
      }

      return yachts && yachts.length > 0 ? yachts[0] : null;
    } catch (error) {
      console.error('Error getting available yacht:', error);
      return null;
    }
  },

  async updateYachtStatus(yachtId: string, status: string, nextBooking?: string): Promise<void> {
    try {
      const updateData: any = { status };
      if (nextBooking) {
        updateData.next_booking = nextBooking;
      }

      const { error } = await supabase
        .from('yachts')
        .update(updateData)
        .eq('id', yachtId);

      if (error) {
        console.error('Error updating yacht status:', error);
      }
    } catch (error) {
      console.error('Error in updateYachtStatus:', error);
    }
  },

  async updateClientStats(clientId: string, bookingAmount: number): Promise<void> {
    try {
      // Get current client stats
      const { data: clients, error: fetchError } = await supabase
        .from('clients')
        .select('total_bookings, total_spent')
        .eq('id', clientId);

      if (fetchError || !clients || clients.length === 0) {
        console.error('Error fetching client for stats update:', fetchError);
        return;
      }

      const client = clients[0];

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
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
          *,
          client:clients(*),
          yacht:yachts(id, name)
        `)
        .eq('id', id);

      if (error) {
        console.error('Error fetching booking:', error);
        return null;
      }

      return bookings && bookings.length > 0 ? bookings[0] : null;
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
          ${booking.yacht ? `<li>Yacht: ${booking.yacht.name}</li>` : ''}
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

    // Phone validation - теперь проверяем только наличие номера, так как валидация происходит в компоненте PhoneInput
    if (!formData.phone) {
      errors.push('Phone number is required');
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