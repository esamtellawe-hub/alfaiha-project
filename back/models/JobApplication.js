const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobApplication = sequelize.define('JobApplication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // null = general application
    references: { model: 'jobs', key: 'id' }
  },
  first_name:  { type: DataTypes.STRING, allowNull: false },
  last_name:   { type: DataTypes.STRING, allowNull: false },
  email:       { type: DataTypes.STRING, allowNull: false },
  phone:       { type: DataTypes.STRING, allowNull: true },
  location:    { type: DataTypes.STRING, allowNull: true },
  linkedin_url:{ type: DataTypes.STRING, allowNull: true },
  position_applied: { type: DataTypes.STRING, allowNull: true },
  experience_level: { type: DataTypes.STRING, allowNull: true },
  cover_letter: { type: DataTypes.TEXT, allowNull: true },
  cv_filename: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM('new', 'reviewed', 'shortlisted', 'rejected'),
    defaultValue: 'new'
  }
}, {
  tableName: 'job_applications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = JobApplication;
