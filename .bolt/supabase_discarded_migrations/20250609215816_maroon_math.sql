/*
  # CMS Content Migration - Legal Documents
  
  1. New Content
    - Privacy Policy (EN/RU)
    - Terms of Service (EN/RU) 
    - Cancellation Policy (EN/RU)
  
  2. Features
    - Multi-language support
    - Structured content sections
    - SEO meta descriptions
    - Safe upsert with conflict resolution
*/

-- Privacy Policy Content (English)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
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

('privacy-policy-information-sharing', 'Information Sharing', '## Information Sharing and Disclosure

We may share your information in the following circumstances:
- **Service Providers:** With trusted third-party service providers who assist us in operating our website and conducting our business
- **Legal Requirements:** When required by law or to protect our rights and safety
- **Business Transfers:** In connection with any merger, sale of assets, or acquisition of our business

We require all third parties to respect the security of your personal data and treat it in accordance with the law.', 'How we share information with third parties', 'en', true),

('privacy-policy-data-security', 'Data Security', '## Data Security

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**Security measures include:**
- SSL encryption for data transmission
- Secure payment processing through certified providers
- Regular security assessments and updates
- Limited access to personal information on a need-to-know basis

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.', 'How we protect your data', 'en', true),

('privacy-policy-your-rights', 'Your Rights', '## Your Rights

Under applicable data protection laws, you have the right to:
- **Access:** Request copies of your personal information
- **Rectification:** Request correction of inaccurate information
- **Erasure:** Request deletion of your personal information
- **Portability:** Request transfer of your information to another service
- **Objection:** Object to processing of your personal information
- **Restriction:** Request restriction of processing

To exercise these rights, please contact us using the information provided below.', 'Your data protection rights', 'en', true),

('privacy-policy-cookies', 'Cookies and Tracking', '## Cookies and Tracking Technologies

Our website uses cookies and similar tracking technologies to:
- Remember your preferences and settings
- Analyze website traffic and usage patterns
- Provide personalized content and advertisements
- Improve website functionality and user experience

You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.', 'Information about cookies and tracking', 'en', true),

('privacy-policy-data-retention', 'Data Retention', '## Data Retention

We retain your personal information only for as long as necessary to:
- Fulfill the purposes for which it was collected
- Comply with legal obligations
- Resolve disputes and enforce agreements

**Retention periods:**
- Booking information: 7 years for accounting purposes
- Marketing communications: Until you unsubscribe
- Website analytics: 26 months maximum', 'How long we keep your data', 'en', true),

('privacy-policy-international-transfers', 'International Transfers', '## International Data Transfers

Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers are made in accordance with applicable data protection laws and with appropriate safeguards in place.', 'Information about international data transfers', 'en', true),

('privacy-policy-childrens-privacy', 'Children\'s Privacy', '## Children\'s Privacy

Our services are not directed to children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.', 'Privacy policy for children', 'en', true),

('privacy-policy-changes', 'Policy Changes', '## Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.

Your continued use of our services after any changes constitutes acceptance of the updated policy.', 'How we handle policy changes', 'en', true),

('privacy-policy-contact', 'Contact Information', '## Contact Us

If you have any questions about this Privacy Policy or our data practices, please contact us:

**Garda Racing Yacht Club**
- Email: privacy@gardaracing.com
- Phone: +39 345 678 9012
- Address: Via del Porto 15, 38066 Riva del Garda, TN, Italy

We will respond to your inquiry within 30 days.', 'How to contact us about privacy', 'en', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();

-- Privacy Policy Content (Russian)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
('privacy-policy-title', 'Политика конфиденциальности', 'Политика конфиденциальности', 'Политика конфиденциальности Garda Racing Yacht Club', 'ru', true),
('privacy-policy-intro', 'Введение в политику конфиденциальности', 'Данная Политика конфиденциальности описывает, как Garda Racing Yacht Club ("мы", "наш" или "нас") собирает, использует и защищает вашу личную информацию при использовании наших услуг яхтенных гонок и веб-сайта.

**Последнее обновление:** Январь 2024

Мы привержены защите вашей конфиденциальности и обеспечению безопасности вашей личной информации. Данная политика объясняет наши практики относительно сбора, использования и раскрытия информации, которую вы можете предоставить через наш веб-сайт или услуги.', 'Введение в нашу политику конфиденциальности', 'ru', true),

('privacy-policy-information-collected', 'Информация, которую мы собираем', '## Информация, которую мы собираем

Мы собираем информацию, которую вы предоставляете нам напрямую, например, когда вы:
- Делаете бронирование наших яхтенных гонок
- Связываетесь с нами с вопросами
- Подписываетесь на нашу рассылку
- Создаете аккаунт на нашем веб-сайте

**Личная информация может включать:**
- Имя и контактную информацию (email, телефон, адрес)
- Платежную информацию (обрабатывается безопасно через сторонних провайдеров)
- Предпочтения бронирования и особые требования
- Историю общения с нашей командой', 'Типы информации, которую мы собираем', 'ru', true),

('privacy-policy-information-use', 'Как мы используем вашу информацию', '## Как мы используем вашу информацию

Мы используем собранную информацию для:
- Обработки и управления вашими бронированиями
- Предоставления поддержки клиентов и ответов на запросы
- Отправки подтверждений бронирования и важных обновлений
- Улучшения наших услуг и функциональности веб-сайта
- Соблюдения правовых обязательств
- Отправки маркетинговых сообщений (с вашего согласия)

Мы не продаем, не обмениваем и не сдаем в аренду вашу личную информацию третьим лицам.', 'Как мы используем собранную информацию', 'ru', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();

-- Terms of Service Content (English)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
('terms-of-service-title', 'Terms of Service', 'Terms of Service', 'Terms of service for Garda Racing Yacht Club', 'en', true),
('terms-of-service-intro', 'Terms of Service Introduction', 'Welcome to Garda Racing Yacht Club. These Terms of Service ("Terms") govern your use of our yacht racing experiences and services.

**Last updated:** January 2024

By booking our services or using our website, you agree to be bound by these Terms. Please read them carefully before making a booking.', 'Introduction to our terms of service', 'en', true),

('terms-of-service-acceptance', 'Acceptance of Terms', '## Acceptance of Terms

By accessing our website, making a booking, or participating in our yacht racing experiences, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.

If you do not agree with any part of these terms, you may not use our services.', 'Acceptance of terms and conditions', 'en', true),

('terms-of-service-description', 'Service Description', '## Service Description

Garda Racing Yacht Club provides yacht racing experiences on Lake Garda, including:
- Professional sailing instruction
- Yacht racing participation
- Safety equipment and briefings
- Photography and videography services
- Certificates and medals

All services are subject to weather conditions and safety requirements.', 'Description of our services', 'en', true),

('terms-of-service-booking', 'Booking Terms', '## Booking and Payment Terms

**Booking Requirements:**
- All bookings must be made in advance
- Payment is required to confirm your booking
- Participants must meet age and health requirements
- Valid identification may be required

**Payment Terms:**
- Prices are in Euros and include all applicable taxes
- Payment is processed securely through third-party providers
- Refunds are subject to our cancellation policy', 'Booking and payment terms', 'en', true),

('terms-of-service-requirements', 'Participant Requirements', '## Participant Requirements

**Age Requirements:**
- Minimum age: 12 years (with adult supervision)
- Participants under 18 must have parental consent

**Health and Safety:**
- Participants must be in good physical health
- Swimming ability is recommended but not required
- Participants with medical conditions must inform us in advance
- We reserve the right to refuse participation for safety reasons', 'Requirements for participants', 'en', true),

('terms-of-service-safety', 'Safety and Liability', '## Safety and Liability

**Safety Measures:**
- All participants must follow safety instructions
- Life jackets and safety equipment are mandatory
- Professional skippers maintain authority over all safety decisions

**Limitation of Liability:**
- Participation is at your own risk
- We maintain comprehensive insurance coverage
- Our liability is limited to the extent permitted by law
- Participants are responsible for their personal belongings', 'Safety measures and liability terms', 'en', true),

('terms-of-service-weather', 'Weather Policy', '## Weather and Cancellation Policy

**Weather Conditions:**
- Activities may be cancelled due to unsafe weather
- We reserve the right to modify itineraries for safety
- Weather cancellations result in full refund or rescheduling

**Force Majeure:**
- We are not liable for cancellations due to circumstances beyond our control
- This includes severe weather, natural disasters, or government restrictions', 'Weather and cancellation policies', 'en', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();

-- Terms of Service Content (Russian)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
('terms-of-service-title', 'Условия обслуживания', 'Условия обслуживания', 'Условия обслуживания Garda Racing Yacht Club', 'ru', true),
('terms-of-service-intro', 'Введение в условия обслуживания', 'Добро пожаловать в Garda Racing Yacht Club. Данные Условия обслуживания ("Условия") регулируют использование наших услуг яхтенных гонок.

**Последнее обновление:** Январь 2024

Бронируя наши услуги или используя наш веб-сайт, вы соглашаетесь соблюдать данные Условия. Пожалуйста, внимательно прочитайте их перед бронированием.', 'Введение в наши условия обслуживания', 'ru', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();

-- Cancellation Policy Content (English)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
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
- Failure to arrive at the designated meeting point within 30 minutes of departure time will be considered a no-show and no refund will be provided.', 'Cancellation timeline and refund policy', 'en', true),

('cancellation-policy-weather', 'Weather Cancellations', '## Weather-Related Cancellations

**Our Weather Policy:**
- Safety is our top priority
- We monitor weather conditions continuously
- Cancellations due to unsafe conditions result in full refund or free rescheduling

**What Constitutes Unsafe Weather:**
- Wind speeds exceeding 25 knots
- Thunderstorms or severe weather warnings
- Poor visibility conditions
- Any conditions deemed unsafe by our professional skippers', 'Weather-related cancellation policy', 'en', true),

('cancellation-policy-how-to-cancel', 'How to Cancel', '## How to Cancel Your Booking

**Cancellation Methods:**
- Email: info@gardaracing.com
- Phone: +39 345 678 9012
- Through your booking confirmation link

**Required Information:**
- Booking reference number
- Name and contact details
- Reason for cancellation (optional)

**Processing Time:**
- Cancellation confirmations sent within 24 hours
- Refunds processed within 5-7 business days', 'How to cancel your booking', 'en', true),

('cancellation-policy-rescheduling', 'Rescheduling Options', '## Rescheduling Your Experience

**Free Rescheduling:**
- Available up to 48 hours before departure
- Subject to availability
- No additional fees for date changes

**Last-Minute Changes:**
- Changes within 48 hours may incur fees
- Subject to availability and weather conditions
- Contact us as soon as possible for assistance', 'Rescheduling policy and options', 'en', true),

('cancellation-policy-special-circumstances', 'Special Circumstances', '## Special Circumstances

**Medical Emergencies:**
- Medical certificates may be required for refunds
- We will work with you to find suitable solutions
- Travel insurance is recommended

**Group Bookings:**
- Different terms may apply for groups of 6+ people
- Contact us directly for group cancellation policies
- Partial cancellations may be possible', 'Special circumstances and exceptions', 'en', true),

('cancellation-policy-refund-processing', 'Refund Processing', '## Refund Processing

**Refund Timeline:**
- Approved refunds processed within 5-7 business days
- Refunds issued to original payment method
- Bank processing times may vary

**Refund Amounts:**
- Based on cancellation timeline
- Processing fees may apply for certain payment methods
- Currency exchange rates may affect final amounts', 'How refunds are processed', 'en', true),

('cancellation-policy-no-show', 'No-Show Policy', '## No-Show Policy

**Definition:**
- Failure to arrive within 30 minutes of departure time
- No prior notification of delay or cancellation

**Consequences:**
- No refund provided for no-shows
- Booking considered complete
- Rebooking requires new payment

**Exceptions:**
- Emergency situations with documentation
- Circumstances beyond reasonable control', 'No-show policy and consequences', 'en', true),

('cancellation-policy-contact', 'Contact for Cancellations', '## Contact Information

For all cancellation requests and inquiries:

**Garda Racing Yacht Club**
- Email: info@gardaracing.com
- Phone: +39 345 678 9012
- WhatsApp: +39 345 678 9012
- Address: Via del Porto 15, 38066 Riva del Garda, TN, Italy

**Operating Hours:**
- Daily: 8:00 AM - 7:00 PM
- Season: March - October

We aim to respond to all cancellation requests within 24 hours.', 'Contact information for cancellations', 'en', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();

-- Cancellation Policy Content (Russian)
INSERT INTO cms_content (slug, title, content, meta_description, language, published) VALUES
('cancellation-policy-title', 'Политика отмены', 'Политика отмены', 'Политика отмены и возврата средств за бронирование яхтенных гонок', 'ru', true),
('cancellation-policy-intro', 'Введение в политику отмены', 'Мы понимаем, что планы могут измениться. Данная политика отмены описывает условия отмены бронирования вашего опыта яхтенных гонок.

**Дата вступления в силу:** Январь 2024

Пожалуйста, внимательно ознакомьтесь с данной политикой перед бронированием, поскольку она является частью вашего соглашения о бронировании с нами.', 'Введение в нашу политику отмены', 'ru', true)

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  published = EXCLUDED.published,
  updated_at = now();