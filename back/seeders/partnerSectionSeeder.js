const PartnerSection = require('../models/PartnerSection');

const seedPartnerSections = async () => {
    try {
        await PartnerSection.destroy({ where: {}, truncate: true });

        await PartnerSection.bulkCreate([
            {
                section_key: 'hero',
                title_en: 'Building Together',
                title_ar: 'نبني معاً',
                subtitle_en: 'Strategic Partnerships',
                subtitle_ar: 'شراكات استراتيجية',
                description_en: 'Partnering with industry leaders to deliver excellence across the MENA region',
                description_ar: 'نتعاون مع رواد الصناعة لتقديم التميز في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا'
            },
            {
                section_key: 'eca_partnership',
                title_en: 'European Concrete Additives (ECA)',
                title_ar: 'الإضافات الخرسانية الأوروبية (ECA)',
                subtitle_en: 'Our Main Partner',
                subtitle_ar: 'شريكنا الرئيسي',
                description_en: 'European Concrete Additives (ECA), established in 2014 and headquartered in Luxembourg, is a leading construction products and materials technology company specializing in advanced solutions for concrete and cement innovation.\n\nAl Faiha Group proudly serves as ECA\'s sole licensed manufacturer and regional partner across the MENA region, bringing European expertise and technology to local markets.\n\nThrough this strategic partnership, Al Faiha Group leverages ECA\'s research, formulations, and technical know-how to produce high-performance concrete admixtures, cement additives, and specialty building materials tailored for regional needs.',
                description_ar: 'تأسست الإضافات الخرسانية الأوروبية (ECA) في عام 2014 ومقرها في لوكسمبورغ، وهي شركة رائدة في مجال تكنولوجيا منتجات ومواد البناء متخصصة في الحلول المتقدمة لابتكار الخرسانة والأسمنت.\n\nتفخر مجموعة الفيحاء بكونها المصنع المرخص الوحيد لـ ECA والشريك الإقليمي في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا، مما يجلب الخبرة والتكنولوجيا الأوروبية إلى الأسواق المحلية.\n\nمن خلال هذه الشراكة الاستراتيجية، تستفيد مجموعة الفيحاء من أبحاث ECA وتركيباتها ومعرفتها التقنية لإنتاج ملدنات خرسانية عالية الأداء وإضافات أسمنتية ومواد بناء متخصصة مصممة خصيصاً لتلبية الاحتياجات الإقليمية.',
                extra_data: JSON.stringify({
                    highlight_title_en: 'Partnership Excellence',
                    highlight_title_ar: 'شراكة متميزة',
                    highlight_desc_en: 'Together, ECA and Al Faiha Group combine European innovation with local manufacturing excellence, ensuring that every product meets the highest international standards of quality, performance, and sustainability.',
                    highlight_desc_ar: 'معاً، تجمع ECA ومجموعة الفيحاء بين الابتكار الأوروبي والتميز في التصنيع المحلي، مما يضمن أن يلبي كل منتج أعلى المعايير الدولية للجودة والأداء والاستدامة.',
                    benefits: [
                        { title_en: 'European Innovation', title_ar: 'ابتكار أوروبي', desc_en: 'Cutting-edge technology', desc_ar: 'تكنولوجيا متقدمة' },
                        { title_en: 'Local Manufacturing', title_ar: 'تصنيع محلي', desc_en: 'Regional excellence', desc_ar: 'تميز إقليمي' },
                        { title_en: 'Quality Standards', title_ar: 'معايير الجودة', desc_en: 'International compliance', desc_ar: 'امتثال دولي' },
                        { title_en: 'Sustainability', title_ar: 'الاستدامة', desc_en: 'Eco-friendly solutions', desc_ar: 'حلول صديقة للبيئة' }
                    ]
                })
            },
            {
                section_key: 'become_partner',
                title_en: 'Become a Partner',
                title_ar: 'كن شريكاً',
                subtitle_en: 'Join Our Network',
                subtitle_ar: 'انضم إلى شبكتنا',
                description_en: 'At Al Faiha Group, we believe in building strong partnerships that drive innovation, quality, and sustainable growth across the construction industry.\n\nSince our establishment in 1987 as Jordan\'s first construction chemicals company, we\'ve continued to expand our expertise, from concrete admixtures and cement additives to a full range of specialty building materials, powered by cutting-edge European technology from our partner European Concrete Additives (ECA).\n\nAs we continue to grow across the MENA region, Al Faiha Group welcomes strategic partners, distributors, contractors, and suppliers who share our commitment to excellence, performance, and integrity.',
                description_ar: 'في مجموعة الفيحاء، نؤمن ببناء شراكات قوية تدفع الابتكار والجودة والنمو المستدام في جميع أنحاء صناعة البناء.\n\nمنذ تأسيسنا في عام 1987 كأول شركة لكيماويات البناء في الأردن، واصلنا توسيع خبراتنا، من ملدنات الخرسانة وإضافات الأسمنت إلى مجموعة كاملة من مواد البناء المتخصصة، مدعومة بأحدث التكنولوجيا الأوروبية من شريكنا European Concrete Additives (ECA).\n\nمع استمرار نمونا عبر منطقة الشرق الأوسط وشمال أفريقيا، ترحب مجموعة الفيحاء بالشركاء الاستراتيجيين والموزعين والمقاولين والموردين الذين يشاركوننا التزامنا بالتميز والأداء والنزاهة.',
                btn_text_en: "Get in Touch",
                btn_text_ar: "تواصل معنا",
                extra_data: JSON.stringify({
                    cta_title_en: "Let's Build the Future Together",
                    cta_title_ar: "دعونا نبني المستقبل معاً",
                    cta_desc_en: "Whether you're looking to represent our products, integrate our solutions into your projects, or explore new opportunities across the region, we welcome you to join our growing network of partners.",
                    cta_desc_ar: "سواء كنت تتطلع إلى تمثيل منتجاتنا، أو دمج حلولنا في مشاريعك، أو استكشاف فرص جديدة في جميع أنحاء المنطقة، فنحن نرحب بك للانضمام إلى شبكتنا المتنامية من الشركاء.",
                    email_btn_en: "Email Us",
                    email_btn_ar: "راسلنا",
                    features: [
                        { icon: 'Award', title_en: 'Trusted Legacy', title_ar: 'إرث موثوق', desc_en: 'Over 35 years of experience and leadership in construction chemicals, combining a trusted legacy with exclusive technology.', desc_ar: 'أكثر من 35 عاماً من الخبرة والريادة في كيماويات البناء، لجمع الإرث الموثوق بالتكنولوجيا الحصرية.' },
                        { icon: 'Globe', title_en: 'Exclusive Technology', title_ar: 'تكنولوجيا حصرية', desc_en: 'Sole licensed manufacturer of ECA products in the MENA region, bringing European innovation to local markets.', desc_ar: 'المصنع الوحيد المرخص لمنتجات ECA في منطقة الشرق الأوسط وشمال أفريقيا، لتقديم الابتكار الأوروبي للأسواق المحلية.' },
                        { icon: 'TrendingUp', title_en: 'Collaborative Growth', title_ar: 'نمو تعاوني', desc_en: 'Technical training, marketing support, and long-term opportunities built on mutual success.', desc_ar: 'التدريب الفني والدعم التسويقي والفرص طويلة الأجل المبنية على النجاح المتبادل.' }
                    ]
                })
            }
        ]);

        console.log('✅ Partner Sections seeded successfully.');
    } catch (error) {
        console.error('❌ Error seeding Partner Sections:', error);
    }
};

module.exports = seedPartnerSections;
