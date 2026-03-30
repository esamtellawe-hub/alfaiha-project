import React from 'react';
import { Wrench, Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Maintenance = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
        <Wrench className="w-[30rem] h-[30rem] -rotate-12 text-slate-900" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated Icon Container */}
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-[#ee2039]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl shadow-[#ee2039]/10 border border-[#ee2039]/5">
            <Wrench className="w-16 h-16 md:w-20 md:h-20 text-[#ee2039] animate-bounce" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
          Under <span className="text-[#ee2039]">Maintenance</span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto">
          We're currently performing some scheduled maintenance to improve our services. We'll be back online in a few moments!
        </p>

        <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 md:p-8 mb-12 flex items-center justify-center gap-6">
           <div className="flex items-center gap-3">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
             <div className="text-left">
               <div className="text-[10px] font-bold uppercase tracking-widest text-green-600">Status</div>
               <div className="text-slate-900 font-bold">Optimizing Services...</div>
             </div>
           </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold transition-all duration-300 shadow-xl group hover:scale-[1.02] active:scale-95"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
          Check for Updates
        </button>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-900">Al Faiha Group</span>
      </div>
    </div>
  );
};

export default Maintenance;