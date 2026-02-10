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
} from "lucide-react";
import ServiceRequestModal from "../Component/ServiceRequestModal.jsx";

// --- بيانات الخدمات ---
const services = [
  {
    id: 1,
    slug: "chemical-formulation",
    title: "Chemical Formulation & Customization",
    icon: <Settings className="w-10 h-10" />,
    description:
      "Developing specialized chemical solutions tailored to unique project requirements.",
    subServices: [
      {
        name: "Tailor-made Solutions for Cement",
        desc: "Customized additives for increased cement performance.",
      },
      {
        name: "Tailor-made Solutions for Concrete",
        desc: "Formulations designed for increased strength, durability, and workability.",
      },
    ],
    relatedProducts: [
      { id: "cement-additives", label: "Cement Additives" },
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
    ],
    relatedSectors: [
      { id: "industrial", label: "Industrial" },
      { id: "infrastructure", label: "Infrastructure" },
    ],
    caseStudies: [
      { id: "inerkib-power", label: "Power Generation Plants" },
    ],
  },
  {
    id: 2,
    slug: "technical-support",
    title: "Technical Support & Site Assistance",
    icon: <HardHat className="w-10 h-10" />,
    description:
      "Expert on-site guidance to ensure optimal product performance and application.",
    subServices: [
      {
        name: "On-Site Inspection",
        desc: "Detailed site assessment and evaluation.",
      },
      {
        name: "Solution Optimization",
        desc: "Fine-tuning products for best results.",
      },
      {
        name: "Testing & Troubleshooting",
        desc: "Identifying and resolving performance issues.",
      },
      {
        name: "Performance Evaluation",
        desc: "Ensuring systems meet required standards.",
      },
    ],
    relatedProducts: [
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
      { id: "cementitious-repair", label: "Concrete Repair" },
    ],
    relatedSectors: [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
    ],
    caseStudies: [
      { id: "gcb-desalination", label: "Desalination Plants" },
    ],
  },
  {
    id: 3,
    slug: "consultancy-specs",
    title: "Consultancy & Specification",
    icon: <ClipboardCheck className="w-10 h-10" />,
    description:
      "Strategic support in defining technical requirements and material selection.",
    subServices: [
      {
        name: "Project Specification Guidance",
        desc: "Support in defining technical requirements.",
      },
      {
        name: "Material Specification Recommendation",
        desc: "Selecting the right materials for each project.",
      },
      {
        name: "Solution Application Guidance",
        desc: "Best-practice application support.",
      },
      {
        name: "Training & Support",
        desc: "Technical training for teams and applicators.",
      },
    ],
    relatedProducts: [
      { id: "tile-adhesives", label: "Tile Adhesives & Grout" },
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
    ],
    relatedSectors: [
      { id: "infrastructure", label: "Infrastructure" },
      { id: "educational", label: "Educational" },
    ],
    caseStudies: [
      { id: "cosider-silos", label: "Industrial Facilities" },
    ],
  },
  {
    id: 4,
    slug: "quality-control",
    title: "Quality Control & Lab Services",
    icon: <FlaskConical className="w-10 h-10" />,
    description:
      "Comprehensive testing services to validate material quality and performance.",
    subServices: [
      {
        name: "Chemical, Physical & Functionality Testing",
        desc: "Comprehensive lab testing services for raw materials and finished goods.",
      },
      {
        name: "Compatibility & Performance Testing",
        desc: "Ensuring material synergy.",
      },
    ],
    relatedProducts: [
      { id: "cement-additives", label: "Cement Additives" },
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
    ],
    relatedSectors: [
      { id: "industrial", label: "Industrial" },
    ],
  },
  {
    id: 5,
    slug: "waterproofing-support",
    title: "Waterproofing Application Support",
    icon: <Droplets className="w-10 h-10" />,
    description:
      "Specialized supervision for high-performance waterproofing installations.",
    subServices: [
      { name: "Area Inspection", desc: "Site evaluation before application." },
      {
        name: "System Recommendation",
        desc: "Selecting the most effective waterproofing system.",
      },
      {
        name: "Application of System",
        desc: "Supervised system application support.",
      },
      {
        name: "Post-Application Testing",
        desc: "Performance verification after installation.",
      },
    ],
    relatedProducts: [
      { id: "waterproofing", label: "Waterproofing" },
      { id: "protective-coating", label: "Protective Coating" },
    ],
    relatedSectors: [
      { id: "residential", label: "Residential" },
      { id: "infrastructure", label: "Infrastructure" },
    ],
    caseStudies: [
      { id: "gcb-desalination", label: "Desalination Plants" },
    ],
  },
  {
    id: 6,
    slug: "supply-chain",
    title: "Supply Chain Management",
    icon: <Truck className="w-10 h-10" />,
    description:
      "Reliable logistics and coordination to meet demanding project schedules.",
    subServices: [
      {
        name: "Customer Needs Assessment",
        desc: "Understanding project and supply requirements.",
      },
      {
        name: "Logistics, Planning & Scheduling",
        desc: "Efficient supply coordination.",
      },
      {
        name: "Freight & Transportation",
        desc: "Reliable transport solutions.",
      },
      {
        name: "Delivery & Application",
        desc: "Timely delivery with application support.",
      },
    ],
    relatedProducts: [
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
    ],
    relatedSectors: [
      { id: "commercial", label: "Commercial" },
      { id: "infrastructure", label: "Infrastructure" },
    ],
  },
  {
    id: 7,
    slug: "turnkey-solutions",
    title: "Turnkey Factory Solutions",
    icon: <Factory className="w-10 h-10" />,
    description: "Complete setup support for storage and dosing equipment.",
    subServices: [
      {
        name: "Premium Storage Solutions",
        desc: "Safe and efficient chemical storage systems.",
      },
      {
        name: "Dosing Calibration Equipment",
        desc: "Accurate and reliable dosing solutions.",
      },
      {
        name: "Weather Proof Technology",
        desc: "Protection against environmental conditions.",
      },
      {
        name: "On-Site Application & Maintenance",
        desc: "Complete installation and upkeep support.",
      },
    ],
    relatedProducts: [
      { id: "concrete-admixtures", label: "Concrete Admixtures" },
      { id: "cement-additives", label: "Cement Additives" },
    ],
    relatedSectors: [
      { id: "industrial", label: "Industrial" },
    ],
    caseStudies: [
      { id: "inerkib-power", label: "Power Generation Plants" },
    ],
  },
  {
    id: 8,
    slug: "maintenance-repair",
    title: "Maintenance & Repair",
    icon: <Wrench className="w-10 h-10" />,
    description:
      "Targeted repair strategies to extend the lifecycle of existing structures.",
    subServices: [
      {
        name: "On-Site Inspection",
        desc: "Condition assessment of existing systems.",
      },
      {
        name: "Problem Analysis",
        desc: "Identifying root causes of failures.",
      },
      {
        name: "Solution Recommendation",
        desc: "Targeted repair strategies.",
      },
      {
        name: "On-Site Application & Repair",
        desc: "Professional repair execution.",
      },
      {
        name: "Post-Application Services",
        desc: "Ongoing performance support.",
      },
    ],
    relatedProducts: [
      { id: "cementitious-repair", label: "Concrete Repair" },
      { id: "protective-coating", label: "Protective Coating" },
    ],
    relatedSectors: [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
    ],
    caseStudies: [
      { id: "gcb-desalination", label: "Desalination Plants" },
    ],
  },
];

