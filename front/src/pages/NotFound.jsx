import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-slate-900 leading-none">
          404
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated 404 Header */}
        <div className="relative inline-block mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-[#ee2039] opacity-10 leading-none absolute inset-0 blur-xl animate-pulse">
            404
          </h1>
          <h1 className="text-8xl md:text-[10rem] font-black text-slate-900 leading-none relative">
            404
          </h1>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
           Oops! Page Not Found
        </h2>
        
        <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-[#ee2039] hover:bg-[#c41229] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#ee2039]/20 group"
          >
            <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 group">
        <img 
          src="/images/logo.png" 
          alt="Al Faiha Group" 
          className="h-8 md:h-10 object-contain grayscale"
        />
      </div>
    </div>
  );
};

export default NotFound;
