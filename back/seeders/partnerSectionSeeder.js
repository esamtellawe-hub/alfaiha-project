const sequelize = require('../config/database');
const PartnerSection = require('../models/PartnerSection');

const seedPartnerSections = async () => {
  try {
    await sequelize.sync(); 

    const sections = [
      {
        section_key: 'hero',
        title_en: 'Building Together',
        title_ar: 'نبني معاً',
        subtitle_en: 'Strategic Partnerships',
        subtitle_ar: 'شراكات استراتيجية',
        description_en: 'Partnering with industry leaders to deliver excellence across the MENA region',
        description_ar: 'شراكات مع قادة الصناعة لتقديم التميز في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا'
      },
      {
        section_key: 'eca_partnership',
        title_en: 'European Concrete Additives (ECA)',
        title_ar: 'الإضافات الخرسانية الأوروبية (ECA)',
        subtitle_en: 'Our Main Partner',
        subtitle_ar: 'شريكنا الرئيسي',
        description_en: 'European Concrete Additives (ECA), established in 2014 and headquartered in Luxembourg, is a leading construction products and materials technology company specializing in advanced solutions for concrete and cement innovation.\n\nAl Faiha Group proudly serves as ECA\'s sole licensed manufacturer and regional partner across the MENA region, bringing European expertise and technology to local markets.\n\nThrough this strategic partnership, Al Faiha Group leverages ECA\'s research, formulations, and technical know-how to produce high-performance concrete admixtures, cement additives, and specialty building materials tailored for regional needs.',
        description_ar: 'شركة الإضافات الخرسانية الأوروبية (ECA)، تأسست في عام 2014 ومقرها في لوكسمبورغ، هي شركة رائدة في منتجات البناء وتكنولوجيا المواد تتخصص في الحلول المتقدمة للخرسانة وابتكار الأسمنت.\n\nتفخر مجموعة الفيحاء بكونها المصنع الوحيد المرخص لشركة ECA والشريك الإقليمي في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا، مما يجلب الخبرة والتكنولوجيا الأوروبية إلى الأسواق المحلية.\n\nمن خلال هذه الشراكة الاستراتيجية، تستفيد مجموعة الفيحاء من أبحاث ECA وتركيباتها ومعرفتها التقنية لإنتاج مضافات خرسانية عالية الأداء ومضافات أسمنتية ومواد بناء متخصصة مصممة خصيصاً للاحتياجات الإقليمية.',
        extra_data: {
          benefits: [
            { title_en: 'European Innovation', title_ar: 'الابتكار الأوروبي', desc_en: 'Cutting-edge technology', desc_ar: 'أحدث التقنيات' },
            { title_en: 'Local Manufacturing', title_ar: 'التصنيع المحلي', desc_en: 'Regional excellence', desc_ar: 'التميز الإقليمي' },
            { title_en: 'Quality Standards', title_ar: 'معايير الجودة', desc_en: 'International compliance', desc_ar: 'الامتثال الدولي' },
            { title_en: 'Sustainability', title_ar: 'الاستدامة', desc_en: 'Eco-friendly solutions', desc_ar: 'حلول صديقة للبيئة' }
          ],
          highlight_title_en: 'Partnership Excellence',
          highlight_title_ar: 'شراكة متميزة',
          highlight_desc_en: 'Together, ECA and Al Faiha Group combine European innovation with local manufacturing excellence, ensuring that every product meets the highest international standards of quality, performance, and sustainability.',
          highlight_desc_ar: 'معاً، تجمع ECA ومجموعة الفيحاء بين الابتكار الأوروبي والتميز في التصنيع المحلي، لضمان تلبية كل منتج لأعلى المعايير الدولية للجودة والأداء والاستدامة.'
        }
      },
      {
        section_key: 'become_partner',
        title_en: 'Become a Partner',
        title_ar: 'كن شريكاً',
        subtitle_en: 'Join Our Network',
        subtitle_ar: 'انضم إلى شبكتنا',
        description_en: 'At Al Faiha Group, we believe in building strong partnerships that drive innovation, quality, and sustainable growth across the construction industry.\n\nSince our establishment in 1987 as Jordan\'s first construction chemicals company, we\'ve continued to expand our expertise, from concrete admixtures and cement additives to a full range of specialty building materials, powered by cutting-edge European technology from our partner European Concrete Additives (ECA).\n\nAs we continue to grow across the MENA region, Al Faiha Group welcomes strategic partners, distributors, contractors, and suppliers who share our commitment to excellence, performance, and integrity.',
        description_ar: 'في مجموعة الفيحاء، نؤمن ببناء شراكات قوية تدفع الابتكار الجودة والنمو المستدام في جميع أنحاء صناعة البناء.\n\nمنذ تأسيسنا في عام 1987 كأول شركة لكيماويات البناء في الأردن، واصلنا توسيع خبرتنا، من إضافات الخرسانة ومضافات الأسمنت إلى مجموعة كاملة من مواد البناء المتخصصة، مدعومة بتكنولوجيا أوروبية متطورة من شريكنا European Concrete Additives (ECA).\n\nمع استمرارنا في النمو في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا، ترحب مجموعة الفيحاء بالشركاء الاستراتيجيين والموزعين والمقاولين والموردين الذين يشاركوننا التزامنا بالتميز والأداء والنزاهة.',
        btn_text_en: 'Get in Touch',
        btn_text_ar: 'تواصل معنا',
        extra_data: {
          email_btn_en: 'Email Us',
          email_btn_ar: 'راسلنا',
          cta_title_en: 'Let\'s Build the Future Together',
          cta_title_ar: 'لنبني المستقبل معاً',
          cta_desc_en: 'Whether you\'re looking to represent our products, integrate our solutions into your projects, or explore new opportunities across the region, we welcome you to join our growing network of partners.',
          cta_desc_ar: 'سواء كنت تبحث عن تمثيل منتجاتنا، أو دمج حلولنا في مشاريعك، أو استكشاف فرص جديدة عبر المنطقة، نرحب بانضمامك إلى شبكة شركائنا المتنامية.',
          features: [
            { icon: 'Award', title_en: 'Trusted Legacy', title_ar: 'إرث موثوق', desc_en: 'Over 35 years of experience and leadership in construction chemicals, combining a trusted legacy with exclusive technology.', desc_ar: 'أكثر من 35 عاماً من الخبرة والريادة في كيماويات البناء، لجمع الإرث الموثوق مع التكنولوجيا الحصرية.' },
            { icon: 'Globe', title_en: 'Exclusive Technology', title_ar: 'تكنولوجيا حصرية', desc_en: 'Sole licensed manufacturer of ECA products in the MENA region, bringing European innovation to local markets.', desc_ar: 'الشركة المصنعة الوحيدة المرخصة لمنتجات ECA في منطقة الشرق الأوسط وشمال أفريقيا، مما يجلب الابتكار الأوروبي إلى الأسواق المحلية.' },
            { icon: 'TrendingUp', title_en: 'Collaborative Growth', title_ar: 'نمو تعاوني', desc_en: 'Technical training, marketing support, and long-term opportunities built on mutual success.', desc_ar: 'التدريب الفني ودعم التسويق والفرص طويلة الأجل المبنية على النجاح المتبادل.' }
          ]
        }
      }
    ];

    for (let sec of sections) {
      // Ensure extra_data is serialized if exist
      if (sec.extra_data) sec.extra_data = JSON.stringify(sec.extra_data);
      
      const existing = await PartnerSection.findOne({ where: { section_key: sec.section_key } });
      if (!existing) {
        await PartnerSection.create(sec);
        console.log(`[PartnerSection] INSERTED: ${sec.section_key}`);
      } else {
        console.log(`[PartnerSection] ALREADY EXISTS: ${sec.section_key}`);
      }
    }
    
    console.log('PartnerSections seeded successfully!');
  } catch (error) {
    console.error('Error seeding PartnerSections:', error);
  }
};

module.exports = seedPartnerSections;
