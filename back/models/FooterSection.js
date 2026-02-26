const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FooterSection = sequelize.define('FooterSection', {
  section_key: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  content_en: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content_ar: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content_fr: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'footer_sections',
  timestamps: false
});

module.exports = FooterSection;
