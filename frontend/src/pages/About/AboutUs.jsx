import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Scale,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Target,
  Flag,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from "../../sanityClient";

// Animation Variants
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
    transition: { staggerChildren: 0.15 },
  },
};

// Icon Mapper
const iconMap = {
  Users, Scale, Globe, Building2, TrendingUp, Target, Award, ArrowRight, Flag
};

export default function AboutUs() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "aboutUs"][0]{
      whoWeAreTitle,
      whoWeAreMainText,
      whoWeAreDescriptionText,
      whoWeAreImage { asset -> { _id, url }, hotspot, crop },
      affiliationTitle,
      affiliationText,
      visionTitle,
      visionStatement,
      missionTitle,
      missionStatement,
      thrustsTitle,
      thrustsSubtitle,
      thrusts[]{ title, description, icon },
      heroBadgeText,
      heroBackgroundImage { asset -> { _id, url }, hotspot, crop }
    }`;

    client.fetch(query).then((data) => {
      setContent(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-900 rounded-full animate-spin"></div>
    </div>
  );

  if (!content) return null;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />

      {/* 1. HERO SECTION: Immersive & Corporate */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
          {/* Corporate Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-900/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 mt-16 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-medium text-white shadow-sm">
                <Building2 size={16} className="text-yellow-400" />
                {content?.heroBadgeText || "Las Piñas City Chapter"}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              Empowering Business,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Building Community.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We are the voice of business in Las Piñas, dedicated to fostering economic growth and sustainable development.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 2. WHO WE ARE: Split Layout with Floating Badge */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text Side */}
            <motion.div variants={fadeInUp}>
              <h4 className="text-blue-700 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-700"></span> About Us
              </h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
                {content?.whoWeAreTitle || "Driving Business Excellence Since 1995"}
              </h2>
              
              <div className="prose prose-lg text-slate-600 space-y-6">
                <p className="leading-relaxed">{content?.whoWeAreMainText}</p>
                <p className="leading-relaxed">{content?.whoWeAreDescriptionText}</p>
              </div>

              {/* Affiliation Badge */}
              <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-3 bg-white rounded-full shadow-sm text-yellow-500 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {content?.affiliationTitle || "Official Affiliation"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {content?.affiliationText}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={content?.whoWeAreImage ? urlFor(content.whoWeAreImage).url() : "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format"}
                  alt="About Us"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-10 -left-6 md:-left-12 bg-white p-6 md:p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Status</span>
                </div>
                <p className="text-slate-800 font-bold leading-tight">
                  "Commited to the advancement of the business community."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISION & MISSION: Clean Cards */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Target size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{content?.visionTitle || "Our Vision"}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {content?.visionStatement}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-400 transform origin-left group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                <Flag size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{content?.missionTitle || "Our Mission"}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {content?.missionStatement}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. THRUSTS: Dark Corporate Theme */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {content?.thrustsTitle || "Strategic Thrusts"}
            </h2>
            <p className="text-slate-400 text-lg">
              {content?.thrustsSubtitle || "Our core pillars driving sustainable business growth and community development."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {content?.thrusts?.map((thrust, index) => {
              const Icon = iconMap[thrust.icon] || CheckCircle2;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 text-blue-400 group-hover:text-white shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {thrust.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {thrust.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}