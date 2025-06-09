import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import ContentLoader from '../components/ContentLoader';

const TermsOfServicePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title={t('navigation.terms')}
        description="Terms of service for Garda Racing Yacht Club - rules and conditions for using our yacht racing experiences."
        url="/terms-of-service"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif">
            <ContentLoader 
              slug="terms-of-service-title" 
              fallbackKey="navigation.terms" 
              as="span"
            />
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <ContentLoader 
              slug="terms-of-service-intro" 
              className="text-gray-600 mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-acceptance" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-description" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-booking" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-requirements" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-safety" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-weather" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-intellectual-property" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-conduct" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-force-majeure" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-governing-law" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-changes" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="terms-of-service-contact" 
              className="mb-8"
              as="div"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;