import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countryList from "react-select-country-list";
import CountrySelect from "./CountrySelect";

const ServiceRequestModal = ({ isOpen, onClose, sectorTitle }) => {
  if (!isOpen) return null;

  const [locationCode, setLocationCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const validateForm = (formData) => {
    let newErrors = {};

    if (!formData.get("firstName"))
      newErrors.firstName = "First name is required";
    if (!formData.get("lastName")) newErrors.lastName = "Last name is required";
    if (!formData.get("company"))
      newErrors.company = "Company name is required";
    if (!formData.get("email")) newErrors.email = "Email is required";

    // التحقق من الدولة
    if (!locationCode) newErrors.location = "Please select a country";

    // التحقق من الهاتف
    if (!phone || phone.length < 8) {
      newErrors.phone = "Valid phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!validateForm(formData)) {
      return;
    }

    const locationLabel = countryList().getLabel(locationCode);

    formData.append("location_country", locationLabel);
    formData.append("location_code", locationCode);
    formData.append("phone", `+${phone}`);

    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);

    alert("Request Sent Successfully!");

    setErrors({});
    setLocationCode(""); 
    setPhone(""); 
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black p-6 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold text-white">Request Service</h3>
            <p className="text-gray-400 text-sm mt-1">
              Regarding: <span className="text-[#ee2039]">{sectorTitle}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  First Name <span className="text-[#ee2039]">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#ee2039] focus:ring-[#ee2039]"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Last Name <span className="text-[#ee2039]">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-[#ee2039] focus:ring-[#ee2039]"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Company <span className="text-[#ee2039]">*</span>
              </label>
              <input
                name="company"
                type="text"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                  errors.company
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#ee2039] focus:ring-[#ee2039]"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs">{errors.company}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Country (Location) <span className="text-[#ee2039]">*</span>
                </label>

                {/* 2. حذف الـ div الخارجي وتمرير الخطأ مباشرة */}
                <CountrySelect
                  value={locationCode}
                  onChange={(code) => {
                    setLocationCode(code);
                    if (code) setErrors({ ...errors, location: null });
                  }}
                  error={errors.location} // تمرير الخطأ هنا
                />

                {errors.location && (
                  <p className="text-red-500 text-xs">{errors.location}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Phone Number <span className="text-[#ee2039]">*</span>
                </label>
                <div
                  className={`${
                    errors.phone ? "border border-red-500 rounded-xl" : ""
                  }`}
                >
                  <PhoneInput
                    country={"jo"}
                    value={phone}
                    onChange={(p) => {
                      setPhone(p);
                      if (p) setErrors({ ...errors, phone: null });
                    }}
                    enableSearch={true}
                    disableDropdown={false}
                    containerClass="!w-full"
                    inputClass="!w-full !h-[50px] !bg-gray-50 !border-gray-200 !rounded-xl !text-slate-700 !text-base focus:!border-[#ee2039] !pl-[48px]"
                    buttonClass="!bg-gray-50 !border-gray-200 !rounded-l-xl !border-r-0 hover:!bg-gray-100"
                    dropdownClass="!shadow-xl !rounded-xl !border-gray-100"
                    searchClass="!p-2 !bg-gray-50"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Email <span className="text-[#ee2039]">*</span>
              </label>
              <input
                name="email"
                type="email"
                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:border-[#ee2039] focus:ring-[#ee2039]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#ee2039] hover:bg-[#c41229] text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-lg hover:shadow-xl"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
