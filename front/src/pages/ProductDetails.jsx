import { useLanguage } from "../context/LanguageContext";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../api/axios'; // Import API client
import ServiceRequestModal from '../Component/ServiceRequestModal';

// --- COMPONENTS ---

// 1. Tab Content Component (Extracted for performance)
const TabContent = ({ tabId, product, lang }) => {
  const { language } = useLanguage();
  if (!product) return null;
  
  // Helper to get localized array or string
  const getList = (key) => {
      const val = product[`${key}_${lang}`] || product[`${key}_en`] || [];
      
      if (Array.isArray(val)) return val;
      
      if (typeof val === 'string') {
          // If it looks like a JSON array string, parse it
          if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
              try {
                  return JSON.parse(val);
              } catch (e) {
                  console.error(`Failed to parse ${key} as JSON:`, e);
              }
          }
          // Otherwise, split by comma if the comma is acting as a separator
          return val.split(',').map(item => item.trim()).filter(item => item.length > 0);
      }
      
      return [val];
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
      {tabId === 'advantages' && (product[`advantages_${language}`] || product.advantages_en || product.advantages_ar || product.advantages_fr) && (
        <ul className="grid gap-3">
          {getList('advantages').map((advantage, index) => (
            <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-[#ee2039] shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed text-sm md:text-base">{advantage}</span>
            </li>
          ))}
        </ul>
      )}

      {tabId === 'uses' && (product[`uses_${language}`] || product.uses_en || product.uses_ar || product.uses_fr) && (
        <div className="space-y-4">
          <ul className="grid gap-3">
            {getList('uses').map((use, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#ee2039] mt-2 shrink-0" />
                <span className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">{use}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {['packaging', 'storage', 'dosage', 'standards', 'health_and_safety'].includes(tabId) && (
        <div className="prose prose-slate max-w-none">
          <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 text-slate-700 leading-relaxed text-sm md:text-base font-medium">
             {(() => {
                const val = tabId === 'dosage' ? (product[`mixing_${lang}`] || product[`mixing_${language}`] || roduct.mixing_en) : (product[`${tabId}_${lang}`] || product[`${tabId}_en`]);
                const hasData = val && val.toString().trim() !== '' && val.toString().toLowerCase() !== 'null';
                return hasData ? val : '-';
             })()}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ProductDetails = () => {
  const { language } = useLanguage();
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('advantages');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Fetch product data
  useEffect(() => {
      const fetchProduct = async () => {
          try {
              setLoading(true);
              // endpoint is /data/solution/:slug (defined in routes/solutions.js)
              const response = await api.get(`/data/solution/${productId}`);
              
              // Map API response to Component State structure (simplifying for UI)
              const data = response.data;
              const mappedProduct = {
                  id: data.id,
                  slug: data.slug,
                  name_en: data[`name_${language}`] || data.name_en,
                  name_ar: data.name_ar,
                  name_fr: data.name_fr,
                  category: data.category?.[`name_${currentLang}`] || data.category?.name_en || 'Solution',
                  description_en: data[`description_${language}`] || data.description_en,
                  description_ar: data.description_ar,
                  description_fr: data.description_fr,
                  image: data.image_url ? `http://localhost:5000${data.image_url}` : '/images/product1.png', 
                  datasheet_url: data.datasheet_url,
                  msds_url: data.msds_url,
                  
                  // Arrays (JSON fields)
                  advantages_en: data[`advantages_${language}`] || data.advantages_en, advantages_ar: data.advantages_ar, advantages_fr: data.advantages_fr,
                  uses_en: data[`uses_${language}`] || data.uses_en, uses_ar: data.uses_ar, uses_fr: data.uses_fr,

                  // Specs (Multilingual)
                  coverage_en: data[`coverage_${language}`] || data.coverage_en, coverage_ar: data.coverage_ar, coverage_fr: data.coverage_fr,
                  packaging_en: data[`packaging_${language}`] || data.packaging_en, packaging_ar: data.packaging_ar, packaging_fr: data.packaging_fr,
                  storage_en: data[`storage_${language}`] || data.storage_en, storage_ar: data.storage_ar, storage_fr: data.storage_fr,
                  mixing_en: data[`mixing_ratio_${language}`] || data.mixing_ratio_en, mixing_ar: data.mixing_ratio_ar, mixing_fr: data.mixing_ratio_fr,
                  standard_en: data[`standard_${language}`] || data.standard_en, standard_ar: data.standard_ar, standard_fr: data.standard_fr,
                  health_and_safety_en: data[`health_and_safety_${language}`] || data.health_and_safety_en, health_and_safety_ar: data.health_and_safety_ar, health_and_safety_fr: data.health_and_safety_fr,
              };
              
              setProduct(mappedProduct);
              setLoading(false);
          } catch (err) {
              console.error("Error fetching product details:", err);
              setError(err);
              setLoading(false);
          }
      };

      if (productId) {
          fetchProduct();
      }
  }, [productId]);


  if (loading) {
      return (
          <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading Solution Details...</p>
              </div>
          </div>
      );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Solution Not Found</h1>
          <p className="text-gray-600 mb-6">The solution you're looking for doesn't exist or an error occurred.</p>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ee2039] text-white rounded-lg hover:bg-[#c41229] transition-colors w-full justify-center sm:w-auto"
          >
            <ArrowLeft size={20} />
            Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  // Compute the current tab's active data arrays based on lang
  const currentAdvantages = product?.[`advantages_${currentLang}`] || product?.advantages_en || [];
  const currentUses = product?.[`uses_${currentLang}`] || product?.uses_en || [];

  const hasContent = (val) => val && val.toString().trim() !== '' && val.toString().toLowerCase() !== 'null';

  const tabs = [
    { id: 'advantages', label: currentLang === 'ar' ? 'الميزات' : currentLang === 'fr' ? 'Avantages' : 'Advantages', show: currentAdvantages?.length > 0 },
    { id: 'uses', label: currentLang === 'ar' ? 'الاستخدامات' : currentLang === 'fr' ? 'Applications' : 'Uses', show: currentUses?.length > 0 },
    { id: 'packaging', label: currentLang === 'ar' ? 'التعبئة والتغليف' : currentLang === 'fr' ? 'Emballage' : 'Packaging', show: true },
    { id: 'storage', label: currentLang === 'ar' ? 'التخزين' : currentLang === 'fr' ? 'Stockage' : 'Storage', show: true },
    { id: 'dosage', label: currentLang === 'ar' ? 'نسبة الخلط' : currentLang === 'fr' ? 'Dosage' : 'Mixing', show: true },
    { id: 'health_and_safety', label: currentLang === 'ar' ? 'الصحة والسلامة' : currentLang === 'fr' ? 'Santé et Sécurité' : 'Health & Safety', show: true },
  ].filter(tab => tab.show);

  // Fallback to English if the current language field is empty
  const displayName = product?.[`name_${currentLang}`] || product?.name_en || product?.name_ar || "";
  const displayDesc = product?.[`description_${currentLang}`] || product?.description_en || product?.description_ar || "";

  return (
    <div className="min-h-screen bg-gray-50 pb-12" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-36 md:pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            <span className="mb-0">
               {currentLang === 'ar' ? 'الرجوع إلى الحلول' : currentLang === 'fr' ? 'Retour aux Solutions' : 'Back to Solutions'}
            </span>
          </button>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start">
            {/* Image Box */}
            <div className="w-full max-w-[280px] md:max-w-none md:w-5/12 order-1 md:order-2">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500 rounded-2xl"
                    onError={(e) => { e.target.src = '/images/product1.png'; }}
                  />
                </div>
              </div>
            </div>

            {/* Title Box */}
            <div className="w-full md:w-7/12 order-2 md:order-1 text-center md:text-left">
              <span className="inline-flex items-center px-3 py-1 bg-[#ee2039]/20 text-white border border-[#ee2039]/30 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
                {product.category || 'Solution'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {displayName}
              </h1>
              <p className="text-sm sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {displayDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 -mt-6 md:-mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Main Tabs Column */}
            <div className="lg:col-span-2">
              
              {/* DESKTOP VERSION */}
              <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 flex overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[120px] px-4 py-5 text-sm font-bold transition-all border-b-2 relative ${
                        activeTab === tab.id
                          ? 'text-[#ee2039] border-[#ee2039] bg-white'
                          : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-8 min-h-[300px]">
                  <TabContent tabId={activeTab} product={product} lang={currentLang} />
                </div>
              </div>

              {/* MOBILE VERSION */}
              <div className="md:hidden flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {tabs.map((tab) => (
                  <div key={tab.id} className="flex flex-col">
                    {activeTab === tab.id && (
                       <div className="h-1 bg-[#ee2039] w-full" />
                    )}
                    
                    <button
                      onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                      className={`w-full px-6 py-5 text-center transition-all ${
                        activeTab === tab.id ? 'bg-white' : 'bg-white'
                      }`}
                    >
                      <span className={`font-bold text-lg uppercase tracking-wide ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-700'}`}>
                        {tab.label}
                      </span>
                    </button>
                    
                    {activeTab === tab.id && (
                      <div className="px-6 pb-8 pt-4 bg-white animate-in fade-in duration-300">
                        <TabContent tabId={tab.id} product={product} lang={currentLang} />
                      </div>
                    )}
                    
                    {activeTab !== tab.id && (
                       <div className="h-[1px] bg-gray-100 w-full mx-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Specifications Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="text-[#ee2039]" size={20} />
                  {currentLang === 'ar' ? 'المواصفات الفنية' : currentLang === 'fr' ? 'Spécifications Techniques' : 'Technical Specs'}
                </h3>
                
                <div className="space-y-4 divide-y divide-gray-100">
                  {[
                    { label: currentLang === 'ar' ? "التغطية" : currentLang === "fr" ? "Couverture" : "Coverage", value: product[`coverage_${language}`] || product.coverage_en },
                    
                    { label: currentLang === 'ar' ? "المواصفات" : currentLang === "fr" ? "Norme" : "Standard", value: product[`standard_${language}`] || product.standard_en }
                  ].map((item, idx) => (
                    <div key={idx} className={idx !== 0 ? "pt-4" : ""}>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">{hasContent(item.value) ? item.value : '-'}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
                  {/* Download TDS Button */}
                  <a href={product.datasheet_url ? `http://localhost:5000${product.datasheet_url}` : "#"} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#ee2039] text-[#ee2039] hover:text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/10">
                    <FileText size={18} />
                    {currentLang === 'ar' ? 'تحميل البيانات الفنية' : currentLang === 'fr' ? 'Télécharger la fiche technique' : 'Download TDS'}
                  </a>

                  {/* Download MSDS Button */}
                  <a href={product.msds_url ? `http://localhost:5000${product.msds_url}` : "#"} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#ee2039] text-[#ee2039] hover:text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/10">
                    <FileText size={18} />
                    {currentLang === 'ar' ? 'تحميل بيانات السلامة' : currentLang === 'fr' ? 'Télécharger FDS' : 'Download MSDS'}
                  </a>
                </div>

                {/* Internal Support Link */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-full bg-red-50 text-[#ee2039] py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                   {currentLang === 'ar' ? 'تواصل مع خبير' : currentLang === 'fr' ? 'Contacter un expert' : 'Contact Expert'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* External Service Request Modal (Restored) */}
      <ServiceRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sectorTitle={product.name}
      />
    </div>
  );
};

export default ProductDetails;