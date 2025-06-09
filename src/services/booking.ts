import { supabase, type Booking } from './supabase';
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
  async createBooking(formData: BookingFormData): Promise<Booking | null> {
    try {
      const totalAmount = formData.participants * 199;
      
      const bookingData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        booking_date: formData.bookingDate,
        participants: formData.participants,
        total_amount: totalAmount,
        status: 'pending' as const,
        payment_status: 'pending' as const
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (error) {
        console.error('Error creating booking:', error);
        toast.error('Failed to create booking. Please try again.');
        return null;
      }

      // Send confirmation email (would be handled by a Supabase function in production)
      await this.sendConfirmationEmail(data);
      
      toast.success('Booking created successfully! Check your email for confirmation.');
      return data;
    } catch (error) {
      console.error('Error in createBooking:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return null;
    }
  },

  async getBooking(id: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
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

  async sendConfirmationEmail(booking: Booking): Promise<void> {
    // In a real application, this would trigger a Supabase Edge Function
    // that sends an email using a service like SendGrid or Resend
    console.log('Sending confirmation email for booking:', booking.booking_reference);
    
    // For now, we'll just log the email content
    const emailContent = {
      to: booking.email,
      subject: `Booking Confirmation - ${booking.booking_reference}`,
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${booking.first_name} ${booking.last_name},</p>
        <p>Your yacht racing experience has been confirmed!</p>
        <h3>Booking Details:</h3>
        <ul>
          <li>Reference: ${booking.booking_reference}</li>
          <li>Date: ${new Date(booking.booking_date).toLocaleDateString()}</li>
          <li>Participants: ${booking.participants}</li>
          <li>Total Amount: €${booking.total_amount}</li>
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