const HomeHero = require('../models/HomeHero');
const HomeSection = require('../models/HomeSection');
const Certification = require('../models/Certification');

const seedHomeData = async () => {
    try {
        // CLEANUP
        await HomeHero.destroy({ where: {}, truncate: true });
        await HomeSection.destroy({ where: {}, truncate: true });
        await Certification.destroy({ where: {}, truncate: true });

        // 1. Seed Hero Slides
        await HomeHero.bulkCreate([
            {
                image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
                title_en: 'Building the Future with',
                title_ar: 'نبني المستقبل بـ',
                subtitle_en: 'Engineering Excellence Since 1987',
                subtitle_ar: 'تميز هندسي منذ 1987',
                btn_1_text_en: 'Explore Solutions', 
                btn_1_text_ar: 'استكشف الحلول',
                btn_1_link: '/solutions',
                order: 1,
                // Using description field for the highlight "Confidence" or full text? 
                // The frontend splits title into two parts. PROPOSAL: Store "Confidence" in description for now or extra_data.
                // Let's use description_en for the main paragraph and extra_data for the highlight word.
                description_en: 'Your trusted partner for advanced construction chemicals and engineering solutions tailored for the MENA region.',
                description_ar: 'شريكك الموثوق لكيماويات البناء المتقدمة والحلول الهندسية المصممة لمنطقة الشرق الأوسط وشمال أفريقيا.',
                extra_data: { highlight_en: 'Confidence', highlight_ar: 'ثقة' }
            },
            {
                image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
                title_en: 'Expertise You Can',
                title_ar: 'خبرة يمكنك',
                subtitle_en: 'Technical Support & Consultancy',
                subtitle_ar: 'الدعم الفني والاستشارات',
                btn_1_text_en: 'Explore Solutions',
                btn_1_text_ar: 'استكشف الحلول',
                btn_1_link: '/solutions',
                order: 2,
                description_en: 'From on-site inspections to tailored formulations, our engineers deliver solutions that solve your toughest challenges.',
                description_ar: 'من الفحص الموقعي إلى التركيبات المخصصة، يقدم مهندسونا حلولاً تعالج أصعب تحدياتك.',
                extra_data: { highlight_en: 'Rely On', highlight_ar: 'الاعتماد عليها' }
            },
            {
                image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
                title_en: 'Innovation in Every',
                title_ar: 'الابتكار في كل',
                subtitle_en: 'Advanced Chemical Formulations',
                subtitle_ar: 'تركيبات كيميائية متقدمة',
                btn_1_text_en: 'Explore Solutions',
                btn_1_text_ar: 'استكشف الحلول',
                btn_1_link: '/solutions',
                order: 3,
                description_en: 'Sole licensed manufacturer of European Concrete Additives (ECA), bringing world-class technology to local markets.',
                description_ar: 'المصنع المرخص الوحيد لإضافات الخرسانة الأوروبية (ECA)، نجلب تكنولوجيا عالمية للأسواق المحلية.',
                extra_data: { highlight_en: 'Drop', highlight_ar: 'قطرة' }
            }
        ]);
        console.log('✅ Home Hero Slides seeded.');

        // 2. Seed Home Sections (Stats & CTA)
        await HomeSection.bulkCreate([
            // Stats
            {
                section_key: 'stat_experience',
                title_en: 'Years of Experience', title_ar: 'سنوات الخبرة',
                description_en: 'Since 1987', description_ar: 'منذ 1987',
                icon_name: 'Award',
                extra_data: { value: 37, suffix: '+' } // Calculated from 1987 to 2024 ~37
            },
            {
                section_key: 'stat_countries',
                title_en: 'Countries', title_ar: 'دولة',
                description_en: 'MENA Presence', description_ar: 'تواجد في المنطقة',
                icon_name: 'Globe',
                extra_data: { value: 12, suffix: '' }
            },
            {
                section_key: 'stat_employees',
                title_en: 'Employees', title_ar: 'موظف',
                description_en: 'Dedicated Professionals', description_ar: 'محترفون مخلصون',
                icon_name: 'Users',
                extra_data: { value: 150, suffix: '+' }
            },
            {
                section_key: 'stat_projects',
                title_en: 'Project Value', title_ar: 'قيمة المشاريع',
                description_en: 'Delivered Excellence', description_ar: 'تميز تم تسليمه',
                icon_name: 'TrendingUp',
                extra_data: { value: 500, suffix: 'M+' }
            },
            // CTA Sections
            {
                section_key: 'cta_academy',
                title_en: 'AFG Academy', title_ar: 'أكاديمية الفيحاء',
                description_en: 'Empowering the next generation of engineers with hands-on training, technical workshops, and certification programs.',
                description_ar: 'تمكين الجيل القادم من المهندسين من خلال التدريب العملي وورش العمل الفنية وبرامج الشهادات.',
                btn_text_en: 'Join the Program', btn_text_ar: 'انضم للبرنامج',
                link_url: '/academy',
                image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
                icon_name: 'GraduationCap'
            },
            {
                section_key: 'cta_partners',
                title_en: 'Become a Partner', title_ar: 'كن شريكاً',
                description_en: 'Join our growing network of distributors and applicators across the MENA region. Let\'s build success together.',
                description_ar: 'انضم لشبكتنا المتنامية من الموزعين والمنفذين في المنطقة. لنبني النجاح معاً.',
                btn_text_en: 'Apply for Partnership', btn_text_ar: 'قدم للشراكة',
                link_url: '/partners',
                image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
                icon_name: 'Users'
            },
            {
                section_key: 'engineering_confidence',
                title_en: 'Engineered Products.', title_ar: 'منتجات هندسية.',
                description_en: 'Zero Compromise.', description_ar: 'بدون مساومة.',
                extra_data: {
                    core_values_en: [
                        "Always Exceed Expectations",
                        "Delivering Our Promises",
                        "Be Your Own Customer",
                        "Continuous Improvement",
                        "Honesty",
                        "Courage",
                        "We Listen, We Care, We Serve"
                    ],
                    core_values_ar: [
                        "تجاوز التوقعات دائماً",
                        "الوفاء بوعودنا",
                        "كن عميل نفسك",
                        "التحسين المستمر",
                        "الصدق",
                        "الشجاعة",
                        "نستمع، نهتم، نخدم"
                    ]
                }
            }
        ]);
        console.log('✅ Home Sections seeded.');

        // 3. Seed Certifications
        await Certification.bulkCreate([
            { name: 'ECA', image_url: '/images/ECA.png', type: 'Licensee Manufacturer' },
            { name: 'ISO 9001:2015', image_url: '/images/Logo-ISO9001.png', type: 'Quality Management' },
            { name: 'ISO 14001:2015', image_url: '/images/LOGO+-+ISO+14001-2015+500px.webp', type: 'Environment System' },
            { name: 'JEA', image_url: '/images/JEA.jpg', type: 'Jordan Engineers Assoc.' },
            { name: 'ASTM', image_url: '/images/astm1.png', type: 'Product Compliance' },
            { name: 'GCP Applied Tech', image_url: '/images/WOC_GCP.jpg', type: 'Historical Partner' },
            { name: 'JCCA', image_url: '/images/JCCA.png', type: 'Contractors Assoc.' },
            { name: 'BS Standards', image_url: '/images/british-standards-institute.jpg', type: 'British Standards' }
        ]);
        console.log('✅ Certifications seeded.');

    } catch (error) {
        console.error('❌ Error seeding Home Data:', error);
    }
};

module.exports = seedHomeData;
