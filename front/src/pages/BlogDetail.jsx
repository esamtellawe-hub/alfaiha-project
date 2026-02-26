import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, User, Clock, Share2 } from 'lucide-react';
import api from '../api/axios';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/content/blogs/${slug}`)
      .then(r => setPost(r.data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h2>
        <Link to="/blog" className="text-[#ee2039] font-bold hover:underline">← Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.1]" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors font-medium">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          {post.category_en && (
            <span className="inline-block px-3 py-1 bg-[#ee2039]/20 text-[#ee2039] border border-[#ee2039]/30 text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
              {post.category_en}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title_en}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#ee2039]" />
              {formatDate(post.publish_date)}
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#ee2039]" />
                {post.author}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#ee2039]" />
                {post.read_time}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Featured Image */}
          {post.image_url && (
            <div className="rounded-2xl overflow-hidden mb-10 shadow-xl">
              <img src={post.image_url} alt={post.title_en} className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}

          {/* Blog Body */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            {post.excerpt_en && (
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100 italic">
                {post.excerpt_en}
              </p>
            )}
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {post.content_en}
              </p>
            </div>

            {/* Share / Back */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#ee2039] transition-colors">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Share:</span>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Share2 size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
