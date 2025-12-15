import { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  Facebook, 
  Linkedin, 
  ArrowRight 
} from "lucide-react";
import AdminLoginModal from "../sections/AdminLoginModal";
import { client } from "../../sanityClient";

export default function Footer() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]{
      organizationName,
      organizationSubtitle,
      footerAboutText,
      fullAddress,
      contactPhone2,
      contactEmail2,
      footerBgColor
    }`;

    client
      .fetch(query)
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching site settings:", err));
  }, []);

  // Default set to Tailwind's blue-900 hex code
  const footerBgColor = settings?.footerBgColor?.hex || '#1e3a8a';

  return (
    <>
      <footer 
        className="text-blue-200 pt-20 pb-10 border-t border-blue-800 relative overflow-hidden transition-colors duration-300" 
        style={{ backgroundColor: footerBgColor }}
      >
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 opacity-80" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About (Span 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-white font-extrabold text-2xl tracking-tight">
                {settings?.organizationName || "PCCI"}
                <span className="text-yellow-400">.</span>
              </h3>
              <p className="text-blue-300 font-medium text-sm uppercase tracking-wider mt-1">
                {settings?.organizationSubtitle || "Las Piñas Chapter"}
              </p>
            </div>
            
            <p className="leading-relaxed text-blue-100/80 max-w-md">
              {settings?.footerAboutText ||
                "A non-stock, non-profit organization dedicated to the advancement of the business community in Las Piñas City. We bridge businesses and government for economic growth."}
            </p>

            {/* Social Placeholders */}
            <div className="flex gap-4 pt-2">
              {/* Changed bg to blue-950 for contrast against blue-900 bg */}
              <a href="#" className="p-2 bg-blue-950 rounded-full text-blue-200 hover:bg-yellow-500 hover:text-blue-900 transition-all duration-300 border border-blue-800 hover:border-yellow-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-950 rounded-full text-blue-200 hover:bg-yellow-500 hover:text-blue-900 transition-all duration-300 border border-blue-800 hover:border-yellow-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3 cols) */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Membership Application",
                "Download Forms",
                "Board of Directors",
                "Privacy Policy"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="group flex items-center text-blue-200 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-yellow-400" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (Span 4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-blue-950 rounded-lg text-yellow-400 mt-1 border border-blue-800">
                  <MapPin size={18} />
                </div>
                <span
                  className="text-blue-100/90 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html:
                      settings?.fullAddress?.replace(/\n/g, "<br/>") ||
                      "Unit 101, Pilar Village,<br/>Las Piñas City, 1740",
                  }}
                />
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-blue-950 rounded-lg text-yellow-400 border border-blue-800">
                   <Phone size={18} />
                </div>
                <span className="text-blue-100/90 hover:text-white transition-colors">
                  {settings?.contactPhone2 || "+63 917 123 4567"}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-blue-950 rounded-lg text-yellow-400 border border-blue-800">
                  <Mail size={18} />
                </div>
                <span className="text-blue-100/90 hover:text-white transition-colors">
                  {settings?.contactEmail2 || "info@pccilaspinas.org"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
       <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300/70 gap-4">
  
          {/* Left side: copyright */}
          <p>&copy; 2025 PCCI Las Piñas Chapter. All rights reserved.</p>

          {/* Right side: website credit + admin */}
          <div className="flex items-center gap-2">
            <p className="flex items-center gap-1">
              Website made by
              <a
                href="https://sari-sari.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-yellow-400 font-medium transition-colors"
              >
                Sari Sari
              </a>
            </p>

            {/* Admin button next to Sari Sari */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="opacity-30 hover:opacity-100 hover:text-yellow-500 transition-all duration-300"
              title="Admin Access"
              aria-label="Admin Login"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>

      </footer>

      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}