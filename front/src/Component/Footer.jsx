import React from "react";
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
} from "lucide-react";

const Footer = () => {
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
                  src="/images/Al Faiha-Logo-EN-WT-landscape.png"
                  alt="Logo"
                  /* التعديل هنا: إضافة -mt-2 لرفع الصورة للأعلى */
                  className="h-20 md:h-24 lg:h-28 w-auto object-contain object-left -mt-2 md:-mt-3 lg:-mt-4"
                />
              </a>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for advanced construction chemicals and
              engineering solutions across the MENA region since 1987.
            </p>

            <div className="flex gap-4 pt-4">
              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://www.linkedin.com/company/alfaihaengineering/"
              />
              <SocialIcon
                icon={<Facebook size={18} />}
                href="https://www.facebook.com/alfaihajo/"
              />
              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://www.instagram.com/alfaihajo/"
              />
            </div>
          </div>

          {/* Column 2: Media & Careers */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#ee2039] pl-3">
              Media & Careers
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink href="#">News & Press Releases</FooterLink>
              <FooterLink href="#">Our Blogs</FooterLink>
              <FooterLink href="#">Company Profile</FooterLink>
              <li className="pt-2 border-t border-gray-800"></li>
              <FooterLink href="#" highlight>
                Join Our Team (Careers)
              </FooterLink>
              <FooterLink href="#">Job Descriptions</FooterLink>
              <FooterLink href="#">Application Form</FooterLink>
            </ul>
          </div>

          {/* Column 3: Our Offices */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-[#ee2039] pl-3">
              Our Offices
            </h3>
            <div className="space-y-6 text-sm text-gray-400">
              <OfficeItem
                country="Jordan (HQ)"
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

              {/* Collapsible or Link for more */}
              <a
                href="#"
                className="flex items-center gap-2 text-[#ee2039] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider mt-4"
              >
                View All Locations <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-white">Quick Inquiry</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black/50 border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ee2039] transition-colors"
              />
              <select className="w-full bg-black/50 border border-gray-700 rounded px-4 py-2 text-sm text-gray-400 focus:outline-none focus:border-[#ee2039] transition-colors appearance-none cursor-pointer">
                <option value="">Select Solution / Sector</option>
                <option value="concrete">Concrete Solutions</option>
                <option value="waterproofing">Waterproofing Systems</option>
                <option value="flooring">Industrial Flooring</option>
                <option value="consultancy">Technical Consultancy</option>
              </select>
              <button
                type="button"
                className="w-full bg-[#ee2039] hover:bg-[#c41229] text-white font-bold py-2 rounded text-sm transition-colors flex items-center justify-center gap-2"
              >
                Send Inquiry <Send size={14} />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-gray-600 text-sm text-white py-1 focus:outline-none focus:border-[#ee2039] transition-colors"
                />
                <button className="text-[#ee2039] hover:text-white transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-4 mt-6 text-center text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Al Faiha Group. All rights
            reserved. Powered by{" "}
            <a
              href="https://qtechnetworks.com/jo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ee2039]-400 text-[#ee2039] bold"
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
    <p className="pl-6 text-xs text-gray-600 mt-0.5">{phone}</p>
  </div>
);

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
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
