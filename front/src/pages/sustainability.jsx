import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Leaf, Shield, FlaskConical, Heart, Lightbulb,
  CheckCircle2, Award, Users, Zap, Target
} from "lucide-react";
import useSustainability from "../hooks/useSustainability";

const ICON_MAP = {
  Leaf: <Leaf size={24} />,
  Shield: <Shield size={24} />,
  FlaskConical: <FlaskConical size={24} />,
  Heart: <Heart size={24} />,
  Lightbulb: <Lightbulb size={24} />,
  Award: <Award size={24} />,
  Users: <Users size={24} />,
  Zap: <Zap size={24} />,
  Target: <Target size={24} />,
};

// Map section_key → display style variant
const VARIANTS = {
  sustainability: 'light',
  esg_qhse:       'gray',
  rd:             'gradient-gray',
  csr:            'light',
  innovation:     'gradient-dark',
};

const SectionBlock = ({ section, bg }) => {
  const icon = ICON_MAP[section.icon] || <Leaf size={24} />;
  const variant = VARIANTS[section.section_key] || 'light';

  const wrapperClass = {
    light:           'bg-white',
    gray:            'bg-gray-50',
    'gradient-gray': 'bg-gradient-to-br from-gray-50 to-white',
    'gradient-dark': 'bg-gradient-to-br from-slate-900 to-slate-800',
  }[variant] || 'bg-white';

  const textClass = variant === 'gradient-dark' ? 'text-white' : 'text-gray-600';

  return (
    <section id={section.section_key} className="py-24 relative">
      {variant === 'gray' && <div className="absolute inset-0 bg-gray-50" />}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
            {icon} {section.subtitle_en || section.section_key}
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">{section.title_en}</h2>
        </div>
        <div className={`${wrapperClass} rounded-3xl p-8 border border-gray-100 shadow-sm`}>
          <p className={`${textClass} leading-relaxed whitespace-pre-line`}>
            {section.body_en}
          </p>
        </div>
      </div>
    </section>
  );
};

const Sustainability = () => {
  const location = useLocation();
  const { sections, loading } = useSustainability();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse" />
              Building a Sustainable Future
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Sustainability & <span className="text-[#ee2039]">Innovation</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              At Al Faiha Group, sustainability is not just a statement; it's our standard.
            </p>
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-32">
          <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Dynamic Sections */}
      {!loading && sections.map(section => (
        <SectionBlock key={section.section_key} section={section} />
      ))}
    </div>
  );
};

export default Sustainability;
