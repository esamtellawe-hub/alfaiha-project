const express = require('express');
const Service = require('../models/Service');
const NewsArticle = require('../models/NewsArticle');
const Job = require('../models/Job');

const router = express.Router();

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

module.exports = router;
