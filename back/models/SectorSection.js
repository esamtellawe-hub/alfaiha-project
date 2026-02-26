const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SectorSection = sequelize.define('SectorSection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },

  subtitle_en: { type: DataTypes.STRING, allowNull: true },
  subtitle_ar: { type: DataTypes.STRING, allowNull: true },
  subtitle_fr: { type: DataTypes.STRING, allowNull: true },

  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  placeholder_en: { type: DataTypes.STRING, allowNull: true },
  placeholder_ar: { type: DataTypes.STRING, allowNull: true },
  placeholder_fr: { type: DataTypes.STRING, allowNull: true },

  empty_text_en: { type: DataTypes.STRING, allowNull: true },
  empty_text_ar: { type: DataTypes.STRING, allowNull: true },
  empty_text_fr: { type: DataTypes.STRING, allowNull: true },

  btn_text_en: { type: DataTypes.STRING, allowNull: true },
  btn_text_ar: { type: DataTypes.STRING, allowNull: true },
  btn_text_fr: { type: DataTypes.STRING, allowNull: true },

  extra_data: {
    type: DataTypes.JSON, 
    allowNull: true
  }
}, {
  tableName: 'sector_sections',
  timestamps: false
});

module.exports = SectorSection;
