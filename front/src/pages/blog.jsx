import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog = () => {
  // Mock Data for Blog Posts
  const posts = [
    {
      id: 1,
      title: "Sustainable Construction: The Future of Building",
      excerpt: "Exploring how modern construction chemicals are reducing carbon footprints and enabling greener infrastructure across the Middle East.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "March 15, 2025",
      author: "Dr. Ahmad Al-Sayed",
      readTime: "5 min read",
      category: "Sustainability"
    },
    {
      id: 2,
      title: "Innovations in Waterproofing Technology",
      excerpt: "A deep dive into the latest crystalline waterproofing systems and how they provide self-healing properties to concrete structures.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "February 28, 2025",
      author: "Sarah Jaber",
      readTime: "7 min read",
      category: "Technology"
    },
    {
      id: 3,
      title: "Al Faiha Group Expands to North Africa",
      excerpt: "We are proud to announce the opening of our new manufacturing facility in Algeria, serving the growing North African market.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "February 10, 2025",
      author: "Media Team",
      readTime: "3 min read",
      category: "Company News"
    },
     {
      id: 4,
      title: "The Critical Role of Admixtures in High-Rise Buildings",
      excerpt: "How superplasticizers and retarders enable pumping concrete to record-breaking heights in modern skyscrapers.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "January 22, 2025",
      author: "Eng. Rami Khoury",
      readTime: "6 min read",
      category: "Technical"
    },
    {
      id: 5,
      title: "Mastering Industrial Flooring: Epoxies vs. Polyurethanes",
      excerpt: "Choosing the right flooring system for your facility: A comprehensive guide to durability, chemical resistance, and aesthetics.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "January 05, 2025",
      author: "Technical Support",
      readTime: "8 min read",
      category: "Guide"
    },
    {
      id: 6,
      title: "Understanding Concrete Durability in Harsh Climates",
      excerpt: "Strategies for protecting concrete structures from chloride attack and carbonation in the Gulf's aggressive environment.",
      image: "/images/mock ups paper.png", // Placeholder
      date: "December 18, 2024",
      author: "Research Lab",
      readTime: "10 min read",
      category: "Research"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              Insights & Updates
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Latest from <span className="text-[#ee2039]">The Lab</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover the latest industry trends, technical insights, and company news from the experts at Al Faiha Group.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#ee2039] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                      {post.category}
                    </span>
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#ee2039]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#ee2039]" />
                        <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#ee2039] transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <User size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{post.author}</span>
                     </div>
                     
                     <span className="text-[#ee2039] font-bold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                     </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Link */}
          <div className="text-center mt-16">
             <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all">
                Load More Articles
             </button>
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-[#ee2039] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated with Al Faiha</h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                  Subscribe to our newsletter to receive the latest technical insights, company news, and industry updates directly to your inbox.
              </p>
              
              <form className="max-w-md mx-auto flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                  />
                  <button className="bg-white text-[#ee2039] font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                      Subscribe
                  </button>
              </form>
          </div>
      </section>
    </div>
  );
};

export default Blog;
