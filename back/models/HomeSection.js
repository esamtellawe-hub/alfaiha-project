const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeSection = sequelize.define('HomeSection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_key: {
    type: DataTypes.STRING(50), // e.g., 'about_us', 'stats', 'academy', 'partner'
    unique: true,
    allowNull: false
  },
  image_url: { type: DataTypes.STRING, allowNull: true },
  link_url: { type: DataTypes.STRING, allowNull: true }, // For CTA buttons
  icon_name: { type: DataTypes.STRING, allowNull: true }, // For stats/features
  
  title_en: { type: DataTypes.STRING, allowNull: true },
  title_ar: { type: DataTypes.STRING, allowNull: true },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },
  
  btn_text_en: { type: DataTypes.STRING, allowNull: true },
  btn_text_ar: { type: DataTypes.STRING, allowNull: true },
  btn_text_fr: { type: DataTypes.STRING, allowNull: true },
  
  extra_data: {
    type: DataTypes.JSON, // For counts in stats, or specific CSS classes
    allowNull: true
  }
}, {
  tableName: 'home_sections',
  timestamps: false
});

module.exports = HomeSection;
