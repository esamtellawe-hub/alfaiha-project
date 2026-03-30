const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const SectorArea = require('./SectorArea');

const AreaCategory = sequelize.define('AreaCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    }
  },
  sector_area_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SectorArea,
      key: 'id'
    }
  }
}, {
  tableName: 'area_categories',
  timestamps: false
});

module.exports = AreaCategory;
