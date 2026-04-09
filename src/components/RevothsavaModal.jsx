import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './RevothsavaModal.css';

/* ── Particle burst helper ── */
function spawnParticles(containerRef) {
  const colors = ['#FF6B2B', '#FFB800', '#6366F1', '#EC4899', '#10B981', '#fff'];
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 5;
    p.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      bottom: 0;
      pointer-events: none;
      animation: particleFly ${2 + Math.random() * 3}s linear forwards;
      animation-delay: ${Math.random() * 1.5}s;
      z-index: 3;
    `;
    containerRef.current.appendChild(p);
    setTimeout(() => p.remove(), 6000);
  }
}

/* ── Countdown math ── */
function calcTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
  };
}

/* ── SVG tiny hexagon for the eyebrow pill ── */
const HexIcon = () => (
  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" style={{ marginRight: 6, flexShrink: 0 }}>
    <path d="M5 0.5L9.33 3.0V8.0L5 10.5L0.67 8.0V3.0L5 0.5Z" fill="#FF6B2B" />
  </svg>
);

/* ── Category tags ── */
const TAGS = ['Culture', 'Sports', 'Management', 'Music', 'Dance', 'Art', 'Tech'];

/* ── Stats ── */
const STATS = [
  { num: '20,000+', label: 'Students' },
  { num: '12+', label: 'Years Running' },
  { num: '100+', label: 'Events' },
  { num: 'National', label: 'Level' },
];

const TARGET_DATE = Date.now() + 90 * 86400000;

export default function RevothsavaModal({ onClose }) {
  const cardRef = useRef(null);
  const [time, setTime] = useState(() => calcTimeLeft(TARGET_DATE));
  const [flip, setFlip] = useState({});
  const [notified, setNotified] = useState(false);

  /* Countdown timer */
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        const next = calcTimeLeft(TARGET_DATE);
        const newFlip = {};
        if (prev.days !== next.days) newFlip.days = true;
        if (prev.hours !== next.hours) newFlip.hours = true;
        if (prev.mins !== next.mins) newFlip.mins = true;
        if (prev.secs !== next.secs) newFlip.secs = true;
        setFlip(newFlip);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* Clear flip class after animation */
  useEffect(() => {
    if (Object.keys(flip).length > 0) {
      const t = setTimeout(() => setFlip({}), 400);
      return () => clearTimeout(t);
    }
  }, [flip]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Particle burst */
  useEffect(() => {
    if (cardRef.current) spawnParticles(cardRef);
  }, []);

  /* Handle backdrop click (only if clicking the overlay itself) */
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const pad = (n) => String(n).padStart(2, '0');

  return ReactDOM.createPortal(
    <motion.div
      className="revo-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="revo-card"
        ref={cardRef}
        initial={{ scale: 0.6, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Background Layers ── */}
        <div className="revo-orb revo-orb-1" aria-hidden="true" />
        <div className="revo-orb revo-orb-2" aria-hidden="true" />
        <div className="revo-orb revo-orb-3" aria-hidden="true" />
        <div className="revo-grid" aria-hidden="true" />
        <div className="revo-vignette" aria-hidden="true" />

        {/* ── Content ── */}
        <div className="revo-content">

          {/* Close button */}
          <motion.button
            className="revo-close"
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>

          {/* 1 — Eyebrow pill */}
          <motion.div
            className="revo-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="revo-eyebrow-dot" />
            <HexIcon />
            NATIONAL LEVEL FEST
          </motion.div>

          {/* 2 — Main title */}
          <motion.div
            className="revo-title-group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="revo-title-line1">REVO</h2>
            <h2 className="revo-title-line2">THSAVA</h2>
          </motion.div>

          {/* 3 — Subtitle */}
          <motion.p
            className="revo-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            REVA UNIVERSITY &middot; BANGALORE &middot; EST. 2012
          </motion.p>

          {/* 4 — Divider */}
          <div className="revo-divider">
            <span className="revo-divider-line" />
            <span className="revo-divider-dot" />
            <span className="revo-divider-line" />
          </div>

          {/* 5 — Category tags */}
          <div className="revo-tags">
            {TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className="revo-tag"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.05 * i }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* 6 — Countdown */}
          <div className="revo-countdown">
            {[
              { val: pad(time.days), label: 'DAYS' },
              { val: pad(time.hours), label: 'HRS' },
              { val: pad(time.mins), label: 'MIN' },
              { val: pad(time.secs), label: 'SEC' },
            ].map((unit, i) => (
              <React.Fragment key={unit.label}>
                {i > 0 && <span className="revo-countdown-sep">:</span>}
                <div className="revo-countdown-unit">
                  <span className={`revo-countdown-num ${flip[['days','hours','mins','secs'][i]] ? 'flip' : ''}`}>
                    {unit.val}
                  </span>
                  <span className="revo-countdown-label">{unit.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* 7 — CTA */}
          <div className="revo-cta-wrap">
            <motion.button
              className="revo-cta-btn"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setNotified(true)}
            >
              {notified ? "You're on the list!" : 'Notify Me When Live'}
            </motion.button>
            {notified && (
              <motion.p
                className="revo-notified"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                We'll let you know when it goes live!
              </motion.p>
            )}
          </div>

          {/* 8 — Stats row */}
          <div className="revo-stats">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="revo-stat"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + 0.08 * i }}
              >
                <span className="revo-stat-num">{s.num}</span>
                <span className="revo-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
