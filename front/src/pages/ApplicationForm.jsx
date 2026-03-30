import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, CheckCircle2, FileText, User, Briefcase, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLanguage } from "../context/LanguageContext";

const API = 'http://localhost:5000/api';

const ApplicationForm = () => {
  const { language } = useLanguage();
  const [positions, setPositions] = useState([]);
  const location = useLocation();
  const passedJobTitle = location.state?.jobTitle || '';

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    location: '', linkedin_url: '',
    position_applied: passedJobTitle,
    experience_level: '0-2',
    cover_letter: ''
  });
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const cvRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/content/positions`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setPositions(data))
      .catch(() => {});
  }, []);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.first_name.trim())          e.first_name = 'First name is required.';
    if (!form.last_name.trim())           e.last_name  = 'Last name is required.';
    if (!form.email.trim())               e.email      = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                          e.email      = 'Enter a valid email address.';
    if (!phone || phone.length <= 3)       e.phone      = 'Please enter a phone number.';
    if (!form.location.trim())            e.location   = 'Location is required.';
    if (form.linkedin_url && !/^https?:\/\/.+\..+/.test(form.linkedin_url))
                                          e.linkedin_url = 'Enter a valid URL (https://...).';
    if (!form.position_applied)           e.position_applied = 'Please select a position.';
    if (!cvFile)                          e.cv = 'Please attach your CV.';
    else if (cvFile.size > 10 * 1024 * 1024)
                                          e.cv = 'File must be under 10MB.';
    return e;
  };

  const f = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const fieldErr = (k) => errors[k]
    ? <p className="text-red-500 text-xs mt-1">{errors[k]}</p>
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});


    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('phone', phone);
      fd.append('cv', cvFile);

      const res = await fetch(`${API}/system/apply`, { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your interest in joining Al Faiha Group. Our recruitment team will review your application and contact you if your profile matches our requirements.
          </p>
          <button
            onClick={() => window.location.href = '/careers'}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#ee2039] transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Briefcase size={12} className="text-[#ee2039]" /> Careers
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Job <span className="text-[#ee2039]">Application</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
              Take the first step towards a rewarding career. Fill out the form below to apply.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Personal Info */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="text-[#ee2039]" size={20} /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">First Name <span className="text-red-500">*</span></label>
                    <input value={form.first_name} onChange={f('first_name')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.first_name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}
                      placeholder="Ahmad" />
                    {fieldErr('first_name')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                    <input value={form.last_name} onChange={f('last_name')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.last_name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}
                      placeholder="Al-Masri" />
                    {fieldErr('last_name')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" value={form.email} onChange={f('email')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}
                      placeholder="name@example.com" />
                    {fieldErr('email')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <PhoneInput country="jo" value={phone}
                      onChange={(val) => { setPhone(val); if (errors.phone) setErrors(prev => ({ ...prev, phone: '' })); }}
                      inputClass={`!w-full !px-4 !py-3 !bg-gray-50 !rounded-xl !h-[50px] !pl-[48px] ${errors.phone ? '!border-red-400' : '!border-gray-200'}`}
                      buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-xl !border-r-0"
                      containerClass="!w-full" />
                    {fieldErr('phone')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Current Location <span className="text-red-500">*</span></label>
                    <input value={form.location} onChange={f('location')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.location ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}
                      placeholder="City, Country" />
                    {fieldErr('location')}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">LinkedIn Profile</label>
                    <input type="text" value={form.linkedin_url} onChange={f('linkedin_url')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.linkedin_url ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}
                      placeholder="https://linkedin.com/in/..." />
                    {fieldErr('linkedin_url')}
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Position */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase className="text-[#ee2039]" size={20} /> Position &amp; Experience
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Position Applied For <span className="text-red-500">*</span></label>
                    <select value={form.position_applied} onChange={f('position_applied')}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-colors ${errors.position_applied ? 'border-red-400' : 'border-gray-200 focus:border-[#ee2039]'}`}>
                      <option value="">Select a Position</option>
                      <option value="General Application">General Application</option>
                      {positions.map(p => (
                        <option key={p.id} value={p[`name_${language}`] || p.name_en}>{p[`name_${language}`] || p.name_en}</option>
                      ))}
                    </select>
                    {fieldErr('position_applied')}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Years of Experience <span className="text-red-500">*</span></label>
                    <select value={form.experience_level} onChange={f('experience_level')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors">
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

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Upload CV / Resume <span className="text-red-500">*</span>
                      <span className="text-gray-400 font-normal ml-1">(PDF, DOC, DOCX – max 10MB)</span>
                    </label>

                    {/* Hidden real input */}
                    <input
                      id="app-cv-input"
                      ref={cvRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px' }}
                      onChange={(e) => { setCvFile(e.target.files[0] || null); setError(''); }}
                    />

                    {/* Styled clickable label */}
                    <label
                      htmlFor="app-cv-input"
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer group block transition-all ${
                        cvFile
                          ? 'border-green-400 bg-green-50'
                          : errors.cv
                          ? 'border-red-400 bg-red-50/10'
                          : 'border-gray-200 hover:border-[#ee2039] hover:bg-red-50/10'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors ${
                        cvFile ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-[#ee2039] group-hover:text-white'
                      }`}>
                        <Upload size={20} />
                      </div>

                      {cvFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-sm font-bold text-green-700">✓ {cvFile.name}</p>
                          <span
                            role="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setCvFile(null);
                              if (cvRef.current) cvRef.current.value = '';
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={16} />
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 10MB</p>
                        </>
                      )}
                    </label>
                    {fieldErr('cv')}
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Cover Letter (Optional)</label>
                    <textarea
                      value={form.cover_letter} onChange={f('cover_letter')}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors h-32 resize-none"
                      placeholder="Tell us why you would be a great fit for this role..."
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#ee2039] hover:bg-[#c41229] text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting…</>
                  ) : (
                    <>Submit Application <Send size={18} /></>
                  )}
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
