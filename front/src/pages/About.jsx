import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import useAbout from "../hooks/useAbout";
import { IMAGE_BASE_URL } from "../api/axios";
import {
  Quote,
  Target,
  Heart,
  Globe,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Zap,
  Building,
} from "lucide-react";

// Helper icon component for specific use
const HandshakeIcon = (props) => (
  <svg 
   {...props}
   xmlns="http://www.w3.org/2000/svg" 
   width="24" 
   height="24" 
   viewBox="0 0 24 24" 
   fill="none" 
   stroke="currentColor" 
   strokeWidth="2" 
   strokeLinecap="round" 
   strokeLinejoin="round" 
  >
      <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
      <path d="m21 3 1 11h-2"/>
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
      <path d="M3 4h8"/>
  </svg>
);

const About = () => {
  const { language } = useLanguage();
  const { sections, loading } = useAbout();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const s = sections || {};
  console.log("s object in About.jsx:", s, " language:", language);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white text-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              {s.hero?.[`subtitle_${language}`] }
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
  {s.hero?.[`title_${language}`] ? (
    s.hero[`title_${language}`].split(/(\d{4})/).map((part, index) =>
      /^\d{4}$/.test(part) ? (
        <span key={index} className="text-[#ee2039]">
          {part}
        </span>
      ) : (
        part // إرجاع النص العادي كما هو
      )
    )
  ) : null}
</h1>
            <div 
              className="text-gray-300 text-xl max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: s.hero?.[`description_${language}`] || "" }} 
            />
          </div>
        </div>
      </section>

      {/* Message from Founder */}
      <section id="founder-message" className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-start relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/5 rounded-full blur-3xl"></div>
                
                <div className="w-full md:w-1/3 shrink-0">
                    <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4] shadow-lg relative">
                        {s.founder_message?.image ? (
                            <img 
                                src={s.founder_message.image.startsWith('/') ? `${IMAGE_BASE_URL}${s.founder_message.image}` : s.founder_message.image} 
                                alt="Founder" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-gray-100 font-bold">
                                 Founder Image
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <Quote className="text-[#ee2039]/20 mb-6" size={64} />
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{s.founder_message?.[`title_${language}`] }</h2>
                    
                    <div 
                        className="space-y-4 text-black leading-relaxed font-light"
                        dangerouslySetInnerHTML={{ __html: s.founder_message?.[`description_${language}`] || "" }}
                    />

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h4 className="text-xl font-bold text-slate-900">{s.founder_message?.extra_data?.[`founder_name_${language}`] }</h4>
                        <p className="text-[#ee2039] font-medium">{s.founder_message?.extra_data?.[`founder_title_${language}`] }</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section id="vision-values" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white text-center justify-center">
                  <Target size={12} />
                  {s.vision_values?.[`subtitle_${language}`] }
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-bold">
                  {s.vision_values?.[`title_${language}`]?.includes("&") ? (
                      <>
                        {s.vision_values[`title_${language}`].split("&")[0]} & <span className="text-[#ee2039]">{s.vision_values[`title_${language}`].split("&").slice(1).join("&")}</span>
                      </>
                  ) : (s.vision_values?.[`title_${language}`] )}
                </h2>
                <div 
                    className="text-xl text-gray-800 max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: s.vision_values?.[`description_${language}`] || "" }}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex flex-wrap items-center gap-2 md:gap-3">
                            <span className="text-[#ee2039] font-bold">{s.vision_values?.extra_data?.[`alfaiha_label_${language}`] }</span> <span>{language === 'ar' ? 'قيمنا' : 'Values'}</span>
                        </h3>
                        <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                            {s.vision_values?.extra_data?.[`alfaiha_desc_${language}`] }
                        </p>
                        <ul className="space-y-4">
                            {(s.vision_values?.extra_data?.values || []).map((item, idx) => (
                                <li key={idx} className="flex items-start md:items-center gap-3 md:gap-4 bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors">
                                    <span className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center font-bold text-white shrink-0 mt-0.5 md:mt-0">
                                        {item[`l_${language}`] || item.l_en}
                                    </span>
                                    <span className="text-sm md:text-base font-medium text-gray-300">{item[`t_${language}`] || item.t_en}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="space-y-6">
                   <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039]/30 transition-all">
                       <Target className="text-[#ee2039] mb-4" size={32} />
                       <h4 className="text-xl font-bold text-slate-900 mb-3">{s.vision_values?.extra_data?.[`purpose_title_${language}`]}</h4>
                       <p className="text-gray-800 leading-relaxed">
                           {s.vision_values?.extra_data?.[`purpose_desc_${language}`]}
                       </p>
                   </div>
                   <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039]/30 transition-all">
                       <CheckCircle2 className="text-[#ee2039] mb-4" size={32} />
                       <h4 className="text-xl font-bold text-slate-900 mb-3">{s.vision_values?.extra_data?.[`commitment_title_${language}`]}</h4>
                       <p className="text-gray-800 leading-relaxed">
                           {s.vision_values?.extra_data?.[`commitment_desc_${language}`]}
                       </p>
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white text-center justify-center">
              <TrendingUp size={12} />
              {s.our_story?.[`subtitle_${language}`]}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {s.our_story?.[`title_${language}`]?.includes("1987") ? (
                  <>
                    {s.our_story[`title_${language}`].split("1987")[0]} <span className="text-[#ee2039]">1987</span>{s.our_story[`title_${language}`].split("1987").slice(1).join("1987")}
                  </>
              ) : (s.our_story?.[`title_${language}`] )}
            </h2>
            <div 
                className="text-xl text-gray-800"
                dangerouslySetInnerHTML={{ __html: s.our_story?.[`description_${language}`] || "" }}
            />
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ee2039]/20 via-[#ee2039]/50 to-[#ee2039]/20 md:-ml-[1px]"></div>

            <div className="space-y-12">
              {(s.our_story?.extra_data?.timeline || []).map((t, idx) => (
                  <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-center">
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#ee2039] border-4 border-white shadow-md z-10 md:-ml-2 transform -translate-x-1.5 md:translate-x-0 mt-6 md:mt-0"></div>
                    
                    {idx % 2 === 0 ? (
                        <>
                          <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 relative group">
                              <div className="absolute top-4 right-4 md:right-auto md:left-4 text-[#ee2039]/10 font-bold text-6xl -z-10 select-none group-hover:text-[#ee2039]/10 transition-colors pointer-events-none">
                                {t[`year_${language}`] || t.year_en}
                              </div>
                              <span className="inline-block px-3 py-1 bg-[#ee2039]/10 text-[#ee2039] text-xs font-bold rounded-full mb-4">
                                {t[`badge_${language}`] || t.badge_en}
                              </span>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t[`title_${language}`] || t.title_en}</h3>
                              <p className="text-gray-800 leading-relaxed text-sm">
                                {t[`desc_${language}`] || t.desc_en}
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block md:w-1/2"></div>
                        </>
                    ) : (
                        <>
                          <div className="hidden md:block md:w-1/2"></div>
                          <div className="w-full md:w-1/2 md:pl-12 pl-12">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 relative group">
                              <div className="absolute top-4 right-4 text-[#ee2039]/10 font-bold text-6xl -z-10 select-none group-hover:text-[#ee2039]/10 transition-colors pointer-events-none">
                                {t[`year_${language}`] || t.year_en}
                              </div>
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4">
                                {t[`badge_${language}`] || t.badge_en}
                              </span>
                              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t[`title_${language}`] || t.title_en}</h3>
                              <p className="text-gray-800 leading-relaxed text-sm">
                                {t[`desc_${language}`] || t.desc_en}
                              </p>
                            </div>
                          </div>
                        </>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white text-center justify-center">
                  <Globe size={12} />
                  {s.our_footprint?.[`subtitle_${language}`] }
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-bold">
                   {s.our_footprint?.[`title_${language}`]?.includes("MENA") ? (
                       <>
                         {s.our_footprint[`title_${language}`].split("MENA")[0]} <span className="text-[#ee2039]">MENA</span>{s.our_footprint[`title_${language}`].split("MENA").slice(1).join("MENA")}
                       </>
                   ) : (s.our_footprint?.[`title_${language}`] )}
                </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
                {(s.our_footprint?.extra_data?.countries || []).map((country, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:shadow-lg hover:border-[#ee2039]/20 transition-all group text-center md:text-left h-full justify-center md:justify-start">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#ee2039] group-hover:bg-[#ee2039] group-hover:text-white transition-colors shrink-0">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                         </div>
                         <span className="font-bold text-slate-900 text-sm md:text-lg leading-tight">{country[`name_${language}`] || country.name_en}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.3]"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white text-center justify-center">
                  <Award size={12} />
                  {s.why_choose_us?.[`subtitle_${language}`]}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-bold">
                  {s.why_choose_us?.[`title_${language}`]}
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {(s.why_choose_us?.extra_data?.features || []).map((item, idx) => {
                    // Map icon string to component
                    const IconComp = {
                        Award, Target, Heart, Globe, Users, CheckCircle2, TrendingUp, MapPin, ShieldCheck, Zap, Building, HandshakeIcon
                    }[item.icon] || CheckCircle2;

                    return (
                        <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 h-full">
                            <div className="text-[#ee2039] mb-4"><IconComp size={32} /></div>
                            <h4 className="font-bold text-lg mb-2">{item[`title_${language}`] || item.title_en}</h4>
                            <p className="text-sm text-gray-300 leading-relaxed">{item[`desc_${language}`] || item.desc_en}</p>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
