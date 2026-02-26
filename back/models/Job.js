const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  
  location_en: { type: DataTypes.STRING, allowNull: true },
  location_ar: { type: DataTypes.STRING, allowNull: true },
  
  type: {
    type: DataTypes.ENUM('Full Time', 'Part Time', 'Contract', 'Internship'),
    defaultValue: 'Full Time'
  },
  
  description_en: { type: DataTypes.TEXT, allowNull: true },
  description_ar: { type: DataTypes.TEXT, allowNull: true },
  description_fr: { type: DataTypes.TEXT, allowNull: true },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'jobs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Job;
