const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sector = require('./Sector');

const SectorArea = sequelize.define('SectorArea', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sector_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Sector,
      key: 'id'
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_en: { type: DataTypes.STRING, allowNull: false },
  name_ar: { type: DataTypes.STRING, allowNull: false },
  name_fr: { type: DataTypes.STRING, allowNull: true },
  
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  image_url: { type: DataTypes.STRING, allowNull: true } // Image for the specific area (e.g. Roof photo)

}, {
  tableName: 'sector_areas',
  timestamps: false
});

module.exports = SectorArea;
