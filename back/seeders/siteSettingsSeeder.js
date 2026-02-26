const SiteSetting = require('../models/SiteSetting');
const RegionalOffice = require('../models/RegionalOffice');

const seedSiteSettings = async () => {
  try {
    // 1. Seed Basic Settings
    const defaultSettings = [
      { key: 'site_title', value: 'AlFaiha Engineering Products', type: 'text' },
      { key: 'contact_email', value: 'info@alfaiha.com', type: 'text' },
      { key: 'contact_phone', value: '+962 6 123 4567', type: 'text' },
      { key: 'facebook_url', value: 'https://facebook.com/alfaiha', type: 'link' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/alfaiha', type: 'link' },
      { key: 'instagram_url', value: 'https://instagram.com/alfaiha', type: 'link' },
      { key: 'logo_url', value: '/assets/logo.png', type: 'image' },
    ];

    for (const setting of defaultSettings) {
      await SiteSetting.findOrCreate({
        where: { key: setting.key },
        defaults: setting
      });
    }
    console.log('✅ Site Settings seeded.');

    // 2. Seed Regional Offices
    const officesCount = await RegionalOffice.count();
    if (officesCount === 0) {
      await RegionalOffice.bulkCreate([
        {
          country_name_en: 'Jordan',
          country_name_ar: 'الأردن',
          country_name_fr: 'Jordanie',
          country_code: 'jo',
          phone: '+962 6 123 4567',
          email: 'jordan@alfaiha.com'
        },
        {
          country_name_en: 'Saudi Arabia',
          country_name_ar: 'السعودية',
          country_name_fr: 'Arabie Saoudite',
          country_code: 'sa',
          phone: '+966 11 123 4567',
          email: 'ksa@alfaiha.com'
        },
        {
          country_name_en: 'Iraq',
          country_name_ar: 'العراق',
          country_name_fr: 'Irak',
          country_code: 'iq',
          phone: '+964 7 123 4567',
          email: 'iraq@alfaiha.com'
        }
      ]);
      console.log('✅ Regional Offices seeded.');
    } else {
        console.log('ℹ️  Regional Offices already exist. Skipping seed.');
    }

  } catch (error) {
    console.error('❌ Error seeding Site Settings:', error);
  }
};

module.exports = seedSiteSettings;
