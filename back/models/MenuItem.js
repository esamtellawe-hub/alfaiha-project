const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: { // Unique identifier for code logic (e.g. 'services', 'solutions')
    type: DataTypes.STRING,
    allowNull: true
  },
  label_en: { type: DataTypes.STRING, allowNull: false },
  label_ar: { type: DataTypes.STRING, allowNull: false },
  label_fr: { type: DataTypes.STRING, allowNull: true },
  
  path: { 
    type: DataTypes.STRING, 
    allowNull: true // Dropdowns might not have a direct path
  },
  
  type: {
    type: DataTypes.ENUM('link', 'dropdown', 'mega'),
    defaultValue: 'link'
  },
  
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'menu_items', // Self-referencing
      key: 'id'
    }
  },

  // Mega Menu Specifics
  columns: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  description_en: { type: DataTypes.STRING, allowNull: true }, // For mega menu items
  description_ar: { type: DataTypes.STRING, allowNull: true },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  tableName: 'menu_items',
  timestamps: false
});

MenuItem.hasMany(MenuItem, { as: 'children', foreignKey: 'parent_id' });
MenuItem.belongsTo(MenuItem, { as: 'parent', foreignKey: 'parent_id' });

module.exports = MenuItem;
