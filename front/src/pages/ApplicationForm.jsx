import React, { useState } from 'react';
import { Upload, Send, CheckCircle2, FileText, User, Briefcase } from 'lucide-react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useJobs from '../hooks/useJobs';
import api from '../api/axios';

const InputField = ({ label, required, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ee2039] transition-colors";

const ApplicationForm = () => {
  const { jobs } = useJobs();
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    location: '', linkedin_url: '', job_id: '',
    position_applied: '', experience_level: '0-2', cover_letter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const selectedJob = jobs.find(j => String(j.id) === String(form.job_id));
      await api.post('/system/apply', {
        ...form,
        phone,
        position_applied: selectedJob ? selectedJob.title_en : 'General Application',
        job_id: form.job_id || null
      });
      setStatus('success');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your interest in joining Al Faiha Group. Our recruitment team will review your application and contact you if your profile matches our requirements.
          </p>
          <button
            onClick={() => window.location.href = '/careers'}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#ee2039] transition-colors"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 border border-[#ee2039]/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-white">
              <Briefcase size={12} className="text-[#ee2039]" />
              Careers
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Job <span className="text-[#ee2039]">Application</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
              Take the first step towards a rewarding career. Fill out the form below to apply for a position.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="text-[#ee2039]" size={20} /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="First Name" required>
                    <input required name="first_name" value={form.first_name} onChange={handleChange} type="text" className={inputClass} placeholder="e.g. Ahmad" />
                  </InputField>
                  <InputField label="Last Name" required>
                    <input required name="last_name" value={form.last_name} onChange={handleChange} type="text" className={inputClass} placeholder="e.g. Al-Masri" />
                  </InputField>
                  <InputField label="Email Address" required>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" className={inputClass} placeholder="name@example.com" />
                  </InputField>
                  <InputField label="Phone Number" required>
                    <PhoneInput
                      country="jo"
                      value={phone}
                      onChange={setPhone}
                      inputClass="!w-full !px-4 !py-3 !bg-gray-50 !border-gray-200 !rounded-xl !h-[50px] !pl-[48px]"
                      buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-xl !border-r-0"
                      containerClass="!w-full"
                    />
                  </InputField>
                  <InputField label="Current Location" required>
                    <input required name="location" value={form.location} onChange={handleChange} type="text" className={inputClass} placeholder="City, Country" />
                  </InputField>
                  <InputField label="LinkedIn Profile">
                    <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} type="url" className={inputClass} placeholder="https://linkedin.com/in/..." />
                  </InputField>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Position & Experience */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase className="text-[#ee2039]" size={20} /> Position & Experience
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField label="Position Applied For" required>
                    <select
                      name="job_id"
                      value={form.job_id}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">General Application</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>{job.title_en}</option>
                      ))}
                    </select>
                  </InputField>
                  <InputField label="Years of Experience" required>
                    <select name="experience_level" value={form.experience_level} onChange={handleChange} className={inputClass}>
                      <option value="0-2">Entry Level (0-2 years)</option>
                      <option value="3-5">Mid Level (3-5 years)</option>
                      <option value="5-10">Senior Level (5-10 years)</option>
                      <option value="10+">Executive (10+ years)</option>
                    </select>
                  </InputField>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Documents */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText className="text-[#ee2039]" size={20} /> Documents
                </h3>
                <div className="space-y-6">
                  <InputField label="Upload CV / Resume" required>
                    <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#ee2039] hover:bg-red-50/10 transition-colors cursor-pointer group block">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#ee2039] group-hover:text-white transition-colors text-gray-400">
                        <Upload size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </label>
                  </InputField>
                  <InputField label="Cover Letter (Optional)">
                    <textarea
                      name="cover_letter"
                      value={form.cover_letter}
                      onChange={handleChange}
                      className={`${inputClass} h-32 resize-none`}
                      placeholder="Tell us why you would be a great fit for this role..."
                    />
                  </InputField>
                </div>
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#ee2039] hover:bg-[#c41229] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Application <Send size={18} /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationForm;
