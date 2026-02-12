const express = require('express');
const MenuItem = require('../models/MenuItem');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// --- PUBLIC ---

// Get Menu Structure (Nested)
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      where: { 
        parent_id: null,
        is_active: true
      },
      include: [{
        model: MenuItem,
        as: 'children',
        required: false, // Left join
        where: { is_active: true }
      }],
      order: [
        ['order', 'ASC'],
        [{ model: MenuItem, as: 'children' }, 'order', 'ASC'] // Sort children
      ]
    });
    
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN ---

// Update Order (Batch update)
router.put('/reorder', authMiddleware, async (req, res) => {
    try {
        const { items } = req.body; // Expect array of { id, order }
        
        const promises = items.map(item => 
            MenuItem.update({ order: item.order }, { where: { id: item.id } })
        );
        
        await Promise.all(promises);
        res.json({ message: 'Menu order updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create/Update/Delete standard CRUD...
// (Skipping for brevity, can add if requested)

module.exports = router;
