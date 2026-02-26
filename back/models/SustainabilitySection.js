const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SustainabilitySection = sequelize.define('SustainabilitySection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true // e.g. 'Leaf', 'Shield', 'Flask', 'Heart', 'Lightbulb'
  },
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },

  subtitle_en: { type: DataTypes.STRING, allowNull: true },
  subtitle_ar: { type: DataTypes.STRING, allowNull: true },
  subtitle_fr: { type: DataTypes.STRING, allowNull: true },

  body_en: { type: DataTypes.TEXT, allowNull: true },
  body_ar: { type: DataTypes.TEXT, allowNull: true },
  body_fr: { type: DataTypes.TEXT, allowNull: true },

  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'sustainability_sections',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SustainabilitySection;
