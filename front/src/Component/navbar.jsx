import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Globe, ChevronRight } from "lucide-react";

// --- بيانات القائمة ---
const NAV_DATA = [
  {
    id: "services",
    label: "Services",
    type: "mega",
    columns: 2,
    children: [
      {
        label: "Chemical Formulation",
        desc: "Tailor-made solutions for Cement & Concrete",
      },
      {
        label: "Technical Support",
        desc: "Inspection, Optimization & Testing",
      },
      {
        label: "Consultancy & Specs",
        desc: "Guidance, Recommendations & Training",
      },
      {
        label: "Quality Control",
        desc: "Raw Material & Finished Goods Testing",
      },
      {
        label: "Waterproofing Support",
        desc: "Inspection, Recommendation & Application",
      },
      { label: "Supply Chain", desc: "Logistics, Planning & Delivery" },
      { label: "Turnkey Solutions", desc: "Storage, Dosing & Calibration" },
      {
        label: "Maintenance & Repair",
        desc: "Analysis, Recommendation & Execution",
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    type: "mega",
    columns: 3,
    children: [
      { label: "Concrete Admixtures" },
      { label: "Cement Additives" },
      { label: "Tile Adhesives & Grout" },
      { label: "Cementitious Grout" },
      { label: "Protective Coating" },
      { label: "Waterproofing" },
      { label: "Surface Treatment" },
      { label: "Decorative Plastering" },
      { label: "Flooring Products" },
      { label: "Concrete Repair" },
      { label: "Concrete Fibers" },
      { label: "Sealants" },
    ],
  },
  {
    id: "sectors",
    label: "Sectors",
    type: "dropdown",
    children: [
      { label: "View All Sectors" },
      { label: "Example Building Types" },
      { label: "Engineered Areas" },
      { label: "Relevant Products" },
      { label: "Case Studies" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    type: "dropdown",
    children: [
      { label: "Algeria" },
      { label: "Jordan" },
      { label: "Iraq" },
      { label: "Lebanon" },
      { label: "Libya" },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    type: "dropdown",
    children: [{ label: "ECA Partners" }, { label: "Become a Partner" }],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    type: "dropdown",
    children: [
      { label: "Sustainability Strategy" },
      { label: "ESG & QHSE" },
      { label: "R&D" },
      { label: "CSR" },
      { label: "Innovation" },
    ],
  },
  {
    id: "about",
    label: "About Us",
    type: "dropdown",
    children: [
      { label: "Message from Founder" },
      { label: "Vision & Values" },
      { label: "Our Story" },
      { label: "Our Presence" },
      { label: "Why Us" },
    ],
  },
  {
    id: "academy",
    label: "AFG Academy",
    type: "link",
    href: "#academy",
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleMobileGroup = (id) => {
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const countries = [
    { code: "jo", name: "Jordan" },
    { code: "lb", name: "Lebanon" },
    { code: "ly", name: "Libya" },
    { code: "dz", name: "Algeria" },
    { code: "iq", name: "Iraq" },
  ];

  return (
    <header className="w-full font-sans fixed top-0 left-0 z-[60] transition-all duration-300">
      {/* 1. Top Bar */}
      <div
        className={`bg-black text-white text-[10px] md:text-xs transition-all duration-500 overflow-hidden ${isScrolled ? "h-0 py-0 opacity-0" : "h-auto py-2 opacity-100"} px-4 md:px-12 flex justify-between items-center border-b border-white/5`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            {countries.map((country) => (
              <div
                key={country.code}
                className="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden shrink-0 hover:scale-110 transition-transform cursor-pointer border border-white/20 shadow-sm"
                title={country.name}
              >
                <img
                  src={`https://flagcdn.com/w80/${country.code}.png`}
                  alt={country.name}
                  // FIX: Added conditional class to align Jordan flag to the left
                  className={`w-full h-full object-cover opacity-90 hover:opacity-100 ${
                    country.code === "jo" ? "object-left" : "object-center"
                  }`}
                />
              </div>
            ))}
          </div>
          <span className="hidden md:block w-[1px] h-3 bg-white/20 mx-1"></span>
          <span className="hidden md:block text-[9px] text-gray-400 tracking-[0.15em] uppercase font-medium">
            Regional Offices
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Globe size={13} />
          <div className="flex items-center gap-3 font-medium tracking-wider text-[10px] uppercase">
            <span className="text-white cursor-pointer">EN</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              AR
            </span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              FR
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div
        className={`bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 border-b border-gray-100 h-20 min-[1089px]:h-20 px-4 md:px-12 flex justify-between items-center relative -translate-y-[1px] `}
      >
        <a href="/" className="flex-shrink-0 flex items-center gap-3 z-50">
          <img
            src="/images/Al Faiha-Logo-EN-Blk-landscape.png"
            alt="Logo"
            className="h-10 min-[1089px]:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden min-[1089px]:flex items-center gap-6 xl:gap-9 font-semibold text-slate-800 text-[14px]">
          {NAV_DATA.map((item, index) => {
            if (item.type === "link") {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative group py-6 flex items-center gap-1 transition-colors hover:text-[#ee2039]"
                >
                  {item.label}
                  <span className="absolute bottom-6 left-0 w-0 h-[2px] bg-[#ee2039] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </a>
              );
            }

            return (
              <div
                key={item.id}
                className="group h-full flex items-center relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={`#${item.id}`}
                  className={`flex items-center gap-1 py-6 transition-colors ${activeDropdown === item.id ? "text-[#ee2039]" : "hover:text-[#ee2039]"}`}
                >
                  {item.label}
                  <ChevronDown
                    size={11}
                    strokeWidth={3}
                    className={`transition-transform duration-300 mt-0.5 ${activeDropdown === item.id ? "rotate-180" : ""}`}
                  />
                </a>

                <div
                  className={`absolute  top-full bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border-t-[3px] border-[#ee2039] 
                  transition-all duration-200 transform translate-y-[5px] origin-top 
                  ${activeDropdown === item.id ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"} 
                  ${
                    item.type === "mega"
                      ? `w-[900px] p-8 rounded-b-xl ${item.id === "solutions" ? "left-1/2 -translate-x-1/2" : "left-0"}`
                      : `w-60 p-3 rounded-b-lg ${index > 4 ? "right-0" : "left-0"}`
                  } 
                  z-50`}
                >
                  {item.type === "mega" ? (
                    <div
                      className={`grid ${item.columns === 3 ? "grid-cols-3" : "grid-cols-2"} gap-x-12 gap-y-8`}
                    >
                      {item.children?.map((subItem, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="group/item flex items-start gap-4 p-1 hover:translate-x-1 transition-transform duration-300"
                        >
                          <div className="w-[3px] h-0 bg-[#ee2039] group-hover/item:h-full transition-all duration-300 rounded-full mt-1"></div>
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-slate-800 group-hover/item:text-[#ee2039] transition-colors leading-tight">
                              {subItem.label}
                            </span>
                            {subItem.desc && (
                              <span className="text-[12px] text-gray-400 mt-1.5 leading-relaxed font-normal">
                                {subItem.desc}
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-1">
                      {item.children?.map((subItem, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block px-4 py-2.5 text-[13px] text-slate-600 hover:text-[#ee2039] hover:bg-gray-50 rounded-md transition-all font-medium text-left"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="min-[1089px]:hidden p-2 text-slate-900 hover:text-[#ee2039] transition-colors"
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[100] min-[1089px]:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-[#ee2039] bg-white rounded-full p-2 shadow-sm border border-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <nav className="flex flex-col space-y-2">
              {NAV_DATA.map((item) => {
                if (item.type === "link") {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="block py-3 px-2 font-bold text-[15px] text-slate-800 hover:text-[#ee2039] border-b border-gray-50 last:border-0"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <div
                    key={item.id}
                    className="border-b border-gray-50 last:border-0 pb-1"
                  >
                    <button
                      onClick={() => toggleMobileGroup(item.id)}
                      className={`flex w-full justify-between items-center py-4 px-2 font-bold text-[15px] transition-colors ${mobileExpanded[item.id] ? "text-[#ee2039]" : "text-slate-800"}`}
                    >
                      {item.label}
                      <ChevronRight
                        size={18}
                        className={`transition-transform duration-300 ${mobileExpanded[item.id] ? "rotate-90 text-[#ee2039]" : "text-gray-300"}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileExpanded[item.id] ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="bg-gray-50/80 rounded-xl p-3 space-y-1 mx-1 mb-3">
                        {item.children?.map((sub, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="block py-2.5 px-4 text-[13px] text-gray-600 hover:text-[#ee2039] hover:bg-white rounded-lg transition-all font-medium"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="p-6 bg-slate-50 border-t border-gray-100">
            <div className="flex justify-center gap-8 text-sm font-bold text-gray-400">
              <span className="text-[#ee2039] border-b-2 border-[#ee2039] cursor-default pb-1">
                EN
              </span>
              <span className="hover:text-slate-800 cursor-pointer transition-colors pb-1">
                AR
              </span>
              <span className="hover:text-slate-800 cursor-pointer transition-colors pb-1">
                FR
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
