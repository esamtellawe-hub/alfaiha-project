const express = require('express');
const HomeHero = require('../models/HomeHero');
const HomeSection = require('../models/HomeSection');
const Certification = require('../models/Certification');
// const { authMiddleware } = require('../middleware/auth'); // Uncomment for admin

const router = express.Router();

// --- PUBLIC ROUTES ---

// Get all home page data (Hero, Sections, Certifications)
router.get('/', async (req, res) => {
  try {
    const heroSlides = await HomeHero.findAll({
       where: { is_active: true },
       order: [['order', 'ASC']]
    });

    const sections = await HomeSection.findAll();
    // Convert array to object key:value
    const sectionsMap = {};
    sections.forEach(s => sectionsMap[s.section_key] = s);

    const certifications = await Certification.findAll({
      order: [['order', 'ASC']]
    });

    const featuredProducts = await require('../models/Product').findAll({
      where: { is_featured: true },
      limit: 5,
      include: [{ model: require('../models/Category'), as: 'category', attributes: ['name_en'] }]
    });

    res.json({
      hero: heroSlides,
      sections: sectionsMap,
      certifications: certifications,
      featuredProducts: featuredProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
