require('dotenv').config();
const sequelize = require('../config/database');
const BlogPost = require('../models/BlogPost');

const seedBlogs = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const count = await BlogPost.count();
    if (count > 0) {
      console.log('ℹ️  Blog posts already exist. Skipping seed.');
      process.exit(0);
    }

    await BlogPost.bulkCreate([
      {
        slug: 'sustainable-construction-future',
        title_en: 'Sustainable Construction: The Future of Building',
        title_ar: 'البناء المستدام: مستقبل التشييد',
        title_fr: 'Construction Durable: L\'Avenir du Bâtiment',
        excerpt_en: 'Exploring how modern construction chemicals are reducing carbon footprints and enabling greener infrastructure across the Middle East.',
        excerpt_ar: 'استكشاف كيف تُقلل كيماويات البناء الحديثة من البصمة الكربونية وتُمكّن البنية التحتية الأكثر خضرة في الشرق الأوسط.',
        excerpt_fr: 'Explorer comment les produits chimiques de construction modernes réduisent les empreintes carbone.',
        content_en: 'Full article content here...',
        content_ar: 'محتوى المقال الكامل هنا...',
        content_fr: 'Contenu complet de l\'article ici...',
        image_url: '/images/mock ups paper.png',
        category_en: 'Sustainability',
        category_ar: 'الاستدامة',
        category_fr: 'Durabilité',
        author: 'Dr. Ahmad Al-Sayed',
        read_time: '5 min read',
        publish_date: '2025-03-15',
        is_published: true
      },
      {
        slug: 'innovations-waterproofing-technology',
        title_en: 'Innovations in Waterproofing Technology',
        title_ar: 'الابتكارات في تقنيات العزل المائي',
        title_fr: 'Innovations en Technologie d\'Imperméabilisation',
        excerpt_en: 'A deep dive into the latest crystalline waterproofing systems and how they provide self-healing properties to concrete structures.',
        excerpt_ar: 'غوص عميق في أحدث أنظمة العزل الكريستالي وكيف توفر خصائص إصلاح ذاتي للهياكل الخرسانية.',
        excerpt_fr: 'Une plongée profonde dans les derniers systèmes d\'imperméabilisation cristalline.',
        content_en: 'Full article content here...',
        content_ar: 'محتوى المقال الكامل هنا...',
        content_fr: 'Contenu complet de l\'article ici...',
        image_url: '/images/mock ups paper.png',
        category_en: 'Technology',
        category_ar: 'التكنولوجيا',
        category_fr: 'Technologie',
        author: 'Sarah Jaber',
        read_time: '7 min read',
        publish_date: '2025-02-28',
        is_published: true
      },
      {
        slug: 'admixtures-high-rise-buildings',
        title_en: 'The Critical Role of Admixtures in High-Rise Buildings',
        title_ar: 'الدور الحيوي للمضافات في المباني الشاهقة',
        title_fr: 'Le Rôle Critique des Adjuvants dans les Gratte-Ciel',
        excerpt_en: 'How superplasticizers and retarders enable pumping concrete to record-breaking heights in modern skyscrapers.',
        excerpt_ar: 'كيف تُمكّن فائقة اللدونة وعوامل التأخير من ضخ الخرسانة إلى ارتفاعات قياسية في ناطحات السحاب الحديثة.',
        excerpt_fr: 'Comment les superplastifiants et retardateurs permettent de pomper le béton à des hauteurs record.',
        content_en: 'Full article content here...',
        content_ar: 'محتوى المقال الكامل هنا...',
        content_fr: 'Contenu complet de l\'article ici...',
        image_url: '/images/mock ups paper.png',
        category_en: 'Technical',
        category_ar: 'تقني',
        category_fr: 'Technique',
        author: 'Eng. Rami Khoury',
        read_time: '6 min read',
        publish_date: '2025-01-22',
        is_published: true
      },
      {
        slug: 'epoxies-vs-polyurethanes-flooring',
        title_en: 'Mastering Industrial Flooring: Epoxies vs. Polyurethanes',
        title_ar: 'إتقان الأرضيات الصناعية: الإيبوكسي مقابل البولي يوريثان',
        title_fr: 'Maîtriser les Revêtements Industriels: Époxy vs Polyuréthane',
        excerpt_en: 'Choosing the right flooring system for your facility: A comprehensive guide to durability, chemical resistance, and aesthetics.',
        excerpt_ar: 'اختيار نظام الأرضيات المناسب لمنشأتك: دليل شامل للمتانة ومقاومة المواد الكيميائية والجماليات.',
        excerpt_fr: 'Choisir le bon système de revêtement de sol pour votre installation.',
        content_en: 'Full article content here...',
        content_ar: 'محتوى المقال الكامل هنا...',
        content_fr: 'Contenu complet de l\'article ici...',
        image_url: '/images/mock ups paper.png',
        category_en: 'Guide',
        category_ar: 'دليل',
        category_fr: 'Guide',
        author: 'Technical Support',
        read_time: '8 min read',
        publish_date: '2025-01-05',
        is_published: true
      },
      {
        slug: 'concrete-durability-harsh-climates',
        title_en: 'Understanding Concrete Durability in Harsh Climates',
        title_ar: 'فهم متانة الخرسانة في المناخات القاسية',
        title_fr: 'Comprendre la Durabilité du Béton dans les Climats Difficiles',
        excerpt_en: 'Strategies for protecting concrete structures from chloride attack and carbonation in the Gulf\'s aggressive environment.',
        excerpt_ar: 'استراتيجيات لحماية الهياكل الخرسانية من هجوم الكلوريد والكربنة في البيئة العدوانية للخليج.',
        excerpt_fr: 'Stratégies pour protéger les structures en béton de l\'attaque par les chlorures.',
        content_en: 'Full article content here...',
        content_ar: 'محتوى المقال الكامل هنا...',
        content_fr: 'Contenu complet de l\'article ici...',
        image_url: '/images/mock ups paper.png',
        category_en: 'Research',
        category_ar: 'أبحاث',
        category_fr: 'Recherche',
        author: 'Research Lab',
        read_time: '10 min read',
        publish_date: '2024-12-18',
        is_published: true
      }
    ]);

    console.log('✅ Blog posts seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error.message);
    process.exit(1);
  }
};

seedBlogs();
