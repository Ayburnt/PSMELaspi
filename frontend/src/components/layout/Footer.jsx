import { useState } from 'react'; // <--- Import useState
import { MapPin, Phone, Mail, Lock } from 'lucide-react';
import AdminLoginModal from '../sections/AdminLoginModal'; // <--- Import the Modal

export default function Footer() {
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for modal

  return (
    <>
      <footer className="bg-blue-950 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
          
          {/* ... (Keep your existing Column 1: About) ... */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">PCCI Las Piñas</h3>
            <p className="leading-relaxed text-gray-400 max-w-sm">
              A non-stock, non-profit organization dedicated to the advancement of the business community in Las Piñas City.
            </p>
          </div>

          {/* ... (Keep your existing Column 2: Quick Links) ... */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400">Membership Application</a></li>
              <li><a href="#" className="hover:text-yellow-400">Download Forms</a></li>
              <li><a href="#" className="hover:text-yellow-400">Board of Directors</a></li>
              <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* ... (Keep your existing Column 3: Contact) ... */}
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
                <span>info@pccilaspinas.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom with Admin Trigger */}
        <div className="border-t border-blue-900 mt-12 pt-8 text-center text-xs text-gray-500 relative">
          <p>&copy; 2025 PCCI Las Piñas Chapter. All rights reserved.</p>
          
          {/* THE HIDDEN ADMIN BUTTON */}
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="absolute right-4 top-8 opacity-50 hover:opacity-100 hover:text-white transition flex items-center gap-1"
            title="Admin Access"
          >
            <Lock size={14} /> Admin
          </button>
        </div>
      </footer>

      {/* Render the Modal outside the footer structure */}
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}