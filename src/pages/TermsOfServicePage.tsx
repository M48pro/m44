import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title="Terms of Service"
        description="Terms of service for Garda Racing Yacht Club - rules and conditions for using our yacht racing experiences."
        url="/terms-of-service"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the services provided by Garda Racing Yacht Club ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                Garda Racing Yacht Club provides yacht racing experiences on Lake Garda, Italy. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Professional yacht racing instruction and guidance</li>
                <li>Use of sailing equipment and safety gear</li>
                <li>Racing yacht charter for the duration of the experience</li>
                <li>Professional photography and videography services</li>
                <li>Medal ceremony and certificate presentation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Booking and Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Booking Process</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Bookings can be made online, by phone, or email</li>
                <li>All bookings are subject to availability</li>
                <li>A booking is confirmed only upon receipt of payment</li>
                <li>You will receive a confirmation email with booking details</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Payment</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Full payment is required at the time of booking</li>
                <li>Prices are in Euros (€) and include all applicable taxes</li>
                <li>Payment is processed securely through Stripe</li>
                <li>We accept major credit cards and bank transfers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Pricing</h3>
              <p className="text-gray-700">
                Current pricing is €199 per person for the full-day yacht racing experience. Prices are subject to change without notice, but confirmed bookings will honor the price at the time of booking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Participant Requirements</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Age Requirements</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Participants must be at least 12 years old</li>
                <li>Participants under 18 must be accompanied by a parent or guardian</li>
                <li>All minors require signed parental consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Health and Fitness</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Participants should be in reasonable physical condition</li>
                <li>You must disclose any medical conditions that may affect participation</li>
                <li>Pregnant women are advised not to participate</li>
                <li>We reserve the right to refuse participation for safety reasons</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Experience Level</h3>
              <p className="text-gray-700">
                No prior sailing experience is required. Our professional instructors will provide all necessary training and guidance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Safety and Liability</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Safety Measures</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All participants must attend the mandatory safety briefing</li>
                <li>Life jackets and safety equipment are provided and must be worn</li>
                <li>Participants must follow all instructions from the skipper</li>
                <li>Alcohol consumption is prohibited during the experience</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                While we maintain comprehensive insurance and follow strict safety protocols, sailing involves inherent risks. By participating, you acknowledge and accept these risks. Our liability is limited to the maximum extent permitted by law.
              </p>
              <p className="text-gray-700">
                We strongly recommend that participants have their own travel and activity insurance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Weather and Cancellation Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Weather Conditions</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Experiences operate in most weather conditions</li>
                <li>We reserve the right to cancel for safety reasons</li>
                <li>Weather-related cancellations receive full refund or rescheduling</li>
                <li>Light rain does not typically result in cancellation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Participant Cancellations</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Free cancellation up to 48 hours before the experience</li>
                <li>50% refund for cancellations 24-48 hours before</li>
                <li>No refund for cancellations less than 24 hours before</li>
                <li>Rescheduling is subject to availability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content on our website and materials provided during the experience are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
              <p className="text-gray-700">
                Photos and videos taken during your experience may be used for marketing purposes unless you specifically opt out.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Conduct and Behavior</h2>
              <p className="text-gray-700 mb-4">
                Participants are expected to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Treat staff and other participants with respect</li>
                <li>Follow all safety instructions and guidelines</li>
                <li>Arrive on time and prepared for the experience</li>
                <li>Not engage in any illegal or dangerous activities</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We reserve the right to remove participants who violate these standards without refund.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Force Majeure</h2>
              <p className="text-gray-700">
                We shall not be liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, strikes, or other unforeseeable events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700">
                These terms shall be governed by and construed in accordance with the laws of Italy. Any disputes shall be subject to the exclusive jurisdiction of the courts of Trento, Italy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be posted on our website and will take effect immediately. Continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these terms or our services, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700"><strong>Garda Racing Yacht Club</strong></p>
                <p className="text-gray-700">Via del Porto 15</p>
                <p className="text-gray-700">38066 Riva del Garda, TN, Italy</p>
                <p className="text-gray-700">Email: <a href="mailto:info@gardaracing.com" className="text-primary-600 hover:underline">info@gardaracing.com</a></p>
                <p className="text-gray-700">Phone: <a href="tel:+393456789012" className="text-primary-600 hover:underline">+39 345 678 9012</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;