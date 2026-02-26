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

// --- Country Codes for Flag Images ---
const COUNTRY_FLAGS = {
  Algeria: { code: "dz", name: "Algeria" },
  Lebanon: { code: "lb", name: "Lebanon" },
  Jordan: { code: "jo", name: "Jordan" },
  Iraq: { code: "iq", name: "Iraq" },
};

// --- Project Card Component ---
const ProjectCard = ({ project, sections }) => {
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
          style={{ backgroundImage: `url('${project.image_url || "/images/logo.png"}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Country Badge */}
        {project.country && COUNTRY_FLAGS[project.country] && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <div className="relative flex items-center justify-center w-5 h-5 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
            <img
              src={`https://flagcdn.com/w80/${COUNTRY_FLAGS[project.country]?.code}.png`}
              alt={project.country}
              className={`w-full h-full object-cover ${project.country === "Jordan" ? "object-left" : "object-center"}`}
            />
          </div>
          <span className="text-xs font-bold text-slate-800">
            {project.country}
          </span>
        </div>
        )}

        {/* Sector Badge */}
        {project.sector && (
        <div className="absolute top-4 right-4 bg-[#ee2039]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {project.sector}
          </span>
        </div>
        )}

        {/* Location */}
        {project.location_en && (
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
          <MapPin size={14} className="opacity-80" />
          <span className="text-xs font-medium opacity-90">
            {project.location_en}
          </span>
        </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Client */}
        {project.client_en && (
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={14} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {project.client_en}
          </span>
        </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#ee2039] transition-colors">
          {project.title_en}
        </h3>

        {/* Subtitle */}
        {project.subtitle && (
        <p className="text-sm font-medium text-gray-500 mb-3">
          {project.subtitle}
        </p>
        )}

        {/* Description */}
        {project.description_en && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description_en}
        </p>
        )}

        {/* Products Tags */}
        {project.products && (Array.isArray(project.products) ? project.products : JSON.parse(project.products || "[]")).filter(Boolean).length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            {sections?.card?.title_en || "Products Used"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(Array.isArray(project.products) ? project.products : JSON.parse(project.products || "[]"))
              .filter(Boolean)
              .slice(0, 3)
              .map((product, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-50 text-[10px] font-medium text-gray-600 rounded-md border border-gray-100"
              >
                {product}
              </span>
            ))}
            {(Array.isArray(project.products) ? project.products : JSON.parse(project.products || "[]")).filter(Boolean).length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-[10px] font-medium text-gray-500 rounded-md border border-gray-100">
                +{(Array.isArray(project.products) ? project.products : JSON.parse(project.products || "[]")).filter(Boolean).length - 3} {sections?.card?.subtitle_en || "more"}
              </span>
            )}
          </div>
        </div>
        )}

        {/* View Details Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {sections?.card?.btn_text_en || "View Details"}
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

import useProjects from "../hooks/useProjects";

// --- Main Projects Component ---
const Projects = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // API Data State from our new custom hook
  const { sections, projectsData, loading, error } = useProjects();

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
  const countries = ["All", ...new Set(projectsData.map((p) => p.country).filter(Boolean))];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCountry === "All") return projectsData;
    return projectsData.filter((p) => p.country === activeCountry);
  }, [activeCountry, projectsData]);

  // Stats
  const stats = {
    totalProjects: projectsData.length,
    countries: new Set(projectsData.map((p) => p.country).filter(Boolean)).size,
    sectors: new Set(projectsData.map((p) => p.sector).filter(Boolean)).size,
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
              {sections?.hero?.subtitle_en || "Case Studies"}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {sections?.hero?.title_en ? (
                <>
                  {sections.hero.title_en.split(' ')[0]} <span className="text-[#ee2039]">{sections.hero.title_en.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>Projects & <span className="text-[#ee2039]">Clients</span></>
              )}
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              {sections?.hero?.description_en || "Delivering excellence across the MENA region. Explore our portfolio of landmark projects and trusted partnerships."}
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
                  {sections?.hero?.extra_data?.stats_projects_en || "Projects"}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {stats.countries}
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  {sections?.hero?.extra_data?.stats_countries_en || "Countries"}
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
                  {sections?.hero?.extra_data?.stats_sectors_en || "Sectors"}
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
                      {sections?.filter?.title_en || "All Countries"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {COUNTRY_FLAGS[country] && (
                        <div className="relative flex items-center justify-center w-4 h-4 rounded-full overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                          <img
                            src={`https://flagcdn.com/w80/${COUNTRY_FLAGS[country].code}.png`}
                            alt={country}
                            className={`w-full h-full object-cover ${country === "Jordan" ? "object-left" : "object-center"}`}
                          />
                        </div>
                      )}
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
                {filteredProjects.length} {sections?.filter?.description_en || "Projects Found"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">
                {sections?.card?.extra_data?.loading_en || "Loading Projects..."}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">
              Error fetching projects: {error}
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} sections={sections} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Building2 size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-400 font-bold mb-2">
                {sections?.card?.empty_text_en || "No projects found"}
              </p>
              <p className="text-gray-500 mb-6">
                {sections?.card?.placeholder_en || "Try selecting a different country filter"}
              </p>
              <button
                onClick={() => setActiveCountry(sections?.filter?.title_en || "All")}
                className="px-6 py-3 bg-[#ee2039] text-white rounded-full font-bold hover:bg-[#c41229] transition-colors"
              >
                {sections?.card?.extra_data?.view_all_en || "View All Projects"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;

