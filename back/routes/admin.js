const express = require('express');
const router = express.Router();
const { authMiddleware, isSuperAdmin } = require('../middleware/auth');
const NewsArticle = require('../models/NewsArticle');
const BlogPost = require('../models/BlogPost');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const HomeHero = require('../models/HomeHero');
const RegionalOffice = require('../models/RegionalOffice');
const Service = require('../models/Service');
const Sector = require('../models/Sector');
const Solution = require('../models/Solution');
const Project = require('../models/Project');
const Category = require('../models/Category');
const CareersSection = require('../models/CareersSection');
const Position = require('../models/Position');
const SiteSetting = require('../models/SiteSetting');
const FooterSection = require('../models/FooterSection');
const FooterLink = require('../models/FooterLink');
const User = require('../models/User'); // Required for user management
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// All admin routes require authentication
router.use(authMiddleware);

// ===================== DASHBOARD STATS =====================
router.get('/dashboard-stats', async (req, res) => {
  try {
    const stats = {
      solutions: await Solution.count(),
      projects: await Project.count(),
      jobs: await Job.count(),
      applications: await JobApplication.count(),
      news: await NewsArticle.count(),
      users: await User.count(),
      categories: await Category.count(),
      services: await Service.count()
    };
    res.json(stats);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== USER MANAGEMENT =====================
router.get('/users', isSuperAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
    res.json(users);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/users', isSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    
    // password hashing is handled by the User model's beforeCreate hook
    const user = await User.create({ username, email, password_hash: password, role });
    res.status(201).json({ id: user.id, username, email, role });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/users/:id', isSuperAdmin, async (req, res) => {
  try {
    const { username, email, role, password, is_active } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Prevent changing the last super admin's role or deactivating them
    if (user.role === 'super_admin' && (role === 'admin' || is_active === false)) {
      const superAdminsCount = await User.count({ where: { role: 'super_admin', is_active: true } });
      if (superAdminsCount <= 1) {
        return res.status(400).json({ error: 'Cannot deactivate or change role of the last super admin' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (role) user.role = role;
    if (is_active !== undefined) user.is_active = is_active;
    if (password) user.password_hash = password; // Hook will re-hash
    
    await user.save();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/users/:id', isSuperAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (user.role === 'super_admin') {
      const superAdminsCount = await User.count({ where: { role: 'super_admin' } });
      if (superAdminsCount <= 1) {
        return res.status(400).json({ error: 'Cannot delete the last super admin' });
      }
    }
    
    await user.destroy();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== HOME HERO =====================
// جلب كل السلايدات (GET) عشان نعرضهم بالجدول
router.get('/home-hero', async (req, res) => {
  try {
    const items = await HomeHero.findAll({
      order: [['order', 'ASC']] // عشان يجيبهم مرتبين حسب ترتيبهم
    });
    res.json(items);
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

router.post('/home-hero', upload.single('image_file'), async (req, res) => {
  try {
    const slideData = req.body;
    
    // إذا اليوزر رفع صورة، بنضيف مسارها للبيانات قبل ما نحفظها بالداتابيز
    if (req.file) {
      slideData.image_url = '/uploads/images/' + req.file.filename;
    }

    const item = await HomeHero.create(slideData);
    res.status(201).json(item);
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

// 3. تعديل راوت التحديث (PUT)
router.put('/home-hero/:id', upload.single('image_file'), async (req, res) => {
  try {
    const slideData = req.body;
    
    // إذا اليوزر رفع صورة جديدة بالتعديل، بنحدث المسار، وإذا ما رفع بتضل صورته القديمة
    if (req.file) {
      slideData.image_url = '/uploads/images/' + req.file.filename;
    }

    await HomeHero.update(slideData, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

// 4. راوت الحذف (بضل زي ما هو)
router.delete('/home-hero/:id', async (req, res) => {
  try {
    await HomeHero.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { 
    res.status(500).json({ error: e.message }); 
  }
});

// ===================== HOME SECTIONS =====================
const HomeSection = require('../models/HomeSection');

router.get('/home-sections', async (req, res) => {
  try {
    const items = await HomeSection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/home-sections', upload.single('image_file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = '/uploads/images/' + req.file.filename;
    }
    const item = await HomeSection.create(data);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/home-sections/:id', upload.single('image_file'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image_url = '/uploads/images/' + req.file.filename;
    }
    await HomeSection.update(data, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/home-sections/:id', async (req, res) => {
  try {
    await HomeSection.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== HEADER / MENU ITEMS =====================
const MenuItem = require('../models/MenuItem');

router.get('/menu-items', async (req, res) => {
  try {
    const items = await MenuItem.findAll({
      order: [['order', 'ASC']],
      include: [{ model: MenuItem, as: 'children' }]
    });
    // Filter to only top-level items for the hierarchical view, since children are included
    const topLevel = items.filter(item => item.parent_id === null);
    // Also send all items flat if needed by the frontend for parent selection
    res.json({ hierarchical: topLevel, flat: items });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/menu-items', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.parent_id) payload.parent_id = null;
    const item = await MenuItem.create(payload);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/menu-items/:id', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.parent_id) payload.parent_id = null;
    await MenuItem.update(payload, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/menu-items/:id', async (req, res) => {
  try {
    await MenuItem.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});




// ===================== NEWS =====================
router.get('/news', async (req, res) => {
  try {
    const items = await NewsArticle.findAll({ order: [['publish_date', 'DESC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/news', async (req, res) => {
  try {
    const item = await NewsArticle.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/news/:id', async (req, res) => {
  try {
    await NewsArticle.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/news/:id', async (req, res) => {
  try {
    await NewsArticle.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== BLOG =====================
router.get('/blog', async (req, res) => {
  try {
    const items = await BlogPost.findAll({ order: [['publish_date', 'DESC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/blog', upload.single('image'), async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) payload.image_url = '/uploads/images/' + req.file.filename;
    // ensure booleans
    payload.is_published = payload.is_published === 'true' || payload.is_published === true;
    const item = await BlogPost.create(payload);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/blog/:id', upload.single('image'), async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) payload.image_url = '/uploads/images/' + req.file.filename;
    // ensure booleans
    if (payload.is_published !== undefined) {
      payload.is_published = payload.is_published === 'true' || payload.is_published === true;
    }
    await BlogPost.update(payload, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/blog/:id', async (req, res) => {
  try {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});



// ===================== JOB APPLICATIONS (read only) =====================
router.get('/applications', async (req, res) => {
  try {
    const items = await JobApplication.findAll({ order: [['created_at', 'DESC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/applications/:id/status', async (req, res) => {
  try {
    await JobApplication.update({ status: req.body.status }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== REGIONAL OFFICES =====================
router.get('/regional-offices', async (req, res) => {
  try {
    const items = await RegionalOffice.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/regional-offices', async (req, res) => {
  try {
    const item = await RegionalOffice.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/regional-offices/:id', async (req, res) => {
  try {
    await RegionalOffice.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/regional-offices/:id', async (req, res) => {
  try {
    await RegionalOffice.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SERVICES =====================
router.get('/services', async (req, res) => {
  try {
    const items = await Service.findAll({ order: [['id', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/services-options', async (req, res) => {
  try {
    const sectors = await Sector.findAll({ attributes: ['slug', 'name_en'] });
    const solutions = await Solution.findAll({ attributes: ['slug', 'name_en'] });
    const projects = await Project.findAll({ attributes: ['slug', 'title_en'] });

    res.json({
      sectors: sectors.map(s => ({ id: s.slug, label: s.name_en })),
      solutions: solutions.map(s => ({ id: s.slug, label: s.name_en })),
      projects: projects.map(p => ({ id: p.slug, label: p.title_en }))
    });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/services', async (req, res) => {
  try {
    const item = await Service.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/services/:id', async (req, res) => {
  try {
    await Service.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== CATEGORIES =====================
router.get('/categories', async (req, res) => {
  try {
    const items = await Category.findAll({
      include: [{ model: Category, as: 'parent', attributes: ['id', 'name_en'] }],
      order: [['id', 'DESC']]
    });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/categories', async (req, res) => {
  try {
    // Convert empty string parent_id to null
    if (req.body.parent_id === "") req.body.parent_id = null;
    const item = await Category.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/categories/:id', async (req, res) => {
  try {
    if (req.body.parent_id === "") req.body.parent_id = null;
    await Category.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SOLUTIONS (PRODUCTS) =====================
router.get('/solutions', async (req, res) => {
  try {
    const items = await Solution.findAll({
      include: [
        { model: Category, as: 'category' }
      ],
      order: [['id', 'DESC']]
    });
    // Return items directly
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/categories-options', async (req, res) => {
  try {
    // Return Top-level categories with their children
    const categories = await Category.findAll({
      where: { parent_id: null },
      attributes: ['id', 'name_en'],
      include: [
        {
          model: Category,
          as: 'children',
          attributes: ['id', 'name_en']
        }
      ],
      order: [['id', 'ASC']]
    });
    res.json(categories);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/solutions', upload.fields([{ name: 'datasheet_file', maxCount: 1 }, { name: 'msds_file', maxCount: 1 }]), async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.category_id || payload.category_id === 'null') payload.category_id = null;
    
    if (req.files) {
      if (req.files.datasheet_file) {
        payload.datasheet_url = '/uploads/images/' + req.files.datasheet_file[0].filename;
      }
      if (req.files.msds_file) {
        payload.msds_url = '/uploads/images/' + req.files.msds_file[0].filename;
      }
    }
    const item = await Solution.create(payload);
    
    // Handling Sector Area Associations (Many-To-Many)
    if (req.body.sector_area_ids) {
        let areaIds = req.body.sector_area_ids;
        if (typeof areaIds === 'string') {
            try { areaIds = JSON.parse(areaIds); } catch(err) { areaIds = []; }
        }
        if (Array.isArray(areaIds)) {
            await item.setAreas(areaIds);
        }
    }
    
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/solutions/:id', upload.fields([{ name: 'datasheet_file', maxCount: 1 }, { name: 'msds_file', maxCount: 1 }]), async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.category_id || payload.category_id === 'null') payload.category_id = null;
    
    if (req.files) {
      if (req.files.datasheet_file) {
        payload.datasheet_url = '/uploads/images/' + req.files.datasheet_file[0].filename;
      }
      if (req.files.msds_file) {
        payload.msds_url = '/uploads/images/' + req.files.msds_file[0].filename;
      }
    }
    
    const item = await Solution.findByPk(req.params.id);
    if(item) {
       await item.update(payload);
       
       // Sync Sector Area Associations
       if (req.body.sector_area_ids) {
            let areaIds = req.body.sector_area_ids;
            if (typeof areaIds === 'string') {
                try { areaIds = JSON.parse(areaIds); } catch(err) { areaIds = []; }
            }
            if (Array.isArray(areaIds)) {
                await item.setAreas(areaIds);
            }
       }
    }
    
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/solutions/:id', async (req, res) => {
  try {
    await Solution.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SECTORS =====================
const SectorArea = require('../models/SectorArea');

router.get('/sectors', async (req, res) => {
  try {
    const items = await Sector.findAll({
      include: [
        { 
          model: SectorArea, 
          as: 'areas',
          include: [
            {
              model: Category,
              as: 'categories',
              attributes: ['id', 'name_en']
            }
          ]
        }
      ],
      order: [['id', 'ASC']]
    });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/sectors', async (req, res) => {
  try {
    const item = await Sector.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/sectors/:id', async (req, res) => {
  try {
    await Sector.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/sectors/:id', async (req, res) => {
  try {
    await Sector.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SECTOR AREAS =====================

router.post('/sector-areas', async (req, res) => {
  try {
    const item = await SectorArea.create(req.body);
    if (req.body.category_ids && Array.isArray(req.body.category_ids)) {
      await item.setCategories(req.body.category_ids);
    }
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/sector-areas/:id', async (req, res) => {
  try {
    const item = await SectorArea.findByPk(req.params.id);
    if (item) {
      await item.update(req.body);
      if (req.body.category_ids && Array.isArray(req.body.category_ids)) {
        await item.setCategories(req.body.category_ids);
      }
    }
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/sector-areas/:id', async (req, res) => {
  try {
    await SectorArea.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== PROJECTS =====================

router.get('/projects', async (req, res) => {
  try {
    const items = await Project.findAll({ order: [['created_at', 'DESC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/projects', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image_url = `/uploads/images/${req.file.filename}`; // reusing image upload dir
    const item = await Project.create(data);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/projects/:id', upload.single('image'), async (req, res) => {
  try {
    const item = await Project.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const data = { ...req.body };
    if (req.file) data.image_url = `/uploads/images/${req.file.filename}`;
    await item.update(data);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== PROJECT SECTIONS =====================

router.get('/projects-sections', async (req, res) => {
  const ProjectSection = require('../models/ProjectSection');
  try {
    const items = await ProjectSection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/projects-sections', async (req, res) => {
  const ProjectSection = require('../models/ProjectSection');
  try {
    const item = await ProjectSection.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/projects-sections/:id', async (req, res) => {
  const ProjectSection = require('../models/ProjectSection');
  try {
    const item = await ProjectSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== PARTNERS SECTIONS =====================

router.get('/partners-sections', async (req, res) => {
  const PartnerSection = require('../models/PartnerSection');
  try {
    const items = await PartnerSection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/partners-sections', async (req, res) => {
  const PartnerSection = require('../models/PartnerSection');
  try {
    const item = await PartnerSection.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/partners-sections/:id', async (req, res) => {
  const PartnerSection = require('../models/PartnerSection');
  try {
    const item = await PartnerSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SUSTAINABILITY SECTIONS =====================

router.get('/sustainability-sections', async (req, res) => {
  const SustainabilitySection = require('../models/SustainabilitySection');
  try {
    const items = await SustainabilitySection.findAll({ order: [['order', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/sustainability-sections', async (req, res) => {
  const SustainabilitySection = require('../models/SustainabilitySection');
  try {
    const item = await SustainabilitySection.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/sustainability-sections/:id', async (req, res) => {
  const SustainabilitySection = require('../models/SustainabilitySection');
  try {
    const item = await SustainabilitySection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/sustainability-sections/:id', async (req, res) => {
  const SustainabilitySection = require('../models/SustainabilitySection');
  try {
    await SustainabilitySection.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== ABOUT SECTIONS =====================

router.get('/about-sections', async (req, res) => {
  const AboutSection = require('../models/AboutSection');
  try {
    const items = await AboutSection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/about-sections', upload.single('image'), async (req, res) => {
  const AboutSection = require('../models/AboutSection');
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/images/${req.file.filename}`;
    const item = await AboutSection.create(data);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/about-sections/:id', upload.single('image'), async (req, res) => {
  const AboutSection = require('../models/AboutSection');
  try {
    const item = await AboutSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const data = { ...req.body };
    if (data.extra_data && typeof data.extra_data === 'string') {
        try { data.extra_data = JSON.parse(data.extra_data); } catch(e) {}
    }
    if (req.file) data.image = `/uploads/images/${req.file.filename}`;
    await item.update(data);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/about-sections/:id', async (req, res) => {
  const AboutSection = require('../models/AboutSection');
  try {
    await AboutSection.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== ACADEMY SECTIONS =====================

router.get('/academy-sections', async (req, res) => {
  const AcademySection = require('../models/AcademySection');
  try {
    const items = await AcademySection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/academy-sections/:id', async (req, res) => {
  const AcademySection = require('../models/AcademySection');
  try {
    const item = await AcademySection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== NEWS SECTIONS =====================

router.get('/news-sections', async (req, res) => {
  const NewsSection = require('../models/NewsSection');
  try { const items = await NewsSection.findAll(); res.json(items); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/news-sections/:id', async (req, res) => {
  const NewsSection = require('../models/NewsSection');
  try {
    const item = await NewsSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== BLOG SECTIONS =====================

router.get('/blog-sections', async (req, res) => {
  const BlogSection = require('../models/BlogSection');
  try { const items = await BlogSection.findAll(); res.json(items); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/blog-sections/:id', async (req, res) => {
  const BlogSection = require('../models/BlogSection');
  try {
    const item = await BlogSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== PARTNER SECTIONS =====================

router.get('/partners-sections', async (req, res) => {
  const PartnerSection = require('../models/PartnerSection');
  try { const items = await PartnerSection.findAll(); res.json(items); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/partners-sections/:id', async (req, res) => {
  const PartnerSection = require('../models/PartnerSection');
  try {
    const item = await PartnerSection.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, item });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// =============================================
// --- JOBS (Careers) CRUD ---
// =============================================

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [['created_at', 'DESC']] });
    res.json(jobs);
  } catch (e) { 
    console.error('ERROR FETCHING JOBS:', e);
    res.status(500).json({ error: e.message }); 
  }
});

// POST new job
router.post('/jobs', async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json({ success: true, job });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT update job
router.put('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    await job.update(req.body);
    res.json({ success: true, job });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE job
router.delete('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    await job.destroy();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});


// ===================== CAREERS SECTION =====================

router.get('/careers-section', async (req, res) => {
  try {
    let section = await CareersSection.findOne();
    if (!section) section = await CareersSection.create({});
    res.json(section);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/careers-section', async (req, res) => {
  try {
    let section = await CareersSection.findOne();
    if (!section) section = await CareersSection.create({});
    await section.update(req.body);
    res.json({ success: true, section });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== POSITIONS (Application Form) =====================

router.get('/positions', async (req, res) => {
  try {
    const items = await Position.findAll({ order: [['order', 'ASC'], ['name_en', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/positions', async (req, res) => {
  try {
    const item = await Position.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/positions/:id', async (req, res) => {
  try {
    await Position.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/positions/:id', async (req, res) => {
  try {
    await Position.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== SITE SETTINGS =====================

router.get('/settings', async (req, res) => {
  try {
    const items = await SiteSetting.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/settings', async (req, res) => {
  try {
    const { key, value, type, description } = req.body;
    let setting = await SiteSetting.findByPk(key);
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await SiteSetting.create({ key, value, type, description });
    }
    res.status(200).json(setting);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== FOOTER SECTIONS =====================

router.get('/footer-sections', async (req, res) => {
  try {
    const items = await FooterSection.findAll({ order: [['section_key', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/footer-sections/:id', async (req, res) => {
  try {
    await FooterSection.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/footer-sections', async (req, res) => {
  try {
    const item = await FooterSection.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== FOOTER LINKS =====================

router.get('/footer-links', async (req, res) => {
  try {
    const items = await FooterLink.findAll({ order: [['order', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/footer-links', async (req, res) => {
  try {
    const item = await FooterLink.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/footer-links/:id', async (req, res) => {
  try {
    await FooterLink.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/footer-links/:id', async (req, res) => {
  try {
    await FooterLink.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
