import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import productsData from "../products.json";
import {
  ChevronDown,
  FileText,
  Download,
  Beaker,
  Layers,
  Droplets,
  Hammer,
  PaintBucket,
  Grid,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Box,
} from "lucide-react";

// Helper function to convert product name to ID
const generateProductId = (productName) => {
  return productName
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

// --- 1. البيانات المهيكلة ---
const SOLUTIONS_DATA = [
  {
    id: "concrete-admixtures",
    title: "Concrete Admixtures",
    icon: <Beaker />,
    description:
      "Formulations designed for increased strength, durability, and workability.",
    hasSubCategories: true,
    subCategories: [
      {
        id: "air-entrainers",
        title: "Air Entrainers & Foaming Agents",
        products: ["ECA Stabilizer", "EUNIAIR AE4", "EUNIAIR AE3"],
      },
      {
        id: "high-range",
        title: "High Range Superplasticizers",
        products: [
          "EUNICEM 800",
          "EUNICEM SP6 (R)",
          "EUNICEM 1290",
          "EUNICEM 1350",
          "EUNICEM 1400",
          "EUNICEM 150 B",
          "EUNICEM 180 K",
          "EUNICEM 205",
          "EUNICEM 2100",
          "EUNICEM 2200 F",
          "EUNICEM 2200",
          "EUNICEM 250 A",
          "EUNICEM 250 E",
          "EUNICEM 300 F",
          "EUNICEM 350",
          "EUNICEM 400",
          "EUNICEM 420",
          "EUNICEM 810",
          "EUNICEM 400 KO",
          "EUNICEM 850",
          "EUNICEM 1000",
        ],
      },
      {
        id: "mid-range",
        title: "Mid Range Superplasticizers",
        products: [
          "EUNICEM SP4",
          "EUNICEM P9",
          "EUNICEM P7",
          "EUNICEM P4",
          "EUNICEM P20",
        ],
      },
      {
        id: "polycarboxylate",
        title: "Polycarboxylate Superplasticizers",
        products: [
          "EUNIFLOW EC 200",
          "EUNIFLOW 260 ACC",
          "EUNIFLOW 200 N",
          "EUNIFLOW ES 545",
          "EUNIFLOW 720 (Iraq)",
          "EUNIFLOW 241 G (KSA)",
          "EUNIFLOW 280 G",
          "EUNIFLOW 110",
          "EUNIFLOW 165 M",
          "EUNIFLOW 200 R",
          "EUNIFLOW 200",
          "EUNIFLOW 250 M",
          "EUNIFLOW 250",
          "EUNIFLOW 260",
          "EUNIFLOW 680",
          "EUNIFLOW 2600",
          "EUNIFLOW 2700",
          "EUNIFLOW 290",
          "EUNIFLOW 500 ACC",
          "EUNIFLOW 585",
          "EUNIFLOW 600",
          "EUNIFLOW 612 R18",
        ],
      },
      {
        id: "shrinkage",
        title: "Shrinkage Reducing",
        products: ["EUNISHRINK ECLIPSE"],
      },
      {
        id: "silica-fume",
        title: "Silica Fume",
        products: ["ECA MICROSILICA", "ECA MICROSILICA (D)"],
      },
      {
        id: "slag",
        title: "Slag",
        products: ["GGBFS"],
      },
      {
        id: "troweling",
        title: "Troweling Admixtures",
        products: ["EUNICEM 400 F"],
      },
      {
        id: "underwater",
        title: "Underwater Admixtures",
        products: ["EUNIMAR 3"],
      },
      {
        id: "waterproofing-adm",
        title: "Waterproofing Admixtures",
        products: [
          "EURIPEL W2",
          "EURIPEL W5",
          "EURIPEL 75ME",
          "EURIPEL CP 360",
        ],
      },
      {
        id: "corrosion",
        title: "Corrosion Inhibitors",
        products: [
          "EUNICOR DCIS",
          "EUNICOR DCIS 5",
          "EUNICOR DCIS+",
          "EUNICOR DCIS (L)",
        ],
      },
    ],
  },
  {
    id: "cement-additives",
    title: "Cement Additives",
    icon: <Grid />,
    description: "Customized additives for increased cement performance.",
    hasSubCategories: true,
    subCategories: [
      {
        id: "coloring",
        title: "Coloring Agent",
        products: ["EUROGRIND SP20", "EUROGRIND SP10"],
      },
      {
        id: "grinding-aids",
        title: "Grinding Aids & Performance Enhancers",
        products: [
          "EUROGRIND 500G+",
          "EUROGRIND GS 212A",
          "EUROGRIND GS 212",
          "EUROGRIND GS212 P",
          "EUROGRIND GS 212 O",
          "EUROGRIND GS 211",
        ],
      },
      {
        id: "mineral-grinding",
        title: "Mineral Grinding Aid",
        products: ["EUROGRIND MGA", "EUROGRIND MGA PURITY"],
      },
    ],
  },
  {
    id: "tile-adhesives",
    title: "Tile Adhesives & Grout",
    icon: <Layers />,
    description: "Solutions for fixing ceramic tiles on stable surfaces.",
    hasSubCategories: false,
    products: [
      "EUNITILE A1",
      "EUNITILE A1+",
      "Eunitile A2",
      "EUNITILE A2(H)",
      "EUNITILE GP",
      "EUNITILE A2 MAX",
      "EUNITILE G2",
      "EUNITILE G2 (H)",
    ],
  },
  {
    id: "cementitious-repair",
    title: "Concrete Repair Products",
    icon: <Hammer />,
    description:
      "Restoration systems including repair mortars and fairing coats.",
    hasSubCategories: false,
    products: [
      "EURIPARE BA9",
      "EURIPARE BA3",
      "EURIPARE BA 12",
      "EURIPARE UPM PUTTY",
      "EURIPARE 504",
      "EURIPARE 503",
      "EURIPARE 502",
      "EURIPARE 502 S",
      "EURIPARE 501",
      "ECA WATERPLUG",
      "ECA WATERPLUG +",
    ],
  },
  {
    id: "protective-coating",
    title: "Protective Coating",
    icon: <PaintBucket />,
    description: "Protection for concrete against carbonation and chemicals.",
    hasSubCategories: false,
    products: ["EUNICOTE WSS (W)", "EUNICOTE WSS (W)+", "EUNICOTE AC14"],
  },
  {
    id: "waterproofing",
    title: "Waterproofing",
    icon: <Droplets />,
    description: "Comprehensive waterproofing systems for roofs and basements.",
    hasSubCategories: false,
    products: [
      "EUNICOTE AQUAGARD",
      "EUNICOTE AQUAGARD 200",
      "EUNICOTE 512 W",
      "EUNICOTE 512 W+",
      "EUNICOTE RBE",
      "EUNICOTE RBE F",
      "EUNICOTE BE",
      "EUNICOTE BBP",
      "EUNICOTE AQUASHEILD",
    ],
  },
  {
    id: "flooring",
    title: "Flooring Products",
    icon: <Grid />,
    description: "Industrial and decorative flooring solutions.",
    hasSubCategories: false,
    products: ["EURIPARE EMERY TOP", "EUNICOTE PU 3600"],
  },
  {
    id: "sealants",
    title: "Sealants",
    icon: <Droplets />,
    description: "Flexible joint sealants for construction.",
    hasSubCategories: false,
    products: [
      "EUNISEAL Paraseal",
      "EUNISEAL AS",
      "EUNISEAL SGP",
      "EUNISEAL SW+",
    ],
  },
  {
    id: "concrete-fibers",
    title: "Concrete Fibers",
    icon: <Grid />,
    description: "Fiber reinforcement to control cracking.",
    hasSubCategories: false,
    products: ["ECA POLYFIBER", "ECA HE Steel Fiber"],
  },
  {
    id: "surface-treatments",
    title: "Surface Treatment",
    icon: <Layers />,
    description: "Curing compounds and mold release agents.",
    hasSubCategories: false,
    products: [
      "EUNICURE CUREX",
      "EUNICURE CUREX 90",
      "EUNICOTE MRA1",
      "EUNICOTE MRA BIO",
      "EUNICOTE CLEANSTRIKE",
    ],
  },
  {
    id: "decorative",
    title: "Decorative Plastering",
    icon: <PaintBucket />,
    description: "Decorative finish plaster.",
    hasSubCategories: false,
    products: [
      "EUROPLAST EXPO S",
      "EUROPLAST EXPO C",
      "EUROPLAST EXPO 101",
      "EUROPLAST 100",
    ],
  },
];

// --- 2. مكون عرض المنتجات ---
const ProductItem = ({ name }) => {
  const productId = generateProductId(name);
  const productExists = Object.values(productsData).find(p => p.id === productId);
  
  // Function to get product image or placeholder
  const getProductImage = () => {
    // Check if product has specific image in public/images/
    // For now, use different product images as placeholders
    const productImages = [
      '/images/product1.png',
      '/images/product2.png',
      '/images/product3.png',
      '/images/product4.png',
      '/images/product5.png',
    ];
    
    // Use product name hash to consistently assign an image
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return productImages[hash % productImages.length];
  };

  const content = (
    <>
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl overflow-hidden group-hover/product:from-red-50 group-hover/product:to-red-100 transition-all duration-300">
        <img 
          src={getProductImage()} 
          alt={name}
          className="w-full h-full object-contain p-6 group-hover/product:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = '/images/product1.png';
          }}
        />
        {/* Product Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Product</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-3 group-hover/product:text-[#ee2039] transition-colors min-h-[2.5rem]">
          {name}
        </h4>

        {/* Product Features/Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">High Performance</span>
          <span className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Certified</span>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              TDS & MSDS
            </span>
          </div>
          
          {productExists ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#ee2039]">
              <span>View Details</span>
              <ArrowRight size={12} className="group-hover/product:translate-x-1 transition-transform" />
            </div>
          ) : (
            <button
              className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-[#ee2039] hover:text-white transition-colors group/btn relative"
              title="Download Coming Soon"
            >
              <Download size={12} />
              <span className="absolute bottom-full right-0 mb-2 w-max px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                Available Soon
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (productExists) {
    return (
      <Link 
        to={`/product/${productId}`} 
        className="bg-white rounded-xl border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300 group/product flex flex-col h-full overflow-hidden cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-gray-300 transition-all duration-300 group/product flex flex-col h-full overflow-hidden opacity-70">
      {content}
    </div>
  );
};

// --- 3. مكون القسم الرئيسي ---
const CategorySection = ({ category, isOpen, toggleOpen }) => {
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    // إذا أغلقنا القسم، نعيد تصفير السب-كاتيجوري المختار
    if (!isOpen) setActiveSubCategory(null);
  }, [isOpen]);

  if (!category) return null;

  return (
    <div
      id={category.id}
      className={`group relative bg-white rounded-3xl border transition-all duration-500 overflow-hidden ${
        isOpen
          ? "border-[#ee2039] shadow-2xl"
          : "border-gray-100 shadow-sm hover:shadow-lg hover:border-[#ee2039]/30"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ee2039_1px,transparent_1px),linear-gradient(to_bottom,#ee2039_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03]"></div>
      </div>

      {/* Header */}
      <div
        onClick={toggleOpen}
        className="relative z-10 p-6 md:p-8 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isOpen
                ? "bg-[#ee2039] text-white rotate-3"
                : "bg-gray-50 text-[#ee2039] group-hover:scale-110"
            }`}
          >
            {category.icon &&
              React.cloneElement(category.icon, {
                size: isOpen ? 28 : 24,
                strokeWidth: 1.5,
              })}
          </div>
          <div>
            <h3
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                isOpen
                  ? "text-[#ee2039]"
                  : "text-slate-900 group-hover:text-[#ee2039]"
              }`}
            >
              {category.title}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-xl hidden md:block">
              {category.description}
            </p>
          </div>
        </div>
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#ee2039] border-[#ee2039] text-white rotate-180"
              : "bg-white border-gray-200 text-gray-400 group-hover:border-[#ee2039] group-hover:text-[#ee2039]"
          }`}
        >
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`relative z-10 bg-gray-50/50 border-t border-gray-100 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 md:p-8">
          {/* Case 1: Direct Products */}
          {!category.hasSubCategories && category.products && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.products.map((product, index) => (
                <ProductItem key={index} name={product} />
              ))}
            </div>
          )}

          {/* Case 2: Sub Categories */}
          {category.hasSubCategories && category.subCategories && (
            <div>
              {!activeSubCategory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.subCategories.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubCategory(sub);
                      }}
                      className="group/sub relative bg-white p-6 rounded-2xl border border-gray-200 cursor-pointer hover:border-[#ee2039] hover:shadow-lg transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#ee2039] group-hover/sub:bg-[#ee2039] group-hover/sub:text-white transition-colors">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg group-hover/sub:text-[#ee2039] transition-colors">
                            {sub.title}
                          </h4>
                          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                            {sub.products?.length || 0} Products
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover/sub:border-[#ee2039] group-hover/sub:text-[#ee2039]">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setActiveSubCategory(null)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#ee2039] transition-colors"
                    >
                      <ArrowLeft size={16} /> Back to Categories
                    </button>
                    <span className="h-4 w-[1px] bg-gray-300"></span>
                    <h4 className="text-xl font-bold text-[#ee2039]">
                      {activeSubCategory.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(activeSubCategory.products || []).map(
                      (product, index) => (
                        <ProductItem key={index} name={product} />
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-8 flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-lg border border-dashed border-gray-300 justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
            <span>
              Technical Data Sheets (TDS) & Material Safety Data Sheets (MSDS)
              will be available for download shortly.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- المكون الرئيسي ---
const Solutions = () => {
  // 1. التعديل هنا: State لمصفوفة الأقسام المفتوحة (Array) بدلاً من نص واحد
  const [openSections, setOpenSections] = useState(["concrete-admixtures"]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  // Handle URL search parameters (for fallback navigation from Sectors)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    // Handle scroll to section if hash is present in URL
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Also open the section
          const sectionId = location.hash.replace("#", "");
          if (!openSections.includes(sectionId)) {
            setOpenSections([...openSections, sectionId]);
          }
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // دالة الحساب (Filtering)
  const filteredData = useMemo(() => {
    if (!searchTerm) return SOLUTIONS_DATA;
    const lowerTerm = searchTerm.toLowerCase();

    return SOLUTIONS_DATA.reduce((acc, category) => {
      const categoryTitle = category.title ? category.title.toLowerCase() : "";
      const categoryMatches = categoryTitle.includes(lowerTerm);

      if (category.hasSubCategories) {
        const subs = category.subCategories || [];
        const matchingSubCats = subs.reduce((subAcc, sub) => {
          const subTitle = sub.title ? sub.title.toLowerCase() : "";
          const subProducts = sub.products || [];
          const subTitleMatches = subTitle.includes(lowerTerm);
          const matchingProducts = subProducts.filter(
            (p) => p && p.toLowerCase().includes(lowerTerm),
          );

          if (subTitleMatches || matchingProducts.length > 0) {
            subAcc.push({
              ...sub,
              products: subTitleMatches ? subProducts : matchingProducts,
            });
          }
          return subAcc;
        }, []);

        if (categoryMatches || matchingSubCats.length > 0) {
          acc.push({
            ...category,
            subCategories: categoryMatches ? subs : matchingSubCats,
          });
        }
      } else {
        const prods = category.products || [];
        const matchingProducts = prods.filter(
          (p) => p && p.toLowerCase().includes(lowerTerm),
        );
        if (categoryMatches || matchingProducts.length > 0) {
          acc.push({
            ...category,
            products: categoryMatches ? prods : matchingProducts,
          });
        }
      }
      return acc;
    }, []);
  }, [searchTerm]);

  // 2. التعديل هنا: useEffect يفتح الأقسام الناتجة عن البحث تلقائياً
  useEffect(() => {
    if (searchTerm) {
      // افتح كل الأقسام التي ظهرت في نتائج البحث
      const allIds = filteredData.map((c) => c.id);
      setOpenSections(allIds);
    } else {
      // العودة للوضع الطبيعي (فتح الأول فقط أو إغلاق الكل)
      setOpenSections(["concrete-admixtures"]);
    }
  }, [searchTerm, filteredData]); // يعتمد على نتائج البحث

  // 3. التعديل هنا: دالة Toggle تدعم الفتح والإغلاق الحر
  const toggleSection = (id) => {
    if (openSections.includes(id)) {
      setOpenSections(openSections.filter((item) => item !== id)); // إغلاق
    } else {
      setOpenSections([...openSections, id]); // فتح
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden ">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none ">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] "></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 ">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 text-white border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 ">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Solutions Catalogue
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Engineered <span className="text-[#ee2039]">Solutions</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
              Browse our comprehensive range of specialized construction
              chemicals...
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
                placeholder="Search categories, sub-categories, or products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#ee2039] focus:ring-1 focus:ring-[#ee2039] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={16} />
              <span className="font-medium">
                {filteredData.length} Categories Found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {filteredData.length > 0 ? (
              filteredData.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  // 4. التعديل هنا: الفتح يعتمد على وجود الـ ID في المصفوفة
                  isOpen={openSections.includes(category.id)}
                  toggleOpen={() => toggleSection(category.id)}
                />
              ))
            ) : (
              <div className="text-center py-20">
                <Box size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-400 font-bold">
                  No solutions found matching "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-[#ee2039] font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