// --- مكون الكرت ---
const ServiceCard = ({ service }) => {
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
            {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
          </div>
          <div className="absolute inset-0 text-[#ee2039] overflow-hidden h-0 group-hover:h-full transition-[height] duration-700 ease-in-out transform group-hover:scale-105">
            {React.cloneElement(service.icon, { size: 48, strokeWidth: 1.5 })}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#ee2039] transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-500 mb-8 text-sm leading-relaxed group-hover:text-gray-600 transition-colors">
          {service.description}
        </p>

        <div className="space-y-4 mb-8 flex-grow">
          {service.subServices.map((sub, i) => (
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
        {(service.relatedProducts || service.relatedSectors || service.caseStudies) && (
          <div className="mt-auto pt-4 border-t border-gray-50">
            <div className="flex flex-wrap gap-2 items-center">
              {service.relatedProducts?.map((product, idx) => (
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
              {service.relatedSectors?.map((sector, idx) => (
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
              {service.caseStudies?.map((study, idx) => (
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
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeServiceTitle, setActiveServiceTitle] = useState(
    "General Technical Support"
  );

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

  const handleOpenModal = (title) => {
    setActiveServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/10 text-white border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Technical Excellence
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Engineering <span className="text-[#ee2039]">Services</span>
              <br />& Technical Support
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
              From specialized chemical formulations to on-site inspections, Al
              Faiha Group provides end-to-end expertise to ensure the success of
              your infrastructure projects.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action: Inquiry */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 p-12 opacity-10 animate-[spin_10s_linear_infinite]">
              <Settings size={300} className="text-white" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Need a <span className="text-[#ee2039]">Customized</span>{" "}
                Solution?
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                Our technical teams is ready to develop tailored chemical
                formulations to meet the specific requirements of your project.
              </p>

              <button
                onClick={() => handleOpenModal("Customized Solution Request")}
                className="inline-flex items-center gap-3 bg-[#ee2039] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#c41229] transition-all group hover:scale-105 active:scale-95"
              >
                Request Technical Support
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
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