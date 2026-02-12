import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const About = () => {
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
              The Al Faiha Story
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Building Trust <span className="text-[#ee2039]">Since 1987</span>
            </h1>

            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              A legacy of innovation, integrity, and excellence in construction chemicals across the MENA region.
            </p>
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
                        {/* Placeholder for Founder Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 bg-gray-100">
                             Founder Image
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    <Quote className="text-[#ee2039]/20 mb-6" size={64} />
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Message from the Founder</h2>
                    
                    <div className="space-y-4 text-black leading-relaxed font-light">
                        <p>Welcome to the online home of Al Faiha Group.</p>
                        <p>
                            Since founding Al Faiha in 1987, my vision has been clear, simple yet ambitious: to provide trusted, high-quality chemicals, building materials, and tailored technical solutions to varying sectors across the Middle East and North Africa. Solutions that stand the test of time. From a single operation, we have grown into a regional leader, supplying innovative products, inspiring solutions, and dependable service to clients across Jordan, Saudi Arabia, Iraq, Algeria, Lebanon, Libya, and beyond.
                        </p>
                        <p>
                            Our partnerships with world-class technology providers, like European Concrete Additives (ECA), keep us at the forefront of construction chemistry, ensuring that we continuously improve our products to meet the evolving demands of modern infrastructure, entrenched high-arching sustainability standards, and endured efficient performance.
                        </p>
                        <p>
                            In the coming years, we aim to expand both the depth and breadth of our product portfolio, technical services, and specialized solutions. We will continue to strengthen our presence in existing markets, extend our footprint both regionally and globally, and work relentlessly to pioneer new standards in construction chemicals and technologies.
                        </p>
                        <p>
                            We likewise renew our commitment to our clients, partners, and communities: to deliver reliability, innovation, and unmatched service in every product we offer. We adhere steadfastly to our growth pillars of: Focus, Accountability, Innovation, Health & Safety, and Agility; values that define how we operate and deliver on the promises we keep to our clients and partners.
                        </p>
                        <p>
                            Together, we will continue to build resilient infrastructure, sustainable communities, and enduring partnerships for generations to come.
                        </p>
                        <p>Thank you for your continued trust and support.</p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h4 className="text-xl font-bold text-slate-900">Ramzi Kandalaft</h4>
                        <p className="text-[#ee2039] font-medium">Founder & CEO of Al Faiha Group</p>
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
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                  <Target size={12} />
                  Our Compass
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Vision & <span className="text-[#ee2039]">values</span>
                </h2>
                <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                    To be the MENA region’s trusted partner for world-class construction solutions, delivering end-to-end expertise in construction chemicals that combine innovation, quality, and sustainability.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex flex-wrap items-center gap-2 md:gap-3">
                            <span className="text-[#ee2039]">A.L.F.A.I.H.A.</span> <span>Values</span>
                        </h3>
                        <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                            The name A.L.F.A.I.H.A. reflects the principles that guide our work and our growth. Each value represents a commitment we uphold across our operations, partnerships, and solutions.
                        </p>
                        <ul className="space-y-4">
                            {[
                                { l: "A", t: "Ambition for industry leadership" },
                                { l: "L", t: "Leadership grounded in integrity" },
                                { l: "F", t: "Future-ready solutions" },
                                { l: "A", t: "Accountability in every project" },
                                { l: "I", t: "Innovation in construction solutions" },
                                { l: "H", t: "Health, Safety, and Sustainability" },
                                { l: "A", t: "Agility and client responsiveness" },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start md:items-center gap-3 md:gap-4 bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors">
                                    <span className="w-8 h-8 rounded-lg bg-[#ee2039] flex items-center justify-center font-bold text-white shrink-0 mt-0.5 md:mt-0">
                                        {item.l}
                                    </span>
                                    <span className="text-sm md:text-base font-medium text-gray-300">{item.t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="space-y-6">
                   <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039]/30 transition-all">
                       <Target className="text-[#ee2039] mb-4" size={32} />
                       <h4 className="text-xl font-bold text-slate-900 mb-3">Our Purpose</h4>
                       <p className="text-gray-800 leading-relaxed">
                           To bridge global innovation with the Middle East’s evolving construction needs, ensuring structures that are safer, stronger, and more sustainable.
                       </p>
                   </div>
                   <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-[#ee2039]/30 transition-all">
                       <CheckCircle2 className="text-[#ee2039] mb-4" size={32} />
                       <h4 className="text-xl font-bold text-slate-900 mb-3">Our Commitment</h4>
                       <p className="text-gray-800 leading-relaxed">
                           These principles are embedded in everything we do; from product development and technical support to project execution and long-term partnerships.
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
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <TrendingUp size={12} />
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Founded in <span className="text-[#ee2039]">1987</span>
            </h2>
            <p className="text-xl text-gray-800">
              From a pioneering local enterprise to a trusted regional partner.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ee2039]/20 via-[#ee2039]/50 to-[#ee2039]/20 md:-ml-[1px]"></div>

            <div className="space-y-12">
              {/* 1987 - The Beginning */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center">
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#ee2039] border-4 border-white shadow-md z-10 md:-ml-2 transform -translate-x-1.5 md:translate-x-0 mt-6 md:mt-0"></div>
                
                <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 relative group">
                    <div className="absolute top-4 right-4 md:right-auto md:left-4 text-[#ee2039]/10 font-bold text-6xl -z-10 select-none group-hover:text-[#ee2039]/10 transition-colors">
                      '87
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#ee2039]/10 text-[#ee2039] text-xs font-bold rounded-full mb-4">
                      The Foundation
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">The Beginning</h3>
                    <p className="text-gray-800 leading-relaxed text-sm">
                      Al Faiha Group began with a simple but powerful purpose: to bridge global innovation with the Middle East’s evolving construction needs, starting as a focused local operation.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Expansion - Regional Growth */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center">
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#ee2039] shadow-md z-10 md:-ml-2 transform -translate-x-1.5 md:translate-x-0 mt-6 md:mt-0"></div>
                
                <div className="hidden md:block md:w-1/2"></div>
                <div className="w-full md:w-1/2 md:pl-12 pl-12">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 relative group">
                    <div className="absolute top-4 right-4 text-[#ee2039]/10 font-bold text-6xl -z-10 select-none group-hover:text-[#ee2039]/10 transition-colors">
                      Exp
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4">
                      Regional Growth
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Regional Expansion</h3>
                    <p className="text-gray-800 leading-relaxed text-sm">
                      Evolving into a regional leader, we expanded our footprint to shape the foundations of modern infrastructure across Jordan, Iraq, Libya, Algeria, Lebanon, and Saudi Arabia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Present - Innovation */}
              <div className="relative flex flex-col md:flex-row gap-8 items-center">
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#ee2039] border-4 border-white shadow-md z-10 md:-ml-2 transform -translate-x-1.5 md:translate-x-0 mt-6 md:mt-0"></div>
                
                <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 relative group">
                    <div className="absolute top-4 right-4 md:right-auto md:left-4 text-[#ee2039]/10 font-bold text-6xl -z-10 select-none group-hover:text-[#ee2039]/10 transition-colors">
                      Now
                    </div>
                    <span className="inline-block px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full mb-4">
                      Innovation & Partnership
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Today & Beyond</h3>
                    <p className="text-gray-800 leading-relaxed text-sm">
                      Rooted in decades of expertise and strengthened by continuous innovation, we have transformed into a trusted regional partner. Our factories and offices across the MENA region stand as proof of our enduring commitment.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                  <Globe size={12} />
                  Our Footprint
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Serving the <span className="text-[#ee2039]">MENA Region</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
                {[
                    "Jordan", "Saudi Arabia", "Iraq", 
                    "Algeria", "Lebanon", "Libya"
                ].map((country, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-3 md:gap-4 hover:shadow-lg hover:border-[#ee2039]/20 transition-all group text-center md:text-left h-full justify-center md:justify-start">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#ee2039] group-hover:bg-[#ee2039] group-hover:text-white transition-colors shrink-0">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                         </div>
                         <span className="font-bold text-slate-900 text-sm md:text-lg leading-tight">{country}</span>
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
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
                  <Award size={12} />
                  Why Choose Al Faiha
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  A Legacy of Excellence
                </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {[
                    { icon: <Award />, title: "Proven Legacy Since 1987", desc: "Over three decades of leadership in construction chemicals and materials." },
                    { icon: <Target />, title: "Comprehensive Solutions", desc: "Full portfolio covering Admixtures, Additives & Specialty Materials." },
                    { icon: <HandshakeIcon />, title: "Exclusive Partnership", desc: "Sole licensee manufacturer of European Concrete Additives (ECA)." },
                    { icon: <ShieldCheck />, title: "Quality & Environmental", desc: "ISO 9001 and ISO 14001 certified for consistent quality and safety." },
                    { icon: <Building />, title: "Track Record", desc: "Trusted partner in major infrastructure projects across the region." },
                    { icon: <Users />, title: "Customer-Centric", desc: "Fast, responsive service with tailored technical solutions." },
                    { icon: <Zap />, title: "QHSE Commitment", desc: "Continuous alignment with evolving regulations and safety standards." },
                    { icon: <Heart />, title: "Trusted Partner", desc: "Combining quality, innovation, and regional insight." },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
                        <div className="text-[#ee2039] mb-4">{React.cloneElement(item.icon, { size: 32 })}</div>
                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

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
)

export default About;
