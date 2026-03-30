const NewsSection = require('../models/NewsSection');

const seedNewsSections = async () => {
  const sections = [
    {
      section_key: 'hero',
      title_en: 'News & Press',
      title_ar: 'أخبار وصحافة',
      title_fr: 'Actualités & Presse',
      subtitle_en: 'Media Center',
      subtitle_ar: 'المركز الإعلامي',
      subtitle_fr: 'Centre Médias',
      description_en: 'Official announcements, company milestones, and the latest updates from Al Faiha Group.',
      description_ar: 'الإعلانات الرسمية وإنجازات الشركة وأحدث المستجدات من مجموعة الفيحاء.',
      description_fr: 'Annonces officielles, jalons de l\'entreprise et dernières actualités du Groupe Al Faiha.',
    }
  ];

  for (const info of sections) {
    const [section, created] = await NewsSection.findOrCreate({
      where: { section_key: info.section_key },
      defaults: info
    });
    if (!created) await section.update(info);
  }

  console.log('✅ News sections seeded!');
};

module.exports = seedNewsSections;
