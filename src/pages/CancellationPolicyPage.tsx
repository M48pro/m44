import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, RefreshCw, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const CancellationPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title="Cancellation Policy"
        description="Cancellation and refund policy for Garda Racing Yacht Club bookings. Learn about our flexible cancellation terms."
        url="/cancellation-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif">Cancellation Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
                  <p className="text-blue-800">
                    We understand that plans can change. Our cancellation policy is designed to be fair to both our customers and our business operations. Please read the terms carefully before booking.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cancellation Timeline & Refunds</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                    <h3 className="text-lg font-semibold text-green-900">48+ Hours</h3>
                  </div>
                  <p className="text-green-800 font-medium mb-2">100% Full Refund</p>
                  <p className="text-green-700 text-sm">
                    Cancel 48 hours or more before your scheduled experience for a complete refund.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-8 w-8 text-yellow-500 mr-3" />
                    <h3 className="text-lg font-semibold text-yellow-900">24-48 Hours</h3>
                  </div>
                  <p className="text-yellow-800 font-medium mb-2">50% Refund</p>
                  <p className="text-yellow-700 text-sm">
                    Cancellations between 24-48 hours receive a 50% refund of the total amount paid.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                    <h3 className="text-lg font-semibold text-red-900">Less than 24 Hours</h3>
                  </div>
                  <p className="text-red-800 font-medium mb-2">No Refund</p>
                  <p className="text-red-700 text-sm">
                    Cancellations less than 24 hours before departure are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Weather-Related Cancellations</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <RefreshCw className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Weather Policy</h3>
                    <p className="text-blue-800 mb-4">
                      Safety is our top priority. If weather conditions are deemed unsafe for sailing, we will cancel the experience and offer you the following options:
                    </p>
                    <ul className="list-disc pl-6 text-blue-800 space-y-2">
                      <li><strong>Full refund:</strong> 100% refund processed within 5-7 business days</li>
                      <li><strong>Reschedule:</strong> Move your booking to another available date at no extra cost</li>
                      <li><strong>Credit voucher:</strong> Receive a voucher valid for 12 months</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">What Constitutes Unsafe Weather?</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Wind speeds exceeding 25 knots (46 km/h)</li>
                <li>Thunderstorms or lightning in the area</li>
                <li>Visibility less than 500 meters due to fog</li>
                <li>Any other conditions deemed unsafe by our experienced skippers</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> Light rain, overcast skies, or moderate winds do not typically result in cancellation. Our experiences operate in various weather conditions as part of the authentic sailing experience.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Cancel Your Booking</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Cancellation</h3>
                  <p className="text-gray-700 mb-2">
                    Use the cancellation link in your booking confirmation email to cancel online 24/7.
                  </p>
                  <p className="text-sm text-gray-600">
                    This is the fastest method and provides immediate confirmation of your cancellation.
                  </p>
                </div>

                <div className="border-l-4 border-primary-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Cancellation</h3>
                  <p className="text-gray-700 mb-2">
                    Call us at <a href="tel:+393456789012" className="text-primary-600 hover:underline font-medium">+39 345 678 9012</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Available daily from 8:00 AM to 7:00 PM (March - October)
                  </p>
                </div>

                <div className="border-l-4 border-primary-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Cancellation</h3>
                  <p className="text-gray-700 mb-2">
                    Send your cancellation request to <a href="mailto:bookings@gardaracing.com" className="text-primary-600 hover:underline font-medium">bookings@gardaracing.com</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Include your booking reference number and reason for cancellation
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rescheduling Policy</h2>
              
              <p className="text-gray-700 mb-4">
                We understand that sometimes you need to change your plans rather than cancel completely. Our rescheduling policy offers flexibility:
              </p>

              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Free Rescheduling</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Reschedule up to 48 hours before your experience at no cost</li>
                  <li>Subject to availability on your preferred new date</li>
                  <li>Can be done online, by phone, or email</li>
                  <li>No limit on the number of reschedules (within reason)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Late Rescheduling</h3>
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li>Rescheduling within 24-48 hours: €25 administrative fee</li>
                  <li>Rescheduling less than 24 hours: €50 administrative fee</li>
                  <li>Subject to availability and weather conditions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Special Circumstances</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Emergencies</h3>
              <p className="text-gray-700 mb-4">
                In case of medical emergencies or serious illness, we may waive our standard cancellation policy. Medical documentation may be required. Please contact us as soon as possible to discuss your situation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Travel Restrictions</h3>
              <p className="text-gray-700 mb-4">
                If government-imposed travel restrictions prevent you from attending your booked experience, we will offer a full refund or the option to reschedule without penalty.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Group Bookings</h3>
              <p className="text-gray-700 mb-4">
                Group bookings (6+ people) may have different cancellation terms. Please refer to your group booking agreement or contact us for specific terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Processing</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Credit Card Refunds:</strong> 5-7 business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>Bank Transfer Refunds:</strong> 7-10 business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700"><strong>PayPal Refunds:</strong> 3-5 business days</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Refund processing times may vary depending on your bank or payment provider. You will receive an email confirmation once the refund has been processed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No-Show Policy</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Important</h3>
                    <p className="text-red-800 mb-4">
                      If you fail to show up for your scheduled experience without prior notice, this is considered a no-show and no refund will be provided.
                    </p>
                    <p className="text-red-700 text-sm">
                      Please contact us as soon as possible if you're running late or unable to attend.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about our cancellation policy or need assistance with your booking, please don't hesitate to contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 text-primary-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <a href="tel:+393456789012" className="text-primary-600 hover:underline font-medium">+39 345 678 9012</a>
                  </p>
                  <p className="text-sm text-gray-600">Daily: 8:00 AM - 7:00 PM</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-primary-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <a href="mailto:bookings@gardaracing.com" className="text-primary-600 hover:underline font-medium">bookings@gardaracing.com</a>
                  </p>
                  <p className="text-sm text-gray-600">Response within 24 hours</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;