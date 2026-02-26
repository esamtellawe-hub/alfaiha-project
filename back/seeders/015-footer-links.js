require('dotenv').config();
const sequelize = require('../config/database');
const FooterLink = require('../models/FooterLink');

const seedFooterLinks = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database. Seeding Footer Links...');
    
    // Hardcoding some standard links as default
    const links = [
      {
        column_name: 'media',
        label_en: 'News & Press Releases',
        label_ar: 'الأخبار والبيانات الصحفية',
        label_fr: 'Actualités et communiqués de presse',
        url: '/news',
        order: 1
      },
      {
        column_name: 'media',
        label_en: 'Our Blogs',
        label_ar: 'مدوناتنا',
        label_fr: 'Nos blogs',
        url: '/blog',
        order: 2
      },
      {
        column_name: 'media',
        label_en: 'Company Profile',
        label_ar: 'ملف الشركة',
        label_fr: 'Profil de l\'entreprise',
        url: '/about',
        order: 3
      },
      {
        column_name: 'media',
        label_en: 'Job Descriptions',
        label_ar: 'الوظائف المتاحة',
        label_fr: 'Descriptions de poste',
        url: '/careers',
        order: 4
      },
      {
        column_name: 'media',
        label_en: 'Application Form',
        label_ar: 'نموذج التقديم',
        label_fr: 'Formulaire de candidature',
        url: '/application-form',
        order: 5
      }
    ];

    for (const link of links) {
      await FooterLink.findOrCreate({
        where: { column_name: link.column_name, url: link.url },
        defaults: link
      });
    }
    
    console.log('✅ Footer Links data seeded successfully.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding Footer Links:', error);
    process.exit(1);
  }
};

seedFooterLinks();
