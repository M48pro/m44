import React from 'react';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import ContentLoader from '../components/ContentLoader';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <SEOHead
        title={t('navigation.privacy')}
        description="Privacy policy for Garda Racing Yacht Club - how we collect, use, and protect your personal information."
        url="/privacy-policy"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 font-serif">
            <ContentLoader 
              slug="privacy-policy-title" 
              fallbackKey="navigation.privacy" 
              as="span"
            />
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <ContentLoader 
              slug="privacy-policy-intro" 
              className="text-gray-600 mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-information-collected" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-information-use" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-information-sharing" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-data-security" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-your-rights" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-cookies" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-data-retention" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-international-transfers" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-childrens-privacy" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-changes" 
              className="mb-8"
              as="div"
            />

            <ContentLoader 
              slug="privacy-policy-contact" 
              className="mb-8"
              as="div"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;