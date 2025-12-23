import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import TopBar from '../components/layout/TopBar';

// Section Components
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import EventsFeed from '../components/sections/EventsFeed';
import NewsFeed from '../components/sections/NewsFeed';
import PromoPopup from '../components/sections/PromoPopup';
import Partnership from '../components/sections/Partnership';
import FeaturedMember from '../components/sections/FeaturedMember';
import Gallery from '../components/sections/Gallery';

const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const scrollTransition = {
  duration: 0.6,
  ease: 'easeOut'
};

const HomePage = () => {
  useEffect(() => {
    const scriptId = 'noupe-embed-script';
    
    // 1. Check if the script already exists to prevent "Identifier already declared" error
    // This is crucial in React Development mode where components mount twice.
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.noupe.com/embed/019b441ec49c7c8f9d542f9e8edf0b3287ec.js';
      script.async = true;
      
      // 2. Append to body
      document.body.appendChild(script);
    }

    // 3. Optional: Cleanup on unmount
    // Only remove if you want the widget to disappear when navigating to other pages
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        // document.body.removeChild(scriptToRemove); 
      }
    };
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white overflow-x-hidden relative">
      {/* Global CSS fix using standard style tag - removed 'jsx' and 'global' for compatibility */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Ensures the floating Noupe widget stays on top of all Framer Motion layers */
        #noupe-widget-container, 
        .noupe-chat-window, 
        .noupe-launcher {
          z-index: 9999 !important;
          pointer-events: auto !important;
        }

        /* Prevent the Noupe embed from breaking mobile layout */
        iframe[src*="noupe"], .noupe-embed-container {
          max-width: 100vw !important;
          width: 100% !important;
        }
      `}} />

      <TopBar />
      <Navbar />

      <Hero />

      <AboutSection /> 
      
      <FeaturedMember />
      
      {/* Animate on scroll: Events */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={scrollTransition}
      >
        <EventsFeed />
      </motion.div>

      {/* Animate on scroll: News */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scrollVariants}
        transition={{ ...scrollTransition, delay: 0.2 }}
      >
        <NewsFeed />
      </motion.div>

      <Partnership />

      {/* Project Gallery Section */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-24">
        <Gallery />
      </div>

      <Footer />
      <PromoPopup />
    </div>
  );
};

export default HomePage;