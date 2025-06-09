import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cmsService, type CMSContent } from '../services/cms';
import { supportedLanguages } from '../i18n';

interface ContentManagerProps {
  initialContent?: CMSContent;
  onSave?: (content: CMSContent) => void;
  onCancel?: () => void;
}

const ContentManager: React.FC<ContentManagerProps> = ({
  initialContent,
  onSave,
  onCancel
}) => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<Partial<CMSContent>>(initialContent || {
    slug: '',
    title: '',
    content: '',
    meta_description: '',
    language: i18n.language,
    published: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setContent(prev => ({ ...prev, [name]: checked }));
    } else {
      setContent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      if (!content.slug || !content.title || !content.content || !content.language) {
        throw new Error('Please fill in all required fields');
      }
      
      const savedContent = await cmsService.upsertContent(content as Omit<CMSContent, 'id' | 'created_at' | 'updated_at'>);
      
      if (!savedContent) {
        throw new Error('Failed to save content');
      }
      
      setSuccess(true);
      if (onSave) {
        onSave(savedContent);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{initialContent ? 'Edit Content' : 'Create Content'}</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded mb-4">
          Content saved successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={content.slug}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Unique identifier for this content (e.g., "about-mission-description")
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={content.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            name="content"
            value={content.content}
            onChange={handleChange}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <input
            type="text"
            name="meta_description"
            value={content.meta_description || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language *
          </label>
          <select
            name="language"
            value={content.language}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            {Object.entries(supportedLanguages).map(([code, language]) => (
              <option key={code} value={code}>
                {language.name} ({language.nativeName})
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="published"
            checked={content.published}
            onChange={(e) => setContent(prev => ({ ...prev, published: e.target.checked }))}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Published
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentManager;