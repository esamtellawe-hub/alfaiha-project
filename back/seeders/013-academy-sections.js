const AcademySection = require('../models/AcademySection');

const seedAcademySections = async () => {
  const sections = [
    {
      section_key: 'hero',
      title_en: 'AFG Academy',
      title_ar: 'أكاديمية AFG',
      subtitle_en: 'Empowering the Next Generation',
      subtitle_ar: 'تمكين الجيل القادم',
      content_en: 'At AFG, we believe in empowering the next generation of engineers, technicians, and construction professionals through high-quality hands-on training and education.',
      content_ar: 'في AFG، نؤمن بتمكين الجيل القادم من المهندسين والفنيين والمتخصصين في البناء من خلال تدريب عملي وتعليم عالي الجودة.'
    },
    {
      section_key: 'intro',
      content_en: 'Designed for students, industry professionals, clients, applicators, and partners, our academy provides a structured platform to enhance technical knowledge, field application skills, and real-world readiness in the construction chemicals industry.',
      content_ar: 'تم تصميم أكاديميتنا للطلاب والمتخصصين في الصناعة والعملاء والمنفذين والشركاء، لتوفير منصة منظمة لتعزيز المعرفة الفنية ومهارات التطبيق الميداني والجاهزية الواقعية في صناعة كيماويات البناء.'
    },
    {
      section_key: 'training_sessions',
      title_en: 'Training Sessions',
      title_ar: 'جلسات التدريب',
      subtitle_en: 'Expert-Led Training',
      subtitle_ar: 'تدريب بقيادة خبراء',
      content_en: 'Our expert-led training sessions are tailored to meet the needs of professionals at all levels, from entry-level engineers to seasoned site supervisors.',
      content_ar: 'تم تصميم جلساتنا التدريبية بقيادة الخبراء لتلبية احتياجات المتخصصين على جميع المستويات، من المهندسين المبتدئين إلى مشرفي المواقع المتمرسين.',
      extra_data: JSON.stringify({
        bottom_note_en: 'Each session includes theoretical learning combined with case studies and interactive discussions.',
        bottom_note_ar: 'تتضمن كل جلسة تعلماً نظرياً مقترناً بدراسات حالة ومناقشات تفاعلية.',
        topics: [
          { en: 'Fundamentals of construction chemicals', ar: 'أساسيات كيماويات البناء' },
          { en: 'Industry standards and emerging technologies', ar: 'معايير الصناعة والتكنولوجيات الناشئة' },
          { en: 'Health, safety, and environmental best practices', ar: 'أفضل ممارسات الصحة والسلامة والبيئة' },
          { en: 'Material compatibility and application conditions', ar: 'توافق المواد وشروط التطبيق' }
        ]
      })
    },
    {
      section_key: 'product_application',
      title_en: 'Product Application Training',
      title_ar: 'تدريب على تطبيق المنتجات',
      subtitle_en: 'Hands-On Experience',
      subtitle_ar: 'خبرة عملية',
      content_en: 'Gain hands-on experience with our comprehensive product range through guided practical sessions.',
      content_ar: 'احصل على خبرة عملية في مجموعة منتجاتنا الشاملة من خلال جلسات عملية موجهة.',
      extra_data: JSON.stringify({
        bottom_note_en: 'Ideal for: Applicators, contractors, and technical staff looking to improve on-site efficiency and product outcomes.',
        bottom_note_ar: 'مثالي لـ: المنفذين والمقاولين والموظفين الفنيين الذين يتطلعون إلى تحسين الكفاءة في الموقع ونتائج المنتجات.',
        features: [
          { icon: 'Target', title_en: 'Application Techniques', title_ar: 'تقنيات التطبيق', desc_en: 'Learn the correct application techniques for all products based on the scheduled training session', desc_ar: 'تعلم تقنيات التطبيق الصحيحة لجميع المنتجات بناءً على جلسة التدريب المجدولة' },
          { icon: 'Award', title_en: 'Surface Preparation', title_ar: 'تجهيز الأسطح', desc_en: 'Understand surface preparation requirements for optimal product performance', desc_ar: 'افهم متطلبات تجهيز الأسطح للحصول على أفضل أداء للمنتج' },
          { icon: 'CheckCircle2', title_en: 'On-Site Challenges', title_ar: 'التحديات في الموقع', desc_en: 'Address common on-site challenges with practical solutions and expert guidance', desc_ar: 'التعامل مع التحديات الشائعة في الموقع بحلول عملية وتوجيهات الخبراء' },
          { icon: 'Clock', title_en: 'Live Demonstrations', title_ar: 'شروحات حية', desc_en: 'Evaluate product performance through live demonstrations and real-world scenarios', desc_ar: 'تقييم أداء المنتجات من خلال عروض تقديمية حية وسيناريوهات من أرض الواقع' }
        ]
      })
    },
    {
      section_key: 'product_knowhow',
      title_en: 'Product Knowhow & Specifications',
      title_ar: 'معرفة المنتجات والمواصفات',
      subtitle_en: 'Technical Education',
      subtitle_ar: 'التعليم الفني',
      content_en: 'Our technical education programs dive deep into product chemistry, performance characteristics, and specification requirements.',
      content_ar: 'تتعمق برامجنا للتعليم الفني في كيمياء المنتجات وخصائص الأداء ومتطلبات المواصفات.',
      extra_data: JSON.stringify({
        bottom_note_en: 'Perfect for: Consultants, engineers, and procurement teams who need to align technical decision-making with project goals.',
        bottom_note_ar: 'مثالي لـ: الاستشاريين والمهندسين وفرق المشتريات الذين يحتاجون إلى مواءمة اتخاذ القرارات الفنية مع أهداف المشروع.',
        learnings: [
          { en: 'Understand product formulations and how they interact with concrete and other substrates', ar: 'فهم تركيبات المنتجات وكيفية تفاعلها مع الخرسانة والأسطح الأخرى' },
          { en: 'Learn to read and interpret technical datasheets and application guides', ar: 'تعلم قراءة وتفسير أوراق البيانات الفنية وأدلة التطبيق' },
          { en: 'Explore case studies where correct specification prevented or resolved failures', ar: 'استكشاف دراسات الحالة حيث منعت المواصفات الصحيحة الفشل أو عالجته' },
          { en: 'Receive support in preparing compliant submittals for major projects', ar: 'احصل على الدعم في إعداد التقديمات المتوافقة للمشاريع الكبري' }
        ]
      })
    },
    {
      section_key: 'coop_programs',
      title_en: 'Co-op Programs & Internships',
      title_ar: 'برامج التعاون والتدريب الداخلي',
      subtitle_en: 'Student Programs',
      subtitle_ar: 'برامج الطلاب',
      content_en: 'We offer structured co-op and internship programs designed for engineering students to bridge the gap between academia and industry.',
      content_ar: 'نقدم برامج تدريب تعاوني وتدريب داخلي منظمة مصممة لطلاب الهندسة لسد الفجوة بين الأوساط الأكاديمية والصناعة.',
      extra_data: JSON.stringify({
        bottom_note_en: 'Note: Programs are available seasonally and can be tailored in duration based on academic schedules.',
        bottom_note_ar: 'ملاحظة: تتوفر البرامج موسمياً ويمكن تصميم مدتها بناءً على الجداول الأكاديمية.',
        programs: [
          { icon: 'Users', title_en: 'Department Rotations', title_ar: 'التناوب بين الأقسام', desc_en: 'Experience across lab testing, R&D, factory production, technical services, and site applications', desc_ar: 'خبرة في الفحوصات المخبرية، البحث والتطوير، إنتاج المصنع، الخدمات الفنية وتطبيقات الموقع' },
          { icon: 'Target', title_en: 'Real Projects', title_ar: 'مشاريع حقيقية', desc_en: 'Exposure to real-life projects and troubleshooting scenarios', desc_ar: 'التعرض لمشاريع واقعية وسيناريوهات استكشاف الأخطاء وإصلاحها' },
          { icon: 'Award', title_en: 'Mentorship', title_ar: 'الإرشاد', desc_en: 'Learn from industry veterans with decades of experience', desc_ar: 'تعلم من خبراء الصناعة ذوي عقود من الخبرة' },
          { icon: 'GraduationCap', title_en: 'Certification', title_ar: 'شهادات', desc_en: 'Receive official certification upon successful program completion', desc_ar: 'احصل على شهادة رسمية عند إكمال البرنامج بنجاح' }
        ]
      })
    },
    {
      section_key: 'apply_form',
      title_en: 'Apply Now',
      title_ar: 'قدم الآن',
      subtitle_en: 'Join Us',
      subtitle_ar: 'انضم إلينا',
      content_en: 'Sign up to join our academy programs and take the next step in your professional development.',
      content_ar: 'سجل للانضمام إلى برامج أكاديميتنا واتخذ خطوتك التالية في تطورك المهني.',
      extra_data: JSON.stringify({
        form_labels: {
          name_en: 'Full Name *', name_ar: 'الاسم الكامل *',
          phone_en: 'Phone Number *', phone_ar: 'رقم الهاتف *',
          email_en: 'Email Address *', email_ar: 'البريد الإلكتروني *',
          company_en: 'Company / University *', company_ar: 'الشركة / الجامعة *',
          submit_en: 'Submit Application', submit_ar: 'إرسال الطلب',
          success_en: 'Thank you! We\'ll be in touch soon.', success_ar: 'شكراً لك! سنتواصل معك قريباً.'
        }
      })
    }
  ];

  for (const info of sections) {
    const [section, created] = await AcademySection.findOrCreate({
      where: { section_key: info.section_key },
      defaults: info
    });

    if (!created) {
      await section.update(info);
    }
  }

  console.log('✅ Academy sections seeded correctly!');
};

module.exports = seedAcademySections;
