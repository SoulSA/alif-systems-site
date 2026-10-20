import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * ============================================================================
 * i18n.tsx — ALL WEBSITE TEXT lives here (English + Arabic). START HERE to
 * edit any wording on the site.
 * ============================================================================
 *
 * HOW THE TEXT SYSTEM WORKS
 *   • Every piece of visible text has a KEY (e.g. 'hero.title').
 *   • The `dict` object below holds two translations for each key:
 *       dict.en['hero.title']  → the English text
 *       dict.ar['hero.title']  → the Arabic text
 *   • Components NEVER hard-code words. They call  t('hero.title')  and the
 *     current language decides which string is shown.
 *   • Switching language (the globe button in the navbar) just flips `lang`
 *     between 'en' and 'ar' — no page reload — and the whole site re-renders
 *     with the other column of translations, and flips to RTL for Arabic.
 *
 * HOW TO EDIT WORDING
 *   1. Find the key for the text you want to change (keys are grouped by
 *      section: nav.*, hero.*, about.*, services.*, process.*, why.*,
 *      stats.*, logos.*, faq.*, cta.*, contact.*, footer.*).
 *   2. Change the string in BOTH `en` and `ar` so the two languages stay in
 *      sync. (If you only know English, change `en` and ask for the Arabic.)
 *   3. Keep the quotes and the trailing comma. Do not change the key itself,
 *      or the component that reads it won't find it.
 *
 * HOW TO ADD A NEW LINE OF TEXT
 *   • Add  'my.key': 'English text',  inside the `en` block AND
 *     'my.key': 'Arabic text',   inside the `ar` block, then use  t('my.key')
 *     in a component.
 *
 * CHANGE THE DEFAULT LANGUAGE
 *   • See `useState<Lang>('ar')` near the bottom — 'ar' = Arabic first,
 *     'en' = English first.
 * ============================================================================
 */

export type Lang = 'en' | 'ar';

interface I18nContextShape {
  lang: Lang;                 // current language: 'en' or 'ar'
  dir: 'ltr' | 'rtl';         // text direction, derived from lang
  t: (key: string) => string; // look up a translation by key
  setLang: (l: Lang) => void; // set a specific language
  toggle: () => void;         // flip between en/ar (used by the navbar button)
}

const I18nContext = createContext<I18nContextShape | null>(null);

