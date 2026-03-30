import { useLanguage } from "../context/LanguageContext";
import React, { useState } from "react";
import { useAcademy } from "../hooks/useAcademy";
import {
  GraduationCap,
  BookOpen,
  Hammer,
  FileText,
  Users,
  CheckCircle2,
  Award,
  Clock,
  Target,
  Send,
} from "lucide-react";

// Helper object to dynamically render Lucifer icons from strings in DB
const IconRenderer = ({ name, size = 24, className = "" }) => {
  const { language } = useLanguage();
  const icons = {
    Target: <Target size={size} className={className} />,
    Award: <Award size={size} className={className} />,
    CheckCircle2: <CheckCircle2 size={size} className={className} />,
    Clock: <Clock size={size} className={className} />,
    Users: <Users size={size} className={className} />,
    GraduationCap: <GraduationCap size={size} className={className} />
  };
  return icons[name] || <CheckCircle2 size={size} className={className} />;
};

const Academy = () => {
  const { language } = useLanguage();
  const { sections, loading, error } = useAcademy();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Error loading academy data</h2>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", company: "" });
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
              {sections?.hero?.subtitle_en || "Empowering the Next Generation"}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {sections?.hero?.title_en ? (
                sections.hero[`title_${language}`] || hero.title_en.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="text-[#ee2039]">{word}</span> : word + ' '}
                  </React.Fragment>
                ))
              ) : (
                <>AFG <span className="text-[#ee2039]">Academy</span></>
              )}
            </h1>

            <p className="text-gray-200 text-xl max-w-2xl mx-auto">
              {sections?.hero?.content_en || "At AFG, we believe in empowering the next generation..."}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            {sections?.intro?.content_en || "Designed for students, industry professionals..."}
          </p>
        </div>
      </section>

      {/* Training Sessions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <BookOpen size={12} />
              {sections?.training_sessions?.subtitle_en || "Expert-Led Training"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {sections?.training_sessions?.title_en || "Training Sessions"}
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              {sections?.training_sessions?.content_en || "Our expert-led training sessions are tailored to meet the needs..."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Topics Covered</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {(sections?.training_sessions?.extra_data?.topics || []).map((topic, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#ee2039] mt-1 shrink-0" size={20} />
                  <p className="text-gray-900">{topic.en}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-800 leading-relaxed">
                {sections?.training_sessions?.extra_data?.bottom_note_en || "Each session includes theoretical learning combined with case studies and interactive discussions."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Application Training */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Hammer size={12} />
              {sections?.product_application?.subtitle_en || "Hands-On Experience"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {sections?.product_application?.title_en || "Product Application Training"}
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              {sections?.product_application?.content_en || "Gain hands-on experience with our comprehensive..."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {(sections?.product_application?.extra_data?.features || []).map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#ee2039]/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center mb-4 text-white">
                  <IconRenderer name={item.icon} size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item[`title_${language}`] || item.title_en}</h4>
                <p className="text-gray-800 leading-relaxed">{item[`desc_${language}`] || item.desc_en}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
            <p className="leading-relaxed">
              {sections?.product_application?.extra_data?.bottom_note_en || (
                <span><strong>Ideal for:</strong> Applicators, contractors, and technical staff looking to improve on-site efficiency and product outcomes.</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Product Knowhow & Specifications */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <FileText size={12} />
              {sections?.product_knowhow?.subtitle_en || "Technical Education"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {sections?.product_knowhow?.title_en || "Product Knowhow & Specifications"}
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              {sections?.product_knowhow?.content_en || "Our technical education programs dive deep into product chemistry..."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h3>
            <div className="space-y-6">
              {(sections?.product_knowhow?.extra_data?.learnings || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-[#ee2039]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#ee2039] font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed pt-1">{item.en}</p>
                </div>  
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-br from-[#ee2039] to-[#c91830] rounded-2xl text-white">
              <p className="leading-relaxed">
                {sections?.product_knowhow?.extra_data?.bottom_note_en || (
                  <span><strong>Perfect for:</strong> Consultants, engineers, and procurement teams who need to align technical decision-making with project goals.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-op Programs / Internships */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <GraduationCap size={12} />
              {sections?.coop_programs?.subtitle_en || "Student Programs"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {sections?.coop_programs?.title_en || "Co-op Programs & Internships"}
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              {sections?.coop_programs?.content_en || "We offer structured co-op and internship programs designed for engineering students..."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {(sections?.coop_programs?.extra_data?.programs || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center shrink-0 text-white">
                    <IconRenderer name={item.icon} size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item[`title_${language}`] || item.title_en}</h4>
                    <p className="text-gray-800 text-sm leading-relaxed">{item[`desc_${language}`] || item.desc_en}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-800 leading-relaxed">
                {sections?.coop_programs?.extra_data?.bottom_note_en || (
                  <span><strong>Note:</strong> Programs are available seasonally and can be tailored in duration based on academic schedules.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Form */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Send size={12} />
              {sections?.apply_form?.subtitle_en || "Join Us"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {sections?.apply_form?.title_en || "Apply Now"}
            </h2>
            <p className="text-gray-200 text-lg">
              {sections?.apply_form?.content_en || "Sign up to join our academy programs and take the next step in your professional development."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  {sections?.apply_form?.extra_data?.form_labels?.name_en || "Full Name *"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ee2039] focus:ring-2 focus:ring-[#ee2039]/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
                  {sections?.apply_form?.extra_data?.form_labels?.phone_en || "Phone Number *"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ee2039] focus:ring-2 focus:ring-[#ee2039]/20 outline-none transition-all"
                  placeholder="+962 XX XXX XXXX"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  {sections?.apply_form?.extra_data?.form_labels?.email_en || "Email Address *"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ee2039] focus:ring-2 focus:ring-[#ee2039]/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                  {sections?.apply_form?.extra_data?.form_labels?.company_en || "Company / University *"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#ee2039] focus:ring-2 focus:ring-[#ee2039]/20 outline-none transition-all"
                  placeholder="Your Organization"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-[#ee2039] hover:bg-[#c91830] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={20} />
                  {sections?.apply_form?.extra_data?.form_labels?.success_en || "Application Submitted!"}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {sections?.apply_form?.extra_data?.form_labels?.submit_en || "Submit Application"}
                </>
              )}
            </button>

            {submitted && (
              <p className="text-center text-green-600 mt-4 font-medium">
                {sections?.apply_form?.extra_data?.form_labels?.success_en || "Thank you! We'll be in touch soon."}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Academy;
