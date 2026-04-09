import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MysteryBox.css';

const PARTICLE_COLORS = ['#FF8C28', '#FFD060', '#ffffff', '#6366F1', '#EC4899', '#10B981'];

function ChestSVG({ lidOpen }) {
  return (
    <svg
      viewBox="0 200 220"
      width="220"
      height="240"
      style={{ overflow: 'visible', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Body gradients */}
        <linearGradient id="rsc-bodyFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E1C08" />
          <stop offset="100%" stopColor="#1A0E04" />
        </linearGradient>
        <linearGradient id="rsc-bodyTopFace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A2410" />
          <stop offset="100%" stopColor="#241508" />
        </linearGradient>
        <linearGradient id="rsc-bodySide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#120A02" />
          <stop offset="100%" stopColor="#1E1206" />
        </linearGradient>
        {/* Lid gradients */}
        <linearGradient id="rsc-lidFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3C2410" />
          <stop offset="100%" stopColor="#2A1808" />
        </linearGradient>
        <linearGradient id="rsc-lidTopFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A2E14" />
          <stop offset="100%" stopColor="#321E0C" />
        </linearGradient>
        <linearGradient id="rsc-lidSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E1006" />
          <stop offset="100%" stopColor="#2A1808" />
        </linearGradient>
        {/* Gold */}
        <linearGradient id="rsc-goldV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0C060" />
          <stop offset="50%" stopColor="#C88030" />
          <stop offset="100%" stopColor="#F0C060" />
        </linearGradient>
        <linearGradient id="rsc-goldH" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8A840" />
          <stop offset="50%" stopColor="#C07820" />
          <stop offset="100%" stopColor="#E8A840" />
        </linearGradient>
        {/* Crack */}
        <linearGradient id="rsc-crackGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="#FFD060" />
          <stop offset="50%" stopColor="#FF8C28" />
          <stop offset="80%" stopColor="#FFD060" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        {/* Filters */}
        <filter id="rsc-softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="rsc-glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ═══ 20. GROUND SHADOW ═══ */}
      <ellipse cx="100" cy="212" rx="72" ry="8" fill="rgba(0,0,0,0.45)" filter="url(#rsc-softGlow)" />

      {/* ═══ 1. BODY RIGHT SIDE FACE ═══ */}
      <polygon points="154,186 186,168 186,108 154,126" fill="url(#rsc-bodySide)" stroke="#4A2E10" strokeWidth="1" />

      {/* ═══ 2. BODY TOP STRIP ═══ */}
      <polygon points="46,126 154,126 186,108 78,108" fill="url(#rsc-bodyTopFace)" stroke="#4A2E10" strokeWidth="0.5" />

      {/* ═══ 3. BODY FRONT FACE ═══ */}
      <rect x="46" y="126" width="108" height="60" rx="2" fill="url(#rsc-bodyFront)" stroke="#5A3418" strokeWidth="1" />

      {/* ═══ 4. BODY BOTTOM BAND ═══ */}
      <rect x="46" y="168" width="108" height="12" rx="2" fill="#241408" stroke="#4A2A0E" strokeWidth="0.5" />

      {/* ═══ 5. CRACK GLOW ═══ */}
      <rect className="crack-glow" x="46" y="122" width="108" height="6" rx="3" fill="url(#rsc-crackGrad)" filter="url(#rsc-softGlow)" />
      <line className="crack-line" x1="46" y1="126" x2="154" y2="126" stroke="url(#rsc-crackGrad)" strokeWidth="1.8" />

      {/* ═══ 6. RUNE SYMBOLS ═══ */}
      <g className="rune" transform="translate(76,152) rotate(45,7,7)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="none" stroke="#C06020" strokeWidth="1.5" />
        <rect x="4" y="4" width="6" height="6" rx="1" fill="rgba(255,120,40,0.2)" />
      </g>
      <g className="rune2" transform="translate(93,149) rotate(45,8,8)">
        <rect x="0" y="0" width="16" height="16" rx="2" fill="none" stroke="#C06020" strokeWidth="1.5" />
        <rect x="5" y="5" width="6" height="6" rx="1" fill="rgba(255,120,40,0.2)" />
        <circle cx="8" cy="8" r="2.5" fill="#FF8C28" />
      </g>
      <g className="rune3" transform="translate(117,152) rotate(45,7,7)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="none" stroke="#C06020" strokeWidth="1.5" />
        <rect x="4" y="4" width="6" height="6" rx="1" fill="rgba(255,120,40,0.2)" />
      </g>

      {/* ═══ 7. BODY GOLD CORNER STRIPS ═══ */}
      <rect x="46" y="128" width="5" height="54" fill="url(#rsc-goldV)" />
      <rect x="149" y="128" width="5" height="54" fill="url(#rsc-goldV)" />

      {/* ═══ 18. BODY HINGES (static, below lid) ═══ */}
      <rect x="46" y="124" width="16" height="12" rx="2" fill="#B06818" stroke="#9A5815" strokeWidth="0.5" />
      <rect x="138" y="124" width="16" height="12" rx="2" fill="#B06818" stroke="#9A5815" strokeWidth="0.5" />

      {/* ═══ 19. LOCK HASP on body ═══ */}
      <rect x="88" y="124" width="24" height="11" rx="2" fill="#C07820" stroke="#A06218" strokeWidth="0.5" />
      <rect x="92" y="126" width="16" height="8" rx="1" fill="#1A0C04" />

      {/* ═══════ LID GROUP ═══════ */}
      <g
        style={{
          transformOrigin: '100px 126px',
          transform: lidOpen ? 'rotateX(-135deg)' : 'none',
          transition: lidOpen ? 'transform 0.9s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
        }}
      >
        {/* 8. LID RIGHT SIDE */}
        <polygon points="154,126 186,108 186,66 154,84" fill="url(#rsc-lidSide)" stroke="#4A2E10" strokeWidth="0.5" />

        {/* 9. LID TOP FACE */}
        <polygon points="46,84 154,84 186,66 78,66" fill="url(#rsc-lidTopFace)" stroke="#4A2E10" strokeWidth="0.5" />

        {/* 10. LID FRONT FACE */}
        <rect x="46" y="84" width="108" height="42" rx="2" fill="url(#rsc-lidFront)" stroke="#6A3C18" strokeWidth="1" />

        {/* 11. LID TOP BAND */}
        <rect x="46" y="84" width="108" height="10" rx="2" fill="#3A2010" />

        {/* 12. LID GOLD TOP EDGE */}
        <line x1="46" y1="85" x2="154" y2="85" stroke="url(#rsc-goldH)" strokeWidth="2.5" />

        {/* 13. LID GOLD CORNER STRIPS */}
        <rect x="46" y="86" width="5" height="36" fill="url(#rsc-goldV)" />
        <rect x="149" y="86" width="5" height="36" fill="url(#rsc-goldV)" />

        {/* 14. VERTICAL STRAP */}
        <rect x="92" y="30" width="16" height="60" rx="3" fill="url(#rsc-goldV)" stroke="#8A5820" strokeWidth="1" />
        {/* Strap texture lines */}
        <line x1="96" y1="32" x2="96" y2="88" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
        <line x1="100" y1="32" x2="100" y2="88" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        <line x1="104" y1="32" x2="104" y2="88" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

        {/* 15. BUCKLE */}
        <rect x="85" y="86" width="30" height="18" rx="4" fill="#D09030" stroke="#F0C060" strokeWidth="1.5" />
        <rect x="89" y="89" width="22" height="12" rx="2" fill="#1A0C04" />
        <circle cx="100" cy="95" r="5" fill="#1A0C04" stroke="#F0B840" strokeWidth="1" />
        <circle className="gem" cx="100" cy="95" r="2.5" fill="#FF8C28" />

        {/* 16. HINGE LEFT (on lid) */}
        <rect x="46" y="119" width="16" height="16" rx="2" fill="#C07820" stroke="#F0B040" strokeWidth="0.5" />
        <circle cx="54" cy="127" r="4" fill="#1A0C04" stroke="#F0B040" strokeWidth="0.5" />

        {/* 17. HINGE RIGHT (on lid) */}
        <rect x="138" y="119" width="16" height="16" rx="2" fill="#C07820" stroke="#F0B040" strokeWidth="0.5" />
        <circle cx="146" cy="127" r="4" fill="#1A0C04" stroke="#F0B040" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

export default function MysteryBox({ onReveal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [lidOpen, setLidOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const hoverCountRef = useRef(0);
  const sectionRef = useRef(null);
  const explodeRef = useRef(null);
  const shakeTimer = useRef(null);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setIsShaking(false), 500);
  }, []);

  const triggerGlowExplosion = useCallback(() => {
    if (!explodeRef.current) return;
    explodeRef.current.classList.remove('go');
    void explodeRef.current.offsetWidth; // force reflow
    explodeRef.current.classList.add('go');
  }, []);

  const spawnParticles = useCallback(() => {
    const container = sectionRef.current;
    if (!container) return;
    for (let i = 0; i < 32; i++) {
      const p = document.createElement('div');
      const angle = (Math.PI * 2 / 32) * i + (Math.random() - 0.5) * 0.5;
      const dist = 70 + Math.random() * 150;
      const size = 2 + Math.random() * 7;
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      const tx = `translateX(${Math.cos(angle) * dist}px)`;
      const ty = `translateY(${(Math.sin(angle) * dist) - 70}px)`;
      const dur = 0.5 + Math.random() * 0.9;

      Object.assign(p.style, {
        position: 'absolute',
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        left: '50%', top: '45%',
        pointerEvents: 'none',
        zIndex: '20',
      });
      p.style.setProperty('--tx', tx);
      p.style.setProperty('--ty', ty);
      p.style.animation = `particleBurst ${dur}s linear forwards`;
      p.style.animationDelay = `${Math.random() * 0.15}s`;

      container.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (isOpen) return;

    // Step 1: shake
    triggerShake();

    // Step 2: open lid + effects
    setTimeout(() => {
      setIsOpen(true);
      setLidOpen(true);
      triggerGlowExplosion();
      spawnParticles();
      setTimeout(() => setRevealed(true), 300);
      setTimeout(() => { if (onReveal) onReveal(); }, 700);
    }, 350);
  }, [isOpen, triggerShake, triggerGlowExplosion, spawnParticles, onReveal]);

  const handleMouseEnter = useCallback(() => {
    if (isOpen) return;
    hoverCountRef.current += 1;
    if (hoverCountRef.current % 2 === 0) {
      triggerShake();
    }
  }, [isOpen, triggerShake]);

  return (
    <motion.section
      ref={sectionRef}
      className="mystery-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background effects */}
      <div className="mystery-bg-orb" />
      <div className="mystery-ring mystery-ring-1" />
      <div className="mystery-ring mystery-ring-2" />
      <div className="mystery-ring mystery-ring-3" />
      <div className="mystery-ground-glow" />

      {/* Label */}
      <motion.span
        className="mystery-label"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Something is coming to REVA
      </motion.span>

      {/* SVG Chest */}
      <motion.div
        className={`chest-wrap ${isShaking ? 'shake' : ''}`}
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 140, damping: 16 }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        role="button"
        tabIndex={0}
        aria-label="Click to reveal upcoming event"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      >
        <ChestSVG lidOpen={lidOpen} />
      </motion.div>

      {/* Glow explosion */}
      <div className="explode-glow" ref={explodeRef} />

      {/* Hint text */}
      {!revealed ? (
        <motion.span
          className="mystery-hint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Tap to reveal the secret
        </motion.span>
      ) : (
        <motion.span
          className="mystery-revealed-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          ✦ REVOTHSAVA — Coming Soon ✦
        </motion.span>
      )}
    </motion.section>
  );
}
