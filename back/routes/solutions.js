const express = require('express');
const { Op } = require('sequelize');
const Solution = require('../models/Solution');
const Category = require('../models/Category');
const Sector = require('../models/Sector');
const SectorArea = require('../models/SectorArea');
const Project = require('../models/Project');

const router = express.Router();

// --- SOLUTIONS (formerly PRODUCTS) ---

// Get all solutions (with filters)
router.get('/all-solutions', async (req, res) => {
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
          // Let's return empty to indicate no solutions for invalid bucket
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

    const solutions = await Solution.findAll({
      where: whereClause,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name_en', 'name_ar', 'slug'] }],
      limit: limit ? parseInt(limit) : undefined
    });

    res.json(solutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single solution by slug
router.get('/solution/:slug', async (req, res) => {
  try {
    
    const solution = await Solution.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category, as: 'category' },
        { model: SectorArea, as: 'areas', include: [{ model: Sector, as: 'sector' }] }
      ]
    });

    if (!solution) return res.status(404).json({ error: 'Solution not found' });
    res.json(solution);
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
        include: [{ // Include solutions for each area to show counts or lists
            model: Solution,
            as: 'solutions',
            attributes: ['id', 'name_en', 'image_url', 'slug', 'category_id'],
            include: [{ model: Category, as: 'category', attributes: ['id', 'name_en', 'slug', 'icon_name', 'description_en'] }],
            through: { attributes: [] } // Hide junction table
        }]
      }]
    });
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SOLUTIONS (HIERARCHY) ---
router.get('/solutions', async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parent_id: null },
      include: [
        {
          model: Category,
          as: 'children',
          include: [
            {
              model: Solution,
              as: 'solutions',
              attributes: ['id', 'name_en', 'name_ar', 'slug', 'image_url', 'description_en', 'description_ar']
            }
          ]
        },
        {
          model: Solution,
          as: 'solutions',
          attributes: ['id', 'name_en', 'name_ar', 'slug', 'image_url', 'description_en', 'description_ar']
        }
      ],
      order: [['id', 'ASC']]
    });
    res.json(categories);
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
