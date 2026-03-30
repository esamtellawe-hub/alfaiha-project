const PartnerSection = require('../models/PartnerSection');

const seedPartnerSections = async () => {
  const sections = [
    {
      section_key: 'hero',
      title_en: 'Building Together', title_ar: 'نبني معاً', title_fr: 'Construire Ensemble',
      subtitle_en: 'Strategic Partnerships', subtitle_ar: 'شراكات استراتيجية', subtitle_fr: 'Partenariats Stratégiques',
      description_en: 'Partnering with industry leaders to deliver excellence across the MENA region',
      description_ar: 'الشراكة مع قادة الصناعة لتقديم التميز في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا',
      description_fr: 'Partenariat avec les leaders de l\'industrie pour offrir l\'excellence dans la région MENA',
    },
    {
      section_key: 'eca_main',
      title_en: 'European Concrete Additives (ECA)', title_ar: 'إضافات الخرسانة الأوروبية (ECA)', title_fr: 'Additifs pour béton européens (ECA)',
      subtitle_en: 'Our Main Partner', subtitle_ar: 'شريكنا الرئيسي', subtitle_fr: 'Notre partenaire principal',
      description_en: `<p>European Concrete Additives (ECA), established in <span class="font-bold text-slate-800">2014</span> and headquartered in <span class="font-bold text-slate-800">Luxembourg</span>, is a leading construction products and materials technology company specializing in advanced solutions for concrete and cement innovation.</p><p>Al Faiha Group proudly serves as <span class="font-bold text-[#ee2039]">ECA's sole licensed manufacturer and regional partner</span> across the MENA region, bringing European expertise and technology to local markets.</p><p>Through this strategic partnership, Al Faiha Group leverages ECA's research, formulations, and technical know-how to produce high-performance concrete admixtures, cement additives, and specialty building materials tailored for regional needs.</p>`,
      description_ar: `<p>إضافات الخرسانة الأوروبية (ECA)، التي تأسست في <span class="font-bold text-slate-800">2014</span> ويقع مقرها في <span class="font-bold text-slate-800">لوكسمبورغ</span>، هي شركة رائدة في منتجات البناء وتكنولوجيا المواد متخصصة في الحلول المتقدمة لابتكار الخرسانة والأسمنت.</p><p>تفخر مجموعة الفيحاء بكونها <span class="font-bold text-[#ee2039]">المصنع المرخص الوحيد والشريك الإقليمي لـ ECA</span> في منطقة الشرق الأوسط وشمال أفريقيا، لتقديم الخبرة الأوروبية والتكنولوجيا للأسواق المحلية.</p><p>من خلال هذه الشراكة الاستراتيجية، تستفيد مجموعة الفيحاء من أبحاث ECA وصيغها والمعرفة التقنية لإنتاج إضافات خرسانة وإضافات أسمنت ومواد بناء متخصصة عالية الأداء مصممة لتلبية احتياجات المنطقة.</p>`,
      description_fr: `<p>European Concrete Additives (ECA), créée en <span class="font-bold text-slate-800">2014</span> et dont le siège est au <span class="font-bold text-slate-800">Luxembourg</span>, est une entreprise leader dans les produits de construction et la technologie des matériaux, spécialisée dans les solutions avancées pour l'innovation du béton et du ciment.</p><p>Al Faiha Group est fier d'être le <span class="font-bold text-[#ee2039]">fabricant sous licence exclusif et le partenaire régional d'ECA</span> dans la région MENA, apportant l'expertise et la technologie européennes sur les marchés locaux.</p><p>Grâce à ce partenariat stratégique, le groupe Al Faiha tire parti des recherches, des formulations et du savoir-faire technique d'ECA pour produire des adjuvants pour béton, des additifs pour ciment et des matériaux de construction de spécialité à haute performance, adaptés aux besoins de la région.</p>`,
    },
    {
      section_key: 'eca_stats',
      title_en: 'Partnership Excellence', title_ar: 'تميز الشراكة', title_fr: 'Excellence du partenariat',
      description_en: `Together, ECA and Al Faiha Group combine <span class="text-white font-bold">European innovation</span> with <span class="text-white font-bold">local manufacturing excellence</span>, ensuring that every product meets the highest international standards of quality, performance, and sustainability.`,
      description_ar: `معاً، تجمع ECA ومجموعة الفيحاء بين <span class="text-white font-bold">الابتكار الأوروبي</span> و<span class="text-white font-bold">التميز في التصنيع المحلي</span>، لضمان تلبية كل منتج لأعلى المعايير الدولية للجودة والأداء والاستدامة.`,
      description_fr: `Ensemble, ECA et Al Faiha Group combinent <span class="text-white font-bold">l'innovation européenne</span> avec <span class="text-white font-bold">l'excellence de la fabrication locale</span>, garantissant que chaque produit répond aux normes internationales les plus strictes en matière de qualité, de performance et de durabilité.`,
      extra_data: JSON.stringify({ 
        highlight_title_en: "", highlight_title_ar: "", highlight_title_fr: "" 
      })
    },
    {
      section_key: 'eca_benefits',
      title_en: 'Key Benefits', title_ar: 'المزايا الرئيسية', title_fr: 'Avantages Clés',
      extra_data: JSON.stringify({
        benefits: [
          { title_en: 'European Innovation', title_ar: 'الابتكار الأوروبي', title_fr: 'Innovation Européenne', desc_en: 'Cutting-edge technology', desc_ar: 'أحدث التقنيات', desc_fr: 'Technologie de pointe' },
          { title_en: 'Local Manufacturing', title_ar: 'التصنيع المحلي', title_fr: 'Fabrication Locale', desc_en: 'Regional excellence', desc_ar: 'التميز الإقليمي', desc_fr: 'Excellence régionale' },
          { title_en: 'Quality Standards', title_ar: 'معايير الجودة', title_fr: 'Normes de Qualité', desc_en: 'International compliance', desc_ar: 'الامتثال الدولي', desc_fr: 'Conformité internationale' },
          { title_en: 'Sustainability', title_ar: 'الاستدامة', title_fr: 'Durabilité', desc_en: 'Eco-friendly solutions', desc_ar: 'حلول صديقة للبيئة', desc_fr: 'Solutions écologiques' }
        ]
      })
    },
    {
      section_key: 'become_partner_intro',
      title_en: 'Become a Partner', title_ar: 'كن شريكاً', title_fr: 'Devenir Partenaire',
      subtitle_en: 'Join Our Network', subtitle_ar: 'انضم إلى شبكتنا', subtitle_fr: 'Rejoignez Notre Réseau',
      description_en: `<p>Since our establishment in <span class="font-bold text-slate-800">1987</span> as Jordan's first construction chemicals company, we've continued to expand our expertise, from concrete admixtures and cement additives to a full range of specialty building materials, powered by cutting-edge European technology from our partner European Concrete Additives (ECA).</p><p>As we continue to grow across the MENA region, Al Faiha Group welcomes strategic partners, distributors, contractors, and suppliers who share our commitment to excellence, performance, and integrity.</p>`,
      description_ar: `<p>منذ تأسيسنا في <span class="font-bold text-slate-800">1987</span> كأول شركة لكيماويات البناء في الأردن، واصلنا توسيع خبراتنا بدءاً من إضافات الخرسانة وصولاً إلى مجموعة كاملة من مواد البناء المتخصصة، والمدعومة بأحدث التكنولوجيا الأوروبية من شريكنا ECA.</p><p>مع استمرار نمونا عبر منطقة الشرق الأوسط وشمال أفريقيا، ترحب مجموعة الفيحاء بالشركاء والموزعين والمقاولين والموردين الاستراتيجيين الذين يشاركوننا التزامنا بالتميز والأداء والنزاهة.</p>`,
      description_fr: `<p>Depuis notre création en <span class="font-bold text-slate-800">1987</span> en tant que première entreprise de produits chimiques pour la construction de Jordanie, nous avons continué à développer notre expertise, allant des adjuvants pour béton et ciment à une gamme complète de matériaux de construction spécialisés, propulsés par la technologie européenne de pointe de notre partenaire ECA.</p><p>Alors que nous continuons de croître dans la région MENA, le groupe Al Faiha accueille des partenaires stratégiques, des distributeurs, des entrepreneurs et des fournisseurs qui partagent notre engagement envers l'excellence, la performance et l'intégrité.</p>`,
      extra_data: JSON.stringify({
        short_desc_en: "At Al Faiha Group, we believe in building strong partnerships that drive innovation, quality, and sustainable growth across the construction industry.",
        short_desc_ar: "في مجموعة الفيحاء، نؤمن ببناء شراكات قوية تدفع الابتكار والجودة والنمو المستدام في صناعة البناء.",
        short_desc_fr: "Chez Al Faiha Group, nous croyons en l'établissement de partenariats solides qui stimulent l'innovation, la qualité et la croissance durable dans l'industrie de la construction."
      })
    },
    {
      section_key: 'partner_features',
      title_en: 'Why Partner With Us', title_ar: 'لماذا تتعامل معنا بشراكة', title_fr: 'Pourquoi devenir partenaire',
      extra_data: JSON.stringify({
        features: [
          { icon: 'Award', title_en: 'Trusted Legacy', title_ar: 'إرث موثوق', title_fr: 'Héritage de Confiance', desc_en: 'Over 35 years of experience and leadership in construction chemicals, combining a trusted legacy with exclusive technology.', desc_ar: 'أكثر من 35 عاماً من الخبرة والريادة في كيماويات البناء، لجمع الإرث الموثوق بالتكنولوجيا الحصرية.', desc_fr: 'Plus de 35 ans d\'expérience et de leadership dans les produits chimiques de construction, combinant un héritage de confiance avec une technologie exclusive.' },
          { icon: 'Globe', title_en: 'Exclusive Technology', title_ar: 'تكنولوجيا حصرية', title_fr: 'Technologie Exclusive', desc_en: 'Sole licensed manufacturer of ECA products in the MENA region, bringing European innovation to local markets.', desc_ar: 'المصنع الوحيد المرخص لمنتجات ECA في منطقة الشرق الأوسط وشمال إفريقيا، لجلب الابتكار الأوروبي إلى الأسواق المحلية.', desc_fr: 'Seul fabricant agréé de produits ECA dans la région MENA, apportant l\'innovation européenne aux marchés locaux.' },
          { icon: 'TrendingUp', title_en: 'Collaborative Growth', title_ar: 'نمو تعاوني', title_fr: 'Croissance Collaborative', desc_en: 'Technical training, marketing support, and long-term opportunities built on mutual success.', desc_ar: 'التدريب التقني ودعم التسويق والفرص الطويلة الأجل المبنية على النجاح المشترك.', desc_fr: 'Formation technique, support marketing et opportunités à long terme fondées sur le succès mutuel.' }
        ]
      })
    },
    {
      section_key: 'partner_cta',
      title_en: "Let's Build the Future Together", title_ar: "لنبني المستقبل معاً", title_fr: "Construisons l'avenir ensemble",
      description_en: "Whether you're looking to represent our products, integrate our solutions into your projects, or explore new opportunities across the region, we welcome you to join our growing network of partners.",
      description_ar: "سواء كنت تتطلع إلى تمثيل منتجاتنا، أو دمج حلولنا في مشاريعك، أو استكشاف فرص جديدة في جميع أنحاء المنطقة، نرحب بك للانضمام إلى شبكتنا المتنامية من الشركاء.",
      description_fr: "Que vous cherchiez à représenter nos produits, à intégrer nos solutions dans vos projets ou à explorer de nouvelles opportunités à travers la région, nous vous invitons à rejoindre notre réseau grandissant de partenaires.",
      btn_text_en: "Get in Touch", btn_text_ar: "تواصل معنا", btn_text_fr: "Entrer en contact",
      extra_data: JSON.stringify({
          email_btn_en: "Email Us", email_btn_ar: "راسلنا", email_btn_fr: "Envoyez-nous un email"
      })
    }
  ];

  for (const info of sections) {
    const [section, created] = await PartnerSection.findOrCreate({
      where: { section_key: info.section_key },
      defaults: info
    });
    if (!created) await section.update(info);
  }

  console.log('✅ Full 3-Language Partner sections seeded with perfect HTML parity!');
};

module.exports = seedPartnerSections;
