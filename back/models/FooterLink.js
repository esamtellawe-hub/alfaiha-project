const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FooterLink = sequelize.define('FooterLink', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  column_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'e.g., media, offices, legal'
  },
  label_en: { type: DataTypes.STRING, allowNull: false },
  label_ar: { type: DataTypes.STRING, allowNull: false },
  label_fr: { type: DataTypes.STRING, allowNull: true },
  
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'footer_links',
  timestamps: false
});

module.exports = FooterLink;
