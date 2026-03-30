const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Solution = sequelize.define('Solution', {
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
  msds_url: {
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

  // --- Fixed Technical Specs (Multilingual) ---
  mixing_ratio_en: { type: DataTypes.STRING, allowNull: true },
  mixing_ratio_ar: { type: DataTypes.STRING, allowNull: true },
  mixing_ratio_fr: { type: DataTypes.STRING, allowNull: true },

  coverage_en: { type: DataTypes.STRING, allowNull: true },
  coverage_ar: { type: DataTypes.STRING, allowNull: true },
  coverage_fr: { type: DataTypes.STRING, allowNull: true },

  packaging_en: { type: DataTypes.STRING, allowNull: true },
  packaging_ar: { type: DataTypes.STRING, allowNull: true },
  packaging_fr: { type: DataTypes.STRING, allowNull: true },

  storage_en: { type: DataTypes.STRING, allowNull: true },
  storage_ar: { type: DataTypes.STRING, allowNull: true },
  storage_fr: { type: DataTypes.STRING, allowNull: true },

  standard_en: { type: DataTypes.STRING, allowNull: true },
  standard_ar: { type: DataTypes.STRING, allowNull: true },
  standard_fr: { type: DataTypes.STRING, allowNull: true },

  health_and_safety_en: { type: DataTypes.TEXT, allowNull: true },
  health_and_safety_ar: { type: DataTypes.TEXT, allowNull: true },
  health_and_safety_fr: { type: DataTypes.TEXT, allowNull: true },

  shelf_life_en: { type: DataTypes.STRING, allowNull: true },
  shelf_life_ar: { type: DataTypes.STRING, allowNull: true },
  shelf_life_fr: { type: DataTypes.STRING, allowNull: true }

}, {
  tableName: 'solutions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Solution;
