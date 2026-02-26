import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import useBlogs from '../hooks/useBlogs';

const Blog = () => {
  const { posts, loading } = useBlogs();
  const [filter, setFilter] = useState('all');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter(p => (p.category_en || '').toLowerCase() === filter);

  // Collect unique categories from posts
  const categories = ['All', ...new Set(posts.map(p => p.category_en).filter(Boolean))];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse" />
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

          {/* Category Filters - dynamic from data */}
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat.toLowerCase())}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    filter === cat.toLowerCase()
                      ? 'bg-[#ee2039] text-white shadow-lg shadow-red-500/30'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Posts Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.length === 0 && (
                <p className="col-span-3 text-center text-gray-400 py-20">No posts found.</p>
              )}
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    {post.category_en && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#ee2039] text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                          {post.category_en}
                        </span>
                      </div>
                    )}
                    <img
                      src={post.image_url || '/images/mock ups paper.png'}
                      alt={post.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#ee2039]" />
                        <span>{formatDate(post.publish_date)}</span>
                      </div>
                      {post.read_time && (
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#ee2039]" />
                          <span>{post.read_time}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#ee2039] transition-colors leading-tight line-clamp-2">
                      {post.title_en}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt_en}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <User size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{post.author}</span>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="text-[#ee2039] font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#ee2039] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated with Al Faiha</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Subscribe to our newsletter to receive the latest technical insights, company news, and industry updates directly to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all"
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
