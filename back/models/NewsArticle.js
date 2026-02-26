const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsArticle = sequelize.define('NewsArticle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  
  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },
  
  content_en: { type: DataTypes.TEXT, allowNull: true }, // HTML or Markdown content
  content_ar: { type: DataTypes.TEXT, allowNull: true },
  content_fr: { type: DataTypes.TEXT, allowNull: true },

  author: {
    type: DataTypes.STRING,
    defaultValue: 'Admin'
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'news_articles',
  timestamps: true, // created_at, updated_at
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = NewsArticle;
