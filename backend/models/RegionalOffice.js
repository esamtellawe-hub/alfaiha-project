const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RegionalOffice = sequelize.define('RegionalOffice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  country_name_en: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_name_ar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_name_fr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_code: {
    type: DataTypes.STRING(5), // e.g. 'jo', 'sa' (for flag icons or logic)
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location_url: {
    type: DataTypes.TEXT, // Google Maps lkink
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'regional_offices',
  timestamps: false
});

module.exports = RegionalOffice;
