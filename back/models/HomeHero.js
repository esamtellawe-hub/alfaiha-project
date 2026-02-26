const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeHero = sequelize.define('HomeHero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  
  subtitle_en: { type: DataTypes.STRING, allowNull: true },
  subtitle_ar: { type: DataTypes.STRING, allowNull: true },
  subtitle_fr: { type: DataTypes.STRING, allowNull: true },
  
  highlight_text_en: { type: DataTypes.STRING, allowNull: true },
  highlight_text_ar: { type: DataTypes.STRING, allowNull: true },
  highlight_text_fr: { type: DataTypes.STRING, allowNull: true },
  
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  btn_1_text_en: { type: DataTypes.STRING, allowNull: true },
  btn_1_text_ar: { type: DataTypes.STRING, allowNull: true },
  btn_1_text_fr: { type: DataTypes.STRING, allowNull: true },
  btn_1_link: { type: DataTypes.STRING, allowNull: true },
  
  btn_2_text_en: { type: DataTypes.STRING, allowNull: true },
  btn_2_text_ar: { type: DataTypes.STRING, allowNull: true },
  btn_2_text_fr: { type: DataTypes.STRING, allowNull: true },
  btn_2_link: { type: DataTypes.STRING, allowNull: true },
  
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'home_hero_slides',
  timestamps: false
});

module.exports = HomeHero;
