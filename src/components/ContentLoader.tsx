import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';
import ReactMarkdown from 'react-markdown';

interface ContentLoaderProps {
  slug: string;
  fallbackTranslationKey?: string;
  className?: string;
}

const ContentLoader: React.FC<ContentLoaderProps> = ({ 
  slug, 
  fallbackTranslationKey,
  className = ''
}) => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First try to get content in the current language
        let { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('slug', slug)
          .eq('language', i18n.language)
          .eq('published', true)
          .single();
        
        // If not found, try English as fallback
        if (error && i18n.language !== 'en') {
          const fallbackResult = await supabase
            .from('cms_content')
            .select('content')
            .eq('slug', slug)
            .eq('language', 'en')
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
  }, [slug, i18n.language, t, fallbackTranslationKey]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (error && !content) {
    return (
      <div className="text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className={className}>
      {content && (
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-6" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-900 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-900 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="text-gray-700 mb-4" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6" {...props} />,
            li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
            a: ({ node, ...props }) => <a className="text-primary-600 hover:underline" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600 mb-4" {...props} />
            ),
            code: ({ node, ...props }) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
            pre: ({ node, ...props }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-auto mb-4" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default ContentLoader;