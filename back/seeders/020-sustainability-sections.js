require('dotenv').config();
const sequelize = require('../config/database');
const SustainabilitySection = require('../models/SustainabilitySection');

const seedSustainability = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const count = await SustainabilitySection.count();
    if (count > 0) {
      console.log('ℹ️  Sustainability sections already exist. Skipping.');
      process.exit(0);
    }

    await SustainabilitySection.bulkCreate([
      {
        section_key: 'sustainability',
        icon: 'Leaf',
        order: 1,
        title_en: 'Our Commitment to the Environment',
        title_ar: 'التزامنا بالبيئة',
        title_fr: 'Notre Engagement envers l\'Environnement',
        subtitle_en: 'Sustainability',
        subtitle_ar: 'الاستدامة',
        subtitle_fr: 'Durabilité',
        body_en: 'Every product we create and every process we refine reflects our responsibility to balance technical performance with environmental care, resource efficiency, and long-term structural performance. Our journey toward sustainability begins with innovation — a core value that drives us to engineer eco-efficient formulations and optimize our manufacturing practices.',
        body_ar: 'كل منتج نصنعه وكل عملية نحسّنها تعكس مسؤوليتنا في الموازنة بين الأداء التقني والرعاية البيئية وكفاءة الموارد والأداء الهيكلي طويل الأمد.',
        body_fr: 'Chaque produit que nous créons et chaque processus que nous affinons reflète notre responsabilité d\'équilibrer les performances techniques et le soin environnemental.',
        is_active: true
      },
      {
        section_key: 'esg_qhse',
        icon: 'Shield',
        order: 2,
        title_en: 'Environmental, Social & Governance Excellence',
        title_ar: 'التميز البيئي والاجتماعي والحوكمة',
        title_fr: 'Excellence Environnementale, Sociale et de Gouvernance',
        subtitle_en: 'ESG & QHSE',
        subtitle_ar: 'ESG وQHSE',
        subtitle_fr: 'ESG & QHSE',
        body_en: 'AlFaiha Group upholds the highest standards of ESG responsibility, reinforced by a comprehensive and fully integrated Quality, Health, Safety, and Environment (QHSE) framework. Through stringent safety protocols, sustainable sourcing, and governance systems aligned with ISO 14001, we create safer workplaces and enhance operational excellence.',
        body_ar: 'تلتزم مجموعة الفيحاء بأعلى معايير المسؤولية البيئية والاجتماعية والحوكمة، معززةً بإطار شامل ومتكامل لإدارة الجودة والصحة والسلامة والبيئة.',
        body_fr: 'Le Groupe Al Faiha respecte les normes les plus élevées en matière de responsabilité ESG, renforcées par un cadre QHSE complet et entièrement intégré.',
        is_active: true
      },
      {
        section_key: 'rd',
        icon: 'FlaskConical',
        order: 3,
        title_en: 'Innovation Through Research',
        title_ar: 'الابتكار من خلال البحث',
        title_fr: 'L\'Innovation par la Recherche',
        subtitle_en: 'Research & Development',
        subtitle_ar: 'البحث والتطوير',
        subtitle_fr: 'Recherche & Développement',
        body_en: 'At Al Faiha Group, Research & Development is at the core of everything we do. Our R&D team focuses on innovative chemical formulations, continuous product improvement, and performance-driven solutions for all applications. Through advanced laboratory testing, real-site validation, and close collaboration with clients, we develop solutions that meet evolving project demands and industry standards.',
        body_ar: 'في مجموعة الفيحاء، يُعدّ البحث والتطوير في صميم كل ما نقوم به. يركز فريق البحث والتطوير لدينا على التركيبات الكيميائية المبتكرة والتحسين المستمر للمنتجات.',
        body_fr: 'Chez Al Faiha Group, la Recherche & Développement est au cœur de tout ce que nous faisons.',
        is_active: true
      },
      {
        section_key: 'csr',
        icon: 'Heart',
        order: 4,
        title_en: 'Building Stronger Communities',
        title_ar: 'بناء مجتمعات أقوى',
        title_fr: 'Construire des Communautés Plus Fortes',
        subtitle_en: 'Corporate Social Responsibility',
        subtitle_ar: 'المسؤولية الاجتماعية للشركات',
        subtitle_fr: 'Responsabilité Sociale des Entreprises',
        body_en: 'Our CSR programs focus on empowering local communities, supporting education and vocational training, and promoting sustainable construction practices. Through partnerships with civic organizations and industry bodies, we contribute to building not only stronger structures, but stronger societies.',
        body_ar: 'تركز برامج المسؤولية الاجتماعية لدينا على تمكين المجتمعات المحلية ودعم التعليم والتدريب المهني وتعزيز ممارسات البناء المستدامة.',
        body_fr: 'Nos programmes RSE se concentrent sur l\'autonomisation des communautés locales, le soutien à l\'éducation et à la formation professionnelle.',
        is_active: true
      },
      {
        section_key: 'innovation',
        icon: 'Lightbulb',
        order: 5,
        title_en: 'Pioneering the Future of Construction',
        title_ar: 'ريادة مستقبل البناء',
        title_fr: 'Pionnier de l\'Avenir de la Construction',
        subtitle_en: 'Innovation',
        subtitle_ar: 'الابتكار',
        subtitle_fr: 'Innovation',
        body_en: 'From advanced construction chemicals to customized solutions for complex infrastructure projects, we continuously advance our technologies to anticipate and meet the needs of modern construction. Our approach blends global expertise with local insight, ensuring that we not only deliver superior performance but also set new benchmarks in durability, efficiency, and application methods.',
        body_ar: 'من الكيماويات الإنشائية المتقدمة إلى الحلول المخصصة لمشاريع البنية التحتية المعقدة، نواصل تطوير تقنياتنا لتلبية احتياجات البناء الحديث.',
        body_fr: 'Des produits chimiques de construction avancés aux solutions personnalisées pour les projets d\'infrastructure complexes, nous faisons continuellement progresser nos technologies.',
        is_active: true
      }
    ]);

    console.log('✅ Sustainability Sections seeded.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

seedSustainability();
