import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import TopBar from "../../components/layout/TopBar";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

// Example static data - matches your original image content
const projects = [
  {
    id: 1,
    title: "Jobs QC",
    category: "EMPLOYMENT PORTAL",
    image: "https://via.placeholder.com/400x300?text=Jobs+QC+Logo", 
    description: "Jobs QC is a dedicated job portal designed for our members and applicants, providing a seamless platform for job seekers to connect with potential employers. This resource offers a wide range of employment opportunities.",
  },
  {
    id: 2,
    title: "Business Conference",
    category: "ANNUAL EVENT",
    image: "https://via.placeholder.com/400x300?text=QCBC+Logo", 
    description: "Join us for the remarkable Annual Quezon City Business Conference, a premier event in collaboration with the Quezon City Local Government Unit. This conference brings together industry leaders and innovators.",
  },
  {
    id: 3,
    title: "General Membership Meeting",
    category: "NETWORKING",
    image: "https://via.placeholder.com/400x300?text=GMM+Logo", 
    description: "We host a monthly General Membership Meeting that includes engaging Learning Sessions and valuable Networking opportunities for our members. Each event features insightful topics and speakers.",
  }
];

export default function Project() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-slate-900 font-sans">
      <TopBar />
      <Navbar />

      {/* HEADER SECTION: Matching Services Page exactly */}
      <header className="bg-[#1a4031] text-white pt-16 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500 w-1.5 h-8"></div>
            <span className="uppercase tracking-widest text-xs md:text-sm font-bold text-yellow-500">
              Company Gallery
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Portfolio & Projects
          </h1>
          <p className="text-base md:text-xl text-slate-200 font-light max-w-3xl">
            A visual showcase of our initiatives, community engagements, and the milestones we have achieved together.
          </p>
        </div>
      </header>

      {/* GALLERY SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutGrid className="text-yellow-500" size={24} />
            Featured Highlights
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 border border-gray-200 bg-white text-[#155333] hover:bg-[#155333] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 border border-gray-200 bg-white text-[#155333] hover:bg-[#155333] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group min-w-full md:min-w-[calc(33.333%-16px)] snap-start bg-white border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              {/* Image Box: Styled like the Service Icon Box */}
              <div className="mb-6 aspect-video bg-slate-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-[0.2em] mb-2">
                {project.category}
              </p>

              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#155333] transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FORMAL FOOTER BANNER: Reused from Services */}
      <div className="bg-slate-50 border-t border-gray-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-base md:text-lg font-bold text-[#155333] mb-2 italic">
            "Building a better future through shared success and community focus."
          </h4>
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            All projects listed are part of our ongoing commitment to public service and economic growth.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}