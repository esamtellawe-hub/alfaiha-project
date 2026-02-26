const SectorSection = require('../models/SectorSection');

const seedSectorSections = async () => {
    try {
        await SectorSection.destroy({ where: {}, truncate: true });

        await SectorSection.bulkCreate([
            {
                section_key: 'hero',
                title_en: 'Sectors We Serve',
                title_ar: 'القطاعات التي نخدمها',
                subtitle_en: 'Sector Expertise',
                subtitle_ar: 'خبرة القطاع',
                description_en: 'Tailored engineering solutions for every industry. Select a sector to see our breakdown of areas and recommended materials.',
                description_ar: 'حلول معمارية وهندسية مصممة خصيصاً لكل قطاع. اختر قطاعاً لعرض توزيع الأقسام والمواد الموصى بها.'
            },
            {
                section_key: 'search',
                title_en: 'Sectors Found',
                title_ar: 'قطاع تم العثور عليه',
                subtitle_en: 'Clear Search',
                subtitle_ar: 'مسح البحث',
                placeholder_en: 'Search sectors, areas, or products...',
                placeholder_ar: 'ابحث عن القطاعات، المجالات، أو المنتجات...',
                empty_text_en: 'No sectors found matching',
                empty_text_ar: 'لم يتم العثور على قطاعات تطابق',
            },
            {
                section_key: 'ui_labels',
                title_en: 'Select Industry',
                title_ar: 'اختر الصناعة',
                subtitle_en: 'Engineering Areas',
                subtitle_ar: 'المجالات الهندسية',
                btn_text_en: 'Back to Areas',
                btn_text_ar: 'العودة إلى المجالات',
                description_en: 'Areas', // "X Areas"
                description_ar: 'مجالات',
                placeholder_en: 'Products', // "X Products"
                placeholder_ar: 'منتجات',
                empty_text_en: 'View Details',
                empty_text_ar: 'معلومات تفصيلية',
                extra_data: JSON.stringify({
                    loading_en: 'Loading sectors...',
                    loading_ar: 'جاري تحميل القطاعات...',
                    error_en: 'Error loading sectors!',
                    error_ar: 'خطأ في تحميل القطاعات!',
                    error_desc_en: 'Please try again later or contact support.',
                    error_desc_ar: 'يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بالدعم الفني.'
                })
            }
        ]);

        console.log('✅ Sector Sections seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Sector Sections:', error);
    }
};

module.exports = seedSectorSections;
