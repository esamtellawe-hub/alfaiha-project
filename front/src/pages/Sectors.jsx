import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import useSectors from "../hooks/useSectors";
import {
  Building2,
  Factory,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Car,
  Search,
  Filter,
  MapPin,
  Briefcase,
  LayoutGrid,
  Box,
  FileText,
  Download,
  ChevronDown,
  Droplets,
  Hammer,
  PaintBucket,
  Beaker,
  Layers,
  Grid,
} from "lucide-react";

// Helper to map icon name to component
const IconHelper = ({ name, size = 32, className }) => {
    const icons = {
        Building2, Factory, GraduationCap, Zap, Car, Briefcase, LayoutGrid,
        Droplets, Hammer, PaintBucket, Beaker, Layers, Grid, Box
    };
    const IconComponent = icons[name] || Box;
    return <IconComponent size={size} className={className} />;
};



// --- 3. المكونات الفرعية ---

// دالة للحصول على بيانات الفئة (أيقونة + وصف)


// كرت المنتج المحسّن
const ProductCard = ({ product, sections }) => {
  const name = product.name;
  const slug = product.slug;
  const description = product.description;
  const iconName = product.icon; // Get icon name from product object

  // Use IconHelper for dynamic icon, fall back to Box if not found
  const icon = <IconHelper name={iconName} size={32} />;

  // Define color based on some logic or keep dynamic if backend provides it (currently not, so maybe keep fallback or random?)
  // For now, let's keep the existing color logic based on name or just default to gray/red
  const color = "bg-gray-50"; 
  const iconColor = "text-gray-600";

  return (
    <Link
      to={`/solutions#${slug}`}
      className="bg-white rounded-2xl border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300 group/product flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Header with Icon */}
      <div
        className={`${color} p-6 flex items-center justify-center transition-colors duration-300 group-hover/product:bg-[#ee2039]/5`}
      >
        <div
          className={`${iconColor} group-hover/product:text-[#ee2039] transition-colors duration-300`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-900 text-base mb-2 group-hover/product:text-[#ee2039] transition-colors leading-tight">
          {name}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={12} />
            {sections?.ui_labels?.empty_text_en || "View Details"}
          </span>
          <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/product:bg-[#ee2039] group-hover/product:text-white transition-all duration-300 group-hover/product:scale-110">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

// --- 3. المكون الرئيسي للصفحة ---
const Sectors = () => {
  const { sections, sectors: apiSectors, loading, error } = useSectors();

  // Transform API Data
  const sectorsData = useMemo(() => {
    return apiSectors.map((s) => {
      const sectorData = {
        id: s.slug,
        title: s.name_en, // Could use i18n here later
        icon: <IconHelper name={s.icon_name} />, 
        description: s.description_en,
        areas: s.areas.map((a) => {
          // Extract unique categories from solutions mapped to 'products' by hook
          const uniqueCategories = [];
          const seen = new Set();
          if (a.products) {
              a.products.forEach(prod => {
                  const catId = prod.category_id;
                  if(catId && !seen.has(catId)) {
                      seen.add(catId);
                      uniqueCategories.push({
                          name: prod.category ? prod.category.name_en : prod.name,
                          slug: prod.slug,
                          description: prod.description,
                          icon: prod.icon
                      });
                  }
              });
          }
          return {
            id: a.slug,
            title: a.name_en,
            products: uniqueCategories
          };
        })
      };

      // Extract raw tabs JSON from backend and parse if it's a string, falling back to empty array
      let parsedTabs = s.tabs;
      if (typeof parsedTabs === 'string') {
        try {
          parsedTabs = JSON.parse(parsedTabs);
        } catch (e) {
          parsedTabs = [];
        }
      }
      
      sectorData.tabs = Array.isArray(parsedTabs) ? parsedTabs : [];
      
      return sectorData;
    });
  }, [apiSectors]);

  // Detect if desktop or mobile on initial load
  const getInitialSectorId = () => {
    if (typeof window !== "undefined" && sectorsData.length > 0) {
      return window.innerWidth >= 1024 ? sectorsData[0].id : null;
    }
    return null;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSectorId, setActiveSectorId] = useState(null);
  const [activeAreaId, setActiveAreaId] = useState(null);

  // Set initial sector when data is loaded
  useEffect(() => {
    if (sectorsData.length > 0 && activeSectorId === null && window.innerWidth >= 1024) {
        setActiveSectorId(sectorsData[0].id);
    }
  }, [sectorsData]);

  // Scroll to top only on initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && activeSectorId === null && sectorsData.length > 0) {
        setActiveSectorId(sectorsData[0].id);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSectorId, sectorsData]);

  // --- Handle URL Hash Navigation ---
  const location = useLocation();
  useEffect(() => {
    if (location.hash && sectorsData.length > 0) {
      const sectorId = location.hash.replace("#", "");
      const sector = sectorsData.find((s) => s.id === sectorId);
      if (sector) {
        setActiveSectorId(sectorId);
        setTimeout(() => {
          const element = document.getElementById(sectorId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, [location, sectorsData]);

  // --- Search Logic ---
  // Using sectorsData instead of SECTORS_DATA
  const filteredSectors = useMemo(() => {
    if (!searchTerm) return sectorsData;
    const lowerTerm = searchTerm.toLowerCase();

    return sectorsData.reduce((acc, sector) => {
      const sectorMatches = sector.title.toLowerCase().includes(lowerTerm);

      const matchingAreas = sector.areas.reduce((areaAcc, area) => {
        const areaTitleMatches = area.title.toLowerCase().includes(lowerTerm);
        const matchingProducts = area.products.filter((p) =>
          p.name.toLowerCase().includes(lowerTerm),
        );

        if (areaTitleMatches || matchingProducts.length > 0) {
          areaAcc.push({
            ...area,
            products: areaTitleMatches ? area.products : matchingProducts,
          });
        }
        return areaAcc;
      }, []);

      if (sectorMatches || matchingAreas.length > 0) {
        acc.push({
          ...sector,
          areas: sectorMatches ? sector.areas : matchingAreas,
        });
      }
      return acc;
    }, []);
  }, [searchTerm, sectorsData]);

  const activeSector = useMemo(() => {
    if (!sectorsData || sectorsData.length === 0) return null;
    const found = filteredSectors.find((s) => s.id === activeSectorId);
    if (found) return found;

    if (typeof window !== "undefined" && window.innerWidth >= 1024 && filteredSectors.length > 0) {
      return filteredSectors[0] || null;
    }
    return null;
  }, [filteredSectors, activeSectorId, sectorsData]);

  const activeArea = useMemo(() => {
    if (!activeSector || !activeAreaId) return null;
    return activeSector.areas.find((a) => a.id === activeAreaId);
  }, [activeSector, activeAreaId]);

  const handleSectorChange = (sectorId) => {
    // Toggle: if clicking the same sector, close it (set to null)
    if (activeSectorId === sectorId) {
      setActiveSectorId(null);
      setActiveAreaId(null);
    } else {
      setActiveSectorId(sectorId);
      setActiveAreaId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-[#ee2039] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-600">Loading sectors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-xl text-red-600 font-bold mb-4">Error loading sectors!</p>
          <p className="text-gray-700">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black text-center overflow-hidden text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {sections?.hero?.subtitle_en && (
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
                {sections.hero.subtitle_en}
              </div>
            )}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {sections?.hero?.title_en ? (
                <>
                  {sections.hero.title_en.split(' ').slice(0, -1).join(' ')} <span className="text-[#ee2039]">{sections.hero.title_en.split(' ').slice(-1)}</span>
                </>
              ) : (
                <>Sectors We <span className="text-[#ee2039]">Serve</span></>
              )}
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              {sections?.hero?.description_en || "Tailored engineering solutions for every industry. Select a sector to see our breakdown of areas and recommended materials."}
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder={sections?.search?.placeholder_en || "Search sectors, areas, or products..."}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#ee2039] focus:ring-1 focus:ring-[#ee2039] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={16} />
              <span className="font-medium">
                {filteredSectors.length} {sections?.search?.title_en || "Sectors Found"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredSectors.length > 0 ? (
            <>
              {/* Desktop Layout: Side by Side */}
              <div className="hidden lg:flex flex-row gap-8 lg:gap-12 min-h-[600px]">
                {/* --- Left Sidebar --- */}
                <div className="w-full lg:w-[380px] lg:min-w-[380px] space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                    {sections?.ui_labels?.title_en}
                  </h3>
                  <div className="flex flex-col gap-3 max-h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                    {filteredSectors.map((sector) => (
                      <button
                        key={sector.id}
                        onClick={() => handleSectorChange(sector.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group shrink-0 ${
                          activeSector && activeSector.id === sector.id
                            ? "bg-black border-slate-900 text-white shadow-xl scale-100 z-10"
                            : "bg-white border-gray-100 text-slate-600 hover:border-[#ee2039] hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                            activeSector && activeSector.id === sector.id
                              ? "bg-[#ee2039] text-white"
                              : "bg-gray-50 text-slate-400 group-hover:text-[#ee2039]"
                          }`}
                        >
                          {React.cloneElement(sector.icon, { size: 18 })}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm md:text-base line-clamp-1">
                            {sector.title}
                          </h4>
                          <p
                            className={`text-[10px] mt-0.5 line-clamp-1 ${activeSector && activeSector.id === sector.id ? "text-gray-400" : "text-gray-400"}`}
                          >
                            {sector.areas.length} {sections?.ui_labels?.description_en || "Areas"}
                          </p>
                        </div>
                        {activeSector && activeSector.id === sector.id && (
                          <ArrowRight className="text-[#ee2039] shrink-0" size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* --- Right Content (Desktop) --- */}
                <div className="w-full lg:w-2/3">
                  {activeSector && (
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden h-full flex flex-col">
                      {/* Background Icon */}
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        {React.cloneElement(activeSector.icon, { size: 400 })}
                      </div>

                      {/* Header */}
                      <div className="relative z-10 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-start gap-5">
                          <div className="w-14 h-14 bg-[#ee2039] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#ee2039]/30 shrink-0">
                            {React.cloneElement(activeSector.icon, {
                              size: 28,
                            })}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-3xl font-bold text-slate-900">
                              {activeSector.title}
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-lg">
                              {activeSector.description}
                            </p>

                            {/* --- TABS SECTION START --- */}
                            {activeSector.tabs &&
                              activeSector.tabs.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                                  {activeSector.tabs.map((tab, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-red-50 text-[#ee2039] border border-[#ee2039]/10"
                                    >
                                      <CheckCircle2 size={12} strokeWidth={3} />
                                      {tab}
                                    </span>
                                  ))}
                                </div>
                              )}
                            {/* --- TABS SECTION END --- */}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        {!activeArea ? (
                          /* View 1: Areas List */
                          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                              <MapPin size={20} className="text-[#ee2039]" />
                              {sections?.ui_labels?.subtitle_en || "Engineering Areas"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeSector.areas.map((area) => (
                                <div
                                  key={area.id}
                                  onClick={() => setActiveAreaId(area.id)}
                                  className="group/area bg-gray-50 hover:bg-white p-5 rounded-2xl border border-transparent hover:border-[#ee2039] hover:shadow-lg cursor-pointer transition-all duration-300 flex items-center justify-between"
                                >
                                  <div>
                                    <h4 className="font-bold text-slate-700 group-hover/area:text-[#ee2039] transition-colors">
                                      {area.title}
                                    </h4>
                                    <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
                                      {area.products.length} {sections?.ui_labels?.placeholder_en || "Products"}
                                    </span>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover/area:text-[#ee2039] shadow-sm">
                                    <ArrowRight size={16} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* View 2: Products List (Drill Down) */
                          <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                              <button
                                onClick={() => setActiveAreaId(null)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-[#ee2039] hover:text-white transition-all"
                              >
                                <ArrowLeft size={14} /> {sections?.ui_labels?.btn_text_en || "Back to Areas"}
                              </button>
                              <span className="text-gray-300">|</span>
                              <span className="text-[#ee2039] font-bold text-lg">
                                {activeArea.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeArea.products.map((product, idx) => (
                                <ProductCard key={idx} product={product} sections={sections} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Layout: Accordion Style */}
              <div className="lg:hidden space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
                  {sections?.ui_labels?.title_en || "Select Industry"}
                </h3>
                {filteredSectors.map((sector) => (
                  <div key={sector.id} className="space-y-3">
                    {/* Sector Button */}
                    <button
                      onClick={() => handleSectorChange(sector.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                        activeSector && activeSector.id === sector.id
                          ? "bg-black border-slate-900 text-white shadow-xl"
                          : "bg-white border-gray-100 text-slate-600 hover:border-[#ee2039] hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          activeSector && activeSector.id === sector.id
                            ? "bg-[#ee2039] text-white"
                            : "bg-gray-50 text-slate-400 group-hover:text-[#ee2039]"
                        }`}
                      >
                        {React.cloneElement(sector.icon, { size: 18 })}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{sector.title}</h4>
                        <p className="text-[10px] mt-0.5 text-gray-400">
                          {sector.areas.length} {sections?.ui_labels?.description_en || "Areas"}
                        </p>
                      </div>
                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          activeSector && activeSector.id === sector.id
                            ? "rotate-180 text-[#ee2039]"
                            : "text-gray-400"
                        }`}
                        size={18}
                      />
                    </button>

                    {/* Dropdown Content */}
                    {activeSector && activeSector.id === sector.id && (
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col gap-3 max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                        {/* Header */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#ee2039] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#ee2039]/30 shrink-0">
                              {React.cloneElement(activeSector.icon, {
                                size: 24,
                              })}
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-slate-900">
                                {activeSector.title}
                              </h2>
                              <p className="text-gray-500 mt-1 text-xs leading-relaxed">
                                {activeSector.description}
                              </p>

                              {/* Tabs */}
                              {activeSector.tabs &&
                                activeSector.tabs.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-1.5">
                                    {activeSector.tabs.map((tab, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide bg-red-50 text-[#ee2039] border border-[#ee2039]/10"
                                      >
                                        <CheckCircle2
                                          size={10}
                                          strokeWidth={3}
                                        />
                                        {tab}
                                      </span>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        {!activeArea ? (
                          /* Areas List */
                          <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                              <MapPin size={16} className="text-[#ee2039]" />
                              {sections?.ui_labels?.subtitle_en || "Engineering Areas"}
                            </h3>
                            <div className="space-y-2">
                              {activeSector.areas.map((area) => (
                                <div
                                  key={area.id}
                                  onClick={() => setActiveAreaId(area.id)}
                                  className="bg-gray-50 hover:bg-white p-4 rounded-xl border border-transparent hover:border-[#ee2039] hover:shadow-md cursor-pointer transition-all duration-300 flex items-center justify-between"
                                >
                                  <div>
                                    <h4 className="font-bold text-sm text-slate-700">
                                      {area.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-medium mt-0.5 inline-block">
                                      {area.products.length} {sections?.ui_labels?.placeholder_en || "Products"}
                                    </span>
                                  </div>
                                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-300 shadow-sm">
                                    <ArrowRight size={14} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Products List */
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <button
                                onClick={() => setActiveAreaId(null)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 text-[10px] font-bold hover:bg-[#ee2039] hover:text-white transition-all"
                              >
                                <ArrowLeft size={12} /> Back
                              </button>
                              <span className="text-gray-300">|</span>
                              <span className="text-[#ee2039] font-bold text-sm">
                                {activeArea.title}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              {activeArea.products.map((product, idx) => (
                                <ProductCard key={idx} product={product} sections={sections} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Box size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-400 font-bold">
                {sections?.search?.empty_text_en || "No sectors found matching"} "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-[#ee2039] font-bold hover:underline"
              >
                {sections?.search?.subtitle_en || "Clear Search"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

  export default Sectors;
