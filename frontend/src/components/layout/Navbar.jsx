import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- 1. Import Link

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Brand / Logo - Now clickable to go Home */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-yellow-500 shadow-sm">
              ⚙️
            </div>
            <div className="leading-tight">
              {/* Updated Name to PSME based on your project */}
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">PSME</h1>
              <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Las Piñas City</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {/* "Home" uses Link so it works even if you are on the Join page */}
            <Link to="/" className="hover:text-blue-900 transition">Home</Link>
            
            {/* Sections like About/News use standard anchors for scrolling */}
            <a href="/#about" className="hover:text-blue-900 transition">About Us</a>
            <a href="/#news" className="hover:text-blue-900 transition">News</a>
            
            {/* "Join Us" now links to the new page */}
            <Link to="/join" className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition">
              Join Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <Link to="/" className="block py-3 px-4 text-gray-700 border-b" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="/#about" className="block py-3 px-4 text-gray-700 border-b" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="/#news" className="block py-3 px-4 text-gray-700 border-b" onClick={() => setIsOpen(false)}>News</a>
          <Link to="/join" className="block py-3 px-4 text-blue-900 font-bold bg-blue-50" onClick={() => setIsOpen(false)}>
            Join Us
          </Link>
        </div>
      )}
    </nav>
  );
}