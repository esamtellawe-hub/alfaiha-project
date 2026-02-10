import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import productsData from '../products.json';
import ServiceRequestModal from '../Component/ServiceRequestModal';

// --- COMPONENTS ---

// 1. Tab Content Component (Extracted for performance)
const TabContent = ({ tabId, product }) => {
  if (!product) return null;
  
  return (
    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
      {tabId === 'advantages' && product.advantages && (
        <ul className="grid gap-3">
          {product.advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-[#ee2039] shrink-0 mt-0.5" />
              <span className="text-gray-700 leading-relaxed text-sm md:text-base">{advantage}</span>
            </li>
          ))}
        </ul>
      )}

      {tabId === 'applications' && product.uses && (
        <div className="space-y-4">
          <ul className="grid gap-3">
            {product.uses.map((use, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#ee2039] mt-2 shrink-0" />
                <span className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">{use}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {['packaging', 'storage', 'dosage', 'standards'].includes(tabId) && (
        <div className="prose prose-slate max-w-none">
          <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100 text-slate-700 leading-relaxed text-sm md:text-base font-medium">
             {tabId === 'dosage' ? product.mixing : product[tabId]}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('advantages');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const product = Object.values(productsData).find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
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

  const tabs = [
    { id: 'advantages', label: 'Advantages', show: product.advantages?.length > 0 },
    { id: 'applications', label: 'Applications', show: product.uses?.length > 0 },
    { id: 'packaging', label: 'Packaging', show: product.packaging },
    { id: 'storage', label: 'Storage', show: product.storage },
    { id: 'dosage', label: 'Dosage', show: product.mixing },
    { id: 'standards', label: 'Standards', show: product.standard }
  ].filter(tab => tab.show);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
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
            <span>Back to Products</span>
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
                  />
                </div>
              </div>
            </div>

            {/* Title Box */}
            <div className="w-full md:w-7/12 order-2 md:order-1 text-center md:text-left">
              <span className="inline-flex items-center px-3 py-1 bg-[#ee2039]/20 text-white border border-[#ee2039]/30 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
                {product.description}
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
                  <TabContent tabId={activeTab} product={product} />
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
                        <TabContent tabId={tab.id} product={product} />
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
                  Technical Specs
                </h3>
                
                <div className="space-y-4 divide-y divide-gray-100">
                  {[
                    { label: "Coverage", value: product.coverage },
                    { label: "Packaging", value: product.packaging },
                    { label: "Storage", value: product.storage },
                    { label: "Standard", value: product.standard }
                  ].map((item, idx) => item.value && (
                    <div key={idx} className={idx !== 0 ? "pt-4" : ""}>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#ee2039] text-[#ee2039] hover:text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/10">
                    <FileText size={18} />
                    Download TDS 
                  </button>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 bg-black hover:bg-[#ee2039] text-[#ee2039] hover:text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/10">
                    <FileText size={18} />
                    Download MSDS    
                  </button>
                </div>

                {/* Internal Support Link */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-full bg-red-50 text-[#ee2039] py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
                  >
                    Contact Expert
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