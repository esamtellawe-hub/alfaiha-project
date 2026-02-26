const express = require('express');
const { authMiddleware, isSuperAdmin } = require('../middleware/auth');
const SiteSetting = require('../models/SiteSetting');
const RegionalOffice = require('../models/RegionalOffice');
const FooterLink = require('../models/FooterLink');
const FooterSection = require('../models/FooterSection');
const Category = require('../models/Category');
const JobApplication = require('../models/JobApplication');
const sequelize = require('../config/database');

const router = express.Router();

// --- PUBLIC ROUTES (For Frontend) ---

// Get all site settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await SiteSetting.findAll();
    // Convert array to object key:value
    const settingsMap = {};
    settings.forEach(s => settingsMap[s.key] = s.value);
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all required data for the Footer in one API call
router.get('/footer-data', async (req, res) => {
  try {
    // 1. Settings
    const settings = await SiteSetting.findAll({
      where: {
        key: sequelize.where(sequelize.fn('LOWER', sequelize.col('key')), 'LIKE', 'footer_%') // optional: filter only footer settings if needed, or just return all
      }
    });
    // We'll return all settings to be safe, as footer might need logo etc.
    const allSettings = await SiteSetting.findAll();
    const settingsMap = {};
    allSettings.forEach(s => settingsMap[s.key] = s.value);

    // 1.5 Footer Sections
    const footerSections = await FooterSection.findAll();
    footerSections.forEach(fs => {
      settingsMap[`${fs.section_key}_en`] = fs.content_en;
      settingsMap[`${fs.section_key}_ar`] = fs.content_ar;
      settingsMap[`${fs.section_key}_fr`] = fs.content_fr;
    });

    // 2. Footer Links
    const links = await FooterLink.findAll({
      order: [['column_name', 'ASC'], ['order', 'ASC']]
    });

    // Group links by column
    const footerLinks = {};
    links.forEach(link => {
      if (!footerLinks[link.column_name]) {
        footerLinks[link.column_name] = [];
      }
      footerLinks[link.column_name].push(link);
    });

    // 3. Primary Categories for the dropdown
    const categories = await Category.findAll({
      where: { parent_id: null }, // Top level only
      attributes: ['id', 'slug', 'name_en', 'name_ar', 'name_fr']
    });

    // 4. Regional Offices (First 3 typically used in footer)
    const offices = await RegionalOffice.findAll({
      where: { is_active: true },
      limit: 3 // Footer only shows first 3 usually, or we can send all
    });

    res.json({
      settings: settingsMap,
      links: footerLinks,
      categories: categories,
      offices: offices
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all regional offices
router.get('/offices', async (req, res) => {
  try {
    const offices = await RegionalOffice.findAll({
      where: { is_active: true }
    });
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Quick Inquiry from Footer
router.post('/inquiry', async (req, res) => {
  try {
    const { name, sector } = req.body;
    // For now, just logging it. You can save to an Inquiry model or send an email later.
    console.log('New Footer Inquiry:', { name, sector });
    res.json({ success: true, message: 'Inquiry received' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Newsletter Subscription from Footer
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    // For now, just logging it. You can save to a Subscriber model or Mailchimp later.
    console.log('New Newsletter Subscription:', { email });
    res.json({ success: true, message: 'Subscribed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Job Application
router.post('/apply', async (req, res) => {
  try {
    const {
      first_name, last_name, email, phone,
      location, linkedin_url, position_applied,
      experience_level, cover_letter, job_id
    } = req.body;

    const application = await JobApplication.create({
      job_id: job_id || null,
      first_name, last_name, email, phone,
      location, linkedin_url, position_applied,
      experience_level, cover_letter
    });

    console.log('📩 New Job Application:', application.id, '-', first_name, last_name, '-', position_applied);
    res.json({ success: true, message: 'Application received', id: application.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN ROUTES (Protected) ---

// Update settings (Bulk update or single key)
router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const updates = req.body; // Expect { key: value, key2: value2 }
    
    // Loop through keys and update/create
    const promises = Object.keys(updates).map(async (key) => {
      // Find or create setting
      const [setting, created] = await SiteSetting.findOrCreate({
        where: { key: key },
        defaults: { value: updates[key] }
      });
      
      if (!created) {
        setting.value = updates[key];
        await setting.save();
      }
    });

    await Promise.all(promises);
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new office
router.post('/offices', authMiddleware, async (req, res) => {
  try {
    const office = await RegionalOffice.create(req.body);
    res.status(201).json(office);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update office
router.put('/offices/:id', authMiddleware, async (req, res) => {
  try {
    const office = await RegionalOffice.findByPk(req.params.id);
    if (!office) return res.status(404).json({ error: 'Office not found' });
    
    await office.update(req.body);
    res.json(office);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete office
router.delete('/offices/:id', authMiddleware, async (req, res) => {
  try {
    const office = await RegionalOffice.findByPk(req.params.id);
    if (!office) return res.status(404).json({ error: 'Office not found' });
    
    await office.destroy();
    res.json({ message: 'Office deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
