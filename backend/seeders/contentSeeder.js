const Service = require('../models/Service');
const NewsArticle = require('../models/NewsArticle');
const Job = require('../models/Job');

const seedContent = async () => {
    try {
        // 1. Seed Services
        // 1. Seed Services
        const serviceCount = await Service.count();
        if (serviceCount === 0) {
            await Service.bulkCreate([
                {
                    slug: "chemical-formulation",
                    title_en: "Chemical Formulation & Customization",
                    title_ar: "التركيب الكيميائي والتخصيص",
                    icon_name: "Settings",
                    description_en: "Developing specialized chemical solutions tailored to unique project requirements.",
                    description_ar: "تطوير حلول كيميائية متخصصة مصممة لتلبية متطلبات المشروع الفريدة.",
                    sub_services_en: [
                        { name: "Tailor-made Solutions for Cement", desc: "Customized additives for increased cement performance." },
                        { name: "Tailor-made Solutions for Concrete", desc: "Formulations designed for increased strength, durability, and workability." }
                    ],
                    related_products_en: [
                        { id: "cement-additives", label: "Cement Additives" },
                        { id: "concrete-admixtures", label: "Concrete Admixtures" }
                    ],
                    related_sectors_en: [
                        { id: "industrial", label: "Industrial" },
                        { id: "infrastructure", label: "Infrastructure" }
                    ],
                    case_studies_en: [
                        { id: "inerkib-power", label: "Power Generation Plants" }
                    ]
                },
                {
                    slug: "technical-support",
                    title_en: "Technical Support & Site Assistance",
                    title_ar: "الدعم الفني والمساعدة في الموقع",
                    icon_name: "HardHat",
                    description_en: "Expert on-site guidance to ensure optimal product performance and application.",
                    description_ar: "توجيه الخبراء في الموقع لضمان الأداء الأمثل للمنتج والتطبيق.",
                    sub_services_en: [
                        { name: "On-Site Inspection", desc: "Detailed site assessment and evaluation." },
                        { name: "Solution Optimization", desc: "Fine-tuning products for best results." },
                        { name: "Testing & Troubleshooting", desc: "Identifying and resolving performance issues." },
                        { name: "Performance Evaluation", desc: "Ensuring systems meet required standards." }
                    ],
                    related_products_en: [
                        { id: "concrete-admixtures", label: "Concrete Admixtures" },
                        { id: "cementitious-repair", label: "Concrete Repair" }
                    ],
                    related_sectors_en: [
                        { id: "residential", label: "Residential" },
                        { id: "commercial", label: "Commercial" }
                    ],
                    case_studies_en: [
                        { id: "gcb-desalination", label: "Desalination Plants" }
                    ]
                },
                {
                    slug: "consultancy-specs",
                    title_en: "Consultancy & Specification",
                    title_ar: "الاستشارات والمواصفات",
                    icon_name: "ClipboardCheck",
                    description_en: "Strategic support in defining technical requirements and material selection.",
                    description_ar: "دعم استراتيجي في تحديد المتطلبات الفنية واختيار المواد.",
                    sub_services_en: [
                         { name: "Project Specification Guidance", desc: "Support in defining technical requirements." },
                         { name: "Material Specification Recommendation", desc: "Selecting the right materials for each project." },
                         { name: "Solution Application Guidance", desc: "Best-practice application support." },
                         { name: "Training & Support", desc: "Technical training for teams and applicators." }
                    ],
                    related_products_en: [
                         { id: "tile-adhesives", label: "Tile Adhesives & Grout" },
                         { id: "concrete-admixtures", label: "Concrete Admixtures" }
                    ],
                    related_sectors_en: [
                         { id: "infrastructure", label: "Infrastructure" },
                         { id: "educational", label: "Educational" }
                    ],
                    case_studies_en: [
                         { id: "cosider-silos", label: "Industrial Facilities" }
                    ]
                },
                {
                    slug: "quality-control",
                    title_en: "Quality Control & Lab Services",
                    title_ar: "مراقبة الجودة وخدمات المختبر",
                    icon_name: "FlaskConical",
                    description_en: "Comprehensive testing services to validate material quality and performance.",
                    description_ar: "خدمات اختبار شاملة للتحقق من جودة المواد والأداء.",
                    sub_services_en: [
                        { name: "Chemical, Physical & Functionality Testing", desc: "Comprehensive lab testing services for raw materials and finished goods." },
                        { name: "Compatibility & Performance Testing", desc: "Ensuring material synergy." }
                    ],
                    related_products_en: [
                        { id: "cement-additives", label: "Cement Additives" },
                        { id: "concrete-admixtures", label: "Concrete Admixtures" }
                    ],
                    related_sectors_en: [
                        { id: "industrial", label: "Industrial" }
                    ]
                },
                {
                    slug: "waterproofing-support",
                    title_en: "Waterproofing Application Support",
                    title_ar: "دعم تطبيق العزل المائي",
                    icon_name: "Droplets",
                    description_en: "Specialized supervision for high-performance waterproofing installations.",
                    description_ar: "إشراف متخصص لتركيبات العزل المائي عالية الأداء.",
                    sub_services_en: [
                        { name: "Area Inspection", desc: "Site evaluation before application." },
                        { name: "System Recommendation", desc: "Selecting the most effective waterproofing system." },
                        { name: "Application of System", desc: "Supervised system application support." },
                        { name: "Post-Application Testing", desc: "Performance verification after installation." }
                    ],
                    related_products_en: [
                        { id: "waterproofing", label: "Waterproofing" },
                        { id: "protective-coating", label: "Protective Coating" }
                    ],
                    related_sectors_en: [
                        { id: "residential", label: "Residential" },
                        { id: "infrastructure", label: "Infrastructure" }
                    ],
                    case_studies_en: [
                        { id: "gcb-desalination", label: "Desalination Plants" }
                    ]
                },
                {
                    slug: "supply-chain",
                    title_en: "Supply Chain Management",
                    title_ar: "إدارة سلسلة التوريد",
                    icon_name: "Truck",
                    description_en: "Reliable logistics and coordination to meet demanding project schedules.",
                    description_ar: "لوجستيات موثوقة وتنسيق لتلبية جداول المشاريع المتطلبة.",
                    sub_services_en: [
                        { name: "Customer Needs Assessment", desc: "Understanding project and supply requirements." },
                        { name: "Logistics, Planning & Scheduling", desc: "Efficient supply coordination." },
                        { name: "Freight & Transportation", desc: "Reliable transport solutions." },
                        { name: "Delivery & Application", desc: "Timely delivery with application support." }
                    ],
                    related_products_en: [
                        { id: "concrete-admixtures", label: "Concrete Admixtures" }
                    ],
                    related_sectors_en: [
                        { id: "commercial", label: "Commercial" },
                        { id: "infrastructure", label: "Infrastructure" }
                    ]
                },
                {
                    slug: "turnkey-solutions",
                    title_en: "Turnkey Factory Solutions",
                    title_ar: "حلول المصانع الجاهزة",
                    icon_name: "Factory",
                    description_en: "Complete setup support for storage and dosing equipment.",
                    description_ar: "دعم كامل للإعداد لأنظمة التخزين ومعدات المعايرة.",
                    sub_services_en: [
                         { name: "Premium Storage Solutions", desc: "Safe and efficient chemical storage systems." },
                         { name: "Dosing Calibration Equipment", desc: "Accurate and reliable dosing solutions." },
                         { name: "Weather Proof Technology", desc: "Protection against environmental conditions." },
                         { name: "On-Site Application & Maintenance", desc: "Complete installation and upkeep support." }
                    ],
                    related_products_en: [
                         { id: "concrete-admixtures", label: "Concrete Admixtures" },
                         { id: "cement-additives", label: "Cement Additives" }
                    ],
                    related_sectors_en: [
                         { id: "industrial", label: "Industrial" }
                    ],
                    case_studies_en: [
                         { id: "inerkib-power", label: "Power Generation Plants" }
                    ]
                },
                {
                    slug: "maintenance-repair",
                    title_en: "Maintenance & Repair",
                    title_ar: "الصيانة والإصلاح",
                    icon_name: "Wrench",
                    description_en: "Targeted repair strategies to extend the lifecycle of existing structures.",
                    description_ar: "استراتيجيات إصلاح مستهدفة لتمديد دورة حياة الهياكل القائمة.",
                    sub_services_en: [
                        { name: "On-Site Inspection", desc: "Condition assessment of existing systems." },
                        { name: "Problem Analysis", desc: "Identifying root causes of failures." },
                        { name: "Solution Recommendation", desc: "Targeted repair strategies." },
                        { name: "On-Site Application & Repair", desc: "Professional repair execution." },
                        { name: "Post-Application Services", desc: "Ongoing performance support." }
                    ],
                    related_products_en: [
                        { id: "cementitious-repair", label: "Concrete Repair" },
                        { id: "protective-coating", label: "Protective Coating" }
                    ],
                    related_sectors_en: [
                        { id: "residential", label: "Residential" },
                        { id: "commercial", label: "Commercial" }
                    ],
                    case_studies_en: [
                        { id: "gcb-desalination", label: "Desalination Plants" }
                    ]
                }
            ]);
            console.log('✅ Services seeded.');
        }

        // 2. Seed News
        const newsCount = await NewsArticle.count();
        if (newsCount === 0) {
            await NewsArticle.create({
                slug: 'alfaiha-at-big5',
                title_en: 'AlFaiha Participates in Big 5 Dubia',
                title_ar: 'الفيحاء تشارك في معرض الخمسة الكبار في دبي',
                content_en: 'We are proud to announce our participation in the largest construction event in the Middle East...',
                content_ar: 'نحن فخورون بالإعلان عن مشاركتنا في أكبر حدث للبناء في الشرق الأوسط...',
                publish_date: new Date()
            });
            console.log('✅ News Articles seeded.');
        }

        // 3. Seed Jobs
        const jobsCount = await Job.count();
        if (jobsCount === 0) {
            await Job.create({
                title_en: 'Sales Engineer',
                title_ar: 'مهندس مبيعات',
                location_en: 'Amman, Jordan',
                location_ar: 'عمان، الأردن',
                type: 'Full Time',
                description_en: 'We are looking for an experienced Sales Engineer...'
            });
            console.log('✅ Jobs seeded.');
        }

    } catch (error) {
        console.error('❌ Error seeding Content:', error);
    }
};

module.exports = seedContent;
