import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';

interface UseCMSContentOptions {
  fallbackLanguage?: string;
  fallbackTranslationKey?: string;
}

export const useCMSContent = (
  slug: string, 
  options: UseCMSContentOptions = {}
) => {
  const { i18n, t } = useTranslation();
  const [content, setContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    fallbackLanguage = 'en',
    fallbackTranslationKey
  } = options;

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First try to get content in the current language
        let { data, error } = await supabase
          .from('cms_content')
          .select('content, title')
          .eq('slug', slug)
          .eq('language', i18n.language)
          .eq('published', true)
          .single();
        
        // If not found, try fallback language
        if (error && i18n.language !== fallbackLanguage) {
          const fallbackResult = await supabase
            .from('cms_content')
            .select('content, title')
            .eq('slug', slug)
            .eq('language', fallbackLanguage)
            .eq('published', true)
            .single();
            
          if (!fallbackResult.error) {
            data = fallbackResult.data;
            error = null;
          }
        }
        
        if (error) {
          throw new Error(`Content not found: ${error.message}`);
        }
        
        setContent(data.content);
        setTitle(data.title);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
        
        // If we have a fallback translation key, we'll use that
        if (fallbackTranslationKey) {
          setContent(t(fallbackTranslationKey));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, [slug, i18n.language, fallbackLanguage, t, fallbackTranslationKey]);

  return { content, title, isLoading, error };
};