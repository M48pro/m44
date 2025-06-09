/*
  # Seed CMS Content with Legal Documents

  This migration adds initial content for legal pages in multiple languages.
  Content includes privacy policy, terms of service, and cancellation policy.
*/

-- Privacy Policy Content
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
-- English Privacy Policy
('privacy-policy-title', 'Privacy Policy', 'Privacy Policy', 'Privacy policy for Garda Racing Yacht Club', 'en', true),
('privacy-policy-intro', 'Privacy Policy Introduction', 'This Privacy Policy describes how Garda Racing Yacht Club ("we", "our", or "us") collects, uses, and protects your personal information when you use our yacht racing services and website.

**Last updated:** January 2024

We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains our practices regarding the collection, use, and disclosure of information that you may provide via our website or services.', 'Introduction to our privacy policy', 'en', true),

('privacy-policy-information-collected', 'Information We Collect', '## Information We Collect

We collect information you provide directly to us, such as when you:
- Make a booking for our yacht racing experiences
- Contact us with inquiries
- Subscribe to our newsletter
- Create an account on our website

**Personal Information may include:**
- Name and contact information (email, phone, address)
- Payment information (processed securely through third-party providers)
- Booking preferences and special requirements
- Communication history with our team', 'Types of information we collect', 'en', true),

('privacy-policy-information-use', 'How We Use Your Information', '## How We Use Your Information

We use the information we collect to:
- Process and manage your bookings
- Provide customer support and respond to inquiries
- Send booking confirmations and important updates
- Improve our services and website functionality
- Comply with legal obligations
- Send marketing communications (with your consent)

We do not sell, trade, or rent your personal information to third parties.', 'How we use collected information', 'en', true),

-- Russian Privacy Policy
('privacy-policy-title', 'Политика конфиденциальности', 'Политика конфиденциальности', 'Политика конфиденциальности Garda Racing Yacht Club', 'ru', true),
('privacy-policy-intro', 'Введение в политику конфиденциальности', 'Данная Политика конфиденциальности описывает, как Garda Racing Yacht Club ("мы", "наш" или "нас") собирает, использует и защищает вашу личную информацию при использовании наших услуг яхтенных гонок и веб-сайта.

**Последнее обновление:** Январь 2024

Мы привержены защите вашей конфиденциальности и обеспечению безопасности вашей личной информации. Данная политика объясняет наши практики относительно сбора, использования и раскрытия информации, которую вы можете предоставить через наш веб-сайт или услуги.', 'Введение в нашу политику конфиденциальности', 'ru', true),

-- Terms of Service Content
('terms-of-service-title', 'Terms of Service', 'Terms of Service', 'Terms of service for Garda Racing Yacht Club', 'en', true),
('terms-of-service-intro', 'Terms of Service Introduction', 'Welcome to Garda Racing Yacht Club. These Terms of Service ("Terms") govern your use of our yacht racing experiences and services.

**Last updated:** January 2024

By booking our services or using our website, you agree to be bound by these Terms. Please read them carefully before making a booking.', 'Introduction to our terms of service', 'en', true),

('terms-of-service-acceptance', 'Acceptance of Terms', '## Acceptance of Terms

By accessing our website, making a booking, or participating in our yacht racing experiences, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.

If you do not agree with any part of these terms, you may not use our services.', 'Acceptance of terms and conditions', 'en', true),

-- Cancellation Policy Content
('cancellation-policy-title', 'Cancellation Policy', 'Cancellation Policy', 'Cancellation and refund policy for yacht racing bookings', 'en', true),
('cancellation-policy-intro', 'Cancellation Policy Introduction', 'We understand that plans can change. This cancellation policy outlines the terms and conditions for cancelling your yacht racing experience booking.

**Effective Date:** January 2024

Please review this policy carefully before making your booking, as it forms part of your booking agreement with us.', 'Introduction to our cancellation policy', 'en', true),

('cancellation-policy-timeline', 'Cancellation Timeline', '## Cancellation Timeline

**Free Cancellation:**
- 48+ hours before departure: Full refund
- 24-48 hours before departure: 50% refund
- Less than 24 hours: No refund

**Weather Cancellations:**
- If we cancel due to unsafe weather conditions, you will receive a full refund or the option to reschedule at no additional cost.

**No-Show Policy:**
- Failure to arrive at the designated meeting point within 30 minutes of departure time will be considered a no-show and no refund will be provided.', 'Cancellation timeline and refund policy', 'en', true);