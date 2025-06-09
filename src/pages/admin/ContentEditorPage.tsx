import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../services/supabase';
import { Edit, Save, Plus, Trash, Eye, EyeOff, Search, X, Check, Globe, AlertTriangle } from 'lucide-react';

interface CMSContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string | null;
  language: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const ContentEditorPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [filteredContents, setFilteredContents] = useState<CMSContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<CMSContent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [publishedFilter, setPublishedFilter] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState<Partial<CMSContent>>({
    slug: '',
    title: '',
    content: '',
    meta_description: '',
    language: i18n.language,
    published: true
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Supported languages for the CMS
  const supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' }
  ];

  // Fetch content from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('*')
          .order('slug', { ascending: true })
          .order('language', { ascending: true });
        
        if (error) {
          throw new Error(error.message);
        }
        
        setContents(data || []);
        setFilteredContents(data || []);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Filter content based on search term, language, and published status
  useEffect(() => {
    let filtered = [...contents];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(content => 
        content.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(content => content.language === languageFilter);
    }
    
    // Filter by published status
    if (publishedFilter !== 'all') {
      const isPublished = publishedFilter === 'published';
      filtered = filtered.filter(content => content.published === isPublished);
    }
    
    setFilteredContents(filtered);
  }, [searchTerm, languageFilter, publishedFilter, contents]);

  // Handle editing content
  const handleEditContent = (content: CMSContent) => {
    setEditingContent(content);
    setIsCreating(false);
  };

  // Handle creating new content
  const handleCreateContent = () => {
    setIsCreating(true);
    setEditingContent(null);
    setNewContent({
      slug: '',
      title: '',
      content: '',
      meta_description: '',
      language: i18n.language,
      published: true
    });
  };

  // Handle saving content
  const handleSaveContent = async () => {
    setSaveStatus('saving');
    setSaveMessage('Saving...');
    
    try {
      if (isCreating) {
        // Create new content
        const { data, error } = await supabase
          .from('cms_content')
          .insert({
            slug: newContent.slug,
            title: newContent.title,
            content: newContent.content,
            meta_description: newContent.meta_description,
            language: newContent.language,
            published: newContent.published
          })
          .select();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setContents([...contents, data[0]]);
        setSaveStatus('success');
        setSaveMessage('Content created successfully!');
        setIsCreating(false);
      } else if (editingContent) {
        // Update existing content
        const { data, error } = await supabase
          .from('cms_content')
          .update({
            title: editingContent.title,
            content: editingContent.content,
            meta_description: editingContent.meta_description,
            published: editingContent.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingContent.id)
          .select();
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Update the content in the state
        setContents(contents.map(c => c.id === editingContent.id ? data[0] : c));
        setSaveStatus('success');
        setSaveMessage('Content updated successfully!');
        setEditingContent(null);
      }
    } catch (err) {
      console.error('Error saving content:', err);
      setSaveStatus('error');
      setSaveMessage('Failed to save content. Please try again.');
    }
    
    // Reset save status after 3 seconds
    setTimeout(() => {
      setSaveStatus('idle');
      setSaveMessage('');
    }, 3000);
  };

  // Handle deleting content
  const handleDeleteContent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Remove the content from the state
      setContents(contents.filter(c => c.id !== id));
      setFilteredContents(filteredContents.filter(c => c.id !== id));
      
      if (editingContent?.id === id) {
        setEditingContent(null);
      }
      
      setSaveStatus('success');
      setSaveMessage('Content deleted successfully!');
    } catch (err) {
      console.error('Error deleting content:', err);
      setSaveStatus('error');
      setSaveMessage('Failed to delete content. Please try again.');
    }
    
    // Reset save status after 3 seconds
    setTimeout(() => {
      setSaveStatus('idle');
      setSaveMessage('');
    }, 3000);
  };

  // Handle toggling published status
  const handleTogglePublished = async (content: CMSContent) => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .update({
          published: !content.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id)
        .select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update the content in the state
      setContents(contents.map(c => c.id === content.id ? data[0] : c));
      
      if (editingContent?.id === content.id) {
        setEditingContent(data[0]);
      }
    } catch (err) {
      console.error('Error toggling published status:', err);
      setSaveStatus('error');
      setSaveMessage('Failed to update published status. Please try again.');
    }
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingContent(null);
    setIsCreating(false);
  };

  // Group content by slug
  const contentBySlug = filteredContents.reduce((acc, content) => {
    if (!acc[content.slug]) {
      acc[content.slug] = [];
    }
    acc[content.slug].push(content);
    return acc;
  }, {} as Record<string, CMSContent[]>);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <button
            onClick={handleCreateContent}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Content</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by slug or title..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {searchTerm ? (
                    <X
                      className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600"
                      onClick={() => setSearchTerm('')}
                    />
                  ) : (
                    <Search className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label htmlFor="language-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language-filter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Languages</option>
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Published Filter */}
            <div>
              <label htmlFor="published-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="published-filter"
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Status Message */}
        {saveStatus !== 'idle' && (
          <div 
            className={`mb-6 p-4 rounded-lg ${
              saveStatus === 'saving' ? 'bg-blue-50 text-blue-800' :
              saveStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}
          >
            <div className="flex items-center">
              {saveStatus === 'saving' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>}
              {saveStatus === 'success' && <Check className="h-5 w-5 text-green-500 mr-3" />}
              {saveStatus === 'error' && <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />}
              <p>{saveMessage}</p>
            </div>
          </div>
        )}

        {/* Content Editor */}
        {(editingContent || isCreating) && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {isCreating ? 'Create New Content' : 'Edit Content'}
            </h2>
            
            <div className="space-y-6">
              {isCreating && (
                <>
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      value={newContent.slug}
                      onChange={(e) => setNewContent({ ...newContent, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Unique identifier for this content. Use kebab-case (e.g., privacy-policy-intro).
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language *
                    </label>
                    <select
                      id="language"
                      value={newContent.language}
                      onChange={(e) => setNewContent({ ...newContent, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      {supportedLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={isCreating ? newContent.title : editingContent?.title}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewContent({ ...newContent, title: e.target.value });
                    } else if (editingContent) {
                      setEditingContent({ ...editingContent, title: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={isCreating ? newContent.content : editingContent?.content}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewContent({ ...newContent, content: e.target.value });
                    } else if (editingContent) {
                      setEditingContent({ ...editingContent, content: e.target.value });
                    }
                  }}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supports Markdown formatting.
                </p>
              </div>
              
              <div>
                <label htmlFor="meta-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <input
                  type="text"
                  id="meta-description"
                  value={isCreating ? newContent.meta_description : editingContent?.meta_description || ''}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewContent({ ...newContent, meta_description: e.target.value });
                    } else if (editingContent) {
                      setEditingContent({ ...editingContent, meta_description: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Brief description for SEO purposes.
                </p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={isCreating ? newContent.published : editingContent?.published}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewContent({ ...newContent, published: e.target.checked });
                    } else if (editingContent) {
                      setEditingContent({ ...editingContent, published: e.target.checked });
                    }
                  }}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                  Published
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContent}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  disabled={
                    isCreating ? 
                      !newContent.slug || !newContent.title || !newContent.content || !newContent.language :
                      !editingContent?.title || !editingContent?.content
                  }
                >
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading content...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-lg">
            <p>{error}</p>
          </div>
        ) : filteredContents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No content found. Try adjusting your filters or create new content.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(contentBySlug).map(([slug, contents]) => (
              <div key={slug} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{slug}</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {contents.map((content) => (
                    <div key={content.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                              {supportedLanguages.find(l => l.code === content.language)?.name || content.language}
                            </span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            content.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {content.published ? 'Published' : 'Draft'}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTogglePublished(content)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            title={content.published ? 'Unpublish' : 'Publish'}
                          >
                            {content.published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                          </button>
                          <button
                            onClick={() => handleEditContent(content)}
                            className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteContent(content.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-medium text-gray-900">{content.title}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {content.content.substring(0, 150)}...
                        </p>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last updated: {new Date(content.updated_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditorPage;