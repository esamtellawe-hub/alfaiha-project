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

const Sustainability = () => {
  const location = useLocation();

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

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Building a Sustainable Future
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Sustainability & <span className="text-[#ee2039]">Innovation</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              At Al Faiha Group, sustainability is not just a statement; it's our standard. 
              We believe construction shapes not only today's landscape but safeguards tomorrow's future.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ee2039_1px,transparent_1px),linear-gradient(to_bottom,#ee2039_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Leaf size={12} />
              Sustainability
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Our Commitment to the Environment
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every product we create and every process we refine reflects our responsibility to balance 
              technical performance with environmental care, resource efficiency, and long-term structural performance.
            </p>
          </div>

          {/* Sustainable Product Innovation */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ee2039]/10 flex items-center justify-center">
                <Lightbulb className="text-[#ee2039]" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Sustainable Product Innovation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our journey toward sustainability begins with innovation, a core value that drives us to engineer 
              eco-efficient formulations and optimize our manufacturing practices. Through continuous research and 
              development, we deliver construction chemicals and materials that enhance durability, reduce lifecycle 
              costs, and minimize environmental impact.
            </p>
          </div>

          {/* Cement Additives */}
          <div className="mb-16 bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Cement Additives – Driving Decarbonization</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              A cornerstone of our sustainability strategy is our Cement Additives line, designed to help the 
              cement industry advance toward global decarbonization targets:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <CheckCircle2 className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Reduced Clinker Usage</h4>
                <p className="text-sm text-gray-600">Decreasing CO₂ emissions in cement production</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <Zap className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Higher Grinding Efficiency</h4>
                <p className="text-sm text-gray-600">Reducing energy consumption during milling</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <Award className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Enhanced Concrete Performance</h4>
                <p className="text-sm text-gray-600">Extending lifespan while reducing maintenance and waste</p>
              </div>
            </div>
          </div>
          
          {/* Shaping a Greener Future */}
          <div className="bg-gradient-to-br from-[#ee2039] to-[#c91830] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Shaping a Greener Future</h3>
            <p className="leading-relaxed opacity-95">
              Rooted in our values of Accountability in Every Project and Health, Safety, and Sustainability, 
              Al Faiha Group integrates environmental stewardship into every decision. By partnering with clients 
              who share our vision, we are building a construction ecosystem where growth and responsibility go 
              hand in hand; shaping a future defined by innovation, efficiency, and care for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* ESG & QHSE Section */}
      <section id="esg-qhse" className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Shield size={12} />
              ESG & QHSE
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Environmental, Social & Governance Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AlFaiha Group upholds the highest standards of ESG responsibility, reinforced by a comprehensive 
              and fully integrated Quality, Health, Safety, and Environment (QHSE) framework.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-8">
              Through stringent safety protocols, sustainable sourcing, and governance systems aligned with ISO 14001, 
              we create safer workplaces, emphasize sustainable sourcing, and enhance operational excellence. This 
              integrated ESG and QHSE approach safeguards people and projects alike while strengthening trust with 
              clients, partners, and communities across the region.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Shield className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Environmental</h4>
                <p className="text-sm text-gray-600">Sustainable practices and impact reduction</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Users className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Social</h4>
                <p className="text-sm text-gray-600">Community engagement and safety</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Award className="text-[#ee2039] mx-auto mb-4" size={32} />
                <h4 className="font-bold text-slate-900 mb-2">Governance</h4>
                <p className="text-sm text-gray-600">Accountability and transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Section */}
      <section id="rd" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <FlaskConical size={12} />
              Research & Development
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Innovation Through Research
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Al Faiha Group, Research & Development is at the core of everything we do.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-600 leading-relaxed mb-8">
              Our R&D team focuses on innovative chemical formulations, continuous product improvement, and 
              performance-driven solutions for all solutions. Through advanced laboratory testing, real-site 
              validation, and close collaboration with clients, we develop solutions that meet evolving project 
              demands, industry standards, and environmental conditions; ensuring reliability, efficiency, and 
              long-term performance.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <FlaskConical className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Advanced Testing</h4>
                  <p className="text-sm text-gray-600">Laboratory and field validation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <Lightbulb className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Innovation</h4>
                  <p className="text-sm text-gray-600">Cutting-edge formulations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center shrink-0">
                  <Users className="text-white" size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Collaboration</h4>
                  <p className="text-sm text-gray-600">Client-driven solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section id="csr" className="py-24 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Heart size={12} />
              Corporate Social Responsibility
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Building Stronger Communities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond business, we believe in giving back.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <p className="text-gray-600 leading-relaxed mb-8">
              Our CSR programs focus on empowering local communities, supporting education and vocational training, 
              and promoting sustainable construction practices. Through partnerships with civic organizations and 
              industry bodies, we contribute to building not only stronger structures, but stronger societies; where 
              opportunity, safety, and shared progress define every endeavor.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <Heart className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Community Empowerment</h4>
                <p className="text-sm text-gray-600">Supporting local communities and development</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <Users className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Education & Training</h4>
                <p className="text-sm text-gray-600">Vocational programs and skill development</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <Award className="text-[#ee2039] mb-4" size={28} />
                <h4 className="font-bold text-slate-900 mb-2">Partnerships</h4>
                <p className="text-sm text-gray-600">Collaboration with civic organizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Lightbulb size={12} />
              Innovation
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Pioneering the Future of Construction
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Al Faiha Group, innovation lies at the heart of everything we do.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
            <p className="leading-relaxed mb-8 opacity-95">
              From advanced construction chemicals to customized solutions for complex infrastructure projects, we 
              continuously advance our technologies to anticipate and meet the needs of modern construction. Our 
              approach blends global expertise with local insight, ensuring that we not only deliver superior 
              performance but also set new benchmarks in durability, efficiency, and application methods.
            </p>
            <p className="leading-relaxed opacity-95">
              Rooted in our core values, our drive for innovation is more than a process; it is a mindset that 
              propels Al Faiha Group forward as a trusted partner in building the future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
