import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

import Home from './pages/Home';
import Events from './pages/Events';
import Clubs from './pages/Clubs';
import Gallery from './pages/Gallery';
import Complaint from './pages/Complaint';
import AiChat from './pages/AiChat';
import Council from './pages/Council';

import SplitText from './components/ui/SplitText';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMouseObj = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', updateMouseObj);
    
    // Add hover listeners to interactive elements
    const elements = document.querySelectorAll('a, button, input, select, textarea, .cursor-pointer');
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMouseObj);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#D62828] rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#FFD700]/50 rounded-full pointer-events-none z-[9998]"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(214,40,40,0.1)' : 'transparent'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="/clubs" element={<PageWrapper><Clubs /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/complaint" element={<PageWrapper><Complaint /></PageWrapper>} />
        <Route path="/ai-chat" element={<PageWrapper><AiChat /></PageWrapper>} />
        <Route path="/council" element={<PageWrapper><Council /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-[#0B0F1A] flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="w-24 h-24 mb-6 flex items-center justify-center"
      >
        <img src="/RevaStudentCouncil.png" alt="Logo Loading" className="w-full h-full object-contain" />
      </motion.div>
      <div className="font-outfit font-black tracking-[0.2em] text-white/80 text-sm mb-8">
        <SplitText text="REVA STUDENT COUNCIL" delay={0.3} staggerDelay={0.05} />
      </div>
      
      {/* Progress Line */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="w-full h-full bg-gradient-to-r from-[#D62828] to-[#FFD700]"
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left bg-gradient-to-r from-[#D62828] to-[#FFD700]"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div key="main-app" className="relative z-10 hidden-scrollbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ScrollToTop />
            <Navbar />
            <main>
              <AnimatedRoutes />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
