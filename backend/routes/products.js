const express = require('express');
const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Sector = require('../models/Sector');
const SectorArea = require('../models/SectorArea');
const Project = require('../models/Project');

const router = express.Router();

// --- PRODUCTS ---

// Get all products (with filters)
router.get('/products', async (req, res) => {
  try {
    const { category, search, limit } = req.query;
    const whereClause = {};

    if (category) {
      // Find category by slug to get ID
      // We need to include children IDs if it's a parent category
      const cat = await Category.findOne({ 
          where: { slug: category },
          include: [{ model: Category, as: 'children' }]
      });

      if (cat) {
          const catIds = [cat.id];
          if (cat.children && cat.children.length > 0) {
              catIds.push(...cat.children.map(c => c.id));
          }
          whereClause.category_id = { [Op.in]: catIds };
      } else {
          // If category param provided but not found, maybe return empty or ignore? 
          // Let's return empty to indicate no products for invalid bucket
          return res.json([]); 
      }
    }
    
    if (search) {
      whereClause[Op.or] = [
        { name_en: { [Op.like]: `%${search}%` } },
        { name_ar: { [Op.like]: `%${search}%` } },
        { description_en: { [Op.like]: `%${search}%` } }
      ];
    }

    const products = await Product.findAll({
      where: whereClause,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name_en', 'name_ar', 'slug'] }],
      limit: limit ? parseInt(limit) : undefined
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product by slug
router.get('/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, as: 'category' },
        { model: SectorArea, as: 'areas', include: [{ model: Sector, as: 'sector' }] }
      ]
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- SECTORS ---
router.get('/sectors', async (req, res) => {
  try {
    const sectors = await Sector.findAll({
      include: [{ 
        model: SectorArea, 
        as: 'areas',
        include: [{ // Include products for each area to show counts or lists
            model: Product,
            as: 'products',
            attributes: ['id', 'name_en', 'image_url', 'slug'],
            through: { attributes: [] } // Hide junction table
        }]
      }]
    });
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CATEGORIES ---
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
        where: { parent_id: null },
        include: [{ model: Category, as: 'children' }]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROJECTS ---
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
        order: [['completion_date', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
