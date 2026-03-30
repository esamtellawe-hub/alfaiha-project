import React, { useState } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Send,
  CheckCircle2
} from "lucide-react";
import useSiteSettings from "../hooks/useSiteSettings";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { language: lang } = useLanguage();

  const { settings, footerSections, footerLinks, footerCategories, regionalOffices } = useSiteSettings();

  // Helper: get text from footer_sections by key and language
  const getText = (key, defaultText = "") => {
    const section = footerSections[key];
    if (!section) return defaultText;
    return section[`content_${lang}`] || section.content_en || defaultText;
  };

  // Form States
  const [inquiryData, setInquiryData] = useState({ name: "", sector: "" });
  const [inquiryStatus, setInquiryStatus] = useState("idle");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");

  const handleInquiryChange = (e) =>
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryStatus("loading");
    try {
      await api.post("/system/inquiry", inquiryData);
      setInquiryStatus("success");
      setInquiryData({ name: "", sector: "" });
      setTimeout(() => setInquiryStatus("idle"), 3000);
    } catch {
      setInquiryStatus("idle");
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      await api.post("/system/newsletter", { email: newsletterEmail });
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    } catch {
      setNewsletterStatus("idle");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-12 pb-6 border-t border-gray-900 font-sans">
      <div className="container mx-auto px-4">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <a
                href="/"
                className="inline-block transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={settings.site_logo || "/images/Al Faiha-Logo-EN-WT-landscape.png"}
                  alt="Logo"
                  /* التعديل هنا: إضافة -mt-2 لرفع الصورة للأعلى */
                  className="h-20 md:h-24 lg:h-28 w-auto object-contain object-left -mt-2 md:-mt-3 lg:-mt-4"
                />
              </a>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {getText("footer_desc", "Your trusted partner for advanced construction chemicals and engineering solutions across the MENA region since 1987.")}
            </p>

            <div className="flex gap-4 pt-4">
              {settings.linkedin_url && <SocialIcon icon={<Linkedin size={18} />} href={settings.linkedin_url} />}
              {settings.facebook_url && <SocialIcon icon={<Facebook size={18} />} href={settings.facebook_url} />}
              {settings.instagram_url && <SocialIcon icon={<Instagram size={18} />} href={settings.instagram_url} />}
              {settings.twitter_url && <SocialIcon icon={<Twitter size={18} />} href={settings.twitter_url} />}
            </div>
          </div>

          {/* Column 2: Media & Careers */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#ee2039] pl-3">
              {getText("footer_media_col", "Media & Careers")}
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {footerLinks["media"]?.map((link, index) => (
                <React.Fragment key={link.id}>
                  {/* Insert a separator if ordered after index 2 (like Job descriptions) */}
                  {index === 3 && <li className="pt-2 border-t border-gray-800"></li>}
                  <FooterLink href={link.url}>
                    {link[`label_${lang}`] || link.label_en}
                  </FooterLink>
                </React.Fragment>
              ))}
              
              {!footerLinks["media"]?.length && (
                <>
                  <FooterLink href="/news">News & Press Releases</FooterLink>
                  <FooterLink href="/blog">Our Blogs</FooterLink>
                  <FooterLink href="/about">Company Profile</FooterLink>
                  <li className="pt-2 border-t border-gray-800"></li>
                  <FooterLink href="/careers">Job Descriptions</FooterLink>
                  <FooterLink href="/application-form">Application Form</FooterLink>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Our Offices */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#ee2039] pl-3">
              {getText("footer_offices_col", "Our Offices")}
            </h3>
            <div className="space-y-6 text-sm text-gray-400">
              {regionalOffices.length > 0 ? regionalOffices.slice(0, 3).map((office) => (
                <OfficeItem
                  key={office.id}
                  country={office[`country_name_${lang}`] || office.country_name_en}
                  location={office[`address_${lang}`] || office.address_en || office.email} // Fallback to email if address missing
                  phone={office.phone}
                />
              )) : (
                <>
                  <OfficeItem
                    country="Jordan"
                    location="Amman, Industrial Area"
                    phone="+962 6 123 4567"
                  />
                  <OfficeItem
                    country="Saudi Arabia"
                    location="Riyadh, Business District"
                    phone="+966 11 123 4567"
                  />
                  <OfficeItem
                    country="Iraq"
                    location="Baghdad, Al-Jadriyah"
                    phone="+964 77 123 4567"
                  />
                </>
              )}

              {/* Collapsible or Link for more */}
              <a
                href="/contact"
                className="flex items-center gap-2 text-[#ee2039] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider mt-4"
              >
                {getText("footer_view_all", "View All Locations")} <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-white">
              {getText("footer_inquiry_title", "Quick Inquiry")}
            </h3>
            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={inquiryData.name}
                onChange={handleInquiryChange}
                placeholder={getText("footer_name_placeholder", "Your Name")}
                className="w-full bg-black/50 border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ee2039] transition-colors"
                required
              />
              <select 
                name="sector"
                value={inquiryData.sector}
                onChange={handleInquiryChange}
                className="w-full bg-black/50 border border-gray-700 rounded px-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-[#ee2039] transition-colors appearance-none cursor-pointer"
                required
              >
                <option value="">{getText("footer_sector_placeholder", "Select Solution / Sector")}</option>
                {footerCategories.length > 0 ? footerCategories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat[`name_${lang}`] || cat.name_en}
                  </option>
                )) : (
                  <>
                    <option value="concrete">Concrete Solutions</option>
                    <option value="waterproofing">Waterproofing Systems</option>
                    <option value="flooring">Industrial Flooring</option>
                    <option value="consultancy">Technical Consultancy</option>
                  </>
                )}
              </select>
              <button
                type="submit"
                disabled={inquiryStatus !== "idle"}
                className="w-full bg-[#ee2039] hover:bg-[#c41229] text-white font-bold py-2 rounded text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-gray-600"
              >
                {inquiryStatus === "success" ? (
                  <><CheckCircle2 size={14} /> Sent!</>
                ) : inquiryStatus === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                ) : (
                  <>{getText("footer_send_btn", "Send Inquiry")} <Send size={14} /></>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">
                {getText("footer_newsletter_title", "Subscribe to Newsletter")}
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={getText("footer_newsletter_placeholder", "Email Address")}
                  className="w-full bg-transparent border-b border-gray-600 text-sm text-white py-1 focus:outline-none focus:border-[#ee2039] transition-colors"
                  required
                />
                <button 
                  type="submit" 
                  disabled={newsletterStatus !== "idle"}
                  className="text-[#ee2039] hover:text-white transition-colors disabled:text-gray-600"
                >
                  {newsletterStatus === "success" ? <CheckCircle2 size={18} /> : 
                   newsletterStatus === "loading" ? <div className="w-4 h-4 border-2 border-[#ee2039] rounded-full border-t-transparent animate-spin" /> : 
                   <ArrowRight size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-4 mt-6 text-center text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} {getText("footer_copyright", "Al Faiha Group. All rights reserved.")} Powered by{" "}
            <a
              href="https://qtechnetworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ee2039] text-[#ee2039] font-bold"
            >
              QTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterLink = ({ href, children, highlight }) => (
  <li>
    <a
      href={href}
      className={`block transition-all duration-300 hover:translate-x-2 flex items-center gap-2 ${highlight ? "text-white font-semibold hover:text-[#ee2039]" : "hover:text-[#ee2039]"}`}
    >
      {highlight && <ChevronRightIcon />}
      {children}
    </a>
  </li>
);

const OfficeItem = ({ country, location, phone }) => (
  <div className="group">
    <h4 className="text-white font-medium flex items-center gap-2 group-hover:text-[#ee2039] transition-colors">
      <MapPin size={14} className="text-[#ee2039]" /> {country}
    </h4>
    <p className="pl-6 mt-1 text-gray-500">{location}</p>
    <p className="pl-6 text-xs text-gray-600 mt-0.5" dir="ltr">{phone}</p>
  </div>
);

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-[#ee2039] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
  >
    {icon}
  </a>
);

const ChevronRightIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default Footer;
