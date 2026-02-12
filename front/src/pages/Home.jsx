import useHomeData from "../hooks/useHomeData";
import { useState, useEffect, useRef } from "react";
import { ArrowRight,ChevronRight,GraduationCap , Award, Globe, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";


// --- Helper Components ---

const Counter = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <>{count}</>;
};

const EngineeringConfidence = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const coreValues = data?.extra_data?.core_values_en || [
    "Always Exceed Expectations",
    "Delivering Our Promises",
    "Be Your Own Customer",
    "Continuous Improvement",
    "Honesty",
    "Courage",
    "We Listen, We Care, We Serve",
  ];

  // هذا هو مسار الخط البياني
  const pathData =
    "M0,200 L180,200 L180,140 L210,140 L210,200 L240,200 L240,80 L280,80 L280,200 L310,200 L310,110 L350,110 L350,200 L380,200 L380,20 L420,20 L420,200 L450,200 L450,70 L490,70 L490,200 L520,200 L520,130 L560,130 L560,200 L590,200 L590,90 L630,90 L630,200 L800,200";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 },
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
      {/* خلفية الشبكة الهندسية */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* العناوين الرئيسية */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-tight md:leading-[1.1]">
            {data?.title_en || "Engineered Products."}
            <br />
            <span className="text-[#ee2039]">{data?.description_en || "Zero Compromise."}</span>
          </h2>
        </div>

        {/* سكشن الرسم الهندسي */}
        <div className="relative w-full max-w-3xl mx-auto h-32 md:h-48 flex items-end justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {/* الخط الأحمر المتحرك */}
            <path
              d={pathData}
              fill="none"
              stroke="#ee2039"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_8px_rgba(238,32,57,0.4)]"
              // pathLength="1" هي السر لجعل طول المسار يعامل كـ 1 وبالتالي يتزامن مع النسبة المئوية للمثلث
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={isVisible ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* المثلث المتحرك (Play Icon) الذي يتبع المسار */}
            <g
              style={{
                offsetPath: `path('${pathData}')`,
                offsetDistance: isVisible ? "100%" : "0%",
                transition: "offset-distance 5s cubic-bezier(0.4, 0, 0.2, 1)",
                offsetRotate: "0deg",
              }}
            >
              <polygon
                points="-6,-6 6,0 -6,6"
                fill="#ee2039"
                className={`drop-shadow-[0_0_10px_rgba(238,32,57,0.8)] transition-opacity duration-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                transform="translate(0, 0)"
              />
            </g>

            {/* الدوائر البيضاء عند الزوايا */}
            {[
              { x: 180, y: 140 },
              { x: 210, y: 140 },
              { x: 240, y: 80 },
              { x: 280, y: 80 },
              { x: 310, y: 110 },
              { x: 350, y: 110 },
              { x: 380, y: 20 },
              { x: 420, y: 20 },
              { x: 450, y: 70 },
              { x: 490, y: 70 },
              { x: 520, y: 130 },
              { x: 560, y: 130 },
              { x: 590, y: 90 },
              { x: 630, y: 90 },
            ].map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="2.5"
                fill="white"
                stroke="#ee2039"
                strokeWidth="1"
                className={`transition-opacity duration-500 delay-[2.5s] ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </svg>
        </div>

        {/* القيم الجوهرية */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-y-6 gap-x-8 md:gap-x-12 max-w-6xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {coreValues.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors duration-300 group cursor-default whitespace-nowrap"
            >
              <div
                className="w-2.5 h-2.5 bg-[#ee2039] group-hover:translate-x-1 transition-transform "
                style={{ clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }}
              ></div>
              <span className="font-bold tracking-wider uppercase text-[10px] sm:text-xs md:text-sm">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// Update Child Components to accept props
const StatsSection = ({ statsData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Map backend data to frontend structure
  // statsData is an object: { stat_experience: { extra_data: { value: 37 } }, ... }
  const stats = [
    {
      id: 1,
      value: statsData?.stat_experience?.extra_data?.value || 37,
      suffix: statsData?.stat_experience?.extra_data?.suffix || "+",
      label: statsData?.stat_experience?.title_en || "Years of Experience",
      sub: statsData?.stat_experience?.description_en || "Since 1987",
      icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 2,
      value: statsData?.stat_countries?.extra_data?.value || 12,
      suffix: statsData?.stat_countries?.extra_data?.suffix || "",
      label: statsData?.stat_countries?.title_en || "Countries",
      sub: statsData?.stat_countries?.description_en || "MENA Presence",
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 3,
      value: statsData?.stat_employees?.extra_data?.value || 150,
      suffix: statsData?.stat_employees?.extra_data?.suffix || "+",
      label: statsData?.stat_employees?.title_en || "Employees",
      sub: statsData?.stat_employees?.description_en || "Dedicated Professionals",
      icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
    {
      id: 4,
      value: statsData?.stat_projects?.extra_data?.value || 500,
      suffix: statsData?.stat_projects?.extra_data?.suffix || "M+",
      label: statsData?.stat_projects?.title_en || "Project Value",
      sub: statsData?.stat_projects?.description_en || "Delivered Excellence",
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#ee2039]" />,
    },
  ];

  useEffect(() => {
    // ... (Keep existing observer logic)
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
      className="py-20 bg-black text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10">
                {stat.icon}
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  <Counter end={stat.value} isVisible={isVisible} />
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#ee2039] ml-1">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-700">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showContent, setShowContent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(activeIndex);
    }, 400); 
    return () => clearTimeout(timer);
  }, [activeIndex]);

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

  // Use passed products or fallback
  const displayProducts = products && products.length > 0 ? products : [];

  if (displayProducts.length === 0) return null; // Don't render if no products

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gray-50 relative overflow-hidden"
    >
      <div
        className={`container mx-auto px-4 mb-10 text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
          Featured <span className="text-[#ee2039]">Products</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row h-[850px] md:h-[600px] w-full max-w-[1400px] mx-auto overflow-hidden gap-3 px-2 md:px-8">
        {displayProducts.map((product, index) => {
          const isActive = activeIndex === index;
          const isContentVisible = showContent === index;

          return (
            <div
              key={product.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-[flex] duration-1000 ease-out transform-gpu 
        ${
          isActive 
            ? "flex-[10] md:flex-[5] z-10 shadow-2xl bg-transparent"
            : "flex-[1] z-0 bg-[#ee2039]" 
        }`}
            >
              {isActive && (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                  style={{ backgroundImage: `url('${product.image_url || product.image}')` }}
                />
              )}
              {isActive && (
                <div className="absolute inset-0 bg-black/60 transition-opacity duration-500" />
              )}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              )}

              {!isActive && (
                <div className="absolute inset-0 flex items-center  justify-center">
                  <h3 className="text-white font-bold uppercase tracking-widest text-lg md:rotate-[-90deg] whitespace-nowrap opacity-100">
                    {product.category?.name_en || product.category}
                  </h3>
                </div>
              )}

              {isActive && (
                <div
                  className={`absolute inset-0 p-6 md:p-12 flex flex-col justify-start pt-16 z-20 transition-all duration-500 ${
                    isContentVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="w-full max-w-[90%] md:max-w-[420px]">
                    <div className="inline-block py-1 px-2 rounded bg-[#ee2039] text-white text-[9px] md:text-[10px] font-bold uppercase mb-3 tracking-wider">
                      {product.category?.name_en || product.category}
                    </div>
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-[1.1] break-words drop-shadow-xl">
                      {product.name_en || product.name}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-sm lg:text-base mb-6 leading-relaxed opacity-90 line-clamp-3">
                      {product.description_en || product.description}
                    </p>
                    <Link to={`/products/${product.slug}` || product.link} className="inline-flex items-center gap-2 text-white text-xs md:text-sm font-bold group/btn cursor-pointer">
                      <span className="border-b-2 border-[#ee2039] pb-0.5 transition-all">
                        View Details
                      </span>
                      <div className="bg-[#ee2039] p-1 rounded-full text-white transition-transform group-hover:translate-x-1">
                        <ChevronRight size={14} />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Certifications = ({ certs }) => {
  const displayCerts = certs || [];
  
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
        <p className="text-gray-400 text-sm md:text-base">
          Certified quality, trusted partnerships, and global standards.
        </p>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {[...displayCerts, ...displayCerts].map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] px-6 py-4 mx-2 group cursor-default transition-all duration-300"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-hover:border-gray-200 overflow-hidden p-4`}
              >
                <img
                  src={cert.image_url || cert.image} 
                  alt={cert.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
              <h4 className="font-bold text-slate-700 text-sm md:text-base group-hover:text-black transition-colors">
                {cert.name}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold group-hover:text-[#ee2039] transition-colors mt-2 text-center">
                {cert.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeCTA = ({ sections }) => {
  const academy = sections?.cta_academy;
  const partners = sections?.cta_partners;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Academy CTA */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                  style={{ backgroundImage: `url('${academy?.image_url || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"}')` }}></div>
            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-300"></div>
            <a href={academy?.link_url || "/academy"}>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-blue-400/30">
                  <GraduationCap className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  {academy?.title_en || "AFG Academy"}
                </h3>
                <p className="text-gray-200 leading-relaxed max-w-md text-sm md:text-base">
                  {academy?.description_en || "Empowering the next generation..."}
                </p>
              </div>
              <p
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group-hover:text-blue-400 text-sm md:text-base"
              >
                {academy?.btn_text_en || "Join the Program"}{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </p>
            </div>
            </a>
          </div>
          
          {/* Partners CTA */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                 style={{ backgroundImage: `url('${partners?.image_url || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"}')` }}></div>
            
            <div className="absolute inset-0 bg-[#ee2039]/60 group-hover:bg-[#ee2039]/50 transition-colors duration-300"></div>
            <a href={partners?.link_url || "/partners"}>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/30">
                  <Users className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  {partners?.title_en || "Become a Partner"}
                </h3>
                <p className="text-white/90 leading-relaxed max-w-md text-sm md:text-base">
                  {partners?.description_en || "Join our growing network..."}
                </p>
              </div>
              <p
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all text-sm md:text-base"
              >
                {partners?.btn_text_en || "Apply for Partnership"}{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </p>
            </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. Main Home Page Component ---
const Home = () => {
  const { hero, sections, certifications, featuredProducts, loading } = useHomeData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (hero.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === hero.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hero.length]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>; // Simplistic loader
  }

  // Fallback if hero is empty to prevent crash
  if (!hero || hero.length === 0) return null; 

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-110px)] flex items-center mt-[110px] overflow-hidden bg-black">
        {/* Background Images */}
        {hero.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${slide.image_url}')`,
                opacity: 0.6,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60"></div>
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div
              key={currentSlide}
              className="animate-[fadeInUp_0.8s_ease-out] flex flex-col items-center"
            >
              {/* Badge/Subtitle */}
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#ee2039]/20 text-white border border-[#ee2039]/30 text-[10px] xs:text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#ee2039] animate-pulse"></span>
                {hero[currentSlide].subtitle_en}
              </div>

              {/* Main Title */}
              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.2]">
                <span className="whitespace-nowrap sm:whitespace-normal block sm:inline">
                  {hero[currentSlide].title_en}
                </span>

                <span className="block text-[#ee2039]">
                  {/* Assuming extra_data contains highlight word for now as per seeder */}
                  {hero[currentSlide].extra_data?.highlight_en || "Excellence"}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                {hero[currentSlide].description_en}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
                <Link
                  to={hero[currentSlide].btn_1_link || "/solutions"}
                  className="w-full sm:w-auto px-10 py-4 bg-[#ee2039] hover:bg-[#c41229] text-white rounded-md font-bold text-base transition-all duration-300 shadow-lg shadow-[#ee2039]/20 text-center active:scale-95"
                >
                  {hero[currentSlide].btn_1_text_en}
                </Link>

                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md font-bold text-base backdrop-blur-md transition-all duration-300 text-center active:scale-95"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {hero.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-[#ee2039] w-10"
                  : "bg-white/30 hover:bg-white/60 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <EngineeringConfidence data={sections?.engineering_confidence} />

      <StatsSection statsData={sections} />

      <FeaturedProducts products={featuredProducts} />

      <HomeCTA sections={sections} />

      <Certifications certs={certifications} />
    </div>
  );
};

export default Home;
