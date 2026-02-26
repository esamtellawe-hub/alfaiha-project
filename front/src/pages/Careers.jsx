import React, { useState } from 'react';
import { MapPin, Clock, Briefcase, ArrowRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import useJobs from '../hooks/useJobs';

const TYPE_COLORS = {
  'Full Time':  'bg-green-50 text-green-700 border-green-200',
  'Part Time':  'bg-blue-50 text-blue-700 border-blue-200',
  'Contract':   'bg-orange-50 text-orange-700 border-orange-200',
  'Internship': 'bg-purple-50 text-purple-700 border-purple-200',
};

const Careers = () => {
  const { jobs, loading } = useJobs();
  const [expanded, setExpanded] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const isExpired = (dateStr) => dateStr && new Date(dateStr) < new Date();

  const jobTypes = ['all', ...new Set(jobs.map(j => j.type).filter(Boolean))];
  const filtered = typeFilter === 'all' ? jobs : jobs.filter(j => j.type === typeFilter);

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
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" /> Training & Development</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ee2039]" /> Regional Opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Filter by Type */}
          {!loading && jobTypes.length > 2 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {jobTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${
                    typeFilter === t
                      ? 'bg-[#ee2039] text-white shadow-lg shadow-red-500/30'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {t === 'all' ? 'All Positions' : t}
                </button>
              ))}
            </div>
          )}

          {/* Counter */}
          {!loading && (
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Showing <span className="text-[#ee2039] font-bold">{filtered.length}</span> open {filtered.length === 1 ? 'position' : 'positions'}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Jobs List */}
          {!loading && (
            <div className="space-y-4">
              {filtered.length === 0 && (
                <p className="text-center text-gray-400 py-20">No open positions found.</p>
              )}
              {filtered.map((job) => {
                const isOpen = expanded === job.id;
                const expired = isExpired(job.deadline);
                return (
                  <div
                    key={job.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-[#ee2039]/30 shadow-xl' : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200'
                    }`}
                  >
                    {/* Job Header - clickable to expand */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : job.id)}
                      className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${TYPE_COLORS[job.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                            {job.type}
                          </span>
                          {expired && (
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-50 text-red-500 border border-red-200">
                              Deadline Passed
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ee2039] transition-colors">
                          {job.title_en}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                          {job.location_en && (
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-[#ee2039]" /> {job.location_en}
                            </span>
                          )}
                          {job.deadline && (
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-[#ee2039]" /> Deadline: {formatDate(job.deadline)}
                            </span>
                          )}
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

                    {/* Expanded Description */}
                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8 border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Job Description</h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job.description_en}</p>
                        {!expired && (
                          <a
                            href={`mailto:careers@alfaiha.com?subject=Application for ${job.title_en}`}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors"
                          >
                            Apply for This Position <ArrowRight size={16} />
                          </a>
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

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Don't see your role?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Send us your CV and we'll keep you in mind for future openings that match your profile.
          </p>
          <a
            href="mailto:careers@alfaiha.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ee2039] text-white font-bold rounded-xl hover:bg-[#c41229] transition-colors"
          >
            Send Your CV <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
};

export default Careers;
