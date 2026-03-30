const express = require('express');
const Service = require('../models/Service');
const NewsArticle = require('../models/NewsArticle');
const BlogPost = require('../models/BlogPost');
const Job = require('../models/Job');
const HomeHero = require('../models/HomeHero');
const HomeSection = require('../models/HomeSection');
const Certification = require('../models/Certification');
const ServiceSection = require('../models/ServiceSection');
const SolutionSection = require('../models/SolutionSection');
const SectorSection = require('../models/SectorSection');
const ProjectSection = require('../models/ProjectSection');
const PartnerSection = require('../models/PartnerSection'); 
const AboutSection = require('../models/AboutSection');
const Category = require('../models/Category');
const Solution = require('../models/Solution');
const AcademySection = require('../models/AcademySection');
const SustainabilitySection = require('../models/SustainabilitySection');
const router = express.Router();


// --- HOME PAGE CMS ---
router.get('/home', async (req, res) => {
  try {
    const heroSlides = await HomeHero.findAll({
      where: { is_active: true },
      order: [['order', 'ASC']]
    });

    const sections = await HomeSection.findAll();
    
    const certifications = await Certification.findAll();

    // Organize sections into a key-value object for easy frontend accessing
    const sectionsObj = {};
    for (const sec of sections) {
      let parsedExtra = sec.extra_data;
      while (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) { break; }
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;

      // Populate featured products if this is the featured_products section
      if (sec.section_key === 'featured_products' && parsedExtra) {
        for (const lang of ['en', 'ar', 'fr']) {
          const key = `products_${lang}`;
          if (Array.isArray(parsedExtra[key])) {
            const populatedProducts = [];
            for (const item of parsedExtra[key]) {
              if (item.solution_id) {
                const sol = await Solution.findByPk(item.solution_id, {
                  include: [{ model: Category, as: 'category' }]
                });
                if (sol) {
                  populatedProducts.push({
                    name: sol[`name_${lang}`] || sol.name_en,
                    category: sol.category ? (sol.category[`name_${lang}`] || sol.category.name_en) : '',
                    image: sol.image_url,
                    description: sol[`description_${lang}`] || sol.description_en,
                    link: `/solutions?slug=${sol.slug}`,
                    solution_id: sol.id
                  });
                }
              }
            }
            parsedExtra[key] = populatedProducts;
          }
        }
      }

      sectionsObj[sec.section_key] = secData;
    }

    res.json({
      hero: heroSlides,
      sections: sectionsObj,
      certifications: certifications
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVICES PAGE CMS ---
router.get('/services-page', async (req, res) => {
  try {
    // 1. Fetch static sections (Hero, CTA, etc.)
    const sections = await ServiceSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      if (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) {}
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    // 2. Fetch the actual services grid items
    const services = await Service.findAll();
    // Services JSON arrays are already defined as JSON in DB, but we map them just in case
    const servicesData = services.map(srv => srv.toJSON ? srv.toJSON() : srv);

    res.json({
      sections: sectionsObj,
      services: servicesData
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SOLUTIONS PAGE CMS ---
router.get('/solutions-page', async (req, res) => {
  try {
    // 1. Fetch static sections (Hero, Search, Empty stats)
    const sections = await SolutionSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      if (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) {}
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    // 2. Fetch Categories tree (Top-level -> SubCategories -> Solutions)
    const topLevelCategories = await Category.findAll({
      where: { parent_id: null },
      include: [
        {
          model: Solution,
          as: 'solutions'
        },
        {
          model: Category,
          as: 'children',
          include: [{
            model: Solution,
            as: 'solutions'
          }]
        }
      ]
    });

    res.json({
      sections: sectionsObj,
      categories: topLevelCategories
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SECTORS PAGE CMS ---
router.get('/sectors-page', async (req, res) => {
  // We need the Sector model for the actual data
  const Sector = require('../models/Sector');
  const Area = require('../models/SectorArea');

  try {
    // 1. Fetch static sections (Hero, UI Labels, Search)
    const sections = await SectorSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      if (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) {}
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    // 2. Fetch Sectors tree (Sector -> Areas -> Categories -> Products(Solutions))
    const sectorsData = await Sector.findAll({
      include: [
        {
          model: Area,
          as: 'areas',
          include: [
            {
              model: Category,
              as: 'categories',
              through: { attributes: [] },
              include: [
                {
                  model: Solution,
                  as: 'solutions'
                }
              ]
            }
          ]
        }
      ]
    });

    res.json({
      sections: sectionsObj,
      sectors: sectorsData
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROJECTS PAGE CMS ---
router.get('/projects-page', async (req, res) => {
  const Project = require('../models/Project'); // Import actual projects

  try {
    // 1. Fetch static sections (Hero, Filter, Card)
    const sections = await ProjectSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      if (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) {}
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    // 2. Fetch Projects grid items
    const projects = await Project.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      sections: sectionsObj,
      projects: projects
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PARTNERS PAGE CMS ---
router.get('/partners-page', async (req, res) => {
  try {
    const sections = await PartnerSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      while (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) { break; }
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    res.json({ sections: sectionsObj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ABOUT US PAGE CMS ---
router.get('/about-page', async (req, res) => {
  try {
    const sections = await AboutSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      while (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) { break; }
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    res.json({
      sections: sectionsObj
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ACADEMY PAGE CMS ---
router.get('/academy-page', async (req, res) => {
  try {
    const sections = await AcademySection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => {
      let parsedExtra = sec.extra_data;
      while (typeof parsedExtra === 'string') {
        try { parsedExtra = JSON.parse(parsedExtra); } catch (e) { break; }
      }
      const secData = sec.toJSON ? sec.toJSON() : sec;
      secData.extra_data = parsedExtra;
      sectionsObj[sec.section_key] = secData;
    });

    res.json({
      sections: sectionsObj
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVICES ---
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/services/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ where: { slug: req.params.slug } });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- NEWS ---
router.get('/news', async (req, res) => {
  try {
    const news = await NewsArticle.findAll({
      where: { is_published: true },
      order: [['publish_date', 'DESC']]
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/news/:slug', async (req, res) => {
  try {
    const article = await NewsArticle.findOne({ where: { slug: req.params.slug } });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- JOBS ---
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { is_active: true },
      order: [['created_at', 'DESC']]
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- BLOGS ---
router.get('/blogs', async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      where: { is_published: true },
      order: [['publish_date', 'DESC']],
      attributes: ['id', 'slug', 'title_en', 'title_ar', 'title_fr',
        'excerpt_en', 'excerpt_ar', 'excerpt_fr',
        'category_en', 'category_ar', 'category_fr',
        'image_url', 'author', 'read_time', 'publish_date']
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/blogs/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ where: { slug: req.params.slug } });
    if (!post) return res.status(404).json({ error: 'Blog post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SUSTAINABILITY ---
router.get('/sustainability', async (req, res) => {
  try {
    const sections = await SustainabilitySection.findAll({
      where: { is_active: true },
      order: [['order', 'ASC']]
    });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- NEWS PAGE CMS ---
router.get('/news-page', async (req, res) => {
  const NewsSection = require('../models/NewsSection');
  try {
    const sections = await NewsSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => { sectionsObj[sec.section_key] = sec; });
    res.json({ sections: sectionsObj });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- BLOG PAGE CMS ---
router.get('/blog-page', async (req, res) => {
  const BlogSection = require('../models/BlogSection');
  try {
    const sections = await BlogSection.findAll();
    const sectionsObj = {};
    sections.forEach(sec => { sectionsObj[sec.section_key] = sec; });
    res.json({ sections: sectionsObj });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- CAREERS / JOBS (public) ---
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { is_active: true },
      order: [['created_at', 'DESC']]
    });
    res.json(jobs);
  } catch (error) { res.status(500).json({ error: error.message }); }
});


// --- CAREERS SECTION (public) ---
const CareersSection = require('../models/CareersSection');
router.get('/careers-section', async (req, res) => {
  try {
    let section = await CareersSection.findOne();
    if (!section) section = await CareersSection.create({});
    res.json(section);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- POSITIONS (public - for application form dropdown) ---
const Position = require('../models/Position');
router.get('/positions', async (req, res) => {
  try {
    const items = await Position.findAll({
      where: { is_active: true },
      order: [['order', 'ASC'], ['name_en', 'ASC']]
    });
    res.json(items);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;
