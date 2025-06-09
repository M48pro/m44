import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cmsService, type CMSContent } from '../../services/cms';
import ContentManager from '../../components/ContentManager';

const ContentEditorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<CMSContent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState(i18n.language);

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await cmsService.getAllContent(filterLanguage);
        setContents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [filterLanguage]);

  const handleSave = (content: CMSContent) => {
    // Update the list with the new/updated content
    setContents(prev => {
      const index = prev.findIndex(c => c.id === content.id);
      if (index >= 0) {
        return [...prev.slice(0, index), content, ...prev.slice(index + 1)];
      } else {
        return [...prev, content];
      }
    });
    
    setSelectedContent(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setSelectedContent(null);
    setIsCreating(false);
  };

  const filteredContents = contents.filter(content => {
    const searchLower = searchTerm.toLowerCase();
    return (
      content.slug.toLowerCase().includes(searchLower) ||
      content.title.toLowerCase().includes(searchLower) ||
      content.content.toLowerCase().includes(searchLower)
    );
  });

  if (loading && contents.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error && contents.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('common.error')}: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            {t('common.reset')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <button
            onClick={() => {
              setSelectedContent(null);
              setIsCreating(true);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Create New Content
          </button>
        </div>

        {(selectedContent || isCreating) ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <ContentManager
              initialContent={selectedContent || undefined}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <select
                    value={filterLanguage}
                    onChange={(e) => setFilterLanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="en">English</option>
                    <option value="ru">Russian</option>
                    <option value="it">Italian</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
              </div>

              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                </div>
              )}

              {filteredContents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No content found. Try adjusting your search or create new content.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Slug
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Language
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Published
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContents.map((content) => (
                        <tr key={content.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {content.slug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {content.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {content.language}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {content.published ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => setSelectedContent(content)}
                              className="text-primary-600 hover:text-primary-900 mr-3"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentEditorPage;