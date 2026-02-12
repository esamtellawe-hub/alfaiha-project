import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Building2,
  ArrowRight,
  Filter,
  Globe,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

// --- Project Data ---
const PROJECTS_DATA = [
  // ALGERIA
  {
    id: "gcb-desalination",
    country: "Algeria",
    countryCode: "DZ",
    title: "GCB – National Company for Civil Engineering and Construction",
    subtitle: "Seawater Desalination Plants",
    sector: "Infrastructure",
    client: "GCB",
    location: "Eastern, Western, and Central Algeria",
    description:
      "Multiple seawater desalination plant projects executed in collaboration with local contractors, utilizing advanced concrete protection and waterproofing solutions.",
    products: ["EUNIFLOW 110", "EUNICURE CUREX", "EUNIMAR DELTRAPO"],
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "cosider-silos",
    country: "Algeria",
    countryCode: "DZ",
    title: "Industrial Facilities & Grain Silos",
    subtitle: "COSIDER",
    sector: "Industrial",
    client: "COSIDER",
    location: "Adrar, M'Sila, and other provinces",
    description:
      "Strategic projects supporting Algeria's national goal of achieving self-sufficiency in wheat production and reducing imports.",
    products: ["EUNIFLOW 110", "EUNICURE CUREX", "EUNIMAR DELTRAPO"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "inerkib-power",
    country: "Algeria",
    countryCode: "DZ",
    title: "Power Generation Plants",
    subtitle: "INERKIB (formerly INERGA)",
    sector: "Power & Energy",
    client: "INERKIB with Samsung and Hyundai",
    location: "Boumerdès, Mostaganem, Jijel, Setif, Naama, Biskra, Khenchela",
    description:
      "Multiple high-capacity power generation plant projects executed under a five-year supply contract.",
    products: [
      "EUNIFLOW 110",
      "EUNITARD P2",
      "EUNICURE CUREX",
      "EUNIMAR DELTRAPO",
      "EURIPAR BA9",
      "EUNICOTE ES9",
      "EUNICOTE MRA1",
      "Cemfiber 12 mm",
    ],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "metro-m28",
    country: "Algeria",
    countryCode: "DZ",
    title: "Metro M28 Project – Algiers",
    subtitle: "Algiers Metro Expansion",
    sector: "Infrastructure",
    client: "COSIDER",
    location: "Algiers",
    description:
      "Key part of expanding the capital's metro network with locally manufactured materials developed in line with European standards.",
    products: ["EUNIFLOW 110", "EUNISET GA4", "EURIPAR BA9", "CEMFIBER 12 mm"],
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop",
  },

  // LEBANON
  {
    id: "souk-beirut",
    country: "Lebanon",
    countryCode: "LB",
    title: "Souk Beirut",
    subtitle: "Commercial Development",
    sector: "Commercial",
    client: "Hourie",
    consultant: "Samir Khairallah & Partners",
    location: "Beirut, Lebanon",
    description:
      "Major commercial development utilizing advanced concrete and waterproofing solutions for long-term durability.",
    products: ["EUNICEM", "EURIPARE", "EUNITARD"],
    image:
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sama-beirut",
    country: "Lebanon",
    countryCode: "LB",
    title: "Sama Beirut",
    subtitle: "Residential Towers",
    sector: "High Rise",
    client: "Man Enterprise s.a.l",
    consultant: "Samir Khairallah & Partners",
    location: "Achrafieh, Lebanon",
    description:
      "High-rise residential towers project with high-performance concrete and protective systems.",
    products: ["EUNICEM", "EURIPARE", "EUNICOTE"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "four-seasons-beirut",
    country: "Lebanon",
    countryCode: "LB",
    title: "Four Seasons Hotel",
    subtitle: "Premium Hospitality",
    sector: "Hospitality",
    client: "Man-Sursock",
    consultant: "Dar Al Handasah",
    location: "Beirut, Lebanon",
    description:
      "Specialized works for premium hospitality development with high-quality concrete admixtures and protective systems.",
    products: ["EUNICEM", "EUNIPARE", "EUNIGROUT"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "aj-wadi",
    country: "Lebanon",
    countryCode: "LB",
    title: "AJ Wadi Residence",
    subtitle: "High-End Residential",
    sector: "High Rise",
    client: "Man Enterprise",
    consultant: "Nabil Henawi",
    location: "Solidere, Beirut, Lebanon",
    description:
      "High-end residential development with specialized concrete and protective solutions for long-term durability.",
    products: ["EUNICEM", "EURIPARE", "EUNICOTE"],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  },

  // JORDAN
  {
    id: "munition-storage",
    country: "Jordan",
    countryCode: "JO",
    title: "Munition Storage Area – US Corps",
    subtitle: "Military Infrastructure",
    sector: "Infrastructure",
    client: "American International Contractors, Inc. (AICI)",
    location: "Jordan",
    description:
      "Critical munition storage facility with advanced waterproofing and protective systems meeting stringent requirements.",
    products: [
      "TOPSEAL 200",
      "EUNICOTE BE",
      "EUNISEAL PARASEAL",
      "EUNISEAL VERTISEAL",
      "EUNICOTE ZNR",
      "ECA Waterplug+",
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "sjfmei-healthcare",
    country: "Jordan",
    countryCode: "JO",
    title: "SJFMEI Healthcare & Education Project",
    subtitle: "Healthcare & Education",
    sector: "Healthcare",
    client: "Hussein Atieh & Sons Co.",
    location: "Jordan",
    description:
      "Comprehensive healthcare and education facility with reliable waterproofing and joint sealing solutions.",
    products: [
      "EUNICOTE BE",
      "EUNICOTE RBE",
      "ECA WaterStop",
      "ECA Cartonal",
      "EUNICOTE MRAI",
      "ECA Polyethylene Sheet",
      "ECA Swellable WaterStop",
    ],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "jordan-ahli-bank",
    country: "Jordan",
    countryCode: "JO",
    title: "Jordan Ahli Bank – New Headquarters",
    subtitle: "Banking Headquarters",
    sector: "Commercial",
    client: "MID Contracting Company",
    location: "Jordan",
    description:
      "Flagship banking development with advanced waterproofing and joint sealing systems for long-term performance.",
    products: ["EUNICOTE BE", "PREMIERFLEX 2000", "EUNISEAL PU Sealant"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },

  // IRAQ
  {
    id: "central-bank-iraq",
    country: "Iraq",
    countryCode: "IQ",
    title: "Central Bank of Iraq",
    subtitle: "National Banking Infrastructure",
    sector: "Commercial",
    client: "Central Bank of Iraq",
    location: "Baghdad, Iraq",
    description:
      "Nationally significant development supporting the stability and growth of the Iraqi economy with advanced construction solutions.",
    products: ["DCIS", "Microsilica", "ADProfe 75ME", "EUNIFLOW 612i"],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "movenpick-baghdad",
    country: "Iraq",
    countryCode: "IQ",
    title: "Mövenpick Hotel",
    subtitle: "Premium Hospitality",
    sector: "Hospitality",
    client: "Mövenpick Hotels & Resorts",
    location: "Baghdad, Iraq",
    description:
      "High-profile hospitality development with comprehensive waterproofing for 400 hotel bathrooms and extensive steel corrosion treatment.",
    products: ["ECA Waterproofing Systems", "Corrosion Protection"],
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "rixos-baghdad",
    country: "Iraq",
    countryCode: "IQ",
    title: "Rixos Hotel",
    subtitle: "Luxury Hospitality",
    sector: "Hospitality",
    client: "Rixos Hotels",
    location: "Baghdad, Iraq",
    description:
      "Landmark hospitality development with shotcrete works for critical structural elements requiring high-performance materials.",
    products: ["EUNIFLOW 612i", "DCIS", "Microsilica"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "al-burouj",
    country: "Iraq",
    countryCode: "IQ",
    title: "Al-Burouj Residential Complex",
    subtitle: "Large-Scale Residential",
    sector: "High Rise",
    client: "Lafarge",
    location: "Iraq",
    description:
      "Large-scale residential development requiring durable and reliable concrete solutions for long-term performance.",
    products: ["Microsilica", "DCIS"],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "abu-nuwas-bridge",
    country: "Iraq",
    countryCode: "IQ",
    title: "Abu Nuwas Street Bridge",
    subtitle: "Transport Infrastructure",
    sector: "Infrastructure",
    client: "Taj Al-Sahel Company",
    location: "Iraq",
    description:
      "Key transport infrastructure development supporting improved connectivity and traffic flow with durable construction solutions.",
    products: ["ECA Technology Products"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "al-aziziyah-bridge",
    country: "Iraq",
    countryCode: "IQ",
    title: "Al-Aziziyah Concrete Bridge",
    subtitle: "Regional Infrastructure",
    sector: "Infrastructure",
    client: "Al-Buad Al-Rabea Company",
    location: "Kut Governorate, Iraq",
    description:
      "Important infrastructure development enhancing regional connectivity with high-performance concrete solutions.",
    products: ["EUNIFLOW 720C", "Microsilica"],
    image:
      "https://images.unsplash.com/photo-1587916823939-ce5c1c3d0d1e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "al-maamariyoon",
    country: "Iraq",
    countryCode: "IQ",
    title: "Al-Maamariyoon Towers Complex",
    subtitle: "Mixed-Use Development",
    sector: "High Rise",
    client: "Al-Maamariyoon Towers Company",
    location: "Baghdad, Iraq",
    description:
      "Prominent mixed-use development in Baghdad with comprehensive waterproofing and repair solutions.",
    products: [
      "EUNICOTE 512W",
      "EURIPARE 502",
      "EUNISEAL PU Sealant",
      "EURIPARE BA9",
    ],
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "iraq-mall",
    country: "Iraq",
    countryCode: "IQ",
    title: "Iraq Mall",
    subtitle: "Major Commercial Development",
    sector: "Commercial",
    client: "Jawhara Baghdad and Iraq Towers Company",
    location: "Baghdad, Iraq",
    description:
      "Major commercial development with high-performance superplasticizing admixture for enhanced concrete workability and strength.",
    products: ["Euniflow 612i"],
    image:
      "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "al-batirah-overpass",
    country: "Iraq",
    countryCode: "IQ",
    title: "Al-Batirah Overpass",
    subtitle: "Traffic Infrastructure",
    sector: "Infrastructure",
    client: "Al-Izza General Contracting Ltd.",
    location: "Iraq",
    description:
      "Infrastructure development improving traffic flow and transportation efficiency with robust concrete works.",
    products: ["EUNIFLOW 612i"],
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Country Codes for Flag Images ---
const COUNTRY_FLAGS = {
  Algeria: { code: "dz", name: "Algeria" },
  Lebanon: { code: "lb", name: "Lebanon" },
  Jordan: { code: "jo", name: "Jordan" },
  Iraq: { code: "iq", name: "Iraq" },
};

// --- Project Card Component ---
const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#ee2039] hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Country Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <div className="relative flex items-center justify-center w-5 h-5 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
            <img
              src={`https://flagcdn.com/w80/${COUNTRY_FLAGS[project.country].code}.png`}
              alt={project.country}
              className={`w-full h-full object-cover ${project.country === "Jordan" ? "object-left" : "object-center"}`}
            />
          </div>
          <span className="text-xs font-bold text-slate-800">
            {project.country}
          </span>
        </div>

        {/* Sector Badge */}
        <div className="absolute top-4 right-4 bg-[#ee2039]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {project.sector}
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
          <MapPin size={14} className="opacity-80" />
          <span className="text-xs font-medium opacity-90">
            {project.location}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Client */}
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={14} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {project.client}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#ee2039] transition-colors">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm font-medium text-gray-500 mb-3">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Products Tags */}
        <div className="mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Products Used
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.products.slice(0, 3).map((product, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-50 text-[10px] font-medium text-gray-600 rounded-md border border-gray-100"
              >
                {product}
              </span>
            ))}
            {project.products.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-[10px] font-medium text-gray-500 rounded-md border border-gray-100">
                +{project.products.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            View Details
          </span>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? "bg-[#ee2039] text-white translate-x-1"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Projects Component ---
const Projects = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Get country from URL query parameter
  const countryParam = searchParams.get('country');
  const initialCountry = countryParam 
    ? countryParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "All";
  
  const [activeCountry, setActiveCountry] = useState(initialCountry);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  
  // Update active country when URL changes
  useEffect(() => {
    if (countryParam) {
      const formattedCountry = countryParam.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setActiveCountry(formattedCountry);
    }
  }, [countryParam]);

  // Get unique countries
  const countries = ["All", ...new Set(PROJECTS_DATA.map((p) => p.country))];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCountry === "All") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.country === activeCountry);
  }, [activeCountry]);

  // Stats
  const stats = {
    totalProjects: PROJECTS_DATA.length,
    countries: new Set(PROJECTS_DATA.map((p) => p.country)).size,
    sectors: new Set(PROJECTS_DATA.map((p) => p.sector)).size,
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black text-center overflow-hidden text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Case Studies
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Projects & <span className="text-[#ee2039]">Clients</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              Delivering excellence across the MENA region. Explore our
              portfolio of landmark projects and trusted partnerships.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {stats.totalProjects}
                  </span>
                  <span className="text-2xl font-bold text-[#ee2039] ml-1">
                    +
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Projects
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {stats.countries}
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Countries
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {stats.sectors}
                  </span>
                  <span className="text-2xl font-bold text-[#ee2039] ml-1">
                    +
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Sectors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Country Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <Filter size={16} className="text-gray-400 mr-2" />
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setActiveCountry(country)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCountry === country
                      ? "bg-[#ee2039] text-white shadow-lg shadow-[#ee2039]/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {country === "All" ? (
                    <span className="flex items-center gap-2">
                      <Globe size={14} />
                      All Countries
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <div className="relative flex items-center justify-center w-4 h-4 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                        <img
                          src={`https://flagcdn.com/w80/${COUNTRY_FLAGS[country].code}.png`}
                          alt={country}
                          className={`w-full h-full object-cover ${country === "Jordan" ? "object-left" : "object-center"}`}
                        />
                      </div>
                      {country}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 size={16} className="text-[#ee2039]" />
              <span className="font-medium">
                {filteredProjects.length} Projects Found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-400 font-bold mb-2">
                No projects found
              </p>
              <p className="text-gray-500 mb-6">
                Try selecting a different country filter
              </p>
              <button
                onClick={() => setActiveCountry("All")}
                className="px-6 py-3 bg-[#ee2039] text-white rounded-full font-bold hover:bg-[#c41229] transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
