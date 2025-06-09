import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import ContentLoader from '../components/ContentLoader';

const CancellationPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title={t('navigation.cancellation')}
        description="Cancellation and refund policy for Garda Racing Yacht Club bookings. Learn about our flexible cancellation terms."
        url="/cancellation-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif">
            <ContentLoader 
              slug="cancellation-policy-title" 
              fallbackKey="navigation.cancellation" 
              as="span"
            />
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <ContentLoader 
              slug="cancellation-policy-intro" 
              className="text-gray-600 mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-timeline" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-weather" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-how-to-cancel" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-rescheduling" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-special-circumstances" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-refund-processing" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-no-show" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="cancellation-policy-contact" 
              className="mb-8"
              as="div"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;