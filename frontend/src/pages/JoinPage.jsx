import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";
import MembershipForm from "../components/sections/MembershipForm";
import sanityClient, { urlFor } from "../sanityClient";
import {
  Download,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Quote,
} from "lucide-react";

const JoinPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinPageData = async () => {
      try {
        const query = `*[_type == "joinPage"][0]{
          heroSection,
          applicationProcess,
          testimonialsSection,
          ctaSection
        }`;
        const data = await sanityClient.fetch(query);
        setPageData(data);
      } catch (error) {
        console.error("Error fetching join page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinPageData();
  }, []);

  const data = pageData;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <TopBar />
      <Navbar />

      {/* ================= HERO SECTION WITH PHOTO BACKGROUND ================= */}
      <div className="relative bg-green-900 h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {data.heroSection?.backgroundImage ? (
            <img
              src={urlFor(data.heroSection.backgroundImage).url()}
              alt="PCCI Manila Meeting"
              className="w-full h-full object-cover opacity-40"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="PCCI Manila Meeting"
              className="w-full h-full object-cover opacity-40"
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-green-900/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/30 border border-green-400 text-green-100 text-sm font-semibold mb-4 backdrop-blur-sm">
            {data.heroSection?.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
            {data.heroSection?.title}
          </h1>
          <p className="text-green-100 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {data.heroSection?.subtitle}
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="max-w-6xl mx-auto px-4 pb-20 relative z-20 -mt-20">
        {/* VIEW TOGGLE LOGIC */}
        {showForm ? (
          /* ================= FORM VIEW ================= */
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 animate-fade-in-up">
            <button
              onClick={() => setShowForm(false)}
              className="group mb-8 text-gray-500 hover:text-green-900 flex items-center gap-2 font-medium transition-colors"
            >
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-green-100 transition-colors">
                <ArrowLeft size={20} />
              </div>
              Back to Overview
            </button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                  Membership Application
                </h2>
                <p className="text-gray-500 mt-2">
                  Please fill out the details below to begin your journey.
                </p>
              </div>
              <MembershipForm />
            </div>
          </div>
        ) : (
          /* ================= OVERVIEW VIEW ================= */
          <div className="space-y-12">
            {/* 1. APPLICATION PROCESS (MODERN OVERLAY STYLE) */}
            <section className="relative bg-white rounded-2xl shadow-2xl p-10 md:p-16 overflow-hidden">
              {/* Soft background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-100 opacity-70 pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold tracking-wide">
                    {data.applicationProcess?.badge}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {data.applicationProcess?.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {data.applicationProcess?.description}
                  </p>
                </div>

                {/* Steps */}
                <div className="relative grid md:grid-cols-4 gap-10">
                  {/* MAIN PROGRESS LINE */}
                  <div className="hidden md:block absolute top-[30px] left-0 w-full h-[3px] bg-gradient-to-r from-green-200 via-green-500 to-emerald-400 rounded-full" />

                  {data.applicationProcess?.steps?.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center text-center"
                    >
                      {/* STEP NODE */}
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-full bg-green-900 text-white flex items-center justify-center font-bold text-lg shadow-xl ring-4 ring-white">
                          {item.stepNumber}
                        </div>

                        {/* Glow */}
                        <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl -z-10" />
                      </div>

                      {/* CARD */}
                      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-xs">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* 3. TESTIMONIALS */}
              <section className="bg-white rounded-2xl shadow-md p-8 border-l-8 border-green-900">
                <div className="flex items-center gap-3 mb-6">
                  <Quote className="text-green-200 fill-current" size={40} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    {data.testimonialsSection?.title}
                  </h2>
                </div>

                <div className="space-y-8">
                  {data.testimonialsSection?.testimonials?.map((testimonial, idx) => (
                    <div key={idx}>
                      <div className="relative">
                        <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                            {testimonial.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>
                      </div>
                      {idx < data.testimonialsSection.testimonials.length - 1 && (
                        <hr className="border-gray-100 mt-8" />
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. CALL TO ACTION CARD */}
              <section className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl shadow-xl p-8 text-white flex flex-col justify-center items-center text-center">
                <CheckCircle size={48} className="text-green-300 mb-6" />
                <h2 className="text-3xl font-bold mb-4">{data.ctaSection?.title}</h2>
                <p className="text-green-100 mb-8 max-w-md">
                  {data.ctaSection?.description}
                </p>

                <div className="w-full space-y-4 max-w-xs">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-white text-green-900 px-6 py-4 rounded-xl font-bold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    {data.ctaSection?.primaryButtonText} <ArrowRight size={20} />
                  </button>

                  <a
                    href={data.ctaSection?.pdfFormUrl}
                    download
                    className="w-full border border-green-400/50 bg-green-800/50 backdrop-blur-sm px-6 py-4 rounded-xl font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Download size={18} /> {data.ctaSection?.secondaryButtonText}
                  </a>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JoinPage;
