import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { supabase } from '../services/supabase';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Store the message in the database
      const { error } = await supabase
        .from('messages')
        .insert({
          text: `Contact Form - ${data.subject}\n\nFrom: ${data.name} (${data.email})\n\nMessage: ${data.message}`
        });

      if (error) {
        throw error;
      }

      toast.success(t('contact.sendingMessage') + ' ' + t('common.success'));
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How far in advance should I book my yacht racing experience?",
      answer: "We recommend booking at least 2-3 days in advance, especially during peak season (June-September). However, same-day bookings may be available depending on weather conditions and capacity. For the best selection of dates and times, booking a week ahead is ideal."
    },
    {
      question: "What are your operating hours and response times?",
      answer: "We're open daily from 8:00 AM to 7:00 PM during our season (March-October). Phone calls are answered immediately during business hours. Email responses are typically sent within 2-4 hours during business days, and within 24 hours on weekends."
    },
    {
      question: "What's the best way to contact you for urgent inquiries?",
      answer: "For immediate assistance or same-day bookings, calling +39 345 678 9012 is your best option. For general inquiries, our contact form or email works perfectly. We also offer WhatsApp support for quick questions and real-time communication."
    },
    {
      question: "Do you offer group discounts or corporate packages?",
      answer: "Yes! We offer special rates for groups of 6 or more people, and we have comprehensive corporate packages for team building events. Contact us directly for custom pricing, catering options, and exclusive charter arrangements."
    },
    {
      question: "What happens if weather conditions are poor on my booking day?",
      answer: "Safety is our top priority. If conditions are unsafe for sailing, we'll contact you 24 hours before your experience to reschedule at no extra cost or provide a full refund. Light rain doesn't typically cancel our experiences - it's all part of the authentic sailing adventure!"
    },
    {
      question: "Can I modify or cancel my booking after confirmation?",
      answer: "Absolutely! You can modify your booking up to 48 hours before your experience at no cost, subject to availability. Our flexible cancellation policy allows free cancellation up to 48 hours before departure. See our full cancellation policy for complete details."
    },
    {
      question: "What languages do your staff speak?",
      answer: "Our multilingual team speaks English, Italian, German, and Russian fluently. All safety briefings and sailing instruction are provided in your preferred language to ensure you have the best possible experience on Lake Garda."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title={t('contact.title')}
        description={t('contact.subtitle')}
        url="/contact"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.sendMessage')}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('contact.fullName')} *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: t('forms.required') })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('contact.emailAddress')} *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: t('forms.required'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('forms.invalidEmail')
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('contact.subject')} *
                </label>
                <select
                  id="subject"
                  {...register('subject', { required: t('forms.required') })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">{t('forms.selectSubject')}</option>
                  <option value="bookingInquiry">{t('forms.subjects.bookingInquiry')}</option>
                  <option value="groupBooking">{t('forms.subjects.groupBooking')}</option>
                  <option value="corporateEvent">{t('forms.subjects.corporateEvent')}</option>
                  <option value="generalQuestion">{t('forms.subjects.generalQuestion')}</option>
                  <option value="feedback">{t('forms.subjects.feedback')}</option>
                  <option value="technicalSupport">{t('forms.subjects.technicalSupport')}</option>
                  <option value="other">{t('forms.subjects.other')}</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', { required: t('forms.required') })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder={t('contact.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('contact.sendingMessage')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('contact.sendMessageButton')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.getInTouch')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.visitUs')}</h3>
                    <p className="text-gray-700">
                      Via del Porto 15<br />
                      38066 Riva del Garda, TN<br />
                      Italy
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.callUs')}</h3>
                    <p className="text-gray-700">
                      <a href="tel:+393456789012" className="text-primary-600 hover:underline">
                        +39 345 678 9012
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">{t('contact.speakDirectly')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.emailUs')}</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@gardaracing.com" className="text-primary-600 hover:underline">
                        info@gardaracing.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">{t('errors.respondWithin24')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.operatingHours')}</h3>
                    <p className="text-gray-700">
                      {t('footer.dailyHours')}<br />
                      <span className="text-sm text-gray-600">{t('footer.season')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-primary-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('contact.quickActions')}</h3>
              
              <div className="space-y-4">
                <a
                  href="tel:+393456789012"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <Phone className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('contact.callForBooking')}</p>
                    <p className="text-sm text-gray-600">{t('contact.speakDirectly')}</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/393456789012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{t('contact.whatsappChat')}</p>
                    <p className="text-sm text-gray-600">{t('contact.quickQuestions')}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">{t('contact.findUs')}</h3>
                <p className="text-gray-600">{t('contact.locatedIn')}</p>
              </div>
              <div className="h-64 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.8947!2d10.8405!3d45.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDUzJzA1LjAiTiAxMMKwNTAnMjUuOCJF!5e0!3m2!1sen!2sit!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Garda Racing Yacht Club Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to the most common questions about our yacht racing experiences
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-primary-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFaq === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-5 animate-slide-up"
                    >
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our friendly team is here to help with any questions about your yacht racing experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+393456789012"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Us Now</span>
                </a>
                <a
                  href="mailto:info@gardaracing.com"
                  className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;