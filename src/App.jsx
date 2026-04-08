import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { initializeData } from './data/mockData';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import Members from './pages/Members';
import Gallery from './pages/Gallery';
import ComplaintBox from './pages/ComplaintBox';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');
  const isLoggedIn = sessionStorage.getItem('adminSession') === 'true';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/clubs', label: 'Clubs' },
    { to: '/members', label: 'Members' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/complaint', label: 'Complaint Box' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-reva-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <img src="/RevaStudentCouncil.png" alt="REVA Student Council Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-outfit font-bold text-white text-sm leading-tight">REVA Student</div>
              <div className="font-outfit font-bold text-reva-gold text-xs leading-tight">Council</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!isAdmin && navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-reva-gold bg-reva-gold/10'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/admin" className="text-sm text-white/70 hover:text-white transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">Logout</button>
              </>
            ) : (
              <Link to="/admin-login" className="btn-primary text-sm py-2 px-4">Admin Login</Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-reva-navy/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'text-reva-gold bg-reva-gold/10'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full btn-outline text-sm py-2.5">Logout</button>
            ) : (
              <Link to="/admin-login" onClick={() => setIsOpen(false)} className="block w-full text-center btn-primary text-sm py-2.5">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-reva-navy border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/RevaStudentCouncil.png" alt="REVA Student Council Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-outfit font-bold text-white text-sm">REVA Student Council</div>
                <div className="text-reva-gold text-xs">Your Voice. Your Campus.</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              The official student governing body of REVA University, dedicated to student welfare and campus enrichment.
            </p>
          </div>
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[['/', 'Home'], ['/events', 'Events'], ['/clubs', 'Clubs & Forums'], ['/members', 'Members'], ['/gallery', 'Gallery'], ['/complaint', 'Complaint Box']].map(([to, label]) => (
                <Link key={to} to={to} className="block text-white/50 hover:text-reva-gold text-sm transition-colors duration-200">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/50">
              <p>📧 studentcouncil@reva.edu.in</p>
              <p>📍 REVA University, Bengaluru</p>
              <p>🕐 Mon–Fri: 9:00 AM – 5:00 PM</p>
              <div className="pt-3">
                <a href="https://www.instagram.com/reva_studentcouncil/" target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-105 transition-transform duration-200">
                  📸 Follow on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="divider mt-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">© 2025 REVA University Student Council. All rights reserved.</p>
          <p className="text-white/30 text-xs">Built with ❤️ by the REVA Student Council</p>
        </div>
      </div>
    </footer>
  );
}

// Protected Route
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('adminSession') === 'true';
  useEffect(() => {
    if (!isLoggedIn) navigate('/admin-login');
  }, [isLoggedIn, navigate]);
  return isLoggedIn ? children : null;
}

// App
export default function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-reva-navy">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/members" element={<Members />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/complaint" element={<ComplaintBox />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
