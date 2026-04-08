import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const links = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/clubs', label: 'Clubs' },
    { to: '/team', label: 'Team' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/complaint', label: 'Complaint' },
    { to: '/ai-chat', label: 'AI Chat' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0F1A]/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-50">
              <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <img src="/RevaStudentCouncil.png" alt="RSC Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div className="hidden sm:block">
                <div className="font-outfit font-black text-white text-sm tracking-wide leading-tight group-hover:text-reva-red transition-colors">REVA STUDENT</div>
                <div className="font-outfit font-bold text-[#FFD700] text-xs tracking-widest leading-tight opacity-80">COUNCIL</div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2">
              {links.map(link => {
                const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 font-outfit font-semibold text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D62828] to-[#FFD700] rounded-full mx-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white p-2 z-50 relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0B0F1A]/95 backdrop-blur-xl pt-24 px-4 flex flex-col gap-4 md:hidden"
          >
            {links.map(link => {
              const isActive = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`p-4 rounded-xl font-outfit font-bold text-xl transition-all ${isActive ? 'bg-white/10 text-[#FFD700]' : 'text-white hover:bg-white/5'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
