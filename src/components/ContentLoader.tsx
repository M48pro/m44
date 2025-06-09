import React from 'react';
import { useCMSContent } from '../hooks/useCMSContent';
import { useTranslation } from 'react-i18next';

interface ContentLoaderProps {
  slug: string;
  fallbackKey?: string;
  className?: string;
  as?: React.ElementType;
}

const ContentLoader: React.FC<ContentLoaderProps> = ({
  slug,
  fallbackKey,
  className = '',
  as: Component = 'div'
}) => {
  const { t } = useTranslation();
  const { content, loading, error } = useCMSContent(slug);

  if (loading) {
    return (
      <Component className={`${className} animate-pulse bg-gray-200 rounded min-h-[1em]`}>
        &nbsp;
      </Component>
    );
  }

  if (error || !content) {
    // Use fallback from translation if available
    if (fallbackKey) {
      return <Component className={className}>{t(fallbackKey)}</Component>;
    }
    
    // Otherwise show error or empty state
    return (
      <Component className={`${className} text-gray-500`}>
        {error ? `Error: ${error}` : 'Content not available'}
      </Component>
    );
  }

  return <Component className={className}>{content.content}</Component>;
};

export default ContentLoader;