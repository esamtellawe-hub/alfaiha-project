import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Globe, ChevronRight } from "lucide-react";

// --- DATA STRUCTURE (Based on your breakdown) ---
const NAV_DATA = [
  {
    id: "services",
    label: "Services",
    type: "mega",
    columns: 2, // 2 Column Layout for Services
    children: [
      {
        label: "Chemical Formulation & Customization",
        desc: "Tailor-made solutions for Cement & Concrete",
      },
      {
        label: "Technical Support & Site Assistance",
        desc: "Inspection, Optimization & Testing",
      },
      {
        label: "Consultancy & Specification",
        desc: "Guidance, Recommendations & Training",
      },
      {
        label: "Quality Control & Lab Services",
        desc: "Raw Material & Finished Goods Testing",
      },
      {
        label: "Waterproofing Application Support",
        desc: "Inspection, Recommendation & Application",
      },
      {
        label: "Supply Chain Management",
        desc: "Logistics, Planning & Delivery",
      },
      {
        label: "Turnkey Factory Solutions",
        desc: "Storage, Dosing & Calibration",
      },
      {
        label: "Maintenance & Repair Solutions",
        desc: "Analysis, Recommendation & Execution",
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    type: "mega",
    columns: 3, // 3 Column Layout for Solutions
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
    columns: 4, // Layout by Country
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
    children: [
      { label: "European Concrete Additives (ECA)" },
      { label: "Become a Partner" },
    ],
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
      { label: "Our Presence (Countries)" },
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
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <header className="w-full font-sans fixed top-0 left-0 z-50 transition-all duration-300">
      {/* 1. Top Bar (Black) */}
      <div
        className={`bg-black text-white text-xs transition-all duration-300 overflow-hidden ${
          isScrolled ? "h-0 py-0" : "h-auto py-2.5"
        } px-4 md:px-8 lg:px-16 flex justify-end items-center`}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 hover:text-[#ee2039] cursor-pointer transition border-l border-gray-700 pl-6">
            <Globe size={14} />
            <span>EN | AR</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar (White) */}
      <div
        className={`bg-white shadow-lg/5 transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? "py-3" : "py-5"
        } px-4 md:px-8 lg:px-16 flex justify-between items-center relative`}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 flex items-center gap-3 cursor-pointer z-50"
        >
          {/* Logo Image */}
          <img
            src="/images/logo.svg"
            alt="Al Faiha Group Logo"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden xl:flex items-center gap-8 font-medium text-slate-800 text-[15px]">
          {NAV_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative h-full flex items-center"
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-1.5 py-4 transition-colors duration-200 ${
                  activeDropdown === item.id
                    ? "text-[#ee2039]"
                    : "hover:text-[#ee2039]"
                }`}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  className={`mt-0.5 transition-transform duration-300 ${
                    activeDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              </a>

              {/* Mega Menu / Dropdown Logic */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl border-t-[3px] border-[#ee2039] 
                transition-all duration-200 transform origin-top
                ${
                  activeDropdown === item.id
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                } 
                ${item.type === "mega" ? "w-[800px] p-8" : "w-64 p-4"} rounded-b-xl z-50`}
              >
                {/* Content Grid */}
                <div
                  className={`grid gap-x-8 gap-y-4 ${
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
                      className={`group/item block ${
                        subItem.isHeader
                          ? "font-bold text-[#ee2039] uppercase text-xs tracking-wider mb-2 border-b border-gray-100 pb-2 cursor-default pointer-events-none"
                          : "hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-colors"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-sm ${
                            subItem.isHeader
                              ? ""
                              : "text-gray-700 font-semibold group-hover/item:text-[#ee2039]"
                          }`}
                        >
                          {subItem.label}
                        </span>
                        {subItem.desc && (
                          <span className="text-[11px] text-gray-400 mt-0.5 font-normal leading-tight">
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

          {/* Special Buttons */}
          <a
            href="#academy"
            className="text-slate-800 hover:text-[#ee2039] transition py-4"
          >
            AFG Academy
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="focus:outline-none hover:text-[#ee2039] transition text-black"
          >
            <Menu size={32} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
            <span className="font-bold text-lg text-slate-800">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-[#ee2039] transition bg-gray-50 rounded-full p-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <nav className="flex flex-col space-y-2">
              {NAV_DATA.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-50 last:border-0 pb-2"
                >
                  <button
                    onClick={() => toggleMobileGroup(item.id)}
                    className={`flex w-full justify-between items-center py-3 px-2 font-semibold text-[15px] transition-colors ${
                      mobileExpanded[item.id]
                        ? "text-[#ee2039]"
                        : "text-slate-800"
                    }`}
                  >
                    {item.label}
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileExpanded[item.id] ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Submenu Accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileExpanded[item.id]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3 mx-2 mb-2">
                      {item.children?.map((sub, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className={`block text-sm ${
                            sub.isHeader
                              ? "font-bold text-[#ee2039] mt-3 mb-1 uppercase text-xs"
                              : "text-gray-600 hover:text-black hover:pl-1 transition-all"
                          }`}
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
                className="block py-3 px-2 font-semibold text-slate-800 border-b border-gray-50"
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
