require('dotenv').config();
const sequelize = require('../config/database');
const Job = require('../models/Job');

const seedJobs = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const count = await Job.count();
    if (count > 0) {
      console.log('ℹ️  Jobs already exist. Skipping seed.');
      process.exit(0);
    }

    await Job.bulkCreate([
      {
        title_en: 'Senior Chemical Engineer',
        title_ar: 'مهندس كيميائي أول',
        title_fr: 'Ingénieur Chimiste Senior',
        location_en: 'Amman, Jordan',
        location_ar: 'عمان، الأردن',
        type: 'Full Time',
        description_en: 'Lead R&D projects in construction chemicals, manage lab teams, and drive product innovation. Minimum 5 years experience in admixtures or waterproofing.',
        description_ar: 'قيادة مشاريع البحث والتطوير في الكيماويات الإنشائية وإدارة فرق المختبر ودفع عجلة الابتكار. خبرة لا تقل عن 5 سنوات في المضافات أو مواد العزل المائي.',
        description_fr: 'Diriger des projets de R&D en chimie de la construction, gérer des équipes de laboratoire et stimuler l\'innovation produit.',
        deadline: '2025-06-30',
        is_active: true
      },
      {
        title_en: 'Sales Engineer – KSA',
        title_ar: 'مهندس مبيعات – المملكة العربية السعودية',
        title_fr: 'Ingénieur Commercial – Arabie Saoudite',
        location_en: 'Riyadh, Saudi Arabia',
        location_ar: 'الرياض، المملكة العربية السعودية',
        type: 'Full Time',
        description_en: 'Develop and maintain B2B relationships with contractors and consultants in the KSA market. Technical background in construction materials required.',
        description_ar: 'تطوير علاقات B2B مع المقاولين والاستشاريين في السوق السعودية وصيانتها. مطلوب خلفية تقنية في مواد البناء.',
        description_fr: 'Développer et maintenir des relations B2B avec des entrepreneurs et consultants sur le marché saoudien.',
        deadline: '2025-05-31',
        is_active: true
      },
      {
        title_en: 'QC Laboratory Technician',
        title_ar: 'فني مختبر ضبط الجودة',
        title_fr: 'Technicien de Laboratoire CQ',
        location_en: 'Zarqa, Jordan',
        location_ar: 'الزرقاء، الأردن',
        type: 'Full Time',
        description_en: 'Perform quality control tests on construction chemicals batches. Ensure compliance with ISO standards. BSc in Chemistry or Materials Science required.',
        description_ar: 'إجراء اختبارات ضبط الجودة على دفعات الكيماويات الإنشائية. ضمان الامتثال لمعايير الأيزو. مطلوب بكالوريوس في الكيمياء أو علم المواد.',
        description_fr: 'Effectuer des tests de contrôle qualité sur les lots de produits chimiques de construction.',
        deadline: '2025-04-30',
        is_active: true
      },
      {
        title_en: 'Marketing Coordinator',
        title_ar: 'منسق تسويق',
        title_fr: 'Coordinateur Marketing',
        location_en: 'Amman, Jordan',
        location_ar: 'عمان، الأردن',
        type: 'Full Time',
        description_en: 'Coordinate digital marketing campaigns, manage social media channels, and support exhibitions across the MENA region.',
        description_ar: 'تنسيق حملات التسويق الرقمي وإدارة قنوات وسائل التواصل الاجتماعي ودعم المعارض في منطقة الشرق الأوسط وشمال أفريقيا.',
        description_fr: 'Coordonner les campagnes de marketing digital, gérer les réseaux sociaux et soutenir les expositions dans la région MENA.',
        deadline: '2025-05-15',
        is_active: true
      },
      {
        title_en: 'Technical Support Engineer',
        title_ar: 'مهندس الدعم الفني',
        title_fr: 'Ingénieur Support Technique',
        location_en: 'Dubai, UAE',
        location_ar: 'دبي، الإمارات',
        type: 'Full Time',
        description_en: 'Provide on-site technical support and product training to customers. Experience in construction chemicals application is essential.',
        description_ar: 'تقديم الدعم الفني الميداني والتدريب على المنتجات للعملاء. الخبرة في تطبيق الكيماويات الإنشائية ضرورية.',
        description_fr: 'Fournir une assistance technique sur site et une formation produit aux clients.',
        deadline: '2025-06-01',
        is_active: true
      }
    ]);

    console.log('✅ Jobs seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error.message);
    process.exit(1);
  }
};

seedJobs();
