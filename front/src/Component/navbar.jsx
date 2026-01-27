import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Globe, ChevronRight } from "lucide-react";

// --- الهيكل البياني المحدث ---
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
      {
        label: "Supply Chain",
        desc: "Logistics, Planning & Delivery",
      },
      {
        label: "Turnkey Solutions",
        desc: "Storage, Dosing & Calibration",
      },
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
    type: "mega",
    columns: 4,
    children: [
      { label: "Algeria", isHeader: true },
      { label: "Jordan", isHeader: true },
      { label: "Iraq", isHeader: true },
      { label: "Lebanon", isHeader: true },
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
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileGroup = (id) => {
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="w-full font-sans fixed top-0 left-0 z-50 transition-all duration-300 -translate-y-[1px]">
      {/* 1. Top Bar */}
      <div
        className={`bg-black text-white text-[10px] md:text-xs transition-all duration-500 overflow-hidden ${
          isScrolled ? "h-0 py-0 opacity-0" : "h-auto py-2 opacity-100"
        } px-4 md:px-8 lg:px-12 flex justify-end items-center border-b border-white/5`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-gray-800">
            <Globe size={13} className="text-gray-500" />
            <div className="flex items-center gap-2 font-light tracking-widest uppercase">
              <span className="cursor-pointer hover:text-[#ee2039] transition-colors duration-300">
                EN
              </span>
              <span className="text-gray-700">|</span>
              <span className="cursor-pointer hover:text-[#ee2039] transition-colors duration-300">
                FR
              </span>
              <span className="text-gray-700">|</span>
              <span className="cursor-pointer hover:text-[#ee2039] transition-colors duration-300 font-medium">
                AR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div
        className={`bg-white shadow-lg/5 transition-all duration-300 border-b border-gray-100 h-16 lg:h-20 ${
          isScrolled ? "py-2" : "py-"
        } px-4 md:px-8 lg:px-12 flex justify-between items-center relative`}
      >
        <a href="/" className="flex-shrink-0 flex items-center gap-3 z-50">
          <img
            src="/images/Al Faiha-Logo-EN-Blk-landscape.png"
            alt="Logo"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden  lg:flex items-center gap-5 xl:gap-7 font-medium text-slate-800 text-[13px] xl:text-[14px]">
          {NAV_DATA.map((item, index) => (
            <div
              key={item.id}
              className="group relative h-full flex items-center "
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-1 py-6 transition-colors duration-200 ${
                  activeDropdown === item.id
                    ? "text-[#ee2039]"
                    : "hover:text-[#ee2039]"
                }`}
              >
                {item.label}
                <ChevronDown
                  size={12}
                  className={`mt-0.5 transition-transform duration-300 ${activeDropdown === item.id ? "rotate-180" : ""}`}
                />
              </a>

              {/* Mega Menu / Dropdown */}
              <div
                className={`absolute top-full bg-white shadow-2xl border-t-[3px] border-[#ee2039] 
                transition-all duration-300 transform origin-top translate-y-[5px]
                ${activeDropdown === item.id ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"} 
                
                /* Dynamic Width Logic */
                ${
                  item.type === "mega"
                    ? "w-[600px] lg:w-[700px] xl:w-[800px] p-6"
                    : "w-56 p-4"
                } 
                
                /* Smart Positioning Logic (Updated: Only 1st item Left, Middle Centered, Last 2 Right) */
                ${index === 0 ? "left-0" : ""} 
                ${index >= NAV_DATA.length - 2 ? "right-0 left-auto" : ""}
                ${index > 0 && index < NAV_DATA.length - 2 ? "left-1/2 -translate-x-1/2" : ""}
                
                rounded-b-lg z-50`}
              >
                <div
                  className={`grid gap-x-6 gap-y-3 ${
                    item.type === "mega"
                      ? item.columns === 2
                        ? "grid-cols-2"
                        : item.columns === 3
                          ? "grid-cols-3"
                          : "grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {item.children?.map((subItem, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`group/item block transition-all duration-200 ${
                        subItem.isHeader
                          ? "font-bold text-[#ee2039] uppercase text-[10px] tracking-wider mb-1 border-b border-gray-100 pb-1 cursor-default"
                          : "hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-xs xl:text-sm ${subItem.isHeader ? "" : "text-gray-700 font-semibold group-hover/item:text-[#ee2039]"}`}
                        >
                          {subItem.label}
                        </span>
                        {subItem.desc && (
                          <span className="text-[10px] text-gray-400 mt-0.5 font-normal leading-tight">
                            {subItem.desc}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <a
            href="#academy"
            className="text-slate-800 hover:text-[#ee2039] transition py-6 flex items-center gap-1"
          >
            AFG Academy
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="hover:text-[#ee2039] transition text-black"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[300px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <span className="font-bold text-lg text-slate-800">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-[#ee2039] bg-gray-50 rounded-full p-2"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <nav className="flex flex-col space-y-1">
              {NAV_DATA.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-50 last:border-0 pb-1"
                >
                  <button
                    onClick={() => toggleMobileGroup(item.id)}
                    className={`flex w-full justify-between items-center py-3 px-2 font-semibold text-[14px] transition-colors ${mobileExpanded[item.id] ? "text-[#ee2039]" : "text-slate-800"}`}
                  >
                    {item.label}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 ${mobileExpanded[item.id] ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${mobileExpanded[item.id] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 mx-2 mb-2">
                      {item.children?.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className={`block text-xs ${sub.isHeader ? "font-bold text-[#ee2039] mt-2 mb-1 uppercase tracking-wider" : "text-gray-600 hover:text-black hover:pl-1 transition-all py-1"}`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <a
                href="#academy"
                className="block py-3 px-2 font-semibold text-slate-800 border-b border-gray-50 text-[14px]"
              >
                AFG Academy
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
