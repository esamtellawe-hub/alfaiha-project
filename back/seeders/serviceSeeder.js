const Service = require('../models/Service');

const seedServices = async () => {
    try {
        await Service.destroy({ where: {}, truncate: true });

        await Service.bulkCreate([
            {
                slug: "cement-enhancers",
                icon_name: "FlaskConical",
                title_en: "Cement Enhancers Formulation",
                title_ar: "تركيب محسنات الإسمنت",
                description_en: "Custom development of cement admixtures and enhancers designed to improve workability, strength, and durability for specific environmental conditions.",
                description_ar: "تطوير مخصص لإضافات ومحسنات الإسمنت المصممة لتحسين قابلية التشغيل والقوة والمتانة لظروف بيئية محددة.",
                sub_services_en: [
                    { name: "Admixture Customization", desc: "Tailoring chemical structures for local cement types." },
                    { name: "Performance Optimization", desc: "Enhancing compressive strength and setting times." }
                ],
                sub_services_ar: [
                    { name: "تخصيص الإضافات", desc: "تصميم الهياكل الكيميائية لأنواع الإسمنت المحلية." },
                    { name: "تحسين الأداء", desc: "تعزيز قوة الضغط وأوقات التماسك." }
                ],
                related_products_en: [
                    { id: "concrete-admixtures", label: "Concrete Admixtures" }
                ],
                related_sectors_en: [
                    { id: "ready-mix", label: "Ready-Mix Concrete" }
                ]
            },
            {
                slug: "on-site-testing",
                icon_name: "ClipboardCheck",
                title_en: "On-Site Inspection & Testing",
                title_ar: "الفحص والاختبار الموقعي",
                description_en: "Comprehensive field evaluations and laboratory testing to ensure the quality and compatibility of construction materials before and during application.",
                description_ar: "تقييمات ميدانية شاملة واختبارات معملية لضمان جودة وتوافق مواد البناء قبل وأثناء التطبيق.",
                sub_services_en: [
                    { name: "Material Compatibility", desc: "Testing admixtures with specific local aggregates." },
                    { name: "Quality Assurance", desc: "Continuous monitoring of concrete batches." }
                ],
                sub_services_ar: [
                    { name: "توافق المواد", desc: "اختبار الإضافات مع الركام المحلي المحدد." },
                    { name: "ضمان الجودة", desc: "مراقبة مستمرة لدفعات الخرسانة." }
                ],
                case_studies_en: [
                    { id: "project-1", label: "QA for Metro Project" }
                ]
            },
            {
                slug: "custom-engineering",
                icon_name: "HardHat",
                title_en: "Custom Chemical Engineering",
                title_ar: "الهندسة الكيميائية المخصصة",
                description_en: "Partner with our R&D team to engineer bespoke chemical solutions that solve unique construction challenges, from extreme weather resilience to rapid curing requirements.",
                description_ar: "شراكة مع فريق البحث والتطوير لدينا لهندسة حلول كيميائية مخصصة تحل تحديات البناء الفريدة، من مرونة الطقس القاسي إلى متطلبات المعالجة السريعة.",
                sub_services_en: [
                    { name: "R&D Partnership", desc: "Collaborative development of new formulations." },
                    { name: "Extreme Climate Solutions", desc: "Products designed for MENA's high temperatures." }
                ],
                sub_services_ar: [
                    { name: "شراكة البحث والتطوير", desc: "تطوير تعاوني لتركيبات جديدة." },
                    { name: "حلول المناخ القاسي", desc: "منتجات مصممة لدرجات الحرارة المرتفعة في المنطقة." }
                ]
            },
            {
                slug: "logistical-support",
                icon_name: "Truck",
                title_en: "Logistical & Supply Chain Support",
                title_ar: "الدعم اللوجستي وسلسلة التوريد",
                description_en: "End-to-end supply chain management ensuring timely delivery of critical chemical materials across the MENA region, supported by our robust distribution network.",
                description_ar: "إدارة شاملة لسلسلة التوريد لضمان التسليم في الوقت المناسب للمواد الكيميائية الحيوية في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا، مدعومة بشبكة التوزيع القوية لدينا.",
                sub_services_en: [
                    { name: "Regional Distribution", desc: "Fast logistics across multiple countries." },
                    { name: "Inventory Management", desc: "Reliable stock availability for large projects." }
                ],
                sub_services_ar: [
                    { name: "التوزيع الإقليمي", desc: "لوجستيات سريعة عبر بلدان متعددة." },
                    { name: "إدارة المخزون", desc: "توافر مخزون موثوق للمشاريع الكبيرة." }
                ]
            }
        ]);

        console.log('✅ Services seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Services:', error);
    }
};

module.exports = seedServices;
