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
  Quote,
  Activity
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";
import { client, urlFor } from "../../sanityClient";

// --- ANIMATIONS ---
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-800 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm tracking-widest uppercase">Loading Profile</span>
      </div>
    </div>
  );

  if (!content) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <TopBar />
      <Navbar />

      {/* 1. HERO SECTION: Cinematic & Authoritative */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={content?.heroBackgroundImage ? urlFor(content.heroBackgroundImage).url() : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay: Deep Business Tones */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-950/80 to-green-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm font-semibold text-emerald-50 uppercase tracking-widest">
                <Building2 size={14} className="text-emerald-400" />
                {content?.heroBadgeText || "Las Piñas City Chapter"}
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight mb-8 shadow-black drop-shadow-lg">
              Empowering Business,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-amber-200">
                Building Community.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
              We are the premier voice of commerce in Las Piñas, fostering economic vitality through advocacy, connection, and sustainable growth.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <ArrowRight className="rotate-90" size={24}/>
        </motion.div>
      </section>

      {/* 2. WHO WE ARE: Corporate Asymmetry */}
      <section className="py-24 relative bg-white overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32 z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            {/* Content Side */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm">Our Identity</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                {content?.whoWeAreTitle || "Driving Excellence Since 1995"}
              </h2>
              
              <div className="prose prose-lg text-slate-600 space-y-6 mb-10">
                <p className="leading-relaxed">{content?.whoWeAreMainText}</p>
                <p className="leading-relaxed border-l-4 border-emerald-500/30 pl-6 italic">
                  {content?.whoWeAreDescriptionText}
                </p>
              </div>

              {/* Affiliation Badge - Redesigned */}
              <div className="inline-flex items-center gap-4 p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm border border-slate-100">
                  <Award size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Officially Affiliated</span>
                  <span className="text-lg font-bold text-slate-800">{content?.affiliationTitle || "Chamber of Commerce"}</span>
                </div>
              </div>
            </motion.div>

            {/* Visual Side */}
            <motion.div variants={fadeInUp} className="relative mx-auto w-full max-w-lg lg:max-w-full">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white">
                <img
                  src={content?.whoWeAreImage ? urlFor(content.whoWeAreImage).url() : ""}
                  alt="About Us"
                  className="w-full h-auto object-cover scale-105"
                />
              </div>

              {/* Floating Stat Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-6 rounded-xl shadow-xl border border-slate-100 z-20 max-w-[280px] hidden md:block"
              >
                <div className="flex items-start justify-between mb-2">
                  <Quote size={32} className="text-emerald-100 fill-emerald-100" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed font-serif italic">
                  "Commited to the holistic advancement of the local business community."
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                   <Activity size={16} className="text-emerald-600"/>
                   <span className="text-xs font-bold text-slate-400 uppercase">Active Status</span>
                </div>
              </motion.div>
              
              {/* Backing shape */}
              <div className="absolute -top-10 -right-10 w-full h-full border-2 border-emerald-500/20 rounded-2xl z-0 rounded-tr-[5rem]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. STRATEGIC PILLARS (Mission/Vision) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         {/* Abstract Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-600 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={120} />
              </div>
              <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/30">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-6 text-white">{content?.visionTitle || "Our Vision"}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {content?.visionStatement}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group relative bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-500"
            >
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flag size={120} />
              </div>
              <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-8 border border-amber-500/30">
                <Flag size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-6 text-white">{content?.missionTitle || "Our Mission"}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {content?.missionStatement}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. THRUSTS: Grid Style */}
      <section className="py-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase mb-3 block">Strategic Framework</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">{content?.thrustsTitle || "Our Core Thrusts"}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-400 mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              {content?.thrustsSubtitle || "The foundational pillars driving our organization's efforts towards sustainable economic development."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {content?.thrusts?.map((thrust, index) => {
              const Icon = iconMap[thrust.icon] || CheckCircle2;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white p-8 rounded-xl border border-slate-200 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                      <Icon size={24} />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors font-serif">
                      {thrust.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {thrust.description}
                    </p>
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