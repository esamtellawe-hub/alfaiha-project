import React, { useState } from 'react';
import { Upload, Send, CheckCircle2, FileText, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countryList from "react-select-country-list";

const ApplicationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-10 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your interest in joining Al Faiha Group. Our recruitment team will review your application and contact you if your profile matches our requirements.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#ee2039] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Briefcase size={12} className="text-[#ee2039]" />
              Careers
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Job <span className="text-[#ee2039]">Application</span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
              Take the first step towards a rewarding career. Please fill out the form below to apply for a position at Al Faiha Group.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="text-[#ee2039]" size={20} /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors" placeholder="e.g. Ahmad" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors" placeholder="e.g. Al-Masri" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <PhoneInput
                      country={"jo"}
                      value={phone}
                      onChange={setPhone}
                      inputClass="!w-full !px-4 !py-3 !bg-gray-50 !border-gray-200 !rounded-xl !h-[50px] !pl-[48px]"
                      buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-xl !border-r-0"
                      containerClass="!w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Current Location <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors" placeholder="City, Country" />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">LinkedIn Profile <span className="text-red-500">*</span></label>
                    <input required type="url" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors" placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Professional Details */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase className="text-[#ee2039]" size={20} /> Position & Experience
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Position Applied For <span className="text-red-500">*</span></label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors">
                      <option value="">Select a Position</option>
                      <option value="general">General Application</option>
                      <option value="chemical_eng">Senior Chemical Engineer</option>
                      <option value="sales_mgr">Regional Sales Manager</option>
                      <option value="tech_support">Technical Support Specialist</option>
                      <option value="logistics">Logistics Coordinator</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Years of Experience <span className="text-red-500">*</span></label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors">
                      <option value="0-2">Entry Level (0-2 years)</option>
                      <option value="3-5">Mid Level (3-5 years)</option>
                      <option value="5-10">Senior Level (5-10 years)</option>
                      <option value="10+">Executive (10+ years)</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Documents */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="text-[#ee2039]" size={20} /> Documents
                </h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Upload CV / Resume <span className="text-red-500">*</span></label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#ee2039] hover:bg-red-50/10 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#ee2039] group-hover:text-white transition-colors text-gray-400">
                        <Upload size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Cover Letter (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors h-32 resize-none"
                      placeholder="Tell us why you would be a great fit for this role..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#ee2039] hover:bg-[#c41229] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-red-900/20 transition-all flex items-center justify-center gap-2"
                >
                  Submit Application <Send size={18} />
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ApplicationForm;
