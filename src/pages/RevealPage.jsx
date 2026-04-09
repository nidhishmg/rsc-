import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PARTICLE_COLORS = ['#FF6B2B', '#FFB800', '#6366F1', '#EC4899', '#10B981', '#ffffff'];
const CONFETTI_COUNT = 60;

function ConfettiParticle({ color, delay }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 80 + Math.random() * 250;
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist - 100;
  const size = 4 + Math.random() * 8;
  const rotation = Math.random() * 720 - 360;

  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
      animate={{ x, y, scale: 0, rotate: rotation, opacity: 0 }}
      transition={{ duration: 1.2 + Math.random() * 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        width: size,
        height: size * (Math.random() > 0.5 ? 1 : 0.4),
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        left: '50%',
        top: '45%',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function RevealPage() {
  const [phase, setPhase] = useState('loading'); // loading → reveal
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('DECRYPTING DATA');
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const glitchStrings = [
    'DECRYPTING DATA', 'INITIALIZING CORE', 'SCANNING BLOCKS',
    'UNLOCKING VAULT', 'PARSING SIGNAL', 'AUTHENTICATING',
    'CONNECTING NODES', 'BREACHING FIREWALL', 'ACCESS GRANTED',
  ];

  useEffect(() => {
    const duration = 8000; // 8s countdown
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      // Glitch text swap
      if (Math.random() < 0.08) {
        setGlitchText(glitchStrings[Math.floor(Math.random() * glitchStrings.length)]);
      }

      if (p >= 1) {
        clearInterval(intervalRef.current);
        setPhase('reveal');
      }
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-[#080A0F] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#D62828]/5 blur-[120px] top-1/4 left-1/4 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-[100px] bottom-1/4 right-1/4 pointer-events-none" />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 relative z-10 px-4"
          >
            {/* Animated R logo */}
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(214,40,40,0.3)', '0 0 60px rgba(214,40,40,0.6)', '0 0 20px rgba(214,40,40,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 bg-gradient-to-br from-[#D62828] to-[#8B0000] rounded-2xl flex items-center justify-center font-outfit font-black text-white text-3xl"
            >
              R
            </motion.div>

            {/* Glitch text */}
            <motion.div
              className="font-outfit font-black text-white/40 text-sm tracking-[0.3em] uppercase"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {glitchText}
            </motion.div>

            {/* Progress bar */}
            <div className="w-72 md:w-96">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D62828] to-[#FFD700] rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white/30 text-xs font-mono">{Math.floor(progress * 100)}%</span>
                <span className="text-white/30 text-xs font-mono">{Math.ceil((1 - progress) * 8)}s remaining</span>
              </div>
            </div>

            {/* Scanning lines */}
            <div className="flex gap-1.5 mt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#D62828]"
                  animate={{ height: [8, 24, 8], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center relative z-10 px-4"
          >
            {/* Confetti burst */}
            {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
              <ConfettiParticle key={i} color={PARTICLE_COLORS[i % PARTICLE_COLORS.length]} delay={i * 0.02} />
            ))}

            {/* Glow flash */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-40 h-40 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.6), rgba(214,40,40,0.3), transparent)' }}
            />

            {/* Main title */}
            <motion.h1
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 14 }}
              className="font-outfit font-black text-center leading-none mb-4"
            >
              <span className="text-[clamp(3rem,10vw,6rem)] text-white block">REVO</span>
              <span className="text-[clamp(3rem,10vw,6rem)] block" style={{ background: 'linear-gradient(135deg, #FFD700, #FF6B2B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                THSAVA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/50 text-sm tracking-[0.2em] uppercase font-outfit mb-2"
            >
              REVA University · Bangalore · Est. 2012
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-2 mt-4 mb-8"
            >
              {['Culture', 'Sports', 'Tech', 'Music', 'Dance', 'Art'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs font-outfit">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[#FFD700] text-lg font-outfit font-bold tracking-widest mb-10"
            >
              ✦ COMING SOON ✦
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              onClick={() => navigate('/')}
              className="btn-primary px-8 py-4 text-base font-outfit font-bold tracking-wider"
            >
              RETURN TO CAMPUS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
