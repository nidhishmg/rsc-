import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING OBJECT — anti-gravity tilt + float effect
// ─────────────────────────────────────────────────────────────────────────────
export function FloatingObject({ children, floatY = 18, duration = 4, delay = 0 }) {
  const rotX = useSpring(0, { stiffness: 120, damping: 18 });
  const rotY = useSpring(0, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotY.set((e.clientX - cx) / 6);
    rotX.set(-(e.clientY - cy) / 6);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      animate={{ y: [0, -floatY, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON — cursor attraction effect
// ─────────────────────────────────────────────────────────────────────────────
export function MagneticButton({ children, className = '', style = {}, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        className={className}
        style={style}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER — CountUp effect
// ─────────────────────────────────────────────────────────────────────────────
export function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL — fade up on scroll
// ─────────────────────────────────────────────────────────────────────────────
export function ScrollReveal({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPLIT TEXT HEADING — letters stagger in
// ─────────────────────────────────────────────────────────────────────────────
export function SplitText({ text, className = '', staggerDelay = 0.04, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * staggerDelay, ease: 'backOut' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPOTLIGHT CARD — glowing cursor light
// ─────────────────────────────────────────────────────────────────────────────
export function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`glass-card relative overflow-hidden cursor-pointer ${className}`}
      style={{ position: 'relative' }}
    >
      {visible && (
        <div
          style={{
            position: 'absolute',
            left: pos.x - 120,
            top: pos.y - 120,
            width: 240,
            height: 240,
            background: 'radial-gradient(circle, rgba(214,40,40,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AURORA BACKGROUND — animated gradient orbs
// ─────────────────────────────────────────────────────────────────────────────
export function AuroraBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {/* Main aurora blobs */}
      {[
        { color: 'rgba(214,40,40,0.18)', x: '20%', y: '30%', size: 600, duration: 8 },
        { color: 'rgba(255,215,0,0.10)', x: '75%', y: '20%', size: 500, duration: 10 },
        { color: 'rgba(139,92,246,0.12)', x: '50%', y: '70%', size: 700, duration: 12 },
        { color: 'rgba(214,40,40,0.08)', x: '85%', y: '60%', size: 400, duration: 9 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
      {/* Noise grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE FIELD — floating dots
// ─────────────────────────────────────────────────────────────────────────────
export function ParticleField({ count = 30 }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.4,
    }))
  ).current;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#FFD700',
          }}
          animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
