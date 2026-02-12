const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const SectorArea = require('./SectorArea');

const AreaProduct = sequelize.define('AreaProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
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
  tableName: 'area_products',
  timestamps: false
});

module.exports = AreaProduct;
