const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SiteSetting = sequelize.define('SiteSetting', {
  key: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('text', 'image', 'link', 'boolean'),
    defaultValue: 'text'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'site_settings',
  timestamps: false
});

module.exports = SiteSetting;
