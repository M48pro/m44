import { supabase } from './supabase';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  session_id?: string;
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
}

// Comprehensive FAQ responses
const FAQ_RESPONSES: Record<string, ChatResponse> = {
  'price': {
    message: 'Our yacht racing experience costs €199 per person and includes professional skipper, all equipment, racing medal, certificate, and professional photos. This is excellent value for a full day of authentic yacht racing on beautiful Lake Garda!',
    suggestions: ['What\'s included?', 'How to book?', 'Group discounts?']
  },
  'included': {
    message: 'The €199 package includes: ⛵ Professional skipper & instruction, 🦺 All safety equipment, 🏆 Racing medal & certificate, 📸 Professional photos & videos, 🥪 Light refreshments, and full racing experience with multiple races!',
    suggestions: ['Do I need experience?', 'What to bring?', 'Weather policy?']
  },
  'experience': {
    message: 'No sailing experience required! Our certified skippers provide complete instruction. We welcome absolute beginners - you\'ll learn basic sailing, participate in real races, and leave feeling like a champion! 🏆',
    suggestions: ['What\'s the schedule?', 'How many people per boat?', 'Age requirements?']
  },
  'weather': {
    message: 'We sail in most conditions! Lake Garda has excellent sailing weather with consistent thermal winds. If it\'s unsafe, we\'ll reschedule at no cost. Light rain doesn\'t stop us - it\'s part of the adventure! ⛈️',
    suggestions: ['Cancellation policy?', 'What to wear?', 'Best season?']
  },
  'booking': {
    message: 'Easy booking! 📱 Book online at our website, 📞 call +39 345 678 9012, or 📧 email info@gardaracing.com. We recommend booking 2-3 days in advance, especially during peak season (June-September).',
    suggestions: ['Available dates?', 'Group bookings?', 'Payment options?']
  },
  'group': {
    message: 'Great for groups! 👥 We offer discounts for 6+ people and special corporate packages. Each yacht accommodates up to 8 participants. Perfect for team building, celebrations, or family adventures!',
    suggestions: ['Corporate events?', 'Team building?', 'Private charters?']
  }
};

export const chatService = {
  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    // Store user message
    if (sessionId) {
      await supabase.from('messages').insert({
        text: message,
        session_id: sessionId,
        sender: 'user'
      });
    }

    // Enhanced keyword matching
    const lowerMessage = message.toLowerCase();
    let response: ChatResponse;

    // Price-related keywords
    if (this.matchesKeywords(lowerMessage, [
      'price', 'cost', '€', 'euro', 'money', 'expensive', 'cheap'
    ])) {
      response = FAQ_RESPONSES.price;
    }
    // Package contents
    else if (this.matchesKeywords(lowerMessage, [
      'include', 'package', 'what', 'contain'
    ])) {
      response = FAQ_RESPONSES.included;
    }
    // Experience level
    else if (this.matchesKeywords(lowerMessage, [
      'experience', 'beginner', 'learn', 'know', 'skill'
    ])) {
      response = FAQ_RESPONSES.experience;
    }
    // Weather conditions
    else if (this.matchesKeywords(lowerMessage, [
      'weather', 'rain', 'wind', 'sun', 'storm'
    ])) {
      response = FAQ_RESPONSES.weather;
    }
    // Booking process
    else if (this.matchesKeywords(lowerMessage, [
      'book', 'reserve', 'how', 'when', 'schedule'
    ])) {
      response = FAQ_RESPONSES.booking;
    }
    // Group bookings
    else if (this.matchesKeywords(lowerMessage, [
      'group', 'discount', 'corporate', 'team', 'family'
    ])) {
      response = FAQ_RESPONSES.group;
    }
    else {
      // Default response
      response = {
        message: 'Thank you for your message! 😊 For specific questions, please call us at +39 345 678 9012 or email info@gardaracing.com. Our team will be happy to help!',
        suggestions: FAQ_RESPONSES.included.suggestions
      };
    }

    // Store bot response
    if (sessionId) {
      await supabase.from('messages').insert({
        text: response.message,
        session_id: sessionId,
        sender: 'bot'
      });
    }

    return response;
  },

  // Helper method for keyword matching
  matchesKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword.toLowerCase()));
  },

  generateSessionId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get quick replies
  getQuickReplies(): string[] {
    return [
      "What's included in the €199 package?",
      "Do I need sailing experience?",
      "How do I book?",
      "Weather policy?",
      "Group discounts available?"
    ];
  }
};