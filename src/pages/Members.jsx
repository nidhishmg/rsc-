import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Crown, Star, Award, Users, Camera, Layers, Zap, ArrowRight, History,
  Linkedin, Instagram,
} from 'lucide-react';
import { councilMembers } from '../data/mockData';
import FloatingObject from '../components/ui/FloatingObject';
import MagneticButton from '../components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// ─── ROLE CONFIG ───
const ROLE_CONFIG = {
  "President":           { tier: 0, color: "#FFD700", glow: "rgba(255,215,0,0.6)",    gradient: ["#FFD700","#b8860b"], ring: true  },
  "Vice President":      { tier: 1, color: "#C89FFF", glow: "rgba(200,140,255,0.55)", gradient: ["#C89FFF","#6C3082"], ring: true  },
  "General Secretary":   { tier: 2, color: "#FF9966", glow: "rgba(255,153,100,0.45)", gradient: ["#FF9966","#cc4400"], ring: false },
  "Joint Secretary":     { tier: 3, color: "#7ECFFF", glow: "rgba(100,200,255,0.4)",  gradient: ["#7ECFFF","#1565C0"], ring: false },
  "Treasurer":           { tier: 3, color: "#80FFD4", glow: "rgba(80,255,180,0.4)",   gradient: ["#80FFD4","#00695C"], ring: false },
  "Sports Secretary":    { tier: 4, color: "#FF6B6B", glow: "rgba(255,107,107,0.35)", gradient: ["#FF6B6B","#D62828"], ring: false },
  "Cultural Secretary":  { tier: 4, color: "#FFB347", glow: "rgba(255,179,71,0.35)",  gradient: ["#FFB347","#e65c00"], ring: false },
  "NSS & NCC Secretary": { tier: 4, color: "#96CEB4", glow: "rgba(150,206,180,0.35)", gradient: ["#96CEB4","#1a5c3a"], ring: false },
  "Media Team":          { tier: 5, color: "#74B9FF", glow: "rgba(116,185,255,0.3)",  gradient: ["#74B9FF","#0984e3"], ring: false },
  "Media & Design Team": { tier: 5, color: "#A29BFE", glow: "rgba(162,155,254,0.3)",  gradient: ["#A29BFE","#6c5ce7"], ring: false },
  "Technical Team":      { tier: 5, color: "#55EFC4", glow: "rgba(85,239,196,0.3)",   gradient: ["#55EFC4","#00b894"], ring: false },
  "PR & Marketing":      { tier: 5, color: "#FD79A8", glow: "rgba(253,121,168,0.3)",  gradient: ["#FD79A8","#e84393"], ring: false },
  "Event Management":    { tier: 5, color: "#FDCB6E", glow: "rgba(253,203,110,0.3)",  gradient: ["#FDCB6E","#e17055"], ring: false },
  "Club Coordinator":    { tier: 5, color: "#81ECEC", glow: "rgba(129,236,236,0.3)",  gradient: ["#81ECEC","#00cec9"], ring: false },
  "Executive Member":    { tier: 6, color: "#b2bec3", glow: "rgba(178,190,195,0.25)", gradient: ["#b2bec3","#636e72"], ring: false },
  "Senior Mentor":       { tier: 7, color: "#DFE6E9", glow: "rgba(223,230,233,0.2)",  gradient: ["#DFE6E9","#b2bec3"], ring: false },
};
const DEFAULT_CONFIG = { color: "#aaa", glow: "rgba(170,170,170,0.25)", gradient: ["#aaa","#555"], ring: false };

const AVATAR_GRADIENTS = [
  ["#D62828","#7b0000"], ["#FFD700","#b8860b"], ["#6C3082","#2d0052"],
  ["#1565C0","#0a2342"], ["#00695C","#00251a"], ["#AD1457","#560027"],
  ["#4527A0","#1a0072"], ["#00838F","#00363a"], ["#E65100","#7f2a00"],
  ["#37474F","#102027"],
];

