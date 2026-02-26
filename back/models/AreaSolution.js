const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Solution = require('./Solution');
const SectorArea = require('./SectorArea');

const AreaSolution = sequelize.define('AreaSolution', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solution_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Solution,
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
  tableName: 'area_solutions',
  timestamps: false
});

module.exports = AreaSolution;
