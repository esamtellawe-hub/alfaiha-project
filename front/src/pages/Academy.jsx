import React, { useState } from "react";
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

const Academy = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const [submitted, setSubmitted] = useState(false);

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
              Empowering the Next Generation
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              AFG <span className="text-[#ee2039]">Academy</span>
            </h1>

            <p className="text-gray-200 text-xl max-w-2xl mx-auto">
              At AFG, we believe in empowering the next generation of engineers, technicians, and construction professionals through high-quality hands-on training and education.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-lg text-gray-800 leading-relaxed text-center">
            Designed for students, industry professionals, clients, applicators, and partners, our academy provides a structured platform to enhance technical knowledge, field application skills, and real-world readiness in the construction chemicals industry.
          </p>
        </div>
      </section>

      {/* Training Sessions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039] border border-[#ee2039]/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <BookOpen size={12} />
              Expert-Led Training
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Training Sessions
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Our expert-led training sessions are tailored to meet the needs of professionals at all levels, from entry-level engineers to seasoned site supervisors.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Topics Covered</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Fundamentals of construction chemicals",
                "Industry standards and emerging technologies",
                "Health, safety, and environmental best practices",
                "Material compatibility and application conditions",
              ].map((topic, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#ee2039] mt-1 shrink-0" size={20} />
                  <p className="text-gray-900">{topic}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-800 leading-relaxed">
                Each session includes theoretical learning combined with case studies and interactive discussions.
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
              Hands-On Experience
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Product Application Training
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Gain hands-on experience with our comprehensive product range through guided practical sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Target />,
                title: "Application Techniques",
                desc: "Learn the correct application techniques for all products based on the scheduled training session",
              },
              {
                icon: <Award />,
                title: "Surface Preparation",
                desc: "Understand surface preparation requirements for optimal product performance",
              },
              {
                icon: <CheckCircle2 />,
                title: "On-Site Challenges",
                desc: "Address common on-site challenges with practical solutions and expert guidance",
              },
              {
                icon: <Clock />,
                title: "Live Demonstrations",
                desc: "Evaluate product performance through live demonstrations and real-world scenarios",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#ee2039]/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center mb-4 text-white">
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-gray-800 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
            <p className="leading-relaxed">
              <strong>Ideal for:</strong> Applicators, contractors, and technical staff looking to improve on-site efficiency and product outcomes.
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
              Technical Education
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Product Knowhow & Specifications
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Our technical education programs dive deep into product chemistry, performance characteristics, and specification requirements.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h3>
            <div className="space-y-6">
              {[
                "Understand product formulations and how they interact with concrete and other substrates",
                "Learn to read and interpret technical datasheets and application guides",
                "Explore case studies where correct specification prevented or resolved failures",
                "Receive support in preparing compliant submittals for major projects",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-[#ee2039]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#ee2039] font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-gray-900 leading-relaxed pt-1">{item}</p>
                </div>  
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-br from-[#ee2039] to-[#c91830] rounded-2xl text-white">
              <p className="leading-relaxed">
                <strong>Perfect for:</strong> Consultants, engineers, and procurement teams who need to align technical decision-making with project goals.
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
              Student Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Co-op Programs & Internships
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              We offer structured co-op and internship programs designed for engineering students to bridge the gap between academia and industry.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {[
                {
                  icon: <Users />,
                  title: "Department Rotations",
                  desc: "Experience across lab testing, R&D, factory production, technical services, and site applications",
                },
                {
                  icon: <Target />,
                  title: "Real Projects",
                  desc: "Exposure to real-life projects and troubleshooting scenarios",
                },
                {
                  icon: <Award />,
                  title: "Mentorship",
                  desc: "Learn from industry veterans with decades of experience",
                },
                {
                  icon: <GraduationCap />,
                  title: "Certification",
                  desc: "Receive official certification upon successful program completion",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ee2039] flex items-center justify-center shrink-0 text-white">
                    {React.cloneElement(item.icon, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-gray-800 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-800 leading-relaxed">
                <strong>Note:</strong> Programs are available seasonally and can be tailored in duration based on academic schedules.
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
              Join Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Apply Now
            </h2>
            <p className="text-gray-200 text-lg">
              Sign up to join our academy programs and take the next step in your professional development.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Full Name *
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
                  Phone Number *
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
                  Email Address *
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
                  Company / University *
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
                  Application Submitted!
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Application
                </>
              )}
            </button>

            {submitted && (
              <p className="text-center text-green-600 mt-4 font-medium">
                Thank you! We'll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Academy;
