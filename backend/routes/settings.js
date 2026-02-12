const express = require('express');
const { authMiddleware, isSuperAdmin } = require('../middleware/auth');
const SiteSetting = require('../models/SiteSetting');
const RegionalOffice = require('../models/RegionalOffice');

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
