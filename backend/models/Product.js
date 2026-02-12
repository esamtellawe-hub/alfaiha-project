const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  datasheet_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  // --- Multilingual Content ---
  name_en: { type: DataTypes.STRING, allowNull: false },
  name_ar: { type: DataTypes.STRING, allowNull: false },
  name_fr: { type: DataTypes.STRING, allowNull: true },

  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  // --- Technical Specs (Multilingual JSON) ---
  // Store arrays like ["Use 1", "Use 2"] directly as JSON
  uses_en: { type: DataTypes.JSON, allowNull: true },
  uses_ar: { type: DataTypes.JSON, allowNull: true },
  uses_fr: { type: DataTypes.JSON, allowNull: true },

  advantages_en: { type: DataTypes.JSON, allowNull: true },
  advantages_ar: { type: DataTypes.JSON, allowNull: true },
  advantages_fr: { type: DataTypes.JSON, allowNull: true },

  // --- Fixed Technical Specs (Usually numbers/codes, but can be text) ---
  mixing_ratio: { type: DataTypes.STRING, allowNull: true },
  coverage: { type: DataTypes.STRING, allowNull: true },
  packaging: { type: DataTypes.STRING, allowNull: true },
  storage: { type: DataTypes.STRING, allowNull: true },
  shelf_life: { type: DataTypes.STRING, allowNull: true }

}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Product;
