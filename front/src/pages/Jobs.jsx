import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Users, Rocket, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Careers = () => {
  const [activeDepartment, setActiveDepartment] = useState('All');
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Senior Chemical Engineer",
      department: "R&D",
      location: "Amman, Jordan",
      type: "Full-time",
      description: "Lead the development of new concrete admixtures and oversee quality control processes in our main laboratory."
    },
    {
      id: 2,
      title: "Regional Sales Manager",
      department: "Sales",
      location: "Riyadh, KSA",
      type: "Full-time",
      description: "Drive business growth and manage key client relationships across the central region of Saudi Arabia."
    },
    {
      id: 3,
      title: "Technical Support Specialist",
      department: "Technical",
      location: "Baghdad, Iraq",
      type: "Full-time",
      description: "Provide on-site technical assistance and product application guidance to our construction partners."
    },
    {
      id: 4,
      title: "Logistics Coordinator",
      department: "Operations",
      location: "Amman, Jordan",
      type: "Full-time",
      description: "Manage supply chain operations and ensure timely delivery of products to our regional warehouses."
    }
  ];

  const departments = ['All', 'R&D', 'Sales', 'Technical', 'Operations'];

  const filteredJobs = activeDepartment === 'All' 
    ? jobs 
    : jobs.filter(job => job.department === activeDepartment);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Users size={12} className="text-[#ee2039]" />
              Join Our Team
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build Your <span className="text-[#ee2039]">Future</span> With Us
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join a team of innovators, engineers, and problem-solvers dedicated to shaping the future of construction in the MENA region.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Work at Al Faiha?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We offer more than just a job; we offer a career path filled with growth, challenges, and rewards.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation Driven</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Work with cutting-edge technologies and contribute to developing the next generation of construction solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Diverse Culture</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Join a multicultural team of professionals from across the region, fostering creativity and collaboration.</p>
            </div>
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#ee2039] mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Growth</h3>
              <p className="text-gray-500 leading-relaxed text-sm">We invest in our people through continuous training, mentorship programs, and clear career progression paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Open Positions</h2>
              <p className="text-gray-500">Find the role that fits your passion and expertise.</p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeDepartment === dept
                      ? 'bg-[#ee2039] text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 max-w-5xl mx-auto">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#ee2039]/20 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ee2039] transition-colors">{job.title}</h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{job.department}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 max-w-2xl">{job.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} /> {job.location}
                    </div>
                     <div className="flex items-center gap-1.5">
                      <Clock size={14} /> {job.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                  <button onClick={() => navigate('/careers/ApplicationForm')} className="flex-1 md:flex-initial whitespace-nowrap flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#ee2039] transition-colors">
                    Apply Now <ArrowRight size={16} />
                  </button>
                  <button className="md:hidden px-4 py-3 bg-gray-100 rounded-xl text-slate-700 hover:bg-gray-200 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-gray-50 py-10 rounded-2xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Don't see a suitable role?</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">We are always looking for talent. Send us your CV for future opportunities.</p>
            <a href="mailto:careers@alfaihagroup.com" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-[#ee2039] hover:text-[#ee2039] transition-all bg-white hover:bg-gray-50">
              Send General Application
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Careers;
