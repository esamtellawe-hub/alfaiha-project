const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AcademySection = sequelize.define('AcademySection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title_en: { type: DataTypes.STRING, allowNull: true },
  title_ar: { type: DataTypes.STRING, allowNull: true },
  title_fr: { type: DataTypes.STRING, allowNull: true },

  subtitle_en: { type: DataTypes.TEXT, allowNull: true },
  subtitle_ar: { type: DataTypes.TEXT, allowNull: true },
  subtitle_fr: { type: DataTypes.TEXT, allowNull: true },

  content_en: { type: DataTypes.TEXT, allowNull: true },
  content_ar: { type: DataTypes.TEXT, allowNull: true },
  content_fr: { type: DataTypes.TEXT, allowNull: true },

  image_url: { type: DataTypes.STRING, allowNull: true },

  extra_data: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'For dynamic arrays like bullet points, cards, form labels'
  }
}, {
  tableName: 'academy_sections',
  timestamps: false
});

module.exports = AcademySection;
