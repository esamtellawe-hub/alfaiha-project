import React, { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink, Award, Building, Globe, Facebook, Linkedin, Instagram } from 'lucide-react';

const News = () => {
  const [filter, setFilter] = useState('all');

  // English Mock Data for News & Press Releases
  const newsItems = [
    {
      id: 1,
      title: "Al Faiha Group Receives ISO 14001 Certification for Environmental Management",
      date: "March 10, 2025",
      category: "Awards",
      summary: "This prestigious certification underscores our commitment to sustainable manufacturing practices and reducing our environmental footprint across all production facilities.",
      image: "/images/mock ups paper.png",
      type: "Press Release",
      socialLinks: {
        linkedin: "https://linkedin.com/company/al-faiha-group/posts/iso-14001",
        facebook: "https://facebook.com/al-faiha-group/posts/iso-14001"
      }
    },
    {
      id: 2,
      title: "Grand Opening of New Admixtures Plant in Saudi Arabia",
      date: "February 15, 2025",
      category: "Expansion",
      summary: "Expanding our regional presence to better serve the growing Saudi construction market with locally manufactured, high-performance concrete solutions.",
      image: "/images/mock ups paper.png",
      type: "Company News",
      socialLinks: {
        linkedin: "https://linkedin.com/company/al-faiha-group/posts/ksa-expansion",
        instagram: "https://instagram.com/al-faiha-group/posts/ksa-expansion"
      }
    },
    {
      id: 3,
      title: "Strategic Partnership Announced with Global Cement Leader",
      date: "January 20, 2025",
      category: "Partnership",
      summary: "A new joint venture aimed at developing next-generation additives for ultra-high-performance concrete applications.",
      image: "/images/mock ups paper.png",
      type: "Press Release",
      socialLinks: {
        linkedin: "https://linkedin.com/company/al-faiha-group/posts/partnership"
      }
    },
    {
      id: 4,
      title: "Al Faiha Participation in Big 5 Construct - Dubai 2024",
      date: "December 05, 2024",
      category: "Events",
      summary: "Join us at the regions largest construction event, where we will be showcasing our latest innovations in waterproofing and flooring systems.",
      image: "/images/mock ups paper.png",
      type: "Event",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      id: 5,
      title: "Launch of 'GreenCrete': Our New Eco-Friendly Product Line",
      date: "November 12, 2024",
      category: "Product Launch",
      summary: "Introducing a new range of carbon-reducing admixtures designed to meet the demands of sustainable building certifications like LEED and BREEAM.",
      image: "/images/mock ups paper.png",
      type: "Company News"
      // No social links for this item to show flexibility
    }
  ];

  const filteredNews = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category.toLowerCase() === filter.toLowerCase() || item.type.toLowerCase() === filter.toLowerCase());

  // Helper to render social icon
  const SocialIcon = ({ type, url }) => {
    const icons = {
      facebook: <Facebook size={18} />,
      instagram: <Instagram size={18} />,
      linkedin: <Linkedin size={18} />
    };
    
    // Colors for hover states
    const colors = {
      facebook: "hover:text-[#1877F2]",
      instagram: "hover:text-[#E4405F]",
      linkedin: "hover:text-[#0A66C2]"
    };

    if (!url) return null;

    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`text-gray-400 transition-colors ${colors[type]}`}
        title={`View on ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      >
        {icons[type]}
      </a>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        
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

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['All', 'Press Release', 'Company News', 'Events', 'Awards'].map((item) => (
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

          <div className="max-w-5xl mx-auto space-y-8">
            {filteredNews.map((news) => (
              <div 
                key={news.id} 
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#ee2039]/5 transition-colors"></div>

                {/* Date Box */}
                <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 shrink-0 group-hover:border-[#ee2039]/30 transition-colors">
                  <span className="text-3xl font-bold text-[#ee2039]">{news.date.split(' ')[1].replace(',', '')}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{news.date.split(' ')[0].substring(0, 3)}</span>
                  <span className="text-[10px] text-gray-300 mt-1">{news.date.split(' ')[2]}</span>
                </div>

                <div className="flex-1 w-full"> {/* Added w-full for mobile layout */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${news.type === 'Press Release' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {news.type}
                      </span>
                      <span className="md:hidden text-xs text-gray-400 font-medium flex items-center gap-1">
                        <Calendar size={12} /> {news.date}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#ee2039] transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {news.summary}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[#ee2039] transition-colors group/btn">
                      Read Full Story <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    
                    {/* Social Media Links for this Specific Article */}
                    {news.socialLinks && (
                      <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline-block">Share:</span>
                        <div className="flex gap-2">
                          <SocialIcon type="linkedin" url={news.socialLinks.linkedin} />
                          <SocialIcon type="facebook" url={news.socialLinks.facebook} />
                          <SocialIcon type="instagram" url={news.socialLinks.instagram} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image (Optional) */}
                <div className="w-full md:w-48 aspect-video md:aspect-square rounded-xl overflow-hidden bg-gray-100 shrink-0 mt-4 md:mt-0">
                   <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default News;
