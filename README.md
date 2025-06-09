# Garda Racing Yacht Club Website

A modern, multilingual website for yacht racing experiences on Lake Garda, built with React, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, Card, Modal)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── forms/           # Form-specific components
│   └── ...              # Other shared components
├── features/            # Feature-specific components and logic
│   ├── booking/         # Booking system components
│   ├── chat/            # Chat widget components
│   ├── testimonials/    # Testimonials components
│   └── gallery/         # Gallery components
├── pages/               # Page components
├── services/            # API services and data fetching
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── i18n/                # Internationalization setup and translations
└── ...
```

## 🚀 Features

- **Multilingual Support**: 6 languages (EN, IT, DE, FR, ES, RU)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Reusable component library
- **Booking System**: Complete booking flow with Supabase integration
- **Chat Widget**: Real-time customer support
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Performance**: Lazy loading, code splitting, optimized images

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Internationalization**: react-i18next
- **Forms**: react-hook-form
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📁 Directory Breakdown

### `/components`
- **`/ui`**: Basic reusable components (Button, Input, Card, Modal)
- **`/layout`**: Layout-specific components (Header, Footer)
- **`/forms`**: Form-related components

### `/features`
- **`/booking`**: Booking form, booking summary, payment components
- **`/chat`**: Chat widget and related functionality
- **`/testimonials`**: Customer testimonials display
- **`/gallery`**: Image gallery and media components

### `/services`
- **`supabase.ts`**: Database client and type definitions
- **`booking.ts`**: Booking-related API calls
- **`chat.ts`**: Chat service and message handling
- **`cms.ts`**: Content management system integration

### `/hooks`
- **`useLanguage.ts`**: Language switching and formatting utilities
- Custom hooks for specific functionality

### `/utils`
- **`index.ts`**: Common utility functions (formatting, validation, etc.)

### `/types`
- **`index.ts`**: TypeScript type definitions for the entire application

### `/constants`
- **`index.ts`**: Application constants (company info, pricing, social links)

## 🌍 Internationalization

The project supports 6 languages with complete translations:
- English (EN) - Default
- Italian (IT)
- German (DE)
- French (FR)
- Spanish (ES)
- Russian (RU)

Translation files are located in:
- `src/i18n/locales/` - Source translations
- `public/locales/` - Public translations for lazy loading

## 🎨 Design System

The project uses a consistent design system with:
- **Colors**: Primary (red), secondary (blue), accent (gold)
- **Typography**: Inter (sans-serif), Playfair Display (serif)
- **Spacing**: 8px grid system
- **Components**: Reusable UI component library

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Minimum 44px touch targets

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Images**: WebP format with fallbacks

## 🔒 Security

- **Environment Variables**: Secure API key management
- **HTTPS**: SSL/TLS encryption
- **CORS**: Proper cross-origin resource sharing
- **Input Validation**: Client and server-side validation

## 📈 Analytics & SEO

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Open Graph**: Social media sharing optimization

## 🚀 Deployment

The project is configured for deployment on Netlify with:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: Configured in Netlify dashboard
- **Redirects**: SPA routing support

## 🤝 Contributing

1. Follow the established directory structure
2. Use TypeScript for all new components
3. Add translations for all user-facing text
4. Write responsive, accessible components
5. Test across different devices and browsers

## 📄 License

© 2024 Garda Racing Yacht Club. All rights reserved.