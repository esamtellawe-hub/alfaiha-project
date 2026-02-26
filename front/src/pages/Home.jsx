import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Users,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";
import useHomeData from "../hooks/useHomeData";

// --- Helper Component: Number Counter ---
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
      const ease = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.round(end * ease);

      setCount(currentCount);

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

// --- Helper Component: Icon Renderer ---
const renderIcon = (iconName, className) => {
    switch (iconName) {
        case 'Award': return <Award className={className} />;
        case 'Globe': return <Globe className={className} />;
        case 'Users': return <Users className={className} />;
        case 'TrendingUp': return <TrendingUp className={className} />;
        case 'GraduationCap': return <GraduationCap className={className} />;
        default: return <Award className={className} />;
    }
};

const EngineeringConfidence = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const coreValues = data?.extra_data?.core_values_en || [];

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

  if (!data) return null;

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
          className={`mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-tight md:leading-[1.1]">
            {data.title_en}
            <br />
            <span className="text-[#ee2039]">{data.description_en}</span>
          </h2>
        </div>

        {/* Engineering path SVG */}
        <div className="relative w-full max-w-3xl mx-auto h-32 md:h-48 flex items-end justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            <path
              d={pathData}
              fill="none"
              stroke="#ee2039"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_8px_rgba(238,32,57,0.4)]"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={isVisible ? "0" : "1"}
              style={{
                transition: "stroke-dashoffset 5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
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
            {[
              { x: 180, y: 140 }, { x: 210, y: 140 }, { x: 240, y: 80 }, { x: 280, y: 80 },
              { x: 310, y: 110 }, { x: 350, y: 110 }, { x: 380, y: 20 }, { x: 420, y: 20 },
              { x: 450, y: 70 }, { x: 490, y: 70 }, { x: 520, y: 130 }, { x: 560, y: 130 },
              { x: 590, y: 90 }, { x: 630, y: 90 },
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

const StatsSection = ({ sections }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const statsKeys = ['stat_experience', 'stat_countries', 'stat_employees', 'stat_projects'];
  const stats = statsKeys.map(key => sections[key]).filter(Boolean);

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

  if (stats.length === 0) return null;

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
                {renderIcon(stat.icon_name, "w-6 h-6 md:w-8 md:h-8 text-[#ee2039]")}
              </div>
              <div className="flex items-baseline mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  <Counter end={stat.extra_data?.value || 0} isVisible={isVisible} />
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#ee2039] ml-1">
                  {stat.extra_data?.suffix || ''}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wider mb-1">
                {stat.title_en}
              </h3>
              <p className="text-xs text-gray-700">{stat.description_en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = ({ data }) => {
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

  if (!data) return null;
  const products = data.extra_data?.products_en || [];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gray-50 relative overflow-hidden"
    >
      <div
        className={`container mx-auto px-4 mb-10 text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
          {data.title_en} <span className="text-[#ee2039]">{data.description_en}</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row h-[850px] md:h-[600px] w-full max-w-[1400px] mx-auto overflow-hidden gap-3 px-2 md:px-8">
        {products.map((product, index) => {
          const isActive = activeIndex === index;
          const isContentVisible = showContent === index;

          return (
            <div
              key={index}
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
                  style={{ backgroundImage: `url('${product.image}')` }}
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
                    {product.category}
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
                      {product.category}
                    </div>
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-[1.1] break-words drop-shadow-xl">
                      {product.name}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-sm lg:text-base mb-6 leading-relaxed opacity-90 line-clamp-3">
                      {product.description}
                    </p>
                    <Link to={product.link} className="inline-flex items-center gap-2 text-white text-xs md:text-sm font-bold group/btn cursor-pointer">
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

// --- 4. Certifications ---
const Certifications = ({ certs }) => {
  if (!certs || certs.length === 0) return null;

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
          {[...certs, ...certs].map((cert, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] px-6 py-4 mx-2 group cursor-default transition-all duration-300"
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-xl border border-gray-100 group-hover:border-gray-200 overflow-hidden p-4`}
              >
                <img
                  src={cert.image_url}
                  alt={cert.name}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
              </div>
              <h4 className="font-bold text-slate-700 text-sm md:text-base group-hover:text-black transition-colors">
                {cert.name}
              </h4>
              <p className="text-xs text-gray-300 uppercase tracking-wider font-medium group-hover:text-[#ee2039] transition-colors mt-1">
                {cert.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 5. HomeCTA ---
const HomeCTA = ({ sections }) => {
  const cta1 = sections['cta_academy'];
  const cta2 = sections['cta_partners'];

  if (!cta1 || !cta2) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                style={{ backgroundImage: `url('${cta1.image_url}')` }}
            ></div>
            <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/70 transition-colors duration-300"></div>
            <Link to={cta1.link_url}>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-blue-400/30">
                  {renderIcon(cta1.icon_name, "text-blue-400 w-5 h-5 md:w-6 md:h-6")}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  {cta1.title_en}
                </h3>
                <p className="text-gray-200 leading-relaxed max-w-md text-sm md:text-base">
                  {cta1.description_en}
                </p>
              </div>
              <p
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group-hover:text-blue-400 text-sm md:text-base"
              >
                {cta1.btn_text_en}{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </p>
            </div>
            </Link>
          </div>
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group cursor-pointer transform-gpu">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-105"
                style={{ backgroundImage: `url('${cta2.image_url}')` }}
            ></div>
            
            <div className="absolute inset-0 bg-[#ee2039]/60 group-hover:bg-[#ee2039]/50 transition-colors duration-300"></div>
            <Link to={cta2.link_url}>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/30">
                  {renderIcon(cta2.icon_name, "text-white w-5 h-5 md:w-6 md:h-6")}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                    {cta2.title_en}
                </h3>
                <p className="text-white/90 leading-relaxed max-w-md text-sm md:text-base">
                  {cta2.description_en}
                </p>
              </div>
              <p
                className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all text-sm md:text-base"
              >
                {cta2.btn_text_en}{" "}
                <ArrowRight size={18} className="md:w-5 md:h-5" />
              </p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. Main Home Page Component ---
const Home = () => {
    
  const { loading, error, hero, sections, certifications } = useHomeData();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!hero || hero.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === hero.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [hero]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-[#ee2039] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (error || !hero || hero.length === 0) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
            <p>Error loading home page content.</p>
        </div>
      )
  }

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
                  {hero[currentSlide].title_en}{" "}
                </span>

                <span className="block text-[#ee2039]">
                  {hero[currentSlide].highlight_text_en}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                {hero[currentSlide].description_en}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
                {hero[currentSlide].btn_1_text_en && (
                <Link
                  to={hero[currentSlide].btn_1_link || "/solutions"}
                  className="w-full sm:w-auto px-10 py-4 bg-[#ee2039] hover:bg-[#c41229] text-white rounded-md font-bold text-base transition-all duration-300 shadow-lg shadow-[#ee2039]/20 text-center active:scale-95"
                >
                  {hero[currentSlide].btn_1_text_en}
                </Link>
                )}

                {hero[currentSlide].btn_2_text_en && (
                <Link
                  to={hero[currentSlide].btn_2_link || "/projects"}
                  className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md font-bold text-base backdrop-blur-md transition-all duration-300 text-center active:scale-95"
                >
                  {hero[currentSlide].btn_2_text_en}
                </Link>
                )}
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

      <EngineeringConfidence data={sections.engineering_confidence} />

      <StatsSection sections={sections} />

      <FeaturedProducts data={sections.featured_products} />

      <HomeCTA sections={sections} />

      <Certifications certs={certifications} />
    </div>
  );
};

export default Home;
