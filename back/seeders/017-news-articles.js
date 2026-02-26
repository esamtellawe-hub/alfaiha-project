require('dotenv').config();
const sequelize = require('../config/database');
const NewsArticle = require('../models/NewsArticle');

const seedNews = async () => {
  try {
    await sequelize.authenticate();
    
    const count = await NewsArticle.count();
    if (count > 0) {
      console.log('ℹ️  News articles already exist. Skipping seed.');
      process.exit(0);
    }

    await NewsArticle.bulkCreate([
      {
        slug: 'iso-14001-certification',
        title_en: 'Al Faiha Group Receives ISO 14001 Certification for Environmental Management',
        title_ar: 'مجموعة الفيحاء تحصل على شهادة ISO 14001 لإدارة البيئة',
        title_fr: 'Al Faiha Group reçoit la certification ISO 14001 pour la gestion environnementale',
        content_en: 'This prestigious certification underscores our commitment to sustainable manufacturing practices and reducing our environmental footprint across all production facilities.',
        content_ar: 'تؤكد هذه الشهادة المرموقة التزامنا بممارسات التصنيع المستدامة والحد من بصمتنا البيئية في جميع مرافق الإنتاج.',
        content_fr: 'Cette prestigieuse certification souligne notre engagement envers des pratiques de fabrication durables.',
        image_url: '/images/mock ups paper.png',
        publish_date: '2025-03-10',
        author: 'Admin',
        is_published: true
      },
      {
        slug: 'new-admixtures-plant-saudi-arabia',
        title_en: 'Grand Opening of New Admixtures Plant in Saudi Arabia',
        title_ar: 'الافتتاح الكبير لمصنع المضافات الجديد في المملكة العربية السعودية',
        title_fr: 'Grande ouverture d\'une nouvelle usine d\'adjuvants en Arabie Saoudite',
        content_en: 'Expanding our regional presence to better serve the growing Saudi construction market with locally manufactured, high-performance concrete solutions.',
        content_ar: 'توسيع حضورنا الإقليمي لخدمة سوق البناء السعودي المتنامي بحلول خرسانية عالية الأداء.',
        content_fr: 'Expansion de notre présence régionale pour mieux servir le marché de la construction saoudien.',
        image_url: '/images/mock ups paper.png',
        publish_date: '2025-02-15',
        author: 'Admin',
        is_published: true
      },
      {
        slug: 'strategic-partnership-cement-leader',
        title_en: 'Strategic Partnership Announced with Global Cement Leader',
        title_ar: 'إعلان شراكة استراتيجية مع شركة إسمنت عالمية رائدة',
        title_fr: 'Partenariat stratégique annoncé avec un leader mondial du ciment',
        content_en: 'A new joint venture aimed at developing next-generation additives for ultra-high-performance concrete applications.',
        content_ar: 'مشروع مشترك جديد يهدف إلى تطوير مضافات الجيل القادم لتطبيقات الخرسانة عالية الأداء.',
        content_fr: 'Une nouvelle coentreprise visant à développer des additifs de nouvelle génération pour béton à ultra-haute performance.',
        image_url: '/images/mock ups paper.png',
        publish_date: '2025-01-20',
        author: 'Admin',
        is_published: true
      },
      {
        slug: 'big5-dubai-2024',
        title_en: 'Al Faiha Participation in Big 5 Construct - Dubai 2024',
        title_ar: 'مشاركة الفيحاء في معرض Big 5 للبناء - دبي 2024',
        title_fr: 'Participation d\'Al Faiha au Big 5 Construct - Dubaï 2024',
        content_en: 'Join us at the region\'s largest construction event, where we will be showcasing our latest innovations in waterproofing and flooring systems.',
        content_ar: 'انضم إلينا في أكبر فعالية للبناء في المنطقة حيث نعرض أحدث ابتكاراتنا في أنظمة العزل والأرضيات.',
        content_fr: 'Rejoignez-nous au plus grand événement de construction de la région pour découvrir nos dernières innovations.',
        image_url: '/images/mock ups paper.png',
        publish_date: '2024-12-05',
        author: 'Admin',
        is_published: true
      },
      {
        slug: 'greencrete-launch',
        title_en: 'Launch of GreenCrete: Our New Eco-Friendly Product Line',
        title_ar: 'إطلاق GreenCrete: خطنا الجديد من المنتجات الصديقة للبيئة',
        title_fr: 'Lancement de GreenCrete: Notre nouvelle gamme de produits éco-responsables',
        content_en: 'Introducing a new range of carbon-reducing admixtures designed to meet the demands of sustainable building certifications like LEED and BREEAM.',
        content_ar: 'تقديم مجموعة جديدة من المضافات لتقليل الكربون مصممة لتلبية متطلبات شهادات البناء المستدام.',
        content_fr: 'Présentation d\'une nouvelle gamme d\'adjuvants réducteurs de carbone pour les certifications de construction durable.',
        image_url: '/images/mock ups paper.png',
        publish_date: '2024-11-12',
        author: 'Admin',
        is_published: true
      }
    ]);

    console.log('✅ News Articles seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news:', error.message);
    process.exit(1);
  }
};

seedNews();
