import { useLanguage } from "../context/LanguageContext";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import {
  Settings,
  HardHat,
  ClipboardCheck,
  FlaskConical,
  Droplets,
  Truck,
  Factory,
  Wrench,
  ChevronRight,
  ArrowRight,
  Package,
  Building,
  FolderOpen,
  Zap, // Fallback icon
} from "lucide-react";
import ServiceRequestModal from "../Component/ServiceRequestModal.jsx";
import useServices from "../hooks/useServices";

// Icon mapping
const iconMap = {
  Settings: Settings,
  HardHat: HardHat,
  ClipboardCheck: ClipboardCheck,
  FlaskConical: FlaskConical,
  Droplets: Droplets,
  Truck: Truck,
  Factory: Factory,
  Wrench: Wrench,
  Consult: ClipboardCheck, // Map Consult to ClipboardCheck or similar
  Tool: Wrench, // Map Tool to Wrench
};

// --- مكون الكرت ---
const ServiceCard = ({ service, currentLang }) => {
  const { language } = useLanguage();
  const IconComponent = iconMap[service.icon_name] || Zap;

  // Dynamic access to content based on language
  const title = service[`title_${currentLang}`] || service[`title_${language}`] || ervice.title_en;
  const description = service[`description_${currentLang}`] || service[`description_${language}`] || ervice.description_en;
  // Parse JSON fields safely
  const parseJson = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Error parsing JSON field:", e);
      return [];
    }
  };

  const subServicesRaw = service[`sub_services_${currentLang}`] || service[`sub_services_${language}`] || ervice.sub_services_en;
  const subServices = parseJson(subServicesRaw);
  const relatedProducts = parseJson(service[`related_products_${language}`] || service.related_products_en); // Related content usually doesn't need translation, just the label
  const relatedSectors = parseJson(service[`related_sectors_${language}`] || service.related_sectors_en);
  const caseStudies = parseJson(service[`case_studies_${language}`] || service.case_studies_en);

  return (
    <div
      id={service.slug}
      className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#ee2039]/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ee2039_1px,transparent_1px),linear-gradient(to_bottom,#ee2039_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.06]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 relative w-fit">
          <div className="text-gray-300 transform transition-transform duration-500 group-hover:scale-105">
            <IconComponent size={48} strokeWidth={1.5} />
          </div>
          <div className="absolute inset-0 text-[#ee2039] overflow-hidden h-0 group-hover:h-full transition-[height] duration-700 ease-in-out transform group-hover:scale-105">
            <IconComponent size={48} strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#ee2039] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-500 mb-8 text-sm leading-relaxed group-hover:text-gray-600 transition-colors">
          {description}
        </p>

        <div className="space-y-4 mb-8 flex-grow">
          {subServices.map((sub, i) => (
            <div key={i} className="flex gap-3 items-start group/item">
              <div className="mt-1.5 w-1.5 h-1.5 bg-[#ee2039] rounded-full shrink-0 group-hover/item:scale-125 transition-transform"></div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 group-hover/item:text-[#ee2039] transition-colors">
                  {sub.name}
                </h4>
                <p className="text-xs text-gray-400">{sub.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Related Content - Compact */}
        {((relatedProducts.length > 0) || (relatedSectors.length > 0) || (caseStudies.length > 0)) && (
          <div className="mt-auto pt-4 border-t border-gray-50">
            <div className="flex flex-wrap gap-2 items-center">
              {relatedProducts.map((product, idx) => (
                <Link
                  key={`p-${idx}`}
                  to={`/solutions#${product.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-[#ee2039] text-gray-500 hover:text-white rounded-full text-[10px] font-medium transition-all"
                  title="Related Product"
                >
                  <Package size={10} />
                  {product.label}
                </Link>
              ))}
              {relatedSectors.map((sector, idx) => (
                <Link
                  key={`s-${idx}`}
                  to={`/sectors#${sector.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-[#ee2039] text-gray-500 hover:text-white rounded-full text-[10px] font-medium transition-all"
                  title="Related Sector"
                >
                  <Building size={10} />
                  {sector.label}
                </Link>
              ))}
              {caseStudies.map((study, idx) => (
                <Link
                  key={`c-${idx}`}
                  to="/projects"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 hover:bg-[#ee2039] text-gray-500 hover:text-white rounded-full text-[10px] font-medium transition-all"
                  title="Case Study"
                >
                  <FolderOpen size={10} />
                  {study.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- المكون الرئيسي للصفحة ---
const Services = () => {
  const { language } = useLanguage();
  const { sections, services, loading, error } = useServices();
  const location = useLocation();
 
  const [currentLang, setCurrentLang] = useState("en"); // Default language
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceTitle, setActiveServiceTitle] = useState(
    "General Technical Support"
  );

  useEffect(() => {
    if (location.hash && !loading && services.length > 0) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, loading, services]);

  const handleOpenModal = (title) => {
    setActiveServiceTitle(title);
    setIsModalOpen(true);
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="h-screen flex items-center justify-center text-red-500">Error loading services.</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          

          <div className="max-w-4xl mx-auto text-center" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
            {sections.hero?.[`subtitle_${currentLang}`] && (
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/10 text-white border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
                {sections.hero[`subtitle_${currentLang}`]}
              </div>
            )}

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {sections.hero?.[`title_${currentLang}`] || "Engineering Services"} <br />
              <span className="text-[#ee2039]">
                {sections.hero?.[`btn_text_${currentLang}`] || ""}
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
              {sections.hero?.[`description_${currentLang}`]}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} currentLang={currentLang} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action: Inquiry */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
            <div className={`absolute -top-10 ${currentLang === 'ar' ? '-left-10' : '-right-10'} p-12 opacity-10 animate-[spin_10s_linear_infinite]`}>
              <Settings size={300} className="text-white" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {sections.cta?.[`title_${currentLang}`] || "Need a Customized Solution?"}
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                {sections.cta?.[`description_${currentLang}`]}
              </p>

              <button
                onClick={() => handleOpenModal(sections.cta?.[`title_${currentLang}`] || "Customized Solution Request")}
                className="inline-flex items-center gap-3 bg-[#ee2039] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#c41229] transition-all group hover:scale-105 active:scale-95"
              >
                {sections.cta?.[`btn_text_${currentLang}`] || "Request Technical Support"}
                <ArrowRight
                  size={20}
                  className={`transition-transform ${currentLang === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* المودال */}
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectorTitle={activeServiceTitle}
      />
    </div>
  );
};


export default Services;