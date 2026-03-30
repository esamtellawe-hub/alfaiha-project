const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Position = sequelize.define('Position', {
  id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_en:  { type: DataTypes.STRING, allowNull: false },
  name_ar:  { type: DataTypes.STRING, allowNull: true },
  name_fr:  { type: DataTypes.STRING, allowNull: true },
  order:    { type: DataTypes.INTEGER, defaultValue: 0 },
  is_active:{ type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'positions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Position;
