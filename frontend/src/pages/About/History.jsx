import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Calendar,
  Briefcase,
  Star,
  ChevronRight,
  User,
  Quote,
  Award,
  TrendingUp,
  History,
  ArrowRightCircle
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from '../../sanityClient';

// --- UTILS ---
const SanityBlockContent = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;
  const content = blocks.map(block => {
    if (block._type === 'block' && block.children) {
      return block.children.map(span => span.text).join('');
    }
    return '';
  }).join('\n');
  return <p className="leading-relaxed whitespace-pre-line text-slate-600">{content}</p>;
};

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// --- TIMELINE EVENT CARD (MODERN BUSINESS CARD STYLE) ---
const TimelineEvent = ({ event, index }) => {
  const isTop = index % 2 === 0;
  
  // Image handling with fallback
  const imageUrl = event.image?.asset?.url 
    ? urlFor(event.image).width(400).height(400).url() 
    : (event.icon?.asset?.url ? urlFor(event.icon).url() : null);

  return (
    <div className="relative flex-shrink-0 w-[450px] flex flex-col items-center group perspective-1000">
      
      {/* Vertical Connector Line */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] h-32 bg-slate-300 group-hover:bg-emerald-600 transition-colors duration-500
        ${isTop ? "bottom-[50%]" : "top-[50%]"} z-0`} 
      >
        <div className={`absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-emerald-500/20`} />
      </div>

      {/* The Card */}
      <div className={`w-full px-6 relative z-10 ${isTop ? "mb-32" : "mt-32 order-last"}`}>
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative"
        >
          {/* Accent Top Border */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-amber-400" />
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              {/* Year Badge */}
              <div className="flex flex-col">
                <span className="text-5xl font-serif font-bold text-slate-200 absolute -top-2 left-6 opacity-30 select-none group-hover:text-emerald-100 transition-colors">
                  {event.year}
                </span>
                <span className="relative z-10 inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-1 w-fit">
                  Milestone
                </span>
                <span className="relative z-10 text-2xl font-serif font-bold text-slate-800">
                  {event.year}
                </span>
              </div>

              {/* Avatar */}
              <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 ring-2 ring-slate-100 group-hover:ring-emerald-400 transition-all">
                 {imageUrl ? (
                    <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400"><User size={24} /></div>
                 )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">
              {event.name}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
              {event.description}
            </p>

            {/* Interactive Footer */}
            {/* <div className="pt-4 border-t border-slate-50 flex items-center text-emerald-600 text-sm font-semibold group/link cursor-pointer">
              <span>Read Highlight</span>
              <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Center Node on Track */}
      <div className="absolute top-1/2 -translate-y-1/2 z-20">
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 bg-white border-2 border-emerald-600 rounded-full z-10 group-hover:scale-150 transition-transform duration-300" />
          <div className="absolute w-8 h-8 bg-emerald-500/30 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// --- HORIZONTAL SCROLL SECTION ---
const ScrollTimeline = ({ milestones, title, subtitle }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculate = () => {
      if (trackRef.current) {
        setScrollDistance(trackRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [milestones]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);
  const progressScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 w-full pt-16 pb-8 bg-gradient-to-b from-slate-50 via-slate-50/90 to-transparent z-30 px-6">
          <div className="container mx-auto flex flex-col items-center text-center">
             <div className="w-12 h-1 bg-emerald-500 mb-6 rounded-full" />
             <h2 className="text-4xl font-serif font-bold text-slate-900 mb-3">{title}</h2>
             <p className="text-slate-500 max-w-xl text-lg ">{subtitle}</p>
          </div>
        </div>

        {/* Timeline Visual Track */}
        <div className="relative w-full mt-24">
          {/* The Rail */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-300 -translate-y-1/2" />
          
          {/* Progress Indicator (Fixed on screen) */}
          <motion.div 
            style={{ scaleX: progressScale }} 
            className="absolute top-1/2 left-0 w-full h-[3px] bg-emerald-500 origin-left -translate-y-1/2 z-0" 
          />
          
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            className="flex px-[15vw] w-max items-center py-24"
          >
            <div className="mr-16 text-slate-500 font-serif text-2xl font-bold flex flex-col items-center opacity-50">
                <ArrowRightCircle size={40} className="mb-2"/>
                <span>Start</span>
            </div>

            {milestones.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} />
            ))}
             
             {/* End Marker */}
             <div className="ml-32 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-emerald-900 rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-emerald-100">
                    <span className="text-xs font-bold uppercase tracking-widest mb-1">Present</span>
                    <span className="font-serif font-bold text-xl">Today</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Floating Instruction */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 text-sm font-medium"
          >
            <History size={16} className="text-emerald-600"/> 
            <span>Scroll vertically to explore history</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function HistoryPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "historyPage"][0]{
      "heroTitle": heroSection.heroTitle,
      "heroSubtitle": heroSection.heroSubtitle,
      "heroBadgeText": heroSection.heroBadgeText,
      "heroBackgroundImage": heroSection.heroBackgroundImage { asset -> { _id, url } },
      "briefHistoryTitle": briefHistorySection.briefHistoryTitle,
      "briefHistoryText": briefHistorySection.briefHistoryText,
      "briefHistoryImage": briefHistorySection.briefHistoryImage { asset -> { _id, url } },
      "milestoneTitle": milestoneSection.milestoneTitle,
      "milestoneSubtitle": milestoneSection.milestoneSubtitle,
      "milestones": milestoneSection.milestones[]{ 
        year, name, description, 
        image { asset -> { _id, url } }, 
        icon { asset -> { _id, url } } 
      },
      "keyAchievementsTitle": keyAchievementsSection.keyAchievementsTitle,
      "keyAchievementsSubtitle": keyAchievementsSection.keyAchievementsSubtitle,
      "keyAchievements": keyAchievementsSection.keyAchievements,
    }`;

    client.fetch(query).then((data) => {
      setContent(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-800 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm tracking-widest uppercase">Loading Legacy</span>
      </div>
    </div>
  );

  const sortedMilestones = content?.milestones 
    ? [...content.milestones].sort((a, b) => parseInt(a.year) - parseInt(b.year)) 
    : [];

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <TopBar />
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : ""}
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-50 text-sm font-medium mb-8">
              <Calendar size={14} className="text-emerald-400" /> 
              {content?.heroBadgeText || "Established Timeline"}
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
              {content?.heroTitle}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {content?.heroSubtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- BRIEF HISTORY SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Side */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={content?.briefHistoryImage ? urlFor(content.briefHistoryImage).url() : ""}
                  alt="Historical Context"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent pointer-events-none" />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-50 rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-50 rounded-full -z-10" />
            </div>

            {/* Text Side */}
            <div className="lg:col-span-7 lg:pl-10">
              <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase mb-2 block">Our Origin Story</span>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-8">{content?.briefHistoryTitle}</h2>
              
              <div className="prose prose-slate prose-lg text-justify text-slate-600 border-l-4 border-emerald-500/30 pl-6">
                <SanityBlockContent blocks={content?.briefHistoryText} />
              </div>

              <div className="mt-8 flex gap-4">
                <div className="flex flex-col">
                   <strong className="text-3xl font-bold text-slate-900">30+</strong>
                   <span className="text-sm text-slate-500">Years of Service</span>
                </div>
                <div className="w-[1px] h-12 bg-slate-200 mx-4" />
                <div className="flex flex-col">
                   <strong className="text-3xl font-bold text-slate-900">100+</strong>
                   <span className="text-sm text-slate-500">Awards Won</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TIMELINE --- */}
      {sortedMilestones.length > 0 && (
        <ScrollTimeline 
          milestones={sortedMilestones} 
          title={content?.milestoneTitle} 
          subtitle={content?.milestoneSubtitle} 
        />
      )}

      {/* --- KEY ACHIEVEMENTS --- */}
      {content?.keyAchievements?.length > 0 && (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full text-emerald-700 mb-4">
                <Award size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">{content?.keyAchievementsTitle}</h2>
              <p className="text-slate-600">{content?.keyAchievementsSubtitle || "Recognizing excellence and dedication throughout the years."}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.keyAchievements.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        {i % 2 === 0 ? <Star size={18} /> : <TrendingUp size={18} />}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">Achievement {i + 1}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">{item}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}