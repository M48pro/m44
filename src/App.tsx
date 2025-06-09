import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Import i18n configuration
import './i18n';

// Layout components
import { Header, Footer } from './components/layout';
import ErrorBoundary from './components/ErrorBoundary';
import SkipLink from './components/SkipLink';

// Pages
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CancellationPolicyPage from './pages/CancellationPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ChatWidget from './components/ChatWidget';

// Utils
import { monitoring, accessibility } from './utils';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    if (import.meta.env.PROD) {
      monitoring.measureCoreWebVitals();
    }

    // Setup accessibility listeners
    const cleanupAccessibility = accessibility.setupAccessibilityListeners();

    // Preload critical resources
    const criticalImages = [
      '/IMG_0967.webp',
      'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      cleanupAccessibility();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <div className="min-h-screen bg-white">
              <SkipLink />
              <Header />
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <ChatWidget />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;