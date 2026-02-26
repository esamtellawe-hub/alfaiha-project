import React, { useState } from 'react';
import { Calendar, ArrowRight, Globe, Facebook, Linkedin, Instagram } from 'lucide-react';
import useNews from '../hooks/useNews';

const FILTERS = ['All', 'Press Release', 'Company News', 'Events', 'Awards'];

const News = () => {
  const { articles, loading } = useNews();
  const [filter, setFilter] = useState('all');

  // Format date from DB (YYYY-MM-DD) to display parts
  const parseDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---', year: '----' };
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('en', { month: 'short' }).toUpperCase(),
      year: d.getFullYear(),
      full: d.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(a =>
        (a.type || '').toLowerCase() === filter ||
        (a.category || '').toLowerCase() === filter
      );

  const SocialIcon = ({ type, url }) => {
    if (!url) return null;
    const icons = { facebook: <Facebook size={18} />, instagram: <Instagram size={18} />, linkedin: <Linkedin size={18} /> };
    const colors = { facebook: 'hover:text-[#1877F2]', instagram: 'hover:text-[#E4405F]', linkedin: 'hover:text-[#0A66C2]' };
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className={`text-gray-400 transition-colors ${colors[type]}`}>
        {icons[type]}
      </a>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Globe size={12} className="text-[#ee2039]" />
              Media Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              News & <span className="text-[#ee2039]">Press</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Official announcements, company milestones, and the latest updates from Al Faiha Group.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {FILTERS.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item.toLowerCase())}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === item.toLowerCase()
                    ? 'bg-[#ee2039] text-white shadow-lg shadow-red-500/30'
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Articles List */}
          {!loading && (
            <div className="max-w-5xl mx-auto space-y-8">
              {filteredArticles.length === 0 && (
                <p className="text-center text-gray-400 py-20">No articles found.</p>
              )}
              {filteredArticles.map((article) => {
                const date = parseDate(article.publish_date);
                return (
                  <div
                    key={article.id}
                    className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                  >
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#ee2039]/5 transition-colors" />

                    {/* Date Box */}
                    <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 shrink-0 group-hover:border-[#ee2039]/30 transition-colors">
                      <span className="text-3xl font-bold text-[#ee2039]">{date.day}</span>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{date.month}</span>
                      <span className="text-[10px] text-gray-300 mt-1">{date.year}</span>
                    </div>

                    {/* Body */}
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-3">
                        {article.type && (
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            article.type === 'Press Release' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                          }`}>
                            {article.type}
                          </span>
                        )}
                        <span className="md:hidden text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Calendar size={12} /> {date.full}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#ee2039] transition-colors">
                        {article.title_en}
                      </h3>

                      <p className="text-gray-500 leading-relaxed mb-6">
                        {article.content_en?.substring(0, 200)}{article.content_en?.length > 200 ? '...' : ''}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <a
                          href={`/news/${article.slug}`}
                          className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#ee2039] transition-colors group/btn"
                        >
                          Read Full Story <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>

                        {/* Social share */}
                        {(article.linkedin_url || article.facebook_url || article.instagram_url) && (
                          <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline-block">Share:</span>
                            <div className="flex gap-2">
                              <SocialIcon type="linkedin" url={article.linkedin_url} />
                              <SocialIcon type="facebook" url={article.facebook_url} />
                              <SocialIcon type="instagram" url={article.instagram_url} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Thumbnail */}
                    {article.image_url && (
                      <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden bg-gray-100 shrink-0 mt-4 md:mt-0">
                        <img
                          src={article.image_url}
                          alt={article.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default News;
