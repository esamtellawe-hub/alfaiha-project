const FooterSection = require('../models/FooterSection');

const seedFooterSections = async () => {
  const sections = [
    {
      section_key: 'footer_desc',
      content_en: 'Your trusted partner for advanced construction chemicals and engineering solutions across the MENA region since 1987.',
      content_ar: 'شريكك الموثوق لكيميائيات البناء المتقدمة والحلول الهندسية في منطقة الشرق الأوسط وشمال أفريقيا منذ عام 1987.',
      content_fr: 'Votre partenaire de confiance pour les produits chimiques de construction avancés et les solutions d\'ingénierie dans la région MENA depuis 1987.',
    },
    {
      section_key: 'footer_media_col',
      content_en: 'Media & Careers',
      content_ar: 'الإعلام والوظائف',
      content_fr: 'Médias et Carrières',
    },
    {
      section_key: 'footer_offices_col',
      content_en: 'Our Offices',
      content_ar: 'مكاتبنا',
      content_fr: 'Nos Bureaux',
    },
    {
      section_key: 'footer_view_all',
      content_en: 'View All Locations',
      content_ar: 'عرض جميع الفروع',
      content_fr: 'Voir tous les emplacements',
    },
    {
      section_key: 'footer_inquiry_title',
      content_en: 'Quick Inquiry',
      content_ar: 'استفسار سريع',
      content_fr: 'Demande Rapide',
    },
    {
      section_key: 'footer_name_placeholder',
      content_en: 'Your Name',
      content_ar: 'الاسم',
      content_fr: 'Votre Nom',
    },
    {
      section_key: 'footer_sector_placeholder',
      content_en: 'Select Solution / Sector',
      content_ar: 'اختر الحل / القطاع',
      content_fr: 'Sélectionner une Solution / Secteur',
    },
    {
      section_key: 'footer_send_btn',
      content_en: 'Send Inquiry',
      content_ar: 'إرسال الاستفسار',
      content_fr: 'Envoyer la demande',
    },
    {
      section_key: 'footer_newsletter_title',
      content_en: 'Subscribe to Newsletter',
      content_ar: 'اشترك في النشرة البريدية',
      content_fr: 'Abonnez-vous à la Newsletter',
    },
    {
      section_key: 'footer_email_placeholder',
      content_en: 'Email Address',
      content_ar: 'البريد الإلكتروني',
      content_fr: 'Adresse Email',
    },
    {
      section_key: 'footer_copyright',
      content_en: 'Al Faiha Group. All rights reserved. Powered by',
      content_ar: 'مجموعة الفيحاء. جميع الحقوق محفوظة. تطوير بواسطة',
      content_fr: 'Al Faiha Group. Tous droits réservés. Propulsé par',
    }
  ];

  try {
    for (const section of sections) {
      await FooterSection.upsert(section);
    }
    console.log('✅ FooterSections Default Data Seeded.');
  } catch (error) {
    console.error('❌ Error seeding FooterSections:', error);
  }
};

module.exports = seedFooterSections;
