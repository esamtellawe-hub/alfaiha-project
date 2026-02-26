const SolutionSection = require('../models/SolutionSection');

const seedSolutionSections = async () => {
    try {
        await SolutionSection.destroy({ where: {}, truncate: true });

        await SolutionSection.bulkCreate([
            {
                section_key: 'hero',
                title_en: 'Engineered Solutions',
                title_ar: 'حلول هندسية',
                subtitle_en: 'Solutions Catalogue',
                subtitle_ar: 'كتالوج الحلول',
                description_en: 'Browse our comprehensive range of specialized construction chemicals engineered to address the most demanding infrastructure and building challenges.',
                description_ar: 'تصفح مجموعتنا الشاملة من كيماويات البناء المتخصصة والمصممة هندسياً لمواجهة أكثر تحديات البنية التحتية والبناء تطلباً.'
            },
            {
                section_key: 'search',
                title_en: 'Categories Found', // Used for "X Categories Found"
                title_ar: 'فئات تم العثور عليها',
                subtitle_en: 'Clear Search',
                subtitle_ar: 'مسح البحث',
                placeholder_en: 'Search categories, sub-categories, or products...',
                placeholder_ar: 'ابحث في الفئات، الفئات الفرعية، أو المنتجات...',
                empty_text_en: 'No solutions found matching',
                empty_text_ar: 'لم يتم العثور على حلول مطابقة لـ',
                description_en: 'No solutions available in this category yet.',
                description_ar: 'لا تتوفر حلول في هذه الفئة حتى الآن.',
            },
            {
                section_key: 'footer_note',
                title_en: '',
                title_ar: '',
                description_en: 'Technical Data Sheets (TDS) & Material Safety Data Sheets (MSDS) will be available for download shortly.',
                description_ar: 'صحائف البيانات الفنية (TDS) وصحائف بيانات سلامة المواد (MSDS) ستكون متاحة للتنزيل قريباً.'
            }
        ]);

        console.log('✅ Solution Sections seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Solution Sections:', error);
    }
};

module.exports = seedSolutionSections;