const SECTIONS = [
  { key: "leadership",  label: "Core Leadership",  accent: "#FFD700", icon: Crown,  roles: ["President","Vice President","General Secretary","Joint Secretary","Treasurer"] },
  { key: "secretaries", label: "Secretaries",       accent: "#FF9966", icon: Users,  roles: ["Sports Secretary","Cultural Secretary","NSS & NCC Secretary"] },
  { key: "media",       label: "Media & Design",    accent: "#74B9FF", icon: Camera, roles: ["Media Team"] },
  { key: "departments", label: "Departments",        accent: "#55EFC4", icon: Layers, roles: ["Technical Team","PR & Marketing","Event Management","Club Coordinator"] },
  { key: "executive",   label: "Executive Members", accent: "#b2bec3", icon: Star,   roles: ["Executive Member"] },
  { key: "mentors",     label: "Senior Mentors",    accent: "#DFE6E9", icon: Award,  roles: ["Senior Mentor"] },
];

/** Resolve the photo URL for a member */
function getPhotoSrc(member) {
  if (member.photo) return `/CouncilMembers/${member.photo}`;
  return null;
}

// ─── BG ORBS ───
function BgOrbs() {
  const orbs = [
    { color: "#D62828", size: 500, x: "-10%", y: "5%",  delay: 0,  dur: 12 },
    { color: "#FFD700", size: 400, x: "70%",  y: "-5%", delay: 2,  dur: 14 },
    { color: "#6C3082", size: 450, x: "10%",  y: "50%", delay: 4,  dur: 10 },
    { color: "#1565C0", size: 350, x: "80%",  y: "60%", delay: 1,  dur: 16 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {orbs.map((o, i) => (
        <motion.div key={i} style={{
          position: 'absolute', left: o.x, top: o.y, width: o.size, height: o.size,
          borderRadius: '50%', background: `radial-gradient(circle, ${o.color}18 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
          animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── STAT PILL ───
function StatPill({ value, suffix, label, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(value / 50));
    const t = setInterval(() => {
      cur = Math.min(cur + step, value);
      setCount(cur);
      if (cur >= value) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '18px 28px', textAlign: 'center', minWidth: 110,
      }}>
      <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '2.4rem', color: accent, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.1em', marginTop: 6, textTransform: 'uppercase' }}>{label}</div>
    </motion.div>
  );
}

// ─── SCROLL REVEAL ───
function ScrollReveal({ children, delay = 0, direction = "up" }) {
  const map = { up: { opacity: 0, y: 24 }, left: { opacity: 0, x: -24 }, right: { opacity: 0, x: 24 }, none: { opacity: 0 } };
  return (
    <motion.div initial={map[direction] || map.up} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── SECTION HEADER ───
function SectionHeader({ label, count, accent, icon: Icon }) {
  return (
    <ScrollReveal direction="left">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 40 }}>
        <div style={{ width: 4, height: 56, background: accent, borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700,
            color: accent, letterSpacing: '0.15em', marginBottom: 4, textTransform: 'uppercase' }}>
            {Icon && <Icon size={12} />} {label}
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'white', lineHeight: 1, margin: 0 }}>{label}</h2>
        </div>
        {count != null && (
          <div style={{ marginLeft: 'auto', alignSelf: 'center', padding: '5px 14px', borderRadius: 99,
            background: `${accent}18`, border: `1px solid ${accent}35`, color: accent, fontSize: 13, fontWeight: 700 }}>
            {count} members
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

// ─── PHOTO CARD (standard) ───
function PhotoCard({ member, index, size = 'md' }) {
  const cfg = ROLE_CONFIG[member.role] ?? DEFAULT_CONFIG;
  const [imgError, setImgError] = useState(false);
  const [grad1, grad2] = AVATAR_GRADIENTS[(member.id - 1) % AVATAR_GRADIENTS.length];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const photoSrc = getPhotoSrc(member);

  const rotX = useMotionValue(0), rotY = useMotionValue(0);
  const sp = { stiffness: 200, damping: 25 };
  const rotXS = useSpring(rotX, sp), rotYS = useSpring(rotY, sp);
  const handleMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    rotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6);
    rotX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 6);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  const cardH = size === 'lg' ? 420 : size === 'sm' ? 280 : 340;

  return (
    <motion.div
      style={{ rotateX: rotXS, rotateY: rotYS, transformPerspective: 800 }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="group" style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden', height: cardH,
        cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
        whileHover={{ boxShadow: `0 0 0 2px ${cfg.color}60, 0 20px 60px ${cfg.glow}`, borderColor: `${cfg.color}40` }}
      >
        {/* Layer 1: Full-bleed photo or gradient fallback */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {photoSrc && !imgError ? (
            <img src={photoSrc} loading="lazy" decoding="async"
              fetchPriority={member.id <= 2 ? "high" : "auto"}
              alt={member.name} onError={() => setImgError(true)}
              className="photo-card-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                transition: 'transform 0.5s ease, filter 0.5s ease', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%',
              background: `linear-gradient(160deg, ${grad1} 0%, ${grad2} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: cardH * 0.24,
                color: 'rgba(255,255,255,0.8)', userSelect: 'none' }}>{initials}</span>
            </div>
          )}
        </div>

        {/* Layer 2: Bottom vignette (always visible) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)' }} />

        {/* Layer 3: Hover overlay (dark+blur via CSS) */}
        <div className="photo-card-overlay" style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'rgba(10,15,30,0.6)', backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)',
          opacity: 0, transition: 'opacity 0.4s ease, backdrop-filter 0.4s ease',
        }} />

        {/* Layer 4: Info panel (frost glass at bottom) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
          background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px',
          transition: 'padding 0.4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <h3 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 15, color: 'white', margin: 0,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{member.name}</h3>
            <div style={{ flexShrink: 0, padding: '3px 9px', borderRadius: 99,
              background: `${cfg.color}20`, border: `1px solid ${cfg.color}50`,
              color: cfg.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{member.role}</div>
          </div>
          <div className="photo-card-details" style={{
            overflow: 'hidden', maxHeight: 0, opacity: 0,
            transition: 'max-height 0.4s ease, opacity 0.3s ease 0.05s' }}>
            <p style={{ fontFamily: 'Outfit', fontSize: 12, color: 'rgba(255,255,255,0.55)',
              margin: '6px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {member.department}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── HERO PHOTO CARD (President / VP) ───
function HeroPhotoCard({ member, delay = 0, maxWidth = '480px' }) {
  const cfg = ROLE_CONFIG[member.role] ?? DEFAULT_CONFIG;
  const [imgError, setImgError] = useState(false);
  const [grad1, grad2] = AVATAR_GRADIENTS[(member.id - 1) % AVATAR_GRADIENTS.length];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const photoSrc = getPhotoSrc(member);

  const rotX = useMotionValue(0), rotY = useMotionValue(0);
  const sp = { stiffness: 120, damping: 18 };
  const rotXS = useSpring(rotX, sp), rotYS = useSpring(rotY, sp);
  const handleMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    rotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 12);
    rotX.set(-((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 12);
  };
  const handleLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      style={{ rotateX: rotXS, rotateY: rotYS, transformPerspective: 1000,
        maxWidth, margin: '0 auto 32px' }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group" style={{
        position: 'relative', borderRadius: 28, overflow: 'hidden', height: 520,
        border: `1px solid ${cfg.color}30`, transition: 'box-shadow 0.5s ease',
        boxShadow: `0 0 60px ${cfg.glow}`,
      }}>
        {/* Rotating glow ring for President/VP */}
        {cfg.ring && (
          <div style={{ position: 'absolute', inset: -4, borderRadius: 32, zIndex: -1,
            background: `conic-gradient(${cfg.color}, transparent 120deg, ${cfg.color} 240deg, transparent 360deg)`,
            animation: 'spin 4s linear infinite', pointerEvents: 'none',
            filter: 'blur(6px)', opacity: 0.8 }} />
        )}

        {/* Full-bleed photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          {photoSrc && !imgError ? (
            <img src={photoSrc} loading="eager" decoding="auto"
              fetchPriority="high" alt={member.name}
              onError={() => setImgError(true)} className="photo-card-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                transition: 'transform 0.6s ease, filter 0.6s ease', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%',
              background: `linear-gradient(160deg, ${grad1}, ${grad2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 120,
                color: 'rgba(255,255,255,0.8)' }}>{initials}</span>
            </div>
          )}
        </div>

        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)' }} />

        {/* Hover overlay */}
        <div className="photo-card-overlay" style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(10,15,30,0.5)', backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)',
          opacity: 0, transition: 'opacity 0.4s ease, backdrop-filter 0.4s ease',
        }} />

        {/* Info panel */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
          background: 'rgba(8,12,24,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          borderTop: `1px solid ${cfg.color}20`, padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 26,
              color: 'white', margin: 0, flex: 1 }}>{member.name}</h2>
            <div style={{ padding: '5px 14px', borderRadius: 99, background: `${cfg.color}20`,
              border: `1px solid ${cfg.color}50`, color: cfg.color, fontSize: 11, fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>{member.role}</div>
          </div>
          <div className="photo-card-details" style={{
            overflow: 'hidden', maxHeight: 0, opacity: 0,
            transition: 'max-height 0.45s ease, opacity 0.3s ease 0.05s' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0' }}>
              {member.department}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FOUNDATION ROW ───
function FoundationRow({ member, index }) {
  const cfg = ROLE_CONFIG[member.role] ?? DEFAULT_CONFIG;
  const [imgError, setImgError] = useState(false);
  const [grad1, grad2] = AVATAR_GRADIENTS[(member.id - 1) % AVATAR_GRADIENTS.length];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      style={{ display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 16px', borderRadius: 16,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.3s, border-color 0.3s', cursor: 'default' }}>
      <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
        border: `2px solid ${cfg.color}40`, background: `linear-gradient(135deg, ${grad1}, ${grad2})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!imgError ? (
          <img src={`/team/${member.id}.jpg`} loading="lazy" decoding="async"
            alt={member.name} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        ) : (
          <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 18,
            color: 'rgba(255,255,255,0.85)' }}>{initials}</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 14, color: 'white', margin: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '2px 0 0' }}>{member.role}</p>
      </div>
      <div style={{ padding: '3px 10px', borderRadius: 99, flexShrink: 0,
        background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)',
        color: '#FFD700', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>FOUNDER</div>
    </motion.div>
  );
}

// ─── MAIN PAGE ───
export default function Members() {
  const navigate = useNavigate();
  const underlineRef = useRef(null);
  const heroRef = useRef(null);
  const members = councilMembers.current;
  const foundation = councilMembers.foundation;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (underlineRef.current) {
        gsap.fromTo(underlineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8, delay: 0.9, ease: 'power3.out' }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const president = members.find(m => m.role === 'President');
  const vp = members.find(m => m.role === 'Vice President');
  const genSec = members.find(m => m.role === 'General Secretary');
  const jointSec = members.find(m => m.role === 'Joint Secretary');
  const treasurer = members.find(m => m.role === 'Treasurer');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container pb-40" style={{ position: 'relative', overflowX: 'hidden' }}>
      <BgOrbs />

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ paddingTop: 128, paddingBottom: 64, textAlign: 'center',
        position: 'relative', zIndex: 1, padding: '128px 16px 64px' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 99,
            border: '1px solid rgba(214,40,40,0.35)', background: 'rgba(214,40,40,0.08)',
            marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D62828', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 12,
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            REVA Student Council · 2025–26
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: 'Outfit', fontWeight: 900, lineHeight: 1.05,
            fontSize: 'clamp(3rem, 8vw, 6rem)', margin: '0 0 12px' }}>
          <span style={{ color: 'white', display: 'block' }}>Meet the</span>
          <span className="gradient-text" style={{ display: 'block' }}>Council</span>
        </motion.h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div ref={underlineRef} style={{ width: 120, height: 3, borderRadius: 99,
            background: 'linear-gradient(90deg, #D62828, #FFD700)' }} />
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
          style={{ fontFamily: 'Outfit', fontSize: 18, color: 'rgba(255,255,255,0.5)',
            maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.6 }}>
          38 students. One vision. Building a campus that belongs to everyone.
        </motion.p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <StatPill value={38}   suffix=""  label="Members"       accent="#FFD700" />
          <StatPill value={23}   suffix="+" label="Active Clubs"  accent="#D62828" />
          <StatPill value={50}   suffix="+" label="Events / Year" accent="#74B9FF" />
          <StatPill value={8000} suffix="+" label="Students"      accent="#55EFC4" />
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>

        {/* PRESIDENT & VP — Hero Cards */}
        <section style={{ marginBottom: 64 }}>
          <SectionHeader label="Core Leadership" accent="#FFD700" icon={Crown} count={5} />
          {president && <HeroPhotoCard member={president} maxWidth="460px" delay={0} />}
          {vp && <HeroPhotoCard member={vp} maxWidth="400px" delay={0.15} />}
        </section>

        {/* ALL SECTIONS (including Gen Sec / Joint Sec / Treasurer as regular cards) */}
        {SECTIONS.map(section => {
          // For leadership section, only show Gen Sec, Joint Sec, Treasurer (skip Pres & VP — already rendered above)
          let sectionMembers;
          if (section.key === 'leadership') {
            sectionMembers = members.filter(m =>
              ['General Secretary', 'Joint Secretary', 'Treasurer'].includes(m.role)
            );
          } else {
            sectionMembers = section.roles.flatMap(role =>
              members.filter(m => m.role === role)
            );
          }
          if (!sectionMembers.length) return null;

          // For leadership remainder, skip the section header (already shown above)
          const showHeader = section.key !== 'leadership';

          return (
            <section key={section.key} style={{ marginBottom: 80 }}>
              {showHeader && (
                <SectionHeader label={section.label} accent={section.accent}
                  icon={section.icon} count={sectionMembers.length} />
              )}

              {/* Single or multi-role sections */}
              {section.roles.length > 1 && section.key !== 'leadership' ? (
                section.roles.map(role => {
                  const roleMembers = members.filter(m => m.role === role);
                  if (!roleMembers.length) return null;
                  const rcfg = ROLE_CONFIG[role] ?? DEFAULT_CONFIG;
                  return (
                    <div key={role} style={{ marginBottom: 32 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                        marginBottom: 16, padding: '5px 14px', borderRadius: 99,
                        background: `${rcfg.color}15`, border: `1px solid ${rcfg.color}35`,
                        color: rcfg.color, fontSize: 12, fontWeight: 700 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: rcfg.color }} />
                        {role} · {roleMembers.length}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                        {roleMembers.map((m, i) => (
                          <div key={m.id} style={{ width: 260, flexShrink: 0 }}>
                            <PhotoCard member={m} index={i} size="md" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                  {sectionMembers.map((m, i) => (
                    <div key={m.id} style={{ width: 260, flexShrink: 0 }}>
                      <PhotoCard member={m} index={i} size="md" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* FOUNDATION BATCH */}
        <section style={{ marginBottom: 80 }}>
          <ScrollReveal>
            <div style={{ padding: '18px 24px', borderRadius: 14, marginBottom: 28,
              background: 'rgba(255,215,0,0.05)', borderLeft: '4px solid #FFD700' }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 16,
                color: 'white', margin: '0 0 4px' }}>🏛️ Foundation Batch — 2024–25</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                The pioneering batch that built the council from nothing. Their legacy endures.
              </p>
            </div>
          </ScrollReveal>
          <SectionHeader label="Foundation Batch" accent="#FFD700" icon={History} count={foundation.length} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {foundation.map((m, i) => <FoundationRow key={m.id} member={m} index={i} />)}
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBottom: 80, textAlign: 'center' }}>
          <FloatingObject floatY={15} duration={5}>
            <Zap size={52} color="#FFD700"
              style={{ filter: 'drop-shadow(0 0 24px rgba(255,215,0,0.6))', margin: '0 auto' }} />
          </FloatingObject>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'white', margin: '24px 0 12px' }}>Want to Join the Council?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 420,
            margin: '0 auto 28px' }}>
            Applications open every semester. If you have ideas and the drive to act on them, we want you.
          </p>
          <MagneticButton className="btn-primary px-8 py-4"
            onClick={() => navigate('/complaint')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Express Interest <ArrowRight size={18} />
          </MagneticButton>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
            or follow{' '}
            <a href="https://www.instagram.com/reva_student_affairs?igsh=MXRwbmw4MXZ2M3d5Mg==" target="_blank" rel="noreferrer"
              style={{ color: '#FFD700', textDecoration: 'none' }}>@reva_student_affairs</a>
          </p>
        </section>
      </div>
    </motion.div>
  );
}
