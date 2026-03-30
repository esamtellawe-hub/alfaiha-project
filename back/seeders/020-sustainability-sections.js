require('dotenv').config();
const sequelize = require('../config/database');
const SustainabilitySection = require('../models/SustainabilitySection');

const seedSustainability = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Truncate to reset with new flat schema
    await SustainabilitySection.destroy({ truncate: true, cascade: true });

    await SustainabilitySection.bulkCreate([
      // ================= HERO =================
      { section_key: 'hero', order: 1,
        subtitle_en: 'Building a Sustainable Future', title_en: 'Sustainability & Innovation',
        body_en: 'At Al Faiha Group, sustainability is not just a statement; it\'s our standard. We believe construction shapes not only today\'s landscape but safeguards tomorrow\'s future.'
      },
      // ================= SUSTAINABILITY MAIN =================
      { section_key: 'sustainability_main', order: 2, icon: 'Leaf',
        subtitle_en: 'Sustainability', title_en: 'Our Commitment to the Environment',
        body_en: 'Every product we create and every process we refine reflects our responsibility to balance technical performance with environmental care, resource efficiency, and long-term structural performance.'
      },
      { section_key: 'sustainability_product', order: 3, icon: 'Lightbulb',
        title_en: 'Sustainable Product Innovation',
        body_en: 'Our journey toward sustainability begins with innovation, a core value that drives us to engineer eco-efficient formulations and optimize our manufacturing practices. Through continuous research and development, we deliver construction chemicals and materials that enhance durability, reduce lifecycle costs, and minimize environmental impact.'
      },
      { section_key: 'sustainability_cement', order: 4, icon: 'Target',
        title_en: 'Cement Additives – Driving Decarbonization',
        body_en: 'A cornerstone of our sustainability strategy is our Cement Additives line, designed to help the cement industry advance toward global decarbonization targets:'
      },
      // Cards
      { section_key: 'sustainability_card_1', order: 5, icon: 'CheckCircle2',
        title_en: 'Reduced Clinker Usage', body_en: 'Decreasing CO₂ emissions in cement production' },
      { section_key: 'sustainability_card_2', order: 6, icon: 'Zap',
        title_en: 'Higher Grinding Efficiency', body_en: 'Reducing energy consumption during milling' },
      { section_key: 'sustainability_card_3', order: 7, icon: 'Award',
        title_en: 'Enhanced Concrete Performance', body_en: 'Extending lifespan while reducing maintenance and waste' },
      // Red Box
      { section_key: 'sustainability_red_box', order: 8,
        title_en: 'Shaping a Greener Future',
        body_en: 'Rooted in our values of Accountability in Every Project and Health, Safety, and Sustainability, Al Faiha Group integrates environmental stewardship into every decision. By partnering with clients who share our vision, we are building a construction ecosystem where growth and responsibility go hand in hand; shaping a future defined by innovation, efficiency, and care for generations to come.'
      },

      // ================= ESG =================
      { section_key: 'esg_main', order: 9, icon: 'Shield',
        subtitle_en: 'ESG & QHSE', title_en: 'Environmental, Social & Governance Excellence',
        body_en: 'AlFaiha Group upholds the highest standards of ESG responsibility, reinforced by a comprehensive and fully integrated Quality, Health, Safety, and Environment (QHSE) framework.\n\nThrough stringent safety protocols, sustainable sourcing, and governance systems aligned with ISO 14001, we create safer workplaces, emphasize sustainable sourcing, and enhance operational excellence. This integrated ESG and QHSE approach safeguards people and projects alike while strengthening trust with clients, partners, and communities across the region.'
      },
      { section_key: 'esg_card_1', order: 10, icon: 'Shield',
        title_en: 'Environmental', body_en: 'Sustainable practices and impact reduction' },
      { section_key: 'esg_card_2', order: 11, icon: 'Users',
        title_en: 'Social', body_en: 'Community engagement and safety' },
      { section_key: 'esg_card_3', order: 12, icon: 'Award',
        title_en: 'Governance', body_en: 'Accountability and transparency' },

      // ================= R&D =================
      { section_key: 'rd_main', order: 13, icon: 'FlaskConical',
        subtitle_en: 'Research & Development', title_en: 'Innovation Through Research',
        body_en: 'At Al Faiha Group, Research & Development is at the core of everything we do.\n\nOur R&D team focuses on innovative chemical formulations, continuous product improvement, and performance-driven solutions for all solutions. Through advanced laboratory testing, real-site validation, and close collaboration with clients, we develop solutions that meet evolving project demands, industry standards, and environmental conditions; ensuring reliability, efficiency, and long-term performance.'
      },
      { section_key: 'rd_card_1', order: 14, icon: 'FlaskConical',
        title_en: 'Advanced Testing', body_en: 'Laboratory and field validation' },
      { section_key: 'rd_card_2', order: 15, icon: 'Lightbulb',
        title_en: 'Innovation', body_en: 'Cutting-edge formulations' },
      { section_key: 'rd_card_3', order: 16, icon: 'Users',
        title_en: 'Collaboration', body_en: 'Client-driven solutions' },

      // ================= CSR =================
      { section_key: 'csr_main', order: 17, icon: 'Heart',
        subtitle_en: 'Corporate Social Responsibility', title_en: 'Building Stronger Communities',
        body_en: 'Beyond business, we believe in giving back.\n\nOur CSR programs focus on empowering local communities, supporting education and vocational training, and promoting sustainable construction practices. Through partnerships with civic organizations and industry bodies, we contribute to building not only stronger structures, but stronger societies; where opportunity, safety, and shared progress define every endeavor.'
      },
      { section_key: 'csr_card_1', order: 18, icon: 'Heart',
        title_en: 'Community Empowerment', body_en: 'Supporting local communities and development' },
      { section_key: 'csr_card_2', order: 19, icon: 'Users',
        title_en: 'Education & Training', body_en: 'Vocational programs and skill development' },
      { section_key: 'csr_card_3', order: 20, icon: 'Award',
        title_en: 'Partnerships', body_en: 'Collaboration with civic organizations' },

      // ================= INNOVATION =================
      { section_key: 'innovation_main', order: 21, icon: 'Lightbulb',
        subtitle_en: 'Innovation', title_en: 'Pioneering the Future of Construction',
        body_en: 'At Al Faiha Group, innovation lies at the heart of everything we do.'
      },
      { section_key: 'innovation_dark_box', order: 22,
        title_en: '',
        body_en: 'From advanced construction chemicals to customized solutions for complex infrastructure projects, we continuously advance our technologies to anticipate and meet the needs of modern construction. Our approach blends global expertise with local insight, ensuring that we not only deliver superior performance but also set new benchmarks in durability, efficiency, and application methods.<br/><br/>Rooted in our core values, our drive for innovation is more than a process; it is a mindset that propels Al Faiha Group forward as a trusted partner in building the future.'
      }
    ]);

    console.log('✅ Flat Sustainability Sections seeded safely.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

seedSustainability();
