import { useLanguage } from "../context/LanguageContext";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Handshake,
  Building2,
  Globe,
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";
import ServiceRequestModal from "../Component/ServiceRequestModal.jsx";

import usePartners from "../hooks/usePartners";

const Partners = () => {
  const { language } = useLanguage();
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('lang') || 'en');
  const l = currentLang;
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sections, loading, error } = usePartners();

  useEffect(() => {
    // Handle scroll to section if hash is present
    if (location.hash && !loading) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    } else if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [location, loading]);

  useEffect(() => {
    // Sync language if it changes in localStorage (optional)
    const handleStorageChange = () => {
      setCurrentLang(localStorage.getItem('lang') || 'en');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center" dir={l === 'ar' ? 'rtl' : 'ltr'}>
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              {sections?.hero?.[`subtitle_${l}`] || (l === 'ar' ? 'شراكات استراتيجية' : l === 'fr' ? 'Partenariats Stratégiques' : 'Strategic Partnerships')}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {sections?.hero?.[`title_${l}`] ? (
                <>
                  {sections.hero[`title_${l}`].split(' ')[0]} <span className="text-[#ee2039]">{sections.hero[`title_${l}`].split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                l === 'ar' ? <>نبني <span className="text-[#ee2039]">معاً</span></> : l === 'fr' ? <>Construire <span className="text-[#ee2039]">Ensemble</span></> : <>Building <span className="text-[#ee2039]">Together</span></>
              )}
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto whitespace-pre-line">
              {sections?.hero?.[`description_${l}`] || (l === 'ar' ? 'الشراكة مع قادة الصناعة' : l === 'fr' ? 'Partenariat avec les leaders' : 'Partnering with industry leaders')}
            </p>
          </div>
        </div>
      </section>

      {/* ECA Partnership Section */}
      <section id="eca-partnership" className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                <Building2 size={12} />
                {sections?.eca_main?.[`subtitle_${l}`] || (l === 'ar' ? 'شريكنا الرئيسي' : l === 'fr' ? 'Notre partenaire principal' : 'Our Main Partner')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                {sections?.eca_main?.[`title_${l}`] || (l === 'ar' ? 'إضافات الخرسانة الأوروبية (ECA)' : 'European Concrete Additives (ECA)')}
              </h2>
            </div>

            {/* Partnership Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Image/Logo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ee2039]/20 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl p-12 border border-gray-100 shadow-xl">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <Building2
                        size={80}
                        className="text-[#ee2039] mx-auto mb-6"
                        strokeWidth={1.5}
                      />
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">
                        ECA
                      </h3>
                      <p className="text-gray-500 text-sm">
                        European Concrete Additives
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <MapPin size={14} />
                        <span>Luxembourg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6" dir={l === 'ar' ? 'rtl' : 'ltr'}>
                <div className="space-y-4 text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                  {sections?.eca_main?.[`description_${l}`] ? (
                      <div dangerouslySetInnerHTML={{ __html: sections.eca_main[`description_${l}`] }} />
                  ) : (
                    <>
                      <p>
                        European Concrete Additives (ECA), established in{" "}
                        <span className="font-bold text-slate-800">2014</span> and
                        headquartered in{" "}
                        <span className="font-bold text-slate-800">Luxembourg</span>
                        , is a leading construction products and materials
                        technology company specializing in advanced solutions for
                        concrete and cement innovation.
                      </p>
                    </>
                  )}
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {(sections?.eca_benefits?.extra_data?.benefits || [
                    { title_en: 'European Innovation', desc_en: 'Cutting-edge technology' },
                    { title_en: 'Local Manufacturing', desc_en: 'Regional excellence' },
                    { title_en: 'Quality Standards', desc_en: 'International compliance' },
                    { title_en: 'Sustainability', desc_en: 'Eco-friendly solutions' }
                  ]).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="text-[#ee2039] shrink-0 mt-1"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          {benefit[`title_${l}`] || benefit[`title_${language}`] || enefit.title_en}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {benefit[`desc_${l}`] || benefit[`desc_${language}`] || enefit.desc_en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Partnership Highlight */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6 text-white font-bold text-2xl">
                  <div className="w-12 h-12 rounded-full bg-[#ee2039]/20 flex items-center justify-center">
                    <Handshake size={24} className="text-[#ee2039]" />
                  </div>
                  {sections?.eca_stats?.[`title_${l}`] || (l === 'ar' ? 'تميز الشراكة' : 'Partnership Excellence')}
                </div>
                {sections?.eca_stats?.[`description_${l}`] ? (
                   <div className="text-gray-300 text-lg leading-relaxed max-w-3xl whitespace-pre-line" dangerouslySetInnerHTML={{ __html: sections.eca_stats[`description_${l}`] }} />
                ) : (
                  <p className="text-gray-300 text-lg leading-relaxed max-w-3xl whitespace-pre-line">
                      Together, ECA and Al Faiha Group combine European innovation 
                      with local manufacturing excellence, ensuring that every product meets the highest international
                      standards of quality, performance, and sustainability.
                  </p>
                )}
                
                {sections?.eca_stats?.extra_data?.[`highlight_title_${l}`] && (
                    <div className="mt-6 inline-block py-2 px-6 bg-[#ee2039] rounded-xl text-white font-bold text-2xl hover:scale-105 transition-transform">
                        {sections.eca_stats.extra_data[`highlight_title_${l}`]}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section id="become-partner" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                <Users size={12} />
                {sections?.become_partner_intro?.[`subtitle_${l}`] || (l === 'ar' ? 'انضم إلى شبكتنا' : 'Join Our Network')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                {sections?.become_partner_intro?.[`title_${l}`] ? (
                  <>
                    {sections.become_partner_intro[`title_${l}`].split(' ')[0]} {sections.become_partner_intro[`title_${l}`].split(' ')[1]} <span className="text-[#ee2039]">{sections.become_partner_intro[`title_${l}`].split(' ').slice(2).join(' ')}</span>
                  </>
                ) : (
                  l === 'ar' ? <>كن <span className="text-[#ee2039]">شريكاً</span></> : <>Become a <span className="text-[#ee2039]">Partner</span></>
                )}
              </h2>
              {sections?.become_partner_intro?.extra_data?.[`short_desc_${l}`] && (
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  {sections.become_partner_intro.extra_data[`short_desc_${l}`]}
                </p>
              )}
            </div>

            {/* Partnership Story */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              <div className="space-y-6 text-gray-600 leading-relaxed whitespace-pre-line font-medium">
                {sections?.become_partner_intro?.[`description_${l}`] ? (
                    <div dangerouslySetInnerHTML={{ __html: sections.become_partner_intro[`description_${l}`] }} />
                ) : (
                  <p>
                    Since our establishment in 1987 as Jordan's first construction chemicals company, we've continued to expand our expertise powered by cutting-edge European technology from our partner European Concrete Additives (ECA).
                  </p>
                )}
              </div>
            </div>

            {/* Why Partner With Us */}
            <div className="grid md:grid-cols-3 gap-8 mb-16" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              {(sections?.partner_features?.extra_data?.features || [
                { icon: 'Award', title_en: 'Trusted Legacy', desc_en: 'Over 35 years of experience.' },
                { icon: 'Globe', title_en: 'Exclusive Technology', desc_en: 'Sole licensed manufacturer of ECA products in the MENA region.' },
                { icon: 'TrendingUp', title_en: 'Collaborative Growth', desc_en: 'Marketing support and long-term opportunities.' }
              ]).map((feature, idx) => {
                const Icon = feature.icon === 'Award' ? Award : feature.icon === 'Globe' ? Globe : TrendingUp;
                return (
                  <div key={idx} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#ee2039]/10 flex items-center justify-center mb-6 group-hover:bg-[#ee2039] transition-colors">
                      <Icon
                        size={28}
                        className="text-[#ee2039] group-hover:text-white transition-colors"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature[`title_${l}`] || feature[`title_${language}`] || eature.title_en}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature[`desc_${l}`] || feature[`desc_${language}`] || eature.desc_en}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 md:p-16 relative overflow-hidden" dir={l === 'ar' ? 'rtl' : 'ltr'}>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#ee2039]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {sections?.partner_cta?.[`title_${l}`] || (l === 'ar' ? "لنبني المستقبل معاً" : "Let's Build the Future Together")}
                </h3>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed whitespace-pre-line">
                  {sections?.partner_cta?.[`description_${l}`] || (l === 'ar' ? "سواء كنت تبحث عن تمثيل منتجاتنا..." : "Whether you're looking to represent our products...")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 bg-[#ee2039] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#c41229] transition-all group hover:scale-105 active:scale-95 shadow-xl shadow-[#ee2039]/30"
                  >
                    {sections?.partner_cta?.[`btn_text_${l}`] || (l === 'ar' ? "تواصل معنا" : "Get in Touch")}
                    <ArrowRight
                      size={20}
                      className={`group-hover:translate-x-2 transition-transform ${l === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`}
                    />
                  </button>

                  <a
                    href="mailto:info@alfaihagroup.com"
                    className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Mail size={20} />
                    {sections?.partner_cta?.extra_data?.[`email_btn_${l}`] || (l === 'ar' ? "راسلنا" : "Email Us")}
                  </a>
                </div>

                <p className="text-gray-400 text-sm mt-8">
                  Stronger, smarter, and more sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectorTitle="Partnership Inquiry"
      />
    </div>
  );
};

export default Partners;
