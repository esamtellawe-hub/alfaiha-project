const ServiceSection = require('../models/ServiceSection');

const seedServiceSections = async () => {
    try {
        await ServiceSection.destroy({ where: {}, truncate: true });

        await ServiceSection.bulkCreate([
            {
                section_key: 'hero',
                title_en: 'Engineering Services',
                title_ar: 'الخدمات الهندسية',
                subtitle_en: 'Technical Excellence',
                subtitle_ar: 'التميز التقني',
                description_en: 'From specialized chemical formulations to on-site inspections, Al Faiha Group provides end-to-end expertise to ensure the success of your infrastructure projects.',
                description_ar: 'من التركيبات الكيميائية المتخصصة إلى الفحص الموقعي، توفر مجموعة الفيحاء خبرات شاملة لضمان نجاح مشاريع البنية التحتية الخاصة بك.',
                btn_text_en: '& Technical Support',
                btn_text_ar: 'والدعم الفني'
            },
            {
                section_key: 'cta',
                title_en: 'Need a Customized Solution?',
                title_ar: 'هل تحتاج إلى حل مخصص؟',
                description_en: 'Our technical teams is ready to develop tailored chemical formulations to meet the specific requirements of your project.',
                description_ar: 'فرقنا الفنية جاهزة لتطوير تركيبات كيميائية مصممة خصيصاً لتلبية المتطلبات المحددة لمشروعك.',
                btn_text_en: 'Request Technical Support',
                btn_text_ar: 'طلب دعم فني',
                icon_name: 'Settings'
            }
        ]);

        console.log('✅ Service Sections seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Service Sections:', error);
    }
};

module.exports = seedServiceSections;
