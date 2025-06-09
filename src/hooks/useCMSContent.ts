import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cmsService, type CMSContent } from '../services/cms';

export const useCMSContent = (slug: string) => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await cmsService.getContentWithFallback(slug, i18n.language, 'en');
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, i18n.language]);

  return { content, loading, error };
};

export const useMultipleCMSContent = (slugs: string[]) => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await cmsService.getMultipleContent(slugs, i18n.language);
        
        // If some content is missing in the current language, fetch fallbacks
        if (data.length < slugs.length) {
          const foundSlugs = data.map(item => item.slug);
          const missingSlugs = slugs.filter(slug => !foundSlugs.includes(slug));
          
          if (missingSlugs.length > 0 && i18n.language !== 'en') {
            const fallbackData = await cmsService.getMultipleContent(missingSlugs, 'en');
            data.push(...fallbackData);
          }
        }
        
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    if (slugs.length > 0) {
      fetchContent();
    }
  }, [slugs, i18n.language]);

  const getContentBySlug = (slug: string): CMSContent | null => {
    return content.find(item => item.slug === slug) || null;
  };

  return { content, loading, error, getContentBySlug };
};