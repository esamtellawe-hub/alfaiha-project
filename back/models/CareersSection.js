const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CareersSection = sequelize.define('CareersSection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // Hero
  hero_title_en:    { type: DataTypes.STRING, defaultValue: 'Career Opportunities' },
  hero_title_ar:    { type: DataTypes.STRING, defaultValue: 'فرص وظيفية' },
  hero_title_fr:    { type: DataTypes.STRING, defaultValue: 'Opportunités de Carrière' },
  hero_subtitle_en: { type: DataTypes.TEXT, defaultValue: 'Be part of a leading engineering group shaping the future of construction across the MENA region.' },
  hero_subtitle_ar: { type: DataTypes.TEXT, defaultValue: 'كن جزءاً من مجموعة هندسية رائدة تصنع مستقبل البناء في منطقة الشرق الأوسط وشمال أفريقيا.' },
  hero_subtitle_fr: { type: DataTypes.TEXT, defaultValue: 'Faites partie d\'un groupe d\'ingénierie de premier plan.' },
  // Badges row
  badge1_en: { type: DataTypes.STRING, defaultValue: 'Competitive Salaries' },
  badge1_ar: { type: DataTypes.STRING, defaultValue: 'رواتب تنافسية' },
  badge1_fr: { type: DataTypes.STRING, defaultValue: 'Salaires Compétitifs' },
  badge2_en: { type: DataTypes.STRING, defaultValue: 'Training & Development' },
  badge2_ar: { type: DataTypes.STRING, defaultValue: 'التدريب والتطوير' },
  badge2_fr: { type: DataTypes.STRING, defaultValue: 'Formation & Développement' },
  badge3_en: { type: DataTypes.STRING, defaultValue: 'Regional Opportunities' },
  badge3_ar: { type: DataTypes.STRING, defaultValue: 'فرص إقليمية' },
  badge3_fr: { type: DataTypes.STRING, defaultValue: 'Opportunités Régionales' },
  // CTA section
  cta_title_en:    { type: DataTypes.STRING, defaultValue: "Don't see your role?" },
  cta_title_ar:    { type: DataTypes.STRING, defaultValue: 'لا ترى وظيفتك؟' },
  cta_title_fr:    { type: DataTypes.STRING, defaultValue: 'Vous ne voyez pas votre poste?' },
  cta_subtitle_en: { type: DataTypes.TEXT, defaultValue: "Send us your CV and we'll keep you in mind for future openings." },
  cta_subtitle_ar: { type: DataTypes.TEXT, defaultValue: 'أرسل لنا سيرتك الذاتية وسنضعك في الاعتبار للمناصب المستقبلية.' },
  cta_subtitle_fr: { type: DataTypes.TEXT, defaultValue: 'Envoyez-nous votre CV et nous vous garderons à l\'esprit.' },
  // Apply button
  apply_btn_en: { type: DataTypes.STRING, defaultValue: 'Apply for This Position' },
  apply_btn_ar: { type: DataTypes.STRING, defaultValue: 'تقدم لهذا المنصب' },
  apply_btn_fr: { type: DataTypes.STRING, defaultValue: 'Postuler pour ce Poste' },
}, {
  tableName: 'careers_section',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = CareersSection;
