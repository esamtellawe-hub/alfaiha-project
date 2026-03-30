const BlogPost = require('./models/BlogPost');
const sequelize = require('./config/database');

async function createTestBlog() {
  try {
    await sequelize.authenticate();
    const [blog, created] = await BlogPost.findOrCreate({
      where: { slug: 'test-sustainable-construction' },
      defaults: {
        title_en: 'Sustainable Construction in 2024',
        title_ar: 'البناء المستدام في عام 2024',
        title_fr: 'Construction durable en 2024',
        excerpt_en: 'Exploring the latest trends in eco-friendly building materials and techniques.',
        excerpt_ar: 'استكشاف أحدث الاتجاهات في مواد وتقنيات البناء الصديقة للبيئة.',
        excerpt_fr: 'Explorer les dernières tendances en matière de matériaux et de techniques de construction écologiques.',
        content_en: 'Full content about sustainable construction...',
        content_ar: 'محتوى كامل عن البناء المستدام...',
        content_fr: 'Contenu complet sur la construction durable...',
        category_en: 'Sustainability',
        category_ar: 'الاستدامة',
        category_fr: 'Durabilité',
        author: 'Expert Team',
        read_time: '5 min read',
        is_published: true,
        publish_date: new Date().toISOString().split('T')[0],
        image_url: 'https://images.unsplash.com/photo-1518005020251-58296b8646f1?auto=format&fit=crop&q=80&w=800'
      }
    });

    if (created) {
      console.log('✅ Test blog post created!');
    } else {
      console.log('ℹ️ Test blog post already exists.');
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating test blog:', err);
    process.exit(1);
  }
}

createTestBlog();
