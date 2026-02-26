const express = require('express');
const router = express.Router();
const { authMiddleware, isSuperAdmin } = require('../middleware/auth');
const NewsArticle = require('../models/NewsArticle');
const BlogPost = require('../models/BlogPost');
const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const HomeHero = require('../models/HomeHero');

// All admin routes require authentication
router.use(authMiddleware);

// ===================== HOME HERO =====================
router.get('/home-hero', async (req, res) => {
  try {
    const items = await HomeHero.findAll({ order: [['order', 'ASC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/home-hero', async (req, res) => {
  try {
    const item = await HomeHero.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/home-hero/:id', async (req, res) => {
  try {
    await HomeHero.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/home-hero/:id', async (req, res) => {
  try {
    await HomeHero.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== HOME SECTIONS =====================
const HomeSection = require('../models/HomeSection');

router.get('/home-sections', async (req, res) => {
  try {
    const items = await HomeSection.findAll();
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/home-sections', async (req, res) => {
  try {
    const item = await HomeSection.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/home-sections/:id', async (req, res) => {
  try {
    await HomeSection.update(req.body, { where: { id: req.params.id } });
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

router.post('/blog', async (req, res) => {
  try {
    const item = await BlogPost.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/blog/:id', async (req, res) => {
  try {
    await BlogPost.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/blog/:id', async (req, res) => {
  try {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ===================== JOBS =====================
router.get('/jobs', async (req, res) => {
  try {
    const items = await Job.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/jobs', async (req, res) => {
  try {
    const item = await Job.create(req.body);
    res.status(201).json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/jobs/:id', async (req, res) => {
  try {
    await Job.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/jobs/:id', async (req, res) => {
  try {
    await Job.destroy({ where: { id: req.params.id } });
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

module.exports = router;
