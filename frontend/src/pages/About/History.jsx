import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Calendar,
  MapPin,
  FileText,
  ChevronRight
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// --- NEW LIST CARD COMPONENT ---
const HistoryCard = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. Adjusted Image URL: Removed fixed height constraint to prevent cropping
  const imageUrl = event.image?.asset?.url 
    ? urlFor(event.image).width(800).url() 
    : null;

  const description = event.description || "";
  const isLongDescription = description.length > 200;

  const displayDate = (dateString) => {
    return dateString || 'Date Unknown';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col md:flex-row mb-10"
    >
      {/* 
         LEFT COLUMN: IMAGE 
         Fixed width on desktop, Auto height to show full photo without crop.
      */}
      <div className="md:w-[280px] lg:w-[320px] shrink-0 bg-slate-50 relative border-b md:border-b-0 md:border-r border-slate-100">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={event.name} 
            // h-auto ensures the image determines its own height based on aspect ratio
            className="w-full h-auto block object-cover" 
          />
        ) : (
          <div className="w-full h-64 md:h-full min-h-[250px] flex items-center justify-center bg-slate-100 text-slate-300">
             <FileText size={48} />
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: CONTENT */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
        <div className="mb-4">
          {/* Badge Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Calendar size={12} />
              {displayDate(event.date)}
            </span>
            
            {event.location && (
              <span className="inline-flex items-center gap-1 text-slate-400 text-xs font-medium uppercase tracking-wide">
                <MapPin size={12} />
                {event.location}
              </span>
            )}
          </div>

          {/* Title - Serif for "Presidential" look */}
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-4 group-hover:text-emerald-800 transition-colors">
            {event.name}
          </h3>

          {/* Description */}
          <div className="text-slate-600 leading-relaxed text-sm md:text-base">
            {isExpanded ? description : `${description.slice(0, 200)}${isLongDescription ? '...' : ''}`}
          </div>

          {/* Expand Button */}
          {isLongDescription && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm hover:text-emerald-800 transition-colors"
            >
              {isExpanded ? "Show Less" : "Read Full Bio"}
              <ChevronRight size={16} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
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
        date, name, description, 
        image { asset -> { _id, url } },
        location
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
    ? [...content.milestones].sort((a, b) => {
        // Extract year for sorting
        const getYear = (dateStr) => {
          if (!dateStr || dateStr === '-') return 0
          const yearMatch = dateStr.match(/\d{4}/)
          return yearMatch ? parseInt(yearMatch[0]) : 0
        }
        return getYear(b.date) - getYear(a.date)
      })
    : [];

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <TopBar />
      <Navbar />

      {/* --- HERO SECTION (UNCHANGED) --- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
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

      {/* --- BRIEF HISTORY SECTION (UNCHANGED) --- */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl max-w-auto">
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

      {/* --- REVISED LEADERSHIP / PRESIDENTS LIST --- */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          <div className="mb-20">
             <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase mb-2 block">The Leadership</span>
             <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">{content?.milestoneTitle || "Our Presidents"}</h2>
             <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">{content?.milestoneSubtitle || "Honoring the leaders who have shaped our path through the years."}</p>
          </div>

          <div className="flex flex-col gap-6">
            {sortedMilestones.map((event, index) => (
              <HistoryCard key={index} event={event} index={index} />
            ))}
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}