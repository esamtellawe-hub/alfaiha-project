const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
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
  category_en: { type: DataTypes.STRING, allowNull: true },
  category_ar: { type: DataTypes.STRING, allowNull: true },
  category_fr: { type: DataTypes.STRING, allowNull: true },

  title_en: { type: DataTypes.STRING, allowNull: false },
  title_ar: { type: DataTypes.STRING, allowNull: false },
  title_fr: { type: DataTypes.STRING, allowNull: true },

  excerpt_en: { type: DataTypes.TEXT, allowNull: true },
  excerpt_ar: { type: DataTypes.TEXT, allowNull: true },
  excerpt_fr: { type: DataTypes.TEXT, allowNull: true },

  content_en: { type: DataTypes.TEXT('long'), allowNull: true },
  content_ar: { type: DataTypes.TEXT('long'), allowNull: true },
  content_fr: { type: DataTypes.TEXT('long'), allowNull: true },

  author: {
    type: DataTypes.STRING,
    defaultValue: 'Admin'
  },
  read_time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'blog_posts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BlogPost;
