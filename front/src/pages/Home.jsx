import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Users,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  Factory,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

// --- Helper Component: Number Counter (للعداد الرقمي) ---
const Counter = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!isVisible) return;
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4); // Ease Out Quart

      setCount(Math.floor(end * ease));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    if (isVisible) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      setCount(0);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span>{count}</span>;
};

// --- 1. EngineeringConfidence Component (خط النبض) ---
const EngineeringConfidence = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-white overflow-hidden flex flex-col items-center justify-center text-center font-sans z-20 border-b border-gray-100"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div
          className={`mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-tight md:leading-[1.1]">
            Engineered Products.
            <br />
            <span className="text-[#ee2039]">Zero Compromise.</span>
          </h2>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-6 md:gap-16 mb-16 md:mb-20 text-gray-500 font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs sm:text-sm md:text-base transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {["Precision", "Durability", "Reliability"].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 hover:text-black transition-colors duration-300 group cursor-default"
            >
              <span className="w-1.5 h-1.5 bg-[#ee2039] group-hover:scale-150 transition-transform rotate-45"></span>{" "}
              {item}
            </span>
          ))}
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-auto py-8 md:h-32 flex flex-col items-center justify-center">
          <div className="relative w-full h-px bg-gray-200 transition-colors duration-500 flex justify-between items-center">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-px h-2 bg-gray-300 ${i % 2 !== 0 ? "hidden md:block" : ""}`}
                style={{ opacity: i % 5 === 0 ? 1 : 0.4 }}
              ></div>
            ))}
            <div
              className={`absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center transition-opacity duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <svg
                width="100%"
                height="80"
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
                className="overflow-visible h-16 md:h-24"
              >
                <path
                  d="M0,50 L350,50 L350,20 L390,20 L390,80 L430,80 L430,50 L800,50"
                  fill="none"
                  stroke="#ee2039"
                  strokeWidth="2"
                  className="animate-draw-line drop-shadow-[0_0_4px_rgba(238,32,57,0.6)]"
                  strokeDasharray="1000"
                  strokeDashoffset={isVisible ? "0" : "1000"}
                  style={{
                    transition:
                      "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 transition-all duration-1000 delay-1000 ${isVisible ? "bg-[#ee2039] w-3 h-3 rotate-180 shadow-[0_0_15px_rgba(238,32,57,0.8)]" : ""}`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[#ee2039]/0 transition-all duration-1000 delay-1000 ${isVisible ? "scale-100 border-[#ee2039]/50" : "scale-150 border-[#ee2039]/0"}`}
            ></div>
          </div>

          <div
            className={`flex flex-col sm:flex-row justify-between items-center w-full max-w-2xl mt-16 md:mt-8 gap-6 sm:gap-0 transition-all duration-1000 delay-[1200ms] transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="text-center">
              <p className="text-[#ee2039] font-bold text-base md:text-lg">
                Since 1987
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">
                Proven Legacy
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-bold text-base md:text-lg">
                European Tech
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">
                ECA Partner
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-bold text-base md:text-lg">
                MENA Region
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">
                Local Experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 2. Stats Section (إحصائيات مع عداد) ---
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 1,
      value: 37,
      suffix: "+",
      label: "Years of Experience",
      sub: "Since 1987",
      icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 2,
      value: 6,
      suffix: "",
      label: "Countries",
      sub: "MENA Presence",
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 3,
      value: 500,
      suffix: "+",
      label: "Employees",
      sub: "Dedicated Professionals",
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 4,
      value: 100,
      suffix: "M+",
      label: "Project Value",
      sub: "Delivered Excellence",
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee2039]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ee2039]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                {stat.icon}
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  <Counter end={stat.value} isVisible={isVisible} />
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#ee2039] ml-1">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-200 uppercase tracking-wider mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. Featured Products (سلايدر المنتجات - المتجاوب) ---
const FeaturedProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: "Euniflow Admixtures",
      category: "Concrete Solutions",
      image: "/images/product1.png",
      description:
        "High-performance superplasticizers for superior flow and strength.",
      link: "#product-1",
    },
    {
      id: 2,
      name: "TopSeal Waterproofing",
      category: "Protection Systems",
      image: "/images/product2.png",
      description:
        "Advanced crystalline technology for permanent water sealing.",
      link: "#product-2",
    },
    {
      id: 3,
      name: "Epoxy Grouting",
      category: "Industrial Flooring",
      image: "/images/product3.png",
      description:
        "Heavy-duty chemical resistant grouts for industrial applications.",
      link: "#product-3",
    },
    {
      id: 4,
      name: "Repair Mortars",
      category: "Restoration",
      image: "/images/product4.png",
      description: "Structural grade repair systems for aging infrastructure.",
      link: "#product-4",
    },
    {
      id: 5,
      name: "Protective Coatings",
      category: "Surface Treatment",
      image: "/images/product5.png",
      description: "Long-lasting protection against corrosion and weathering.",
      link: "#product-5",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gray-50 relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-[0.03]" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div
        className={`container mx-auto px-4 mb-10 text-center transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
          Featured <span className="text-[#ee2039]">Products</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Explore our range of high-performance engineered solutions, trusted
          across the MENA region.
        </p>
      </div>

      <div className="flex flex-col md:flex-row h-[850px] md:h-[600px] w-full max-w-[1400px] mx-auto overflow-hidden gap-2 px-2 md:px-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            // Removed delays for snappy feel
            className={`
              relative rounded-3xl overflow-hidden cursor-pointer 
              transition-all duration-500 ease-out will-change-[flex] transform-gpu group 
              ${isVisible ? "translate-y-0 opacity-70" : "translate-y-20 opacity-0"} 
              ${
                activeIndex === index
                  ? "flex-[10] md:flex-[4] !opacity-100 shadow-2xl scale-100 z-10" // Flex-10 for mobile expanding
                  : "flex-[1] hover:!opacity-90 grayscale-[30%] hover:grayscale-0 z-0"
              }
            `}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${product.image}')` }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${activeIndex === index ? "opacity-80" : "opacity-60"}`}
            ></div>

            {/* Collapsed Text */}
            <div
              className={`absolute transition-all duration-300 z-20 bottom-auto top-1/2 -translate-y-1/2 left-6 rotate-0 md:top-auto md:bottom-8 md:left-8 md:translate-y-0 md:origin-bottom-left md:-rotate-90 ${activeIndex === index ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"}`}
            >
              <h3 className="text-lg md:text-xl font-bold text-white whitespace-nowrap tracking-wider uppercase drop-shadow-md">
                {product.category}
              </h3>
            </div>

            {/* Expanded Content with Min-Width Wrapper */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col justify-end transition-all duration-500 ease-out transform-gpu z-20 overflow-hidden ${activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            >
              <div className="min-w-[250px] md:min-w-[400px]">
                <div className="inline-block py-1 px-3 rounded-full bg-[#ee2039] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4 w-fit">
                  {product.category}
                </div>
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 max-w-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>
                <a
                  href={product.link}
                  className="inline-flex items-center gap-3 text-white font-bold group/btn w-fit hover:text-[#ee2039] transition-colors text-sm md:text-base"
                >
                  <span className="border-b-2 border-white/30 pb-1 group-hover/btn:border-[#ee2039] transition-all">
                    View Details
                  </span>
                  <div className="bg-white/10 p-2 rounded-full group-hover/btn:bg-[#ee2039] transition-all">
                    <ChevronRight size={16} md:size={20} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 4. Certifications & Partners Slider (الشهادات والشركاء) ---
const Certifications = () => {
  const certs = [
    {
      name: "ECA",
      type: "Licensee Manufacturer",
      image: "/images/ECA.png",
      color: "text-blue-600",
    },
    {
      name: "ISO 9001:2015",
      type: "Quality Management",
      image: "/images/Logo-ISO9001.png",
      color: "text-green-600",
    },
    {
      name: "ISO 14001:2015",
      type: "Environment System",
      image: "/images/LOGO+-+ISO+14001-2015+500px.webp",
      color: "text-green-600",
    },
    {
      name: "JEA",
      type: "Jordan Engineers Assoc.",
      image: "/images/JEA.jpg",
      color: "text-slate-800",
    },
    {
      name: "ASTM",
      type: "Product Compliance",
      image: "/images/astm1.png",
      color: "text-blue-800",
    },
    {
      name: "GCP Applied Tech",
      type: "Historical Partner",
      image: "/images/WOC_GCP.jpg",
      color: "text-red-700",
    },
    {
      name: "JCCA",
      type: "Contractors Assoc.",
      image: "/images/JCCA.png",
      color: "text-slate-800",
    },
    {
      name: "BS Standards",
      type: "British Standards",
      image: "/images/british-standards-institute.jpg",
      color: "text-blue-800",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 mb-10 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 uppercase tracking-widest mb-2">
          Accredited Excellence
        </h3>
        <p className="text-gray-500 text-sm md:text-base">
          Certified quality, trusted partnerships, and global standards.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {[...certs, ...certs].map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] px-6 py-4 mx-2 group cursor-default transition-all duration-300"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-hover:border-gray-200 overflow-hidden p-4`}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
              <h4 className="font-bold text-slate-700 text-sm md:text-base group-hover:text-black transition-colors">
                {cert.name}
              </h4>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium group-hover:text-[#ee2039] transition-colors mt-1">
                {cert.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 5. HomeCTA (بطاقات التواصل) ---
const HomeCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-300"></div>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-blue-400/30">
                  <GraduationCap className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  AFG Academy
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-md text-sm md:text-base">
                  Empowering the next generation of engineers with hands-on
                  training, technical workshops, and certification programs.
                </p>
              </div>
              <a
                href="#academy"
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group-hover:text-blue-400 text-sm md:text-base"
              >
                Join the Program{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-[#ee2039]/90 group-hover:bg-[#ee2039]/80 transition-colors duration-300"></div>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/30">
                  <Users className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  Become a Partner
                </h3>
                <p className="text-white/90 leading-relaxed max-w-md text-sm md:text-base">
                  Join our growing network of distributors and applicators
                  across the MENA region. Let's build success together.
                </p>
              </div>
              <a
                href="#partner"
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all text-sm md:text-base"
              >
                Apply for Partnership{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. Main Home Page Component ---
const Home = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      subtitle: "Engineering Excellence Since 1987",
      title: "Building the Future with",
      highlight: "Confidence",
      description:
        "Your trusted partner for advanced construction chemicals and engineering solutions tailored for the MENA region.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      subtitle: "Technical Support & Consultancy",
      title: "Expertise You Can",
      highlight: "Rely On",
      description:
        "From on-site inspections to tailored formulations, our engineers deliver solutions that solve your toughest challenges.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      subtitle: "Advanced Chemical Formulations",
      title: "Innovation in Every",
      highlight: "Drop",
      description:
        "Sole licensed manufacturer of European Concrete Additives (ECA), bringing world-class technology to local markets.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full h-[100dvh] md:h-screen overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          <div className="max-w-4xl w-full text-center mt-10 md:mt-0 pb-16 md:pb-0">
            <div
              key={currentSlide}
              className="animate-[fadeInUp_0.8s_ease-out]"
            >
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#ee2039]/20 text-[#ee2039] border border-[#ee2039]/30 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
                {slides[currentSlide].subtitle}
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
                {slides[currentSlide].title} <br />
                <span className="text-[#ee2039]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0">
                <a
                  href="#products"
                  className="w-full sm:w-auto px-8 py-3 md:py-4 bg-[#ee2039] hover:bg-[#c41229] text-white rounded font-bold text-base md:text-lg transition-all duration-300 shadow-lg shadow-red-900/30 text-center"
                >
                  Explore Solutions
                </a>
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded font-bold text-base md:text-lg backdrop-blur-md transition-all duration-300 text-center"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[#ee2039] w-6 md:w-8" : "bg-white/40 hover:bg-white w-2"}`}
            />
          ))}
        </div>
      </section>

      <EngineeringConfidence />
      <StatsSection />
      <FeaturedProducts />
      <HomeCTA />
      <Certifications />
    </div>
  );
};

export default Home;
