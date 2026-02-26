const MenuItem = require('../models/MenuItem');

const seedMenu = async () => {
  try {
    // FORCE RESET MENU ITEMS
    await MenuItem.destroy({ where: {}, truncate: true }); // Clear existing menu
    
    // --- 1. Services (Mega) ---
    const services = await MenuItem.create({
      key: 'services', label_en: 'Services', label_ar: 'الخدمات',
      path: '/services', type: 'mega', columns: 2, order: 1
    });

    await MenuItem.bulkCreate([
      { parent_id: services.id, label_en: 'Chemical Formulation', label_ar: 'الصياغة الكيميائية', path: '/services#chemical-formulation', description_en: 'Tailor-made solutions for Cement & Concrete', order: 1 },
      { parent_id: services.id, label_en: 'Technical Support', label_ar: 'الدعم الفني', path: '/services#technical-support', description_en: 'Inspection, Optimization & Testing', order: 2 },
      { parent_id: services.id, label_en: 'Consultancy & Specs', label_ar: 'الاستشارات والمواصفات', path: '/services#consultancy-specs', description_en: 'Guidance, Recommendations & Training', order: 3 },
      { parent_id: services.id, label_en: 'Quality Control', label_ar: 'مراقبة الجودة', path: '/services#quality-control', description_en: 'Raw Material & Finished Goods Testing', order: 4 },
      { parent_id: services.id, label_en: 'Waterproofing Support', label_ar: 'دعم العزل المائي', path: '/services#waterproofing-support', description_en: 'Inspection, Recommendation & Application', order: 5 },
      { parent_id: services.id, label_en: 'Supply Chain', label_ar: 'سلسلة التوريد', path: '/services#supply-chain', description_en: 'Logistics, Planning & Delivery', order: 6 },
      { parent_id: services.id, label_en: 'Turnkey Solutions', label_ar: 'حلول تسليم مفتاح', path: '/services#turnkey-solutions', description_en: 'Storage, Dosing & Calibration', order: 7 },
      { parent_id: services.id, label_en: 'Maintenance & Repair', label_ar: 'الصيانة والإصلاح', path: '/services#maintenance-repair', description_en: 'Analysis, Recommendation & Execution', order: 8 },
    ]);

    // --- 2. Solutions (Mega) ---
    const solutions = await MenuItem.create({
      key: 'solutions', label_en: 'Solutions', label_ar: 'الحلول',
      path: '/solutions', type: 'mega', columns: 3, order: 2
    });

    await MenuItem.bulkCreate([
       { parent_id: solutions.id, label_en: 'Concrete Admixtures', label_ar: 'إضافات الخرسانة', path: '/solutions#concrete-admixtures', order: 1 },
       { parent_id: solutions.id, label_en: 'Cement Additives', label_ar: 'إضافات الأسمنت', path: '/solutions#cement-additives', order: 2 },
       { parent_id: solutions.id, label_en: 'Tile Adhesives & Grout', label_ar: 'لواصق البلاط والروبة', path: '/solutions#tile-adhesives', order: 3 },
       { parent_id: solutions.id, label_en: 'Concrete Repair', label_ar: 'إصلاح الخرسانة', path: '/solutions#cementitious-repair', order: 4 },
       { parent_id: solutions.id, label_en: 'Protective Coating', label_ar: 'الطلاء الواقي', path: '/solutions#protective-coating', order: 5 },
       { parent_id: solutions.id, label_en: 'Waterproofing', label_ar: 'العزل المائي', path: '/solutions#waterproofing', order: 6 },
       { parent_id: solutions.id, label_en: 'Surface Treatment', label_ar: 'معالجة الأسطح', path: '/solutions#surface-treatments', order: 7 },
       { parent_id: solutions.id, label_en: 'Decorative Plastering', label_ar: 'اللياسة الديكورية', path: '/solutions#decorative', order: 8 },
       { parent_id: solutions.id, label_en: 'Flooring Products', label_ar: 'منتجات الأرضيات', path: '/solutions#flooring', order: 9 },
       { parent_id: solutions.id, label_en: 'Concrete Fibers', label_ar: 'ألياف الخرسانة', path: '/solutions#concrete-fibers', order: 10 },
       { parent_id: solutions.id, label_en: 'Sealants', label_ar: 'مانعات التسرب', path: '/solutions#sealants', order: 11 },
    ]);


    // --- 3. Sectors (Dropdown) ---
    const sectors = await MenuItem.create({
      key: 'sectors', label_en: 'Sectors', label_ar: 'القطاعات',
      path: '/sectors', type: 'dropdown', order: 3
    });
    
    await MenuItem.bulkCreate([
       { parent_id: sectors.id, label_en: 'Residential', label_ar: 'سكني', path: '/sectors#residential', order: 1 },
       { parent_id: sectors.id, label_en: 'Commercial', label_ar: 'تجاري', path: '/sectors#commercial', order: 2 },
       { parent_id: sectors.id, label_en: 'Infrastructure', label_ar: 'بنية تحتية', path: '/sectors#infrastructure', order: 3 },
       { parent_id: sectors.id, label_en: 'Industrial', label_ar: 'صناعي', path: '/sectors#industrial', order: 4 },
       { parent_id: sectors.id, label_en: 'Marine', label_ar: 'بحري', path: '/sectors#marine', order: 5 },
       { parent_id: sectors.id, label_en: 'Oil & Gas', label_ar: 'النفط والغاز', path: '/sectors#oil-gas', order: 6 },
    ]);

    // --- 4. Projects (Dropdown) ---
    // Added keys for easier identification
    const projects = await MenuItem.create({
        key: 'projects', label_en: 'Projects', label_ar: 'المشاريع',
        path: '/projects', type: 'dropdown', order: 4
    });
    
    // Updated with ALL countries from original Navbar
    await MenuItem.bulkCreate([
        { parent_id: projects.id, label_en: 'Algeria', label_ar: 'الجزائر', path: '/projects?country=algeria', order: 1 },
        { parent_id: projects.id, label_en: 'Jordan', label_ar: 'الأردن', path: '/projects?country=jordan', order: 2 },
        { parent_id: projects.id, label_en: 'Iraq', label_ar: 'العراق', path: '/projects?country=iraq', order: 3 },
        { parent_id: projects.id, label_en: 'Lebanon', label_ar: 'لبنان', path: '/projects?country=lebanon', order: 4 },
        { parent_id: projects.id, label_en: 'Saudi Arabia', label_ar: 'السعودية', path: '/projects?country=saudi-arabia', order: 5 },
    ]);

    // --- 5. Partners (Dropdown) ---
    const partners = await MenuItem.create({
        key: 'partners', label_en: 'Partners', label_ar: 'الشركاء',
        path: '/partners', type: 'dropdown', order: 5
    });
    
    // Added children from original Navbar
    await MenuItem.bulkCreate([
        { parent_id: partners.id, label_en: 'ECA Partners', label_ar: 'شركاء ECA', path: '/partners#eca-partnership', order: 1 },
        { parent_id: partners.id, label_en: 'Become a Partner', label_ar: 'كن شريكاً', path: '/partners#become-partner', order: 2 },
    ]);

    // --- 6. Sustainability (Link) ---
    await MenuItem.create({
        key: 'sustainability', label_en: 'Sustainability', label_ar: 'الاستدامة',
        path: '/sustainability', type: 'link', order: 6
    });

    // --- 7. About (Dropdown) ---
    const about = await MenuItem.create({
        key: 'about', label_en: 'About Us', label_ar: 'من نحن',
        path: '/about', type: 'dropdown', order: 7
    });
    
    // Added "Why Us"
    await MenuItem.bulkCreate([
        { parent_id: about.id, label_en: 'Message from Founder', label_ar: 'رسالة المؤسس', path: '/about#founder-message', order: 1 },
        { parent_id: about.id, label_en: 'Vision & Values', label_ar: 'الرؤية والقيم', path: '/about#vision-values', order: 2 },
        { parent_id: about.id, label_en: 'Our Story', label_ar: 'قصتنا', path: '/about#our-story', order: 3 },
        { parent_id: about.id, label_en: 'Why Us', label_ar: 'لماذا نحن', path: '/about#why-us', order: 4 },
    ]);

    // --- 8. Academy (Link) ---
    await MenuItem.create({
        key: 'academy', label_en: 'AFG Academy', label_ar: 'أكاديمية الفيحاء',
        path: '/academy', type: 'link', order: 8
    });

    console.log('✅ Menu Items seeded.');

  } catch (error) {
    console.error('❌ Error seeding Menu:', error);
  }
};

module.exports = seedMenu;
