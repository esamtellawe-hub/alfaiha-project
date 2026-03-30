import React, { useState, useRef } from 'react';
import { MapPin, Clock, Briefcase, ArrowRight, Calendar, ChevronDown, ChevronUp, X, Upload, CheckCircle } from 'lucide-react';
import axios from 'axios';
import useJobs from '../hooks/useJobs';
import { useLanguage } from "../context/LanguageContext";

const API = 'http://localhost:5000/api';

const TYPE_COLORS = {
  'Full Time':  'bg-green-50 text-green-700 border-green-200',
  'Part Time':  'bg-blue-50 text-blue-700 border-blue-200',
  'Contract':   'bg-orange-50 text-orange-700 border-orange-200',
  'Internship': 'bg-purple-50 text-purple-700 border-purple-200',
};

const EMPTY_FORM = {
  first_name: '', last_name: '', email: '', phone: '',
  location: '', linkedin_url: '', experience_level: '', cover_letter: ''
};

const Careers = () => {
  const { language } = useLanguage();
  const { jobs, loading } = useJobs();
  const [expanded, setExpanded] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  // Application modal state
  const [applyJob, setApplyJob] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const cvInputRef = useRef(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const isExpired = (dateStr) => dateStr && new Date(dateStr) < new Date();
  const jobTypes = ['all', ...new Set(jobs.map(j => j.type).filter(Boolean))];
  const filtered = typeFilter === 'all' ? jobs : jobs.filter(j => j.type === typeFilter);

  const openApply = (job) => {
    setApplyJob(job);
    setForm(EMPTY_FORM);
    setCvFile(null);
    setSubmitted(false);
    setFormError('');
  };

  const closeApply = () => {
    setApplyJob(null);
    setSubmitted(false);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!cvFile) { setFormError('Please attach your CV (PDF, DOC, or DOCX).'); return; }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (applyJob) {
        fd.append('job_id', applyJob.id);
        fd.append('position_applied', applyJob[`title_${language}`] || applyJob.title_en);
      }
      fd.append('cv', cvFile);

      await axios.post(`${API}/system/apply`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitted(true);
    } catch (err) {
      setFormError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Briefcase size={12} className="text-[#ee2039]" />
              Join Our Team
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Career <span className="text-[#ee2039]">Opportunities</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Be part of a leading engineering group shaping the future of construction across the MENA region.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" /> Competitive Salaries</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" /> Training &amp; Development</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" /> Regional Opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Filter */}
          {!loading && jobTypes.length > 2 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {jobTypes.map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${
                    typeFilter === t
                      ? 'bg-[#ee2039] text-white shadow-lg shadow-red-500/30'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}>
                  {t === 'all' ? 'All Positions' : t}
                </button>
              ))}
            </div>
          )}

          {!loading && (
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Showing <span className="text-[#ee2039] font-bold">{filtered.length}</span> open {filtered.length === 1 ? 'position' : 'positions'}
            </p>
          )}

          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <div className="space-y-4">
              {filtered.length === 0 && <p className="text-center text-gray-400 py-20">No open positions found.</p>}
              {filtered.map((job) => {
                const isOpen = expanded === job.id;
                const expired = isExpired(job.deadline);
                return (
                  <div key={job.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-[#ee2039]/30 shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200'
                    }`}>
                    <button onClick={() => setExpanded(isOpen ? null : job.id)}
                      className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${TYPE_COLORS[job.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {job.type}
                          </span>
                          {expired && (
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-50 text-red-500 border border-red-200">Deadline Passed</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{job[`title_${language}`] || job.title_en}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          {job[`location_${language}`] || job.location_en && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#ee2039]" /> {job[`location_${language}`] || job.location_en}</span>}
                          {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#ee2039]" /> Deadline: {formatDate(job.deadline)}</span>}
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-3">
                        {!expired && (
                          <span className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ee2039] text-white text-sm font-bold rounded-lg">
                            Apply Now <ArrowRight size={14} />
                          </span>
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
                            onClick={() => openApply(job)}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors"
                          >
                            Apply for This Position <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Don't see your role?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Send us your CV and we'll keep you in mind for future openings.</p>
          <button
            onClick={() => openApply(null)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors"
          >
            Send Your CV <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== APPLICATION MODAL ===== */}
      {applyJob !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {applyJob ? `Apply — ${applyJob[`title_${language}`] || applyJob.title_en}` : 'General Application'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Fill in your details and attach your CV</p>
              </div>
              <button onClick={closeApply} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Success state */}
            {submitted ? (
              <div className="p-10 text-center">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for applying. We'll be in touch soon.</p>
                <button onClick={closeApply} className="px-6 py-3 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                    <input required value={form.first_name} onChange={f('first_name')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                      placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                    <input required value={form.last_name} onChange={f('last_name')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                      placeholder="Doe" />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={f('email')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                      placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={f('phone')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                      placeholder="+962 7x xxx xxxx" />
                  </div>
                </div>

                {/* Location + Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                    <input value={form.location} onChange={f('location')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                      placeholder="Amman, Jordan" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level</label>
                    <select value={form.experience_level} onChange={f('experience_level')}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors bg-white">
                      <option value="">Select…</option>
                      <option>Entry Level (0–2 years)</option>
                      <option>Mid Level (2–5 years)</option>
                      <option>Senior (5–10 years)</option>
                      <option>Lead / Manager (10+ years)</option>
                    </select>
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile (optional)</label>
                  <input type="url" value={form.linkedin_url} onChange={f('linkedin_url')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors"
                    placeholder="https://linkedin.com/in/..." />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Letter (optional)</label>
                  <textarea rows={4} value={form.cover_letter} onChange={f('cover_letter')}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#ee2039] transition-colors resize-none"
                    placeholder="Tell us why you're a great fit…" />
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    CV / Resume * <span className="text-gray-400 font-normal">(PDF, DOC, DOCX — max 10MB)</span>
                  </label>
                  {/* Input hidden using position/opacity (not display:none which can block click) */}
                  <input
                    id="cv-file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', overflow: 'hidden' }}
                    onChange={(e) => { setCvFile(e.target.files[0] || null); setFormError(''); }}
                  />
                  <label
                    htmlFor="cv-file-input"
                    className={`flex items-center gap-3 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all select-none ${
                      cvFile
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:border-[#ee2039] hover:bg-red-50'
                    }`}
                  >
                    <Upload size={20} className={cvFile ? 'text-green-500' : 'text-gray-400'} />
                    <div className="flex-1 text-sm">
                      {cvFile
                        ? <span className="text-green-700 font-semibold">✓ {cvFile.name}</span>
                        : <span className="text-gray-500">Click here to attach your CV</span>
                      }
                    </div>
                    {cvFile && (
                      <span
                        role="button"
                        onClick={(e) => { e.preventDefault(); setCvFile(null); document.getElementById('cv-file-input').value = ''; }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </span>
                    )}
                  </label>
                </div>

                {/* Error */}
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{formError}</div>
                )}

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeApply}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-[#ee2039] text-white font-bold hover:bg-[#c41229] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
                    ) : (
                      <>Submit Application <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Careers;
