import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        
        {/* Column 1: About */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white font-bold text-lg mb-4">PSME Las Piñas</h3>
          <p className="leading-relaxed text-gray-400 max-w-sm">
            A non-stock, non-profit organization dedicated to the advancement of the Mechanical Engineering profession in Las Piñas City. We are an affiliate of the PSME National Organization.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Membership Application</a></li>
            <li><a href="#" className="hover:text-yellow-400">Download Forms</a></li>
            <li><a href="#" className="hover:text-yellow-400">Board of Directors</a></li>
            <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
              <span>Unit 101, Pilar Village,<br/>Las Piñas City, 1740</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-400 flex-shrink-0" />
              <span>+63 917 123 4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-yellow-400 flex-shrink-0" />
              <span>info@psmelaspinas.org</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-blue-900 mt-12 pt-8 text-center text-xs text-gray-500">
        &copy; 2025 PSME Las Piñas Chapter. All rights reserved.
      </div>
    </footer>
  );
}