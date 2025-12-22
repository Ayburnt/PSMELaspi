import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Zap,
  Clock,
  Briefcase,
  Star,
  BookOpen,
  ListOrdered,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from '../../sanityClient';

// ----------------------------------------------------------------------

const SanityBlockContent = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;
  const content = blocks.map(block => {
    if (block._type === 'block' && block.children) {
      return block.children.map(span => span.text).join('');
    }
    return '';
  }).join('\n');
  return <p className="leading-relaxed whitespace-pre-line">{content}</p>;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const iconMap = { Calendar, Zap, Clock, Briefcase, Star };

// --- INDIVIDUAL MILESTONE CARD ---
const TimelineEvent = ({ event, index }) => {
  const Icon = iconMap[event.icon] || Clock;
  const isTop = index % 2 === 0;

  return (
    <div className="flex-shrink-0 w-[380px] md:w-[480px] relative flex flex-col items-center">
      <div className={`w-full px-6 ${isTop ? "mb-28" : "mt-28 order-last"}`}>
        <motion.div 
          variants={fadeInUp}
          className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:border-green-200 transition-all duration-300 group relative"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Icon size={22} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{event.year}</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {event.description}
          </p>
          <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-slate-100 rotate-45 
            ${isTop ? "-bottom-2 border-l-0 border-t-0 border-r border-b" : "-top-2"}`} 
          />
        </motion.div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 z-10">
        <div className="w-6 h-6 bg-white border-4 border-green-600 rounded-full shadow-md flex items-center justify-center">
           <div className="w-2 h-2 bg-green-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// --- SCROLL LOGIC COMPONENT ---
const ScrollTimeline = ({ milestones, title, subtitle }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Dynamically calculate how far the timeline needs to move
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        // Total width of all items minus the visible screen width
        const distance = trackRef.current.scrollWidth - window.innerWidth;
        setScrollDistance(distance > 0 ? distance : 0);
      }
    };

    // Small timeout ensures DOM elements are rendered before measuring
    const timeoutId = setTimeout(calculateDistance, 100);
    window.addEventListener("resize", calculateDistance);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateDistance);
    };
  }, [milestones]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Moves the track from 0 to the calculated negative distance
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-slate-50">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{title}</h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2" />
          
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            className="flex px-[5vw] w-max items-center"
          >
            {milestones.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16 text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
          <Clock size={16} className="text-green-600 animate-pulse"/> 
          Scroll down to travel through history
          <ChevronRight size={16}/>
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
      "milestones": milestoneSection.milestones[]{ year, description, icon },
      "keyAchievementsTitle": keyAchievementsSection.keyAchievementsTitle,
      "keyAchievementsSubtitle": keyAchievementsSection.keyAchievementsSubtitle,
      "keyAchievements": keyAchievementsSection.keyAchievements,
    }`;

    client.fetch(query).then((data) => {
      setContent(data);
      setLoading(false);
    }).catch(err => { 
      console.error(err); 
      setLoading(false); 
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-green-900 rounded-full animate-spin"></div>
    </div>
  );

  // Sorting milestones by year
  const sortedMilestones = content?.milestones ? 
    [...content.milestones].sort((a, b) => parseInt(a.year) - parseInt(b.year)) 
    : [];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : ""}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-green-900/80 to-emerald-900/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
              <Calendar size={16} className="text-emerald-400" /> {content?.heroBadgeText || "Our Legacy"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{content?.heroTitle}</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">{content?.heroSubtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* BRIEF HISTORY */}
     <section className="py-20">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-stretch">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden ">
        <img
          src={content?.briefHistoryImage ? urlFor(content.briefHistoryImage).url() : ""}
          alt="History"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">{content?.briefHistoryTitle}</h2>
        <div className="prose prose-slate text-justify">
          <SanityBlockContent blocks={content?.briefHistoryText} />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* DYNAMIC SCROLL TIMELINE */}
      {sortedMilestones.length > 0 && (
        <ScrollTimeline 
          milestones={sortedMilestones} 
          title={content?.milestoneTitle} 
          subtitle={content?.milestoneSubtitle} 
        />
      )}

      {/* KEY ACHIEVEMENTS */}
      {content?.keyAchievements?.length > 0 && (
        <section className="py-24 relative z-10 bg-white">
          <div className="container mx-auto px-6 text-center mb-16">
            <h2 className="text-3xl font-bold">{content?.keyAchievementsTitle}</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 px-6">
            {content.keyAchievements.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <ListOrdered className="text-green-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}