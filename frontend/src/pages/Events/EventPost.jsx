import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../../sanityClient";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, MapPin, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TopBar from "../../components/layout/TopBar";

const portableTextComponents = {
  block: {
    normal: ({children}) => <p className="text-slate-700 leading-relaxed mb-4">{children}</p>,
    h1: ({children}) => <h1 className="text-3xl font-serif font-bold text-slate-900 mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl font-serif font-bold text-slate-900 mt-6 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl font-serif font-bold text-slate-900 mt-5 mb-2">{children}</h3>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 bg-slate-50 p-4 rounded-r-lg my-4 italic text-slate-600">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="ml-2">{children}</li>,
    number: ({children}) => <li className="ml-2">{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    underline: ({children}) => <u className="underline">{children}</u>,
    code: ({children}) => <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-red-600">{children}</code>,
    link: ({value, children}) => {
      const url = value?.href;
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-green-600 hover:text-green-700 underline cursor-pointer"
          onClick={(e) => {
            if (url) {
              window.open(url, '_blank');
            }
          }}
        >
          {children}
          <ExternalLink size={14} className="inline ml-1" />
        </a>
      );
    },
  },
  types: {
    image: ({value}) => (
      <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
        <img 
          src={urlFor(value).width(800).url()} 
          alt="Article content" 
          className="w-full h-auto object-cover"
        />
      </div>
    ),
  },
};

export default function EventPost() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const query = `
      *[_type == "event" && slug.current == $slug][0]{
        title,
        slug,
        date,
        time,
        location,
        category,
        eventType,
        description,
        price,
        attendees,
        image,
        body,
        success
      }
    `;

    client
      .fetch(query, { slug })
      .then(setEvent)
      .catch(console.error);
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  /* --- Share Variables & Functions --- */
  const currentUrl = window.location.href;
  const shareTitle = event?.title || "Check out this event";

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: currentUrl,
        });
      } catch (err) {
        console.log("Sharing failed", err);
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* --- Portable Text Custom Renderers --- */
  const components = {
    types: {
      image: ({ value }) => (
        <img
          src={urlFor(value).width(1200).url()}
          alt=""
          className="rounded-2xl my-10 shadow-xl"
        />
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 text-slate-700">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 space-y-2 text-slate-700">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 underline font-medium hover:text-green-900"
        >
          {children}
        </a>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-green-600 bg-slate-50 pl-6 py-3 italic rounded-r-xl my-8">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p className="mb-5 leading-relaxed text-slate-700">{children}</p>
      ),
      h1: ({ children }) => (
        <h1 className="font-serif text-4xl mt-12 mb-6 text-slate-900">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="font-serif text-3xl mt-10 mb-5 text-slate-900">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-serif text-2xl mt-8 mb-4 text-slate-900">
          {children}
        </h3>
      ),
    },
  };

  return (
    <div className="bg-white min-h-screen selection:bg-green-100">
      <TopBar />
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
          <Link
            to={event.eventType === "past" ? "/events/past" : "/events/upcoming"}
            className="group flex items-center gap-2 text-slate-600 hover:text-green-700 transition-colors font-semibold text-sm"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to {event.eventType === "past" ? "Past" : "Upcoming"} Events
          </Link>

          {/* Right Side: Meta Tags */}
          <div className="flex flex-col gap-3 text-sm text-gray-500 ml-auto">
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold uppercase text-[10px] tracking-wider w-fit">
                {event.category}
              </span>

              <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                <Calendar size={14} className="text-slate-400" />
                {event.date}
              </span>

              {event.time && (
                <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                  <Clock size={14} className="text-slate-400" />
                  {event.time}
                </span>
              )}
            </div>

            {event.location && (
              <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded w-fit">
                <MapPin size={14} className="text-slate-400" />
                {event.location}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
          {event.title}
        </h1>

        {/* Cover Image */}
        {event.image?.asset && (
          <div className="mb-14 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
            <img
              src={urlFor(event.image).width(1400).url()}
              alt={event.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Info Grid */}
        {(event.attendees || event.price) && (
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-2xl mb-14 border border-slate-100">
            {event.price && (
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">
                  Entry Fee
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {event.price}
                </p>
              </div>
            )}
            {event.attendees && (
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">
                  Capacity / Attendees
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {event.attendees}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="space-y-14">
          {event.description && (
            <p className="text-xl text-slate-600 leading-relaxed font-light border-l-4 border-green-500 pl-6">
              {event.description}
            </p>
          )}

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Event Highlights
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {event.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle2
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-slate-700 text-sm font-medium">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Body Text */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600">
            {event.body ? <PortableText value={event.body} components={portableTextComponents} /> : null}
          </div>

          {event.eventType === "past" && event.success && (
            <div className="bg-green-900 text-white p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <h3 className="text-xl font-bold mb-4">
                Success Story
              </h3>
              <p className="text-green-50 leading-relaxed italic text-lg">
                “{event.success}”
              </p>
            </div>
          )}

          {/* Registration / Event Link Button */}
          <div className="flex justify-left pt-8">
            <a
              href="https://event.sari-sari.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-10 rounded-md transition-all duration-300 shadow-lg hover:shadow-green-200"
            >
              Register at Sari-Sari
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
