const ProjectSection = require('../models/ProjectSection');

const seedProjectSections = async () => {
    try {
        await ProjectSection.destroy({ where: {}, truncate: true });

        await ProjectSection.bulkCreate([
            {
                section_key: 'hero',
                title_en: 'Projects & Clients',
                title_ar: 'المشاريع والعملاء',
                subtitle_en: 'Case Studies',
                subtitle_ar: 'دراسات حالة',
                description_en: 'Delivering excellence across the MENA region. Explore our portfolio of landmark projects and trusted partnerships.',
                description_ar: 'نقدم التميز عبر منطقة الشرق الأوسط وشمال أفريقيا. استكشف محفظتنا من المشاريع البارزة والشراكات الموثوقة.',
                extra_data: JSON.stringify({
                    stats_projects_en: 'Projects',
                    stats_projects_ar: 'مشروع',
                    stats_countries_en: 'Countries',
                    stats_countries_ar: 'دول',
                    stats_sectors_en: 'Sectors',
                    stats_sectors_ar: 'قطاع'
                })
            },
            {
                section_key: 'filter',
                title_en: 'All Countries',
                title_ar: 'جميع الدول',
                description_en: 'Projects Found',
                description_ar: 'مشروع تم العثور عليه'
            },
            {
                section_key: 'card',
                title_en: 'Products Used',
                title_ar: 'المنتجات المستخدمة',
                subtitle_en: 'more',
                subtitle_ar: 'أخرى',
                btn_text_en: 'View Details',
                btn_text_ar: 'التفاصيل',
                empty_text_en: 'No projects found',
                empty_text_ar: 'لم يتم العثور على أي مشاريع',
                placeholder_en: 'Try selecting a different country filter',
                placeholder_ar: 'جرب اختيار فلتر دولة مختلف',
                extra_data: JSON.stringify({
                    view_all_en: 'View All Projects',
                    view_all_ar: 'عرض كافة المشاريع',
                    loading_en: 'Loading Projects...',
                    loading_ar: 'جاري تحميل المشاريع...'
                })
            }
        ]);

        console.log('✅ Project Sections seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Project Sections:', error);
    }
};

module.exports = seedProjectSections;
