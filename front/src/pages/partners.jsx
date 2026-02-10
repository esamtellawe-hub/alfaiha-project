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

const Partners = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Handle scroll to section if hash is present
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
              Strategic Partnerships
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Building <span className="text-[#ee2039]">Together</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Partnering with industry leaders to deliver excellence across the
              MENA region
            </p>
          </div>
        </div>
      </section>

      {/* ECA Partnership Section */}
      <section id="eca-partnership" className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                <Building2 size={12} />
                Our Main Partner
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                European Concrete Additives
                <span className="text-[#ee2039]"> (ECA)</span>
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
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    European Concrete Additives (ECA), established in{" "}
                    <span className="font-bold text-slate-800">2014</span> and
                    headquartered in{" "}
                    <span className="font-bold text-slate-800">Luxembourg</span>
                    , is a leading construction products and materials
                    technology company specializing in advanced solutions for
                    concrete and cement innovation.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    Al Faiha Group proudly serves as{" "}
                    <span className="font-bold text-[#ee2039]">
                      ECA's sole licensed manufacturer and regional partner
                    </span>{" "}
                    across the MENA region, bringing European expertise and
                    technology to local markets.
                  </p>

                  <p className="text-gray-600 leading-relaxed">
                    Through this strategic partnership, Al Faiha Group leverages
                    ECA's research, formulations, and technical know-how to
                    produce high-performance concrete admixtures, cement
                    additives, and specialty building materials tailored for
                    regional needs.
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#ee2039] shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        European Innovation
                      </h4>
                      <p className="text-xs text-gray-500">
                        Cutting-edge technology
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#ee2039] shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        Local Manufacturing
                      </h4>
                      <p className="text-xs text-gray-500">
                        Regional excellence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#ee2039] shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        Quality Standards
                      </h4>
                      <p className="text-xs text-gray-500">
                        International compliance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#ee2039] shrink-0 mt-1"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        Sustainability
                      </h4>
                      <p className="text-xs text-gray-500">
                        Eco-friendly solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Highlight */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#ee2039]/20 flex items-center justify-center">
                    <Handshake size={24} className="text-[#ee2039]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Partnership Excellence
                  </h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  Together, ECA and Al Faiha Group combine{" "}
                  <span className="text-white font-bold">
                    European innovation
                  </span>{" "}
                  with{" "}
                  <span className="text-white font-bold">
                    local manufacturing excellence
                  </span>
                  , ensuring that every product meets the highest international
                  standards of quality, performance, and sustainability.
                </p>
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
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                <Users size={12} />
                Join Our Network
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Become a <span className="text-[#ee2039]">Partner</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                At Al Faiha Group, we believe in building strong partnerships
                that drive innovation, quality, and sustainable growth across
                the construction industry.
              </p>
            </div>

            {/* Partnership Story */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Since our establishment in{" "}
                  <span className="font-bold text-slate-800">1987</span> as
                  Jordan's first construction chemicals company, we've continued
                  to expand our expertise, from concrete admixtures and cement
                  additives to a full range of specialty building materials,
                  powered by cutting-edge European technology from our partner
                  European Concrete Additives (ECA).
                </p>

                <p>
                  As we continue to grow across the MENA region, Al Faiha Group
                  welcomes strategic partners, distributors, contractors, and
                  suppliers who share our commitment to excellence, performance,
                  and integrity.
                </p>
              </div>
            </div>

            {/* Why Partner With Us */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#ee2039]/10 flex items-center justify-center mb-6 group-hover:bg-[#ee2039] transition-colors">
                  <Award
                    size={28}
                    className="text-[#ee2039] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Trusted Legacy
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Over 35 years of experience and leadership in construction
                  chemicals, combining a trusted legacy with exclusive
                  technology.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#ee2039]/10 flex items-center justify-center mb-6 group-hover:bg-[#ee2039] transition-colors">
                  <Globe
                    size={28}
                    className="text-[#ee2039] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Exclusive Technology
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sole licensed manufacturer of ECA products in the MENA region,
                  bringing European innovation to local markets.
                </p>
              </div>

              <div className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#ee2039]/10 flex items-center justify-center mb-6 group-hover:bg-[#ee2039] transition-colors">
                  <TrendingUp
                    size={28}
                    className="text-[#ee2039] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Collaborative Growth
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Technical training, marketing support, and long-term
                  opportunities built on mutual success.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#ee2039]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Let's Build the Future Together
                </h3>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                  Whether you're looking to represent our products, integrate
                  our solutions into your projects, or explore new opportunities
                  across the region, we welcome you to join our growing network
                  of partners.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 bg-[#ee2039] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#c41229] transition-all group hover:scale-105 active:scale-95 shadow-xl shadow-[#ee2039]/30"
                  >
                    Get in Touch
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>

                  <a
                    href="mailto:info@alfaihagroup.com"
                    className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                  >
                    <Mail size={20} />
                    Email Us
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
