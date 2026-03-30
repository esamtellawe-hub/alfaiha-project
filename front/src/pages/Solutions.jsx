import { useLanguage } from "../context/LanguageContext";
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import useSolutions from "../hooks/useSolutions";
import { IMAGE_BASE_URL } from "../api/axios";
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

// Map database icon names to Lucide components
const ICON_MAP = {
  "Beaker": <Beaker />,
  "Grid": <Grid />,
  "Layers": <Layers />,
  "Hammer": <Hammer />,
  "PaintBucket": <PaintBucket />,
  "Droplets": <Droplets />,
  "FileText": <FileText />,
  "Box": <Box />
};

// Fallback icon if not found
const DEFAULT_ICON = <Box />;

// --- 2. مكون عرض المنتجات ---
const ProductItem = ({ product, lang }) => {
  const { language } = useLanguage();
  // Use data from DB
  const name = product[`name_${lang}`] || product[`name_${language}`] || product.name_en || product.name_ar;
  const productId = product.slug || product.id; // Prefer slug for URLs
  
  // Function to get product image or placeholder
  const getProductImage = () => {
    if (product.image_url) return product.image_url.startsWith('http') || !product.image_url.startsWith('/uploads') ? product.image_url : `${IMAGE_BASE_URL}${product.image_url}`;
    
    // For now, use different product images as placeholders if no image in DB
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
          className="w-full h-full object-cover group-hover/product:scale-110 transition-transform duration-500"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = '/images/product1.png';
          }}
        />
        {/* Product Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200">
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Solution</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-slate-900 text-sm leading-tight mb-3 group-hover/product:text-[#ee2039] transition-colors min-h-[2.5rem]">
          {name}
        </h4>

        {/* Product Features/Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 max-h-[44px] overflow-hidden">
          {(() => {
            const getArray = (key) => {
              const val = product[`${key}_${lang}`];
              if (!val) return [];
              if (Array.isArray(val)) return val;
              try { return JSON.parse(val); } catch (e) { return []; }
            };
            const tags = [...getArray('advantages'), ...getArray('uses')].filter(Boolean);
            if (tags.length === 0) return null;
            return tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                {tag}
              </span>
            ));
          })()}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5">
            <FileText size={11} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              TDS & MSDS
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#ee2039]">
            <span>View Details</span>
            <ArrowRight size={12} className="group-hover/product:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Link 
      to={`/product/${productId}`} 
      className="bg-white rounded-xl border border-gray-100 hover:border-[#ee2039] hover:shadow-xl transition-all duration-300 group/product flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {content}
    </Link>
  );
};

// --- 3. مكون القسم الرئيسي ---
const CategorySection = ({ category, sections, isOpen, toggleOpen, lang }) => {
  const { language } = useLanguage();
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    // إذا أغلقنا القسم، نعيد تصفير السب-كاتيجوري المختار
    if (!isOpen) setActiveSubCategory(null);
  }, [isOpen]);

  if (!category) return null;

  // Resolve icon
  const icon = ICON_MAP[category.icon_name] || DEFAULT_ICON;

  // Determine if it has subcategories (children) or direct products
  const hasSubCategories = category.children && category.children.length > 0;
  const directSolutions = category.solutions || [];

  return (
    <div
      id={category.slug || category.id}
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
            {React.cloneElement(icon, {
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
              {category[`name_${lang}`] || category[`name_${language}`] || category.name_en || category.name_ar}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-1 max-w-xl hidden md:block">
              {category[`description_${lang}`] || category[`description_${language}`] || category.description_en || category.description_ar}
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
          {/* Case 1: Direct Solutions */}
          {!hasSubCategories && directSolutions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {directSolutions.map((product) => (
                <ProductItem key={product.id} product={product} lang={lang} />
              ))}
            </div>
          )}
          
          {/* Case 1.5: No solutions and no subcategories */}
          {!hasSubCategories && directSolutions.length === 0 && (
            <div className="text-center py-8 text-gray-400 italic">
                {sections?.search?.[`description_${lang}`] || "No solutions available in this category yet."}
            </div>
          )}

          {/* Case 2: Sub Categories */}
          {hasSubCategories && (
            <div>
              {!activeSubCategory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.children.map((sub) => (
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
                            {sub[`name_${lang}`] || sub[`name_${language}`] || sub.name_en || sub.name_ar}
                          </h4>
                          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                            {sub.solutions?.length || 0} Solutions
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
                      {activeSubCategory[`name_${lang}`] || activeSubCategory[`name_${language}`] || activeSubCategory.name_en || activeSubCategory.name_ar}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(activeSubCategory.solutions || []).length > 0 ? (
                        activeSubCategory.solutions.map((product) => (
                            <ProductItem key={product.id} product={product} lang={lang} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-400 italic">
                             {sections?.search?.[`description_${lang}`] || "No solutions available in this sub-category yet."}
                        </div>
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
              {sections?.footer_note?.[`description_${lang}`] || "Technical Data Sheets (TDS) & Material Safety Data Sheets (MSDS) will be available for download shortly."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- المكون الرئيسي ---
const Solutions = () => {
  const { language } = useLanguage();
  const { sections, solutions, loading, error } = useSolutions();
  const [openSections, setOpenSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLang, setCurrentLang] = useState("en");

  const location = useLocation();

  // Initialize open sections when data loads (e.g. open first one)
  useEffect(() => {
    if (solutions.length > 0 && openSections.length === 0 && !searchTerm) {
        // Optionally open the first one by default, or leave closed. 
        // Original code opened "concrete-admixtures". 
        // Let's open the first one from DB
        if (solutions[0]) {
            setOpenSections([solutions[0].slug || solutions[0].id]);
        }
    }
  }, [solutions]);

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
    if (location.hash && solutions.length > 0) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Also open the section
          const sectionId = location.hash.replace("#", "");
          // Check if it's already open to avoid loop
          setOpenSections(prev => {
              if(!prev.includes(sectionId)) return [...prev, sectionId];
              return prev;
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, solutions]);

  // دالة الحساب (Filtering)
  const filteredData = useMemo(() => {
    if (!searchTerm) return solutions;
    const lowerTerm = searchTerm.toLowerCase();

    return solutions.reduce((acc, category) => {
      const catName = category[`name_${language}`] || category.name_en || category.name_ar || "";
      const categoryTitle = catName.toLowerCase();
      const categoryMatches = categoryTitle.includes(lowerTerm);

      const hasSubs = category.children && category.children.length > 0;

      if (hasSubs) {
        const subs = category.children || [];
        const matchingSubCats = subs.reduce((subAcc, sub) => {
          const subName = sub[`name_${language}`] || sub.name_en || sub.name_ar || "";
          const subTitle = subName.toLowerCase();
          const subSolutions = sub.solutions || [];
          const subTitleMatches = subTitle.includes(lowerTerm);
          const matchingSolutions = subSolutions.filter(
            (p) => (p[`name_${language}`] || p.name_en || p.name_ar || "").toLowerCase().includes(lowerTerm),
          );

          if (subTitleMatches || matchingSolutions.length > 0) {
            subAcc.push({
              ...sub,
              solutions: subTitleMatches ? subSolutions : matchingSolutions,
            });
          }
          return subAcc;
        }, []);

        if (categoryMatches || matchingSubCats.length > 0) {
          acc.push({
            ...category,
            children: categoryMatches ? subs : matchingSubCats,
          });
        }
      } else {
        const prods = category.solutions || [];
        const matchingSolutions = prods.filter(
          (p) => (p[`name_${language}`] || p.name_en || p.name_ar || "").toLowerCase().includes(lowerTerm),
        );
        if (categoryMatches || matchingSolutions.length > 0) {
          acc.push({
            ...category,
            solutions: categoryMatches ? prods : matchingSolutions,
          });
        }
      }
      return acc;
    }, []);
  }, [searchTerm, solutions]);

  // 2. التعديل هنا: useEffect يفتح الأقسام الناتجة عن البحث تلقائياً
  useEffect(() => {
    if (searchTerm && filteredData.length > 0) {
      // افتح كل الأقسام التي ظهرت في نتائج البحث
      const allIds = filteredData.map((c) => c.slug || c.id);
      setOpenSections(allIds);
    }
  }, [searchTerm, filteredData]);

  // 3. التعديل هنا: دالة Toggle تدعم الفتح والإغلاق الحر
  const toggleSection = (id) => {
    if (openSections.includes(id)) {
      setOpenSections(openSections.filter((item) => item !== id)); // إغلاق
    } else {
      setOpenSections([...openSections, id]); // فتح
    }
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading Solutions...</p>
              </div>
          </div>
      );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center p-8 bg-red-50 rounded-2xl">
                <p className="text-red-500 font-bold mb-2">Error loading data</p>
                <p className="text-sm text-gray-500">{error.message}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-[#ee2039] text-white rounded-lg text-sm font-bold">
                    Retry
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-white min-h-screen" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden ">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none ">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] "></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 ">
          {/* Language Switcher */}

          <div className="max-w-4xl mx-auto text-center">
            {sections.hero?.[`subtitle_${currentLang}`] && (
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 text-white border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 ">
                <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
                {sections.hero[`subtitle_${currentLang}`]}
              </div>
            )}
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {sections.hero?.[`title_${currentLang}`] ? (
                <>
                  {sections.hero[`title_${currentLang}`].split(' ')[0]} <span className="text-[#ee2039]">{sections.hero[`title_${currentLang}`].split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                <>Engineered <span className="text-[#ee2039]">Solutions</span></>
              )}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
              {sections.hero?.[`description_${currentLang}`] || "Browse our comprehensive range of specialized construction chemicals..."}
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
                placeholder={sections.search?.[`placeholder_${currentLang}`] || "Search categories, sub-categories, or products..."}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#ee2039] focus:ring-1 focus:ring-[#ee2039] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={16} />
              <span className="font-medium">
                {filteredData.length} {sections.search?.[`title_${currentLang}`] || "Categories Found"}
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
                  sections={sections} // Pass sections mapping
                  isOpen={openSections.includes(category.slug || category.id)}
                  toggleOpen={() => toggleSection(category.slug || category.id)}
                  lang={currentLang}
                />
              ))
            ) : (
              <div className="text-center py-20">
                <Box size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-400 font-bold">
                  {sections.search?.[`empty_text_${currentLang}`] || "No solutions found matching"} "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-[#ee2039] font-bold hover:underline"
                >
                  {sections.search?.[`subtitle_${currentLang}`] || "Clear Search"}
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
