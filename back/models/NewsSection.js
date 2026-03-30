const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsSection = sequelize.define('NewsSection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  section_key: { type: DataTypes.STRING, allowNull: false, unique: true },
  title_en: { type: DataTypes.STRING, allowNull: true },
  title_ar: { type: DataTypes.STRING, allowNull: true },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  subtitle_en: { type: DataTypes.STRING, allowNull: true },
  subtitle_ar: { type: DataTypes.STRING, allowNull: true },
  subtitle_fr: { type: DataTypes.STRING, allowNull: true },
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: 'news_sections',
  timestamps: false
});

module.exports = NewsSection;
