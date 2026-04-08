import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FEATURED_CLUBS = [
  { 
    id: 1, name: 'GDG REVA', category: 'Tech', tagline: 'Build, learn, grow with Google tech', 
    initial: 'G', accentColor: '#6366F1', gradStart: '#6366F1', gradEnd: '#8B5CF6',
    badgeBg: 'rgba(99,102,241,0.15)', badgeText: '#A5B4FC',
    logo: '/LogosClubs/GDG.jpg', animation: 'floatA 6s ease-in-out infinite' 
  },
  { 
    id: 2, name: 'Dopamine', category: 'Cultural', tagline: 'Campus culture & creative energy',
    initial: 'D', accentColor: '#FF6B2B', gradStart: '#FF6B2B', gradEnd: '#FFB800',
    badgeBg: 'rgba(255,107,43,0.15)', badgeText: '#FCA97E',
    logo: '/LogosClubs/Dopamine.jpg', animation: 'floatB 7.5s ease-in-out infinite 1s' 
  },
  { 
    id: 3, name: 'OsCode', category: 'Tech', tagline: 'Open source, open minds',
    initial: 'O', accentColor: '#10B981', gradStart: '#10B981', gradEnd: '#06B6D4',
    badgeBg: 'rgba(16,185,129,0.15)', badgeText: '#6EE7B7',
    logo: '/LogosClubs/oscode reva.jpg', animation: 'floatC 5.5s ease-in-out infinite 0.5s' 
  },
  { 
    id: 4, name: 'Kalaaparva', category: 'Arts', tagline: 'Fine arts, design & creativity',
    initial: 'K', accentColor: '#EC4899', gradStart: '#EC4899', gradEnd: '#8B5CF6',
    badgeBg: 'rgba(236,72,153,0.15)', badgeText: '#F9A8D4',
    logo: '/LogosClubs/KALAAPARVA - REVA Theatre Club.jpg', animation: 'floatD 8s ease-in-out infinite 1.8s' 
  },
];

const cssStyles = `
@keyframes floatA {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
@keyframes floatB {
  0%, 100% { transform: translateY(-4px); }
  50% { transform: translateY(10px); }
}
@keyframes floatC {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-18px); }
}
@keyframes floatD {
  0%, 100% { transform: translateY(-6px); }
  50% { transform: translateY(8px); }
}
@keyframes orbDrift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(40px, 20px) scale(1.1); }
}
@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}
.orb-orange {
  width: 500px; height: 500px;
  background: rgba(255, 107, 43, 0.08);
  top: -150px; left: -150px;
  animation: orbDrift 12s ease-in-out infinite alternate;
}
.orb-purple {
  width: 400px; height: 400px;
  background: rgba(99, 102, 241, 0.07);
  bottom: -100px; right: -100px;
  animation: orbDrift 15s ease-in-out infinite alternate-reverse;
}

.fc-anim-wrapper {
  height: 100%;
}
.fc-anim-wrapper:hover {
  animation-play-state: paused !important;
}

.featured-club-card {
  background: #111318;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 24px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  min-height: 180px;
}

.featured-club-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--card-accent-color-transparent), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.featured-club-card:hover {
  border-color: var(--card-accent-color);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--card-accent-color);
}

.featured-club-card:hover::after {
  opacity: 1;
}

.fc-arrow {
  position: absolute;
  bottom: 18px;
  right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.featured-club-card:hover .fc-arrow {
  opacity: 1;
  transform: translateX(0);
}
`;

function FeaturedCard({ club, index }) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        delay: 0.12 * index, 
        duration: 0.5,
        type: 'spring', stiffness: 200, damping: 20 
      }}
      className="fc-anim-wrapper"
      style={{ animation: club.animation }}
    >
      <motion.div
        className="featured-club-card h-full flex flex-col items-start text-left"
        style={{ 
          '--card-accent-color': club.accentColor,
          '--card-accent-color-transparent': `color-mix(in srgb, ${club.accentColor} 10%, transparent)`
        }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => navigate('/clubs')}
      >
        {/* Logo/Avatar */}
        <div 
          className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center text-2xl font-black text-white shadow-lg overflow-hidden mb-5 shrink-0 relative z-10"
          style={imgError ? { background: `linear-gradient(135deg, ${club.gradStart}, ${club.gradEnd})` } : {}}
        >
          {!imgError ? (
            <img 
              src={club.logo} 
              alt={club.name} 
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            club.initial
          )}
        </div>

        {/* Badge */}
        <div 
          className="px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider mb-3 relative z-10"
          style={{ background: club.badgeBg, color: club.badgeText }}
        >
          {club.category}
        </div>

        {/* Text Details */}
        <h3 className="font-outfit font-bold text-xl text-white mb-2 relative z-10">{club.name}</h3>
        <p className="text-white/40 text-sm leading-snug relative z-10 pr-6">{club.tagline}</p>

        {/* Arrow Button */}
        <div className="fc-arrow z-10">
          <ArrowRight size={14} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedClubs() {
  const categories = ['Tech', 'Cultural', 'Arts', 'Social'];

  return (
    <>
      <style>{cssStyles}</style>
      <section className="relative overflow-hidden bg-[#0A0B0F] py-[100px] sm:px-[40px] px-[20px]">
        {/* Ambient Background Orbs */}
        <div className="ambient-orb orb-orange" />
        <div className="ambient-orb orb-purple" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 max-w-[960px] mx-auto text-center"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,107,43,0.1)', border: '1px solid rgba(255,107,43,0.25)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B]" style={{ animation: 'pulseDot 2s infinite' }} />
              <span className="text-[#FF6B2B] text-[11px] font-bold tracking-[1.5px] uppercase">Student Clubs</span>
            </div>

            <h2 className="font-outfit font-black text-[clamp(2.5rem,5vw,52px)] text-white leading-tight mb-6">
              <span className="block mx-1">Find Your</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2B] to-[#FFB800] mx-1">Tribe.</span>
            </h2>

            <p className="text-white/50 text-lg max-w-md mx-auto leading-relaxed mb-10">
              The clubs that define REVA — officially recognised, always active.
            </p>

            {/* Floating Category Chips */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, i) => (
                <div 
                  key={cat}
                  className="px-4 py-2 rounded-[30px] border border-white/10 bg-white/5 text-white/70 text-sm font-medium"
                  style={{ animation: `floatA 10s ease-in-out infinite ${i * 0.8}s` }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {FEATURED_CLUBS.map((club, index) => (
              <FeaturedCard key={club.id} club={club} index={index} />
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-[48px]">
            <Link 
              to="/clubs"
              className="inline-flex items-center justify-center bg-[#FF6B2B] hover:bg-[#E85E22] text-white font-bold text-[14px] rounded-[30px] px-[32px] py-[13px] transition-all transform hover:-translate-y-[2px] shadow-[0_4px_14px_rgba(255,107,43,0.2)] hover:shadow-[0_12px_28px_rgba(255,107,43,0.4)]"
            >
              Explore All 23+ Clubs <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link 
              to="/clubs"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/25 text-[#9CA3AF] hover:text-white font-bold text-[14px] rounded-[30px] px-[32px] py-[13px] transition-all"
            >
              Browse by Category
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
