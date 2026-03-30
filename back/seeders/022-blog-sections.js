const BlogSection = require('../models/BlogSection');

const seedBlogSections = async () => {
  const sections = [
    {
      section_key: 'hero',
      title_en: 'Latest from The Lab',
      title_ar: 'أحدث ما في المختبر',
      title_fr: 'Les Dernières du Labo',
      subtitle_en: 'Insights & Updates',
      subtitle_ar: 'رؤى وتحديثات',
      subtitle_fr: 'Analyses & Mises à jour',
      description_en: 'Discover the latest industry trends, technical insights, and company news from the experts at Al Faiha Group.',
      description_ar: 'اكتشف أحدث اتجاهات الصناعة والرؤى التقنية وأخبار الشركة من خبراء مجموعة الفيحاء.',
      description_fr: 'Découvrez les dernières tendances du secteur, les insights techniques et les actualités du Groupe Al Faiha.',
    },
    {
      section_key: 'newsletter',
      title_en: 'Stay Updated with Al Faiha',
      title_ar: 'ابقَ على اطلاع مع الفيحاء',
      title_fr: 'Restez Informé avec Al Faiha',
      subtitle_en: 'Subscribe',
      subtitle_ar: 'اشترك',
      subtitle_fr: 'S\'abonner',
      description_en: 'Subscribe to our newsletter to receive the latest technical insights, company news, and industry updates directly to your inbox.',
      description_ar: 'اشترك في نشرتنا الإخبارية لتلقي أحدث الرؤى التقنية وأخبار الشركة وتحديثات الصناعة مباشرة في صندوق الوارد.',
      description_fr: 'Abonnez-vous à notre newsletter pour recevoir les derniers insights techniques, actualités et mises à jour sectorielles directement dans votre boîte mail.',
    }
  ];

  for (const info of sections) {
    const [section, created] = await BlogSection.findOrCreate({
      where: { section_key: info.section_key },
      defaults: info
    });
    if (!created) await section.update(info);
  }

  console.log('✅ Blog sections seeded!');
};

module.exports = seedBlogSections;
