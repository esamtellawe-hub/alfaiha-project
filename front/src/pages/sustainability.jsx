import { useLanguage } from "../context/LanguageContext";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Leaf,
  Shield,
  FlaskConical,
  Heart,
  Lightbulb,
  CheckCircle2,
  Award,
  Users,
  Zap,
  Target,
} from "lucide-react";
import useSustainability from "../hooks/useSustainability";

const DynamicIcon = ({ name, ...props }) => {
  const { language } = useLanguage();
  const icons = { Leaf, Shield, FlaskConical, Heart, Lightbulb, CheckCircle2, Award, Users, Zap, Target };
  const IconCmp = icons[name] || Leaf;
  return <IconCmp {...props} />;
};

const Sustainability = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { loading, getSection } = useSustainability();

  // Handle scroll to section based on URL hash
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
  }, [location]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
        </div>
    );
  }

  const hero = getSection('hero');
  const sm = getSection('sustainability_main');
  const sp = getSection('sustainability_product');
  const sc = getSection('sustainability_cement');
  const sc1 = getSection('sustainability_card_1');
  const sc2 = getSection('sustainability_card_2');
  const sc3 = getSection('sustainability_card_3');
  const sr = getSection('sustainability_red_box');

  const em = getSection('esg_main');
  const ec1 = getSection('esg_card_1');
  const ec2 = getSection('esg_card_2');
  const ec3 = getSection('esg_card_3');

  const rm = getSection('rd_main');
  const rc1 = getSection('rd_card_1');
  const rc2 = getSection('rd_card_2');
  const rc3 = getSection('rd_card_3');

  const cm = getSection('csr_main');
  const cc1 = getSection('csr_card_1');
  const cc2 = getSection('csr_card_2');
  const cc3 = getSection('csr_card_3');

  const im = getSection('innovation_main');
  const ib = getSection('innovation_dark_box');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {hero.is_active !== false && (
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              {hero[`subtitle_${language}`] || hero.subtitle_en || "Building a Sustainable Future"}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {hero[`title_${language}`] || hero.title_en || "Sustainability & Innovation"}
            </h1>

            {hero[`body_${language}`] || hero.body_en ? (
                <div className="text-gray-400 text-xl max-w-2xl mx-auto cms-content" dangerouslySetInnerHTML={{ __html: hero[`body_${language}`] || hero.body_en }} />
            ) : (
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                At Al Faiha Group, sustainability is not just a statement; it's our standard. 
                We believe construction shapes not only today's landscape but safeguards tomorrow's future.
                </p>
            )}
            
          </div>
        </div>
      </section>
      )}

      {/* Sustainability Section */}
      {sm.is_active !== false && (
      <section id="sustainability" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ee2039_1px,transparent_1px),linear-gradient(to_bottom,#ee2039_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <DynamicIcon name={sm.icon || 'Leaf'} size={12} />
              {sm[`subtitle_${language}`] || sm.subtitle_en || "Sustainability"}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {sm[`title_${language}`] || sm.title_en || "Our Commitment to the Environment"}
            </h2>
            {sm[`body_${language}`] || sm.body_en ? (
                <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed cms-content" dangerouslySetInnerHTML={{ __html: sm[`body_${language}`] || sm.body_en }} />
            ) : (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Every product we create and every process we refine reflects our responsibility to balance 
                  technical performance with environmental care, resource efficiency, and long-term structural performance.
                </p>
            )}
            
          </div>

          {/* Sustainable Product Innovation */}
          {sp.is_active !== false && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ee2039]/10 flex items-center justify-center">
                <DynamicIcon name={sp.icon || 'Lightbulb'} className="text-[#ee2039]" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{sp[`title_${language}`] || sp.title_en || "Sustainable Product Innovation"}</h3>
            </div>
            {sp[`body_${language}`] || sp.body_en ? (
              <div className="text-gray-600 leading-relaxed mb-6 cms-content" dangerouslySetInnerHTML={{ __html: sp[`body_${language}`] || sp.body_en }} />
            ) : (
              <p className="text-gray-600 leading-relaxed mb-6">
                Our journey toward sustainability begins with innovation, a core value that drives us to engineer eco-efficient formulations.
              </p>
            )}
          </div>
          )}

          {/* Cement Additives */}
          {sc.is_active !== false && (
          <div className="mb-16 bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center">
                <DynamicIcon name={sc.icon || 'Target'} className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{sc[`title_${language}`] || sc.title_en || "Cement Additives – Driving Decarbonization"}</h3>
            </div>
            {sc[`body_${language}`] || sc.body_en ? (
              <div className="text-gray-600 leading-relaxed mb-6 cms-content" dangerouslySetInnerHTML={{ __html: sc[`body_${language}`] || sc.body_en }} />
            ) : (
              <p className="text-gray-600 leading-relaxed mb-6">
                A cornerstone of our sustainability strategy is our Cement Additives line...
              </p>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {sc1.is_active !== false && (
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <DynamicIcon name={sc1.icon || 'CheckCircle2'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{sc1[`title_${language}`] || sc1.title_en || "Reduced Clinker Usage"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: sc1[`body_${language}`] || sc1.body_en || "Decreasing CO₂ emissions" }} />
              </div>)}
              {sc2.is_active !== false && (
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <DynamicIcon name={sc2.icon || 'Zap'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{sc2[`title_${language}`] || sc2.title_en || "Higher Grinding Efficiency"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: sc2[`body_${language}`] || sc2.body_en || "Reducing energy consumption" }} />
              </div>)}
              {sc3.is_active !== false && (
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <DynamicIcon name={sc3.icon || 'Award'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{sc3[`title_${language}`] || sc3.title_en || "Enhanced Concrete Performance"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: sc3[`body_${language}`] || sc3.body_en || "Extending lifespan" }} />
              </div>)}
            </div>
          </div>
          )}
          
          {/* Shaping a Greener Future */}
          {sr.is_active !== false && (
          <div className="bg-gradient-to-br from-[#ee2039] to-[#c91830] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{sr[`title_${language}`] || sr.title_en || "Shaping a Greener Future"}</h3>
            <div className="leading-relaxed opacity-95 cms-content" dangerouslySetInnerHTML={{ __html: sr[`body_${language}`] || sr.body_en || "Rooted in our values..." }} />
          </div>
          )}
        </div>
      </section>
      )}

      {/* ESG & QHSE Section */}
      {em.is_active !== false && (
      <section id="esg-qhse" className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <DynamicIcon name={em.icon || 'Shield'} size={12} />
              {em[`subtitle_${language}`] || em.subtitle_en || "ESG & QHSE"}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {em[`title_${language}`] || em.title_en || "Environmental, Social & Governance Excellence"}
            </h2>
            {em[`body_${language}`] || em.body_en ? (
                <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed cms-content mb-8" dangerouslySetInnerHTML={{ __html: em[`body_${language}`] || em.body_en }} />
            ) : (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  AlFaiha Group upholds the highest standards...
                </p>
            )}
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6">
              {ec1.is_active !== false && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <DynamicIcon name={ec1.icon || 'Shield'} className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">{ec1[`title_${language}`] || ec1.title_en || "Environmental"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: ec1[`body_${language}`] || ec1.body_en || "Sustainable practices" }} />
              </div>)}
              {ec2.is_active !== false && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <DynamicIcon name={ec2.icon || 'Users'} className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">{ec2[`title_${language}`] || ec2.title_en || "Social"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: ec2[`body_${language}`] || ec2.body_en || "Community engagement" }} />
              </div>)}
              {ec3.is_active !== false && (
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <DynamicIcon name={ec3.icon || 'Award'} className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">{ec3[`title_${language}`] || ec3.title_en || "Governance"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: ec3[`body_${language}`] || ec3.body_en || "Accountability" }} />
              </div>)}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* R&D Section */}
      {rm.is_active !== false && (
      <section id="rd" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <DynamicIcon name={rm.icon || 'FlaskConical'} size={12} />
              {rm[`subtitle_${language}`] || rm.subtitle_en || "Research & Development"}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {rm[`title_${language}`] || rm.title_en || "Innovation Through Research"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
            {rm[`body_${language}`] || rm.body_en ? (
                <div className="text-gray-600 leading-relaxed mb-8 cms-content" dangerouslySetInnerHTML={{ __html: rm[`body_${language}`] || rm.body_en }} />
            ) : (
                <p className="text-gray-600 leading-relaxed mb-8">
                  Our R&D team focuses on innovative chemical formulations...
                </p>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {rc1.is_active !== false && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <DynamicIcon name={rc1.icon || 'FlaskConical'} className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{rc1[`title_${language}`] || rc1.title_en || "Advanced Testing"}</h4>
                  <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: rc1[`body_${language}`] || rc1.body_en || "" }} />
                </div>
              </div>)}
              {rc2.is_active !== false && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <DynamicIcon name={rc2.icon || 'Lightbulb'} className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{rc2[`title_${language}`] || rc2.title_en || "Innovation"}</h4>
                  <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: rc2[`body_${language}`] || rc2.body_en || "" }} />
                </div>
              </div>)}
              {rc3.is_active !== false && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <DynamicIcon name={rc3.icon || 'Users'} className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{rc3[`title_${language}`] || rc3.title_en || "Collaboration"}</h4>
                  <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: rc3[`body_${language}`] || rc3.body_en || "" }} />
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* CSR Section */}
      {cm.is_active !== false && (
      <section id="csr" className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <DynamicIcon name={cm.icon || 'Heart'} size={12} />
              {cm[`subtitle_${language}`] || cm.subtitle_en || "Corporate Social Responsibility"}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {cm[`title_${language}`] || cm.title_en || "Building Stronger Communities"}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            {cm[`body_${language}`] || cm.body_en ? (
                <div className="text-gray-600 leading-relaxed mb-8 cms-content" dangerouslySetInnerHTML={{ __html: cm[`body_${language}`] || cm.body_en }} />
            ) : (
                <p className="text-gray-600 leading-relaxed mb-8">
                  Beyond business, we believe in giving back...
                </p>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {cc1.is_active !== false && (
              <div className="bg-gray-50 rounded-xl p-6">
                <DynamicIcon name={cc1.icon || 'Heart'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{cc1[`title_${language}`] || cc1.title_en || "Community Empowerment"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: cc1[`body_${language}`] || cc1.body_en || "" }} />
              </div>)}
              {cc2.is_active !== false && (
              <div className="bg-gray-50 rounded-xl p-6">
                <DynamicIcon name={cc2.icon || 'Users'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{cc2[`title_${language}`] || cc2.title_en || "Education & Training"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: cc2[`body_${language}`] || cc2.body_en || "" }} />
              </div>)}
              {cc3.is_active !== false && (
              <div className="bg-gray-50 rounded-xl p-6">
                <DynamicIcon name={cc3.icon || 'Award'} className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">{cc3[`title_${language}`] || cc3.title_en || "Partnerships"}</h4>
                <div className="text-sm text-gray-600 cms-content" dangerouslySetInnerHTML={{ __html: cc3[`body_${language}`] || cc3.body_en || "" }} />
              </div>)}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Innovation Section */}
      {im.is_active !== false && (
      <section id="innovation" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <DynamicIcon name={im.icon || 'Lightbulb'} size={12} />
              {im[`subtitle_${language}`] || im.subtitle_en || "Innovation"}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {im[`title_${language}`] || im.title_en || "Pioneering the Future of Construction"}
            </h2>
            {im[`body_${language}`] || im.body_en ? (
                <div className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed cms-content mb-8" dangerouslySetInnerHTML={{ __html: im[`body_${language}`] || im.body_en }} />
            ) : (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  At Al Faiha Group, innovation lies at the heart of everything we do.
                </p>
            )}
          </div>

          {ib.is_active !== false && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
            <div className="leading-relaxed opacity-95 cms-content" dangerouslySetInnerHTML={{ __html: ib[`body_${language}`] || ib.body_en || "" }} />
          </div>
          )}
        </div>
      </section>
      )}
    </div>
  );
};

export default Sustainability;