// ------------------------------------------------------------------
// All site copy, keyed. EN + AR. ← EDIT THE STRINGS HERE.
// ------------------------------------------------------------------
export const dict: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.why': 'Why Alif',
    'nav.contact': 'Contact Us',
    'nav.cta': 'Get in Touch',

    'hero.badge': 'IT Workforce Solutions',
    'hero.title': 'The right people, powering the right technology.',
    'hero.subtitle':
      'Alif Systems delivers specialized IT manpower to technology companies — connecting skilled professionals with the organizations that need them, exactly when they need them.',
    'hero.ctaPrimary': 'Explore Our Services',
    'hero.ctaSecondary': 'Talk to Us',
    'hero.scroll': 'Scroll to discover',

    'about.tag': 'Who We Are',
    'about.title': 'Built on the first letter — the foundation of everything.',
    'about.p1':
      'Alif — the first letter of the Arabic alphabet — represents the beginning, the foundation, and the standard. At Alif Systems, we build that foundation for technology companies by providing the one resource that defines their success: the right people.',
    'about.p2':
      'We are an information technology services company specializing in IT manpower. We source, vet, and place skilled technology professionals with IT companies, giving them the flexibility to scale their teams without the overhead of traditional hiring.',
    'about.stat1': 'Vetted IT Professionals',
    'about.stat2': 'Client Response Time',
    'about.stat3': 'Placement Focus',
    'about.stat1v': '500+',
    'about.stat2v': '< 48h',
    'about.stat3v': '100% IT',

    'mv.missionTitle': 'Our Mission',
    'mv.mission':
      'To empower IT companies with reliable, skilled, and ready-to-deploy talent — removing the friction between a business need and the person who can meet it.',
    'mv.visionTitle': 'Our Vision',
    'mv.vision':
      'To become the region’s most trusted partner for technology talent, and to grow into a full-spectrum IT services provider that supports every stage of our clients’ journeys.',

    'services.tag': 'What We Provide',
    'services.title': 'Our Services',
    'services.subtitle':
      'We focus on doing one thing exceptionally well today — with a clear roadmap for more tomorrow.',
    'services.s1.title': 'IT Manpower Supply',
    'services.s1.desc':
      'Skilled, pre-vetted IT professionals placed with technology companies on flexible terms — from individual specialists to full project teams.',
    'services.s2.title': 'Specialized Technical Talent',
    'services.s2.desc':
      'Developers, system administrators, network engineers, support specialists and more — matched precisely to your technical requirements.',
    'services.s3.title': 'Flexible Staffing Models',
    'services.s3.desc':
      'Contract, project-based, or long-term placement. Scale your workforce up or down to match demand without the hiring overhead.',
    'services.s4.title': 'Rigorous Vetting',
    'services.s4.desc':
      'Every professional is screened for technical skill, experience, and fit — so you receive candidates ready to contribute from day one.',
    'services.soon.tag': 'Coming Soon',
    'services.soon.title': 'More services on the way',
    'services.soon.desc':
      'Manpower is where we start. We are expanding toward a full range of IT services — managed solutions, consulting, and beyond — to support our clients at every stage.',

    'why.tag': 'Why Choose Us',
    'why.title': 'Why companies partner with Alif',
    'why.w1.title': 'Speed',
    'why.w1.desc': 'Qualified candidates presented in days, not weeks.',
    'why.w2.title': 'Quality',
    'why.w2.desc': 'A rigorously vetted talent pool you can trust.',
    'why.w3.title': 'Flexibility',
    'why.w3.desc': 'Staffing models that bend to your business needs.',
    'why.w4.title': 'IT-Focused',
    'why.w4.desc': 'We understand technology roles because that is all we do.',

    'cta.title': 'Ready to build your team?',
    'cta.subtitle':
      'Tell us what you need and we will connect you with the right IT professionals — fast.',
    'cta.button': 'Contact Us',

    'contact.hero.tag': 'Get in Touch',
    'contact.hero.title': 'Let’s talk about your talent needs',
    'contact.hero.subtitle':
      'Reach out and our team will get back to you within one business day.',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Full Name',
    'contact.form.namePh': 'Your name',
    'contact.form.email': 'Email Address',
    'contact.form.emailPh': 'you@company.com',
    'contact.form.company': 'Company',
    'contact.form.companyPh': 'Your company name',
    'contact.form.phone': 'Phone',
    'contact.form.phonePh': '+966 5X XXX XXXX',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPh': 'How can we help?',
    'contact.form.message': 'Message',
    'contact.form.messagePh': 'Tell us about your requirements…',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending…',
    'contact.form.success': 'Thank you! Your message has been sent. We’ll be in touch shortly.',
    'contact.form.errRequired': 'Please fill in all required fields.',
    'contact.form.errEmail': 'Please enter a valid email address.',

    'contact.info.title': 'Contact Information',
    'contact.info.addressLabel': 'Office',
    'contact.info.address': 'Riyadh, Kingdom of Saudi Arabia',
    'contact.info.phoneLabel': 'Phone',
    'contact.info.emailLabel': 'Email',
    'contact.info.hoursLabel': 'Working Hours',
    'contact.info.hours': 'Sun – Thu, 9:00 AM – 6:00 PM',
    'contact.map.title': 'Find Us',
    'contact.back': 'Back to Home',

    'footer.tagline': 'The right people, powering the right technology.',
    'footer.quick': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.madeIn': 'Riyadh, Saudi Arabia',
    'footer.office': 'Office',
    'footer.company': 'Company',
    'footer.solutions': 'Solutions',
    'footer.addrCountry': 'SAUDI ARABIA',
    'footer.addrLine': 'Riyadh, Kingdom of Saudi Arabia',
    'footer.phoneLabel': 'Ph:',
    'footer.col.about': 'About',
    'footer.col.why': 'Why Alif',
    'footer.col.contact': 'Contact Us',
    'footer.sol.manpower': 'IT Manpower Supply',
    'footer.sol.talent': 'Specialized Talent',
    'footer.sol.staffing': 'Flexible Staffing',
    'footer.sol.vetting': 'Rigorous Vetting',
    'footer.follow': 'Follow us',

    'articles.tag': 'Insights',
    'articles.title': 'Latest Articles & Insights',
    'articles.subtitle': 'Perspectives on IT talent, staffing, and the technology industry.',
    'articles.readMore': 'Read article',
    'articles.empty': 'No articles published yet — check back soon.',
    'articles.back': 'Back to all articles',
    'articles.by': 'By',
    'articles.minRead': 'min read',

    'admin.title': 'Article Studio',
    'admin.subtitle': 'Create, edit and publish articles.',
    'admin.lock.title': 'Restricted Area',
    'admin.lock.prompt': 'Enter the passphrase to continue.',
    'admin.lock.placeholder': 'Passphrase',
    'admin.lock.enter': 'Unlock',
    'admin.lock.wrong': 'Incorrect passphrase.',
    'admin.lock.logout': 'Lock',
    'admin.new': 'New Article',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.publish': 'Published',
    'admin.draft': 'Draft',
    'admin.list.title': 'Your Articles',
    'admin.list.empty': 'No articles yet. Create your first one.',
    'admin.f.title': 'Article Title',
    'admin.f.titlePh': 'Enter a headline…',
    'admin.f.author': 'Author',
    'admin.f.authorPh': 'Author name',
    'admin.f.excerpt': 'Short summary',
    'admin.f.excerptPh': 'One or two sentences shown in the article list…',
    'admin.f.cover': 'Cover image URL (optional)',
    'admin.f.coverPh': 'https://… or upload below',
    'admin.f.coverUpload': 'Upload cover',
    'admin.f.body': 'Article content',
    'admin.f.published': 'Published (visible on the site)',
    'admin.save': 'Save Article',
    'admin.saving': 'Saving…',
    'admin.saved': 'Saved!',
    'admin.cancel': 'Cancel',
    'admin.confirmDelete': 'Delete this article permanently?',
    'admin.tb.bold': 'Bold',
    'admin.tb.italic': 'Italic',
    'admin.tb.underline': 'Underline',
    'admin.tb.h1': 'Heading',
    'admin.tb.h2': 'Subheading',
    'admin.tb.quote': 'Quote',
    'admin.tb.ul': 'Bullet list',
    'admin.tb.ol': 'Numbered list',
    'admin.tb.link': 'Insert link',
    'admin.tb.imgUrl': 'Image by URL',
    'admin.tb.imgUpload': 'Upload image',
    'admin.tb.align': 'Align',
    'admin.tb.clear': 'Clear formatting',
    'admin.err.title': 'Please add a title before saving.',

    'lang.switch': 'العربية',

    'marquee.1': 'IT Manpower',
    'marquee.2': 'Developers',
    'marquee.3': 'System Admins',
    'marquee.4': 'Network Engineers',
    'marquee.5': 'Support Specialists',
    'marquee.6': 'Cloud & DevOps',
    'marquee.7': 'Project Teams',

    'process.tag': 'How It Works',
    'process.title': 'From requirement to resource — in four steps',
    'process.s1.t': 'Understand',
    'process.s1.d': 'We learn your technical needs, team culture, and timeline in depth.',
    'process.s2.t': 'Source',
    'process.s2.d': 'We tap our vetted talent pool to shortlist the strongest matches.',
    'process.s3.t': 'Vet',
    'process.s3.d': 'Each candidate is screened for skill, experience, and fit.',
    'process.s4.t': 'Deploy',
    'process.s4.d': 'Your new professionals integrate and contribute from day one.',

    'hero.k1': 'IT-Focused',
    'hero.k2': 'Fast Placement',
    'hero.k3': 'Vetted Talent',

    'stats.tag': 'By the Numbers',
    'stats.title': 'Momentum you can measure',
    'stats.1': 'Vetted Professionals',
    'stats.1v': '500',
    'stats.1s': '+',
    'stats.2': 'Partner Companies',
    'stats.2v': '40',
    'stats.2s': '+',
    'stats.3': 'Avg. Response (hrs)',
    'stats.3v': '48',
    'stats.3s': 'h',
    'stats.4': 'Placement Focus',
    'stats.4v': '100',
    'stats.4s': '%',

    'logos.tag': 'Who We Serve',
    'logos.title': 'Trusted across the IT landscape',
    'logos.subtitle': 'We supply talent to technology companies of every size — from fast-moving startups to enterprise system integrators.',
    'logos.i1': 'Software Houses',
    'logos.i2': 'System Integrators',
    'logos.i3': 'Managed Service Providers',
    'logos.i4': 'Cloud & Hosting',
    'logos.i5': 'Fintech',
    'logos.i6': 'Telecom',
    'logos.i7': 'Consultancies',
    'logos.i8': 'Startups',

    'faq.tag': 'Questions',
    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What kind of IT professionals do you provide?',
    'faq.a1': 'Developers, system administrators, network and infrastructure engineers, DevOps/cloud specialists, QA, and technical support — across junior to senior levels, matched to your stack and requirements.',
    'faq.q2': 'How fast can you place someone?',
    'faq.a2': 'For common profiles we typically present a vetted shortlist within 48 hours. Specialized or senior roles may take a little longer, and we keep you updated throughout.',
    'faq.q3': 'What engagement models do you offer?',
    'faq.a3': 'Contract, project-based, and long-term placement. You can scale a single specialist or an entire project team up or down as your demand changes.',
    'faq.q4': 'Which regions do you cover?',
    'faq.a4': 'We are based in Riyadh and serve companies across the Kingdom of Saudi Arabia, with the flexibility to support remote and on-site arrangements.',
    'faq.q5': 'Will you expand beyond manpower services?',
    'faq.a5': 'Yes. IT manpower is our focus today, and we are actively growing toward a broader range of IT services — managed solutions, consulting, and more.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.why': 'لماذا ألف',
    'nav.contact': 'اتصل بنا',
    'nav.cta': 'تواصل معنا',

    'hero.badge': 'حلول الكوادر التقنية',
    'hero.title': 'الكفاءات المناسبة، لتشغيل التقنية المناسبة.',
    'hero.subtitle':
      'توفّر ألف لأنظمة المعلومات كوادر تقنية متخصصة لشركات تقنية المعلومات — نربط المحترفين المهرة بالمؤسسات التي تحتاجهم، في الوقت المناسب تمامًا.',
    'hero.ctaPrimary': 'استكشف خدماتنا',
    'hero.ctaSecondary': 'تحدث إلينا',
    'hero.scroll': 'مرّر للأسفل',

    'about.tag': 'من نحن',
    'about.title': 'بُنينا على الحرف الأول — أساس كل شيء.',
    'about.p1':
      'الألف — أول حرف في اللغة العربية — يمثّل البداية والأساس والمعيار. في ألف لأنظمة المعلومات، نبني هذا الأساس لشركات التقنية عبر توفير المورد الأهم لنجاحها: الكوادر المناسبة.',
    'about.p2':
      'نحن شركة خدمات تقنية معلومات متخصصة في توفير الكوادر التقنية. نبحث عن المحترفين المهرة ونقيّمهم ونوظّفهم لدى شركات تقنية المعلومات، مما يمنحها المرونة لتوسيع فرقها دون أعباء التوظيف التقليدي.',
    'about.stat1': 'كوادر تقنية مؤهلة',
    'about.stat2': 'سرعة الاستجابة',
    'about.stat3': 'تركيز على التقنية',
    'about.stat1v': '+٥٠٠',
    'about.stat2v': 'أقل من ٤٨ ساعة',
    'about.stat3v': '١٠٠٪ تقنية',

    'mv.missionTitle': 'رسالتنا',
    'mv.mission':
      'تمكين شركات تقنية المعلومات بكوادر موثوقة وماهرة وجاهزة للعمل — وإزالة الحاجز بين احتياج العمل والشخص القادر على تلبيته.',
    'mv.visionTitle': 'رؤيتنا',
    'mv.vision':
      'أن نصبح الشريك الأكثر ثقة في المنطقة لتوفير الكفاءات التقنية، وأن نتوسّع لنصبح مزوّدًا متكاملًا لخدمات تقنية المعلومات يدعم عملاءنا في كل مرحلة.',

    'services.tag': 'ماذا نقدّم',
    'services.title': 'خدماتنا',
    'services.subtitle':
      'نركّز اليوم على إتقان شيء واحد بامتياز — مع خارطة طريق واضحة للمزيد غدًا.',
    'services.s1.title': 'توفير الكوادر التقنية',
    'services.s1.desc':
      'كوادر تقنية ماهرة ومُقيّمة مسبقًا تُوظَّف لدى شركات التقنية بشروط مرنة — من المتخصصين الأفراد إلى فرق المشاريع الكاملة.',
    'services.s2.title': 'كفاءات تقنية متخصصة',
    'services.s2.desc':
      'مطوّرون، ومديرو أنظمة، ومهندسو شبكات، وأخصائيو دعم فني وغيرهم — مطابقون بدقة لمتطلباتكم التقنية.',
    'services.s3.title': 'نماذج توظيف مرنة',
    'services.s3.desc':
      'عقود، أو حسب المشروع، أو توظيف طويل الأمد. وسّع فريقك أو قلّصه بما يناسب الطلب دون أعباء التوظيف.',
    'services.s4.title': 'تقييم دقيق',
    'services.s4.desc':
      'يُقيَّم كل محترف من حيث المهارة التقنية والخبرة والملاءمة — لتصلك كفاءات جاهزة للعطاء من اليوم الأول.',
    'services.soon.tag': 'قريبًا',
    'services.soon.title': 'خدمات جديدة في الطريق',
    'services.soon.desc':
      'الكوادر هي نقطة انطلاقنا. ونتوسّع نحو مجموعة متكاملة من خدمات تقنية المعلومات — حلول مُدارة واستشارات وأكثر — لدعم عملائنا في كل مرحلة.',

    'why.tag': 'لماذا نحن',
    'why.title': 'لماذا تختار الشركات ألف',
    'why.w1.title': 'السرعة',
    'why.w1.desc': 'كفاءات مؤهلة خلال أيام، لا أسابيع.',
    'why.w2.title': 'الجودة',
    'why.w2.desc': 'قاعدة كفاءات مُقيّمة بدقة تستحق ثقتك.',
    'why.w3.title': 'المرونة',
    'why.w3.desc': 'نماذج توظيف تتكيّف مع احتياجات عملك.',
    'why.w4.title': 'متخصصون في التقنية',
    'why.w4.desc': 'نفهم الأدوار التقنية لأنها كل ما نعمل عليه.',

    'cta.title': 'جاهز لبناء فريقك؟',
    'cta.subtitle':
      'أخبرنا بما تحتاج وسنربطك بالكوادر التقنية المناسبة — بسرعة.',
    'cta.button': 'اتصل بنا',

    'contact.hero.tag': 'تواصل معنا',
    'contact.hero.title': 'لنتحدث عن احتياجاتك من الكوادر',
    'contact.hero.subtitle':
      'تواصل معنا وسيعاود فريقنا الرد عليك خلال يوم عمل واحد.',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.namePh': 'اسمك',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.emailPh': 'you@company.com',
    'contact.form.company': 'الشركة',
    'contact.form.companyPh': 'اسم شركتك',
    'contact.form.phone': 'الهاتف',
    'contact.form.phonePh': '+966 5X XXX XXXX',
    'contact.form.subject': 'الموضوع',
    'contact.form.subjectPh': 'كيف يمكننا المساعدة؟',
    'contact.form.message': 'الرسالة',
    'contact.form.messagePh': 'أخبرنا عن متطلباتك…',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.sending': 'جارٍ الإرسال…',
    'contact.form.success': 'شكرًا لك! تم إرسال رسالتك وسنتواصل معك قريبًا.',
    'contact.form.errRequired': 'الرجاء تعبئة جميع الحقول المطلوبة.',
    'contact.form.errEmail': 'الرجاء إدخال بريد إلكتروني صحيح.',

    'contact.info.title': 'معلومات التواصل',
    'contact.info.addressLabel': 'المكتب',
    'contact.info.address': 'الرياض، المملكة العربية السعودية',
    'contact.info.phoneLabel': 'الهاتف',
    'contact.info.emailLabel': 'البريد الإلكتروني',
    'contact.info.hoursLabel': 'ساعات العمل',
    'contact.info.hours': 'الأحد – الخميس، ٩:٠٠ ص – ٦:٠٠ م',
    'contact.map.title': 'موقعنا',
    'contact.back': 'العودة للرئيسية',

    'footer.tagline': 'الكفاءات المناسبة، لتشغيل التقنية المناسبة.',
    'footer.quick': 'روابط سريعة',
    'footer.services': 'الخدمات',
    'footer.contact': 'تواصل',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.madeIn': 'الرياض، المملكة العربية السعودية',
    'footer.office': 'المكتب',
    'footer.company': 'الشركة',
    'footer.solutions': 'الحلول',
    'footer.addrCountry': 'المملكة العربية السعودية',
    'footer.addrLine': 'الرياض، المملكة العربية السعودية',
    'footer.phoneLabel': 'هاتف:',
    'footer.col.about': 'من نحن',
    'footer.col.why': 'لماذا ألف',
    'footer.col.contact': 'اتصل بنا',
    'footer.sol.manpower': 'توفير الكوادر التقنية',
    'footer.sol.talent': 'كفاءات متخصصة',
    'footer.sol.staffing': 'توظيف مرن',
    'footer.sol.vetting': 'تقييم دقيق',
    'footer.follow': 'تابعنا',

    'articles.tag': 'مقالات',
    'articles.title': 'أحدث المقالات والرؤى',
    'articles.subtitle': 'رؤى حول الكوادر التقنية والتوظيف وقطاع التقنية.',
    'articles.readMore': 'اقرأ المقال',
    'articles.empty': 'لا توجد مقالات منشورة بعد — تابعنا قريبًا.',
    'articles.back': 'العودة إلى كل المقالات',
    'articles.by': 'بقلم',
    'articles.minRead': 'دقائق قراءة',

    'admin.title': 'استوديو المقالات',
    'admin.subtitle': 'إنشاء وتحرير ونشر المقالات.',
    'admin.lock.title': 'منطقة محظورة',
    'admin.lock.prompt': 'أدخل كلمة المرور للمتابعة.',
    'admin.lock.placeholder': 'كلمة المرور',
    'admin.lock.enter': 'فتح',
    'admin.lock.wrong': 'كلمة المرور غير صحيحة.',
    'admin.lock.logout': 'قفل',
    'admin.new': 'مقال جديد',
    'admin.edit': 'تحرير',
    'admin.delete': 'حذف',
    'admin.publish': 'منشور',
    'admin.draft': 'مسودة',
    'admin.list.title': 'مقالاتك',
    'admin.list.empty': 'لا توجد مقالات بعد. أنشئ أول مقال.',
    'admin.f.title': 'عنوان المقال',
    'admin.f.titlePh': 'أدخل عنوانًا…',
    'admin.f.author': 'الكاتب',
    'admin.f.authorPh': 'اسم الكاتب',
    'admin.f.excerpt': 'ملخص قصير',
    'admin.f.excerptPh': 'جملة أو جملتان تظهران في قائمة المقالات…',
    'admin.f.cover': 'رابط صورة الغلاف (اختياري)',
    'admin.f.coverPh': 'https://… أو ارفع صورة بالأسفل',
    'admin.f.coverUpload': 'رفع صورة الغلاف',
    'admin.f.body': 'محتوى المقال',
    'admin.f.published': 'منشور (ظاهر على الموقع)',
    'admin.save': 'حفظ المقال',
    'admin.saving': 'جارٍ الحفظ…',
    'admin.saved': 'تم الحفظ!',
    'admin.cancel': 'إلغاء',
    'admin.confirmDelete': 'حذف هذا المقال نهائيًا؟',
    'admin.tb.bold': 'عريض',
    'admin.tb.italic': 'مائل',
    'admin.tb.underline': 'تسطير',
    'admin.tb.h1': 'عنوان',
    'admin.tb.h2': 'عنوان فرعي',
    'admin.tb.quote': 'اقتباس',
    'admin.tb.ul': 'قائمة نقطية',
    'admin.tb.ol': 'قائمة رقمية',
    'admin.tb.link': 'إدراج رابط',
    'admin.tb.imgUrl': 'صورة برابط',
    'admin.tb.imgUpload': 'رفع صورة',
    'admin.tb.align': 'محاذاة',
    'admin.tb.clear': 'مسح التنسيق',
    'admin.err.title': 'الرجاء إضافة عنوان قبل الحفظ.',

    'marquee.1': 'كوادر تقنية',
    'marquee.2': 'مطوّرون',
    'marquee.3': 'مديرو أنظمة',
    'marquee.4': 'مهندسو شبكات',
    'marquee.5': 'أخصائيو دعم',
    'marquee.6': 'سحابة وDevOps',
    'marquee.7': 'فرق مشاريع',

    'process.tag': 'كيف نعمل',
    'process.title': 'من الاحتياج إلى الكادر — في أربع خطوات',
    'process.s1.t': 'نفهم',
    'process.s1.d': 'ندرس احتياجاتك التقنية وثقافة فريقك والجدول الزمني بعمق.',
    'process.s2.t': 'نبحث',
    'process.s2.d': 'نستعين بقاعدة كفاءاتنا المُقيّمة لاختيار أقوى المرشحين.',
    'process.s3.t': 'نُقيّم',
    'process.s3.d': 'يُفحَص كل مرشح من حيث المهارة والخبرة والملاءمة.',
    'process.s4.t': 'نوظّف',
    'process.s4.d': 'ينضم المحترفون الجدد ويبدؤون العطاء من اليوم الأول.',

    'hero.k1': 'متخصصون في التقنية',
    'hero.k2': 'توظيف سريع',
    'hero.k3': 'كفاءات مُقيّمة',

    'stats.tag': 'بالأرقام',
    'stats.title': 'زخمٌ يمكن قياسه',
    'stats.1': 'كوادر مُقيّمة',
    'stats.1v': '٥٠٠',
    'stats.1s': '+',
    'stats.2': 'شركات شريكة',
    'stats.2v': '٤٠',
    'stats.2s': '+',
    'stats.3': 'متوسط الاستجابة (ساعة)',
    'stats.3v': '٤٨',
    'stats.3s': 'س',
    'stats.4': 'تركيز على التقنية',
    'stats.4v': '١٠٠',
    'stats.4s': '٪',

    'logos.tag': 'من نخدم',
    'logos.title': 'موثوقون في قطاع التقنية',
    'logos.subtitle': 'نوفّر الكوادر لشركات التقنية بمختلف أحجامها — من الشركات الناشئة سريعة النمو إلى مُكاملي الأنظمة الكبار.',
    'logos.i1': 'شركات البرمجيات',
    'logos.i2': 'مُكاملو الأنظمة',
    'logos.i3': 'مزوّدو الخدمات المُدارة',
    'logos.i4': 'السحابة والاستضافة',
    'logos.i5': 'التقنية المالية',
    'logos.i6': 'الاتصالات',
    'logos.i7': 'الاستشارات',
    'logos.i8': 'الشركات الناشئة',

    'faq.tag': 'أسئلة',
    'faq.title': 'الأسئلة الشائعة',
    'faq.q1': 'ما نوع الكوادر التقنية التي توفّرونها؟',
    'faq.a1': 'مطوّرون، ومديرو أنظمة، ومهندسو شبكات وبنية تحتية، ومتخصصو DevOps والسحابة، وضمان الجودة، والدعم الفني — من المستوى المبتدئ إلى الخبير، بما يناسب تقنياتكم ومتطلباتكم.',
    'faq.q2': 'ما مدى سرعة توفير الكادر؟',
    'faq.a2': 'للملفات الشائعة نقدّم عادةً قائمة مرشحين مُقيّمة خلال ٤٨ ساعة. وقد تحتاج الأدوار المتخصصة أو العليا وقتًا أطول، ونبقيكم على اطّلاع دائم.',
    'faq.q3': 'ما نماذج التعاقد التي تقدّمونها؟',
    'faq.a3': 'عقود، وحسب المشروع، وتوظيف طويل الأمد. يمكنكم توسيع كادر فردي أو فريق مشروع كامل أو تقليصه حسب الطلب.',
    'faq.q4': 'ما المناطق التي تغطّونها؟',
    'faq.a4': 'مقرّنا في الرياض ونخدم الشركات في جميع أنحاء المملكة العربية السعودية، مع مرونة لدعم الترتيبات عن بُعد وفي الموقع.',
    'faq.q5': 'هل ستتوسّعون خارج خدمات الكوادر؟',
    'faq.a5': 'نعم. الكوادر التقنية هي تركيزنا اليوم، ونتوسّع بنشاط نحو نطاق أوسع من خدمات تقنية المعلومات — حلول مُدارة واستشارات وأكثر.',

    'lang.switch': 'English',
  },
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // DEFAULT LANGUAGE: 'ar' makes the site open in Arabic (RTL). Change to 'en'
  // to open in English (LTR). This is the single switch for the first-load language.
  const [lang, setLangState] = useState<Lang>('ar');
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  // Keep the <html> element's lang/dir in sync so the browser lays the whole
  // page out right-to-left for Arabic and left-to-right for English.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'en' ? 'ar' : 'en'));
  // t('some.key') returns the string for the current language (falls back to the
  // key itself if a translation is missing — handy for spotting typos).
  const t = (key: string) => dict[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, dir, t, setLang, toggle }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
