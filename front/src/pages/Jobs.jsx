import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, ArrowRight, Users, Rocket, Heart, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useJobs from '../hooks/useJobs';
import { useLanguage } from "../context/LanguageContext";

const API = 'http://localhost:5000/api';

const TYPE_COLORS = {
  'Full Time':  'bg-green-50 text-green-700 border-green-200',
  'Part Time':  'bg-blue-50 text-blue-700 border-blue-200',
  'Contract':   'bg-orange-50 text-orange-700 border-orange-200',
  'Internship': 'bg-purple-50 text-purple-700 border-purple-200',
};

// Default text fallback while loading
const DEFAULT = {
  hero_title_en: 'Career Opportunities',
  hero_subtitle_en: 'Be part of a leading engineering group shaping the future of construction across the MENA region.',
  badge1_en: 'Competitive Salaries',
  badge2_en: 'Training & Development',
  badge3_en: 'Regional Opportunities',
  cta_title_en: "Don't see your role?",
  cta_subtitle_en: "Send us your CV and we'll keep you in mind for future openings.",
  apply_btn_en: 'Apply for This Position',
};

const Careers = () => {
  const { language } = useLanguage();
  const { jobs, loading } = useJobs();
  const [expanded, setExpanded] = useState(null);
  const [typeFilter, setTypeFilter] = useState('All');
  const [cms, setCms] = useState(DEFAULT);
  const navigate = useNavigate();

  // Language from localStorage or default EN
  const lang = localStorage.getItem('lang') || 'en';
  const l = lang;
  const t = (key) => cms[`${key}_${l}`] || cms[`${key}_en`] || '';

  useEffect(() => {
    fetch(`${API}/content/careers-section`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setCms(data); })
      .catch(() => {});
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isExpired = (dateStr) => dateStr && new Date(dateStr) < new Date();
  const jobTypes = ['All', ...new Set(jobs.map(j => j.type).filter(Boolean))];
  const filtered = typeFilter === 'All' ? jobs : jobs.filter(j => j.type === typeFilter);

  const goApply = (job) => {
    navigate('/application-form', { state: { jobTitle: job?.title_en || '' } });
  };

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Users size={12} className="text-[#ee2039]" /> Join Our Team
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('hero_title')}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" />{t('badge1')}</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" />{t('badge2')}</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" />{t('badge3')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Work at Al Faiha?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We offer more than just a job — a career path filled with growth, challenges, and rewards.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6"><Rocket size={24} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation Driven</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Work with cutting-edge technologies and contribute to developing the next generation of construction solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6"><Users size={24} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Diverse Culture</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Join a multicultural team of professionals from across the region, fostering creativity and collaboration.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#ee2039] mb-6"><Heart size={24} /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Growth</h3>
              <p className="text-gray-500 leading-relaxed text-sm">We invest in our people through continuous training, mentorship programs, and clear career progression paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Open Positions</h2>
              <p className="text-gray-500">Find the role that fits your passion and expertise.</p>
            </div>
            {!loading && (
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button key={type} onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      typeFilter === type ? 'bg-[#ee2039] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="grid gap-5 max-w-5xl mx-auto">
              {filtered.length === 0 && <p className="text-center text-gray-400 py-16">No open positions found.</p>}
              {filtered.map((job) => {
                const isOpen = expanded === job.id;
                const expired = isExpired(job.deadline);
                return (
                  <div key={job.id} className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-[#ee2039]/30 shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200'
                  }`}>
                    <button onClick={() => setExpanded(isOpen ? null : job.id)}
                      className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${TYPE_COLORS[job.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {job.type}
                          </span>
                          {expired && <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-50 text-red-500 border border-red-200">Deadline Passed</span>}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ee2039] transition-colors">{job[`title_${language}`] || job.title_en}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          {job[`location_${language}`] || job.location_en && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#ee2039]" /> {job[`location_${language}`] || job.location_en}</span>}
                          {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#ee2039]" /> Deadline: {formatDate(job.deadline)}</span>}
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-3">
                        {!expired && (
                          <button
                            onClick={(e) => { e.stopPropagation(); goApply(job); }}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ee2039] text-white text-sm font-bold rounded-lg hover:bg-[#c41229] transition-colors"
                          >
                            Apply Now <ArrowRight size={14} />
                          </button>
                        )}
                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8 border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Job Description</h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job[`description_${language}`] || job.description_en}</p>
                        {!expired && (
                          <button
                            onClick={() => goApply(job)}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors"
                          >
                            {t('apply_btn')} <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA - General Application */}
          <div className="text-center mt-12 bg-gray-50 py-10 rounded-2xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('cta_title')}</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{t('cta_subtitle')}</p>
            <button
              onClick={() => goApply(null)}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-[#ee2039] hover:text-[#ee2039] transition-all bg-white"
            >
              Send General Application <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
