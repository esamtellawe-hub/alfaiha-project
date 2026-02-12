const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
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
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  icon_name: {
    type: DataTypes.STRING, // For frontend icon mapping
    allowNull: true
  },
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  // Detailed Sub-services (Array of Objects: {name, desc})
  sub_services_en: { type: DataTypes.JSON, allowNull: true },
  sub_services_ar: { type: DataTypes.JSON, allowNull: true },
  sub_services_fr: { type: DataTypes.JSON, allowNull: true },

  // Related Content (Array of Objects: {id, label})
  related_products_en: { type: DataTypes.JSON, allowNull: true },
  related_sectors_en: { type: DataTypes.JSON, allowNull: true },
  case_studies_en: { type: DataTypes.JSON, allowNull: true }

}, {
  tableName: 'services',
  timestamps: false
});

module.exports = Service;
