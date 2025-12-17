import { useEffect, useState } from 'react';
import { client, urlFor } from '../../sanityClient';
import { motion } from 'framer-motion'; // Added for the smooth entry animations
import { ArrowRight } from 'lucide-react'; // Added for a modern touch on buttons

// Animation Variants matching your AboutUs style
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Hero() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "hero"][0]{
      badgeText,
      mainHeading,
      highlightedHeading,
      introText,
      backgroundImage {
        asset -> {
          _id,
          url
        },
        hotspot,
        crop
      },
      primaryButton {
        text,
        link
      },
      secondaryButton {
        text,
        link
      },
      heroHeight,
      overlayOpacity
    }`;

    client
      .fetch(query)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching hero content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative h-[80vh] flex items-center justify-center bg-[#155333]">
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white font-medium">Loading Experience...</p>
        </div>
      </section>
    );
  }

  if (!content) return null;

  const heroHeight = content?.heroHeight || 'h-[80vh]';
  const backgroundImageUrl = content?.backgroundImage
    ? urlFor(content.backgroundImage).url()
    : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <section id="home" className={`relative ${heroHeight} min-h-[500px] flex items-center justify-center overflow-hidden`}>
      
      {/* 1. BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImageUrl}
          alt="Corporate Background" 
          className="w-full h-full object-cover scale-105" // Subtle zoom for depth
        />
        
        {/* CORPORATE OVERLAY: Gradient from Dark Gray to the specific Logo Green */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-[#155333]/85 to-[#155333]/60" />
        
        {/* Optional: Add a subtle radial glow for extra polish */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(21,83,51,0.4)_100%)]" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge Style: Translucent blur */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-white shadow-xl">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              {content?.badgeText || "Welcome"}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            {content?.mainHeading} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-100 to-white">
              {content?.highlightedHeading}
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-md"
          >
            {content?.introText}
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* Primary Action */}
            <a 
              href={content?.primaryButton?.link || '#join'} 
              className="group bg-yellow-500 text-[#0f3320] px-10 py-4 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-300 shadow-[0_10px_20px_rgba(234,179,8,0.3)] transform hover:-translate-y-1 flex items-center gap-2"
            >
              {content?.primaryButton?.text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Action */}
            <a 
              href={content?.secondaryButton?.link || '#about'} 
              className="border-2 border-white/40 text-white px-10 py-4 rounded-xl font-bold backdrop-blur-sm hover:bg-white hover:text-[#155333] transition-all duration-300 transform hover:-translate-y-1"
            >
              {content?.secondaryButton?.text}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. DECORATIVE ELEMENT (Bottom Curve/Edge) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 opacity-10" />
    </section>
  );
}