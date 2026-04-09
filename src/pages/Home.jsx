import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events, councilInfo } from '../data/mockData';
import FeaturedClubs from '../components/FeaturedClubs';
import MysteryBox from '../components/MysteryBox';
import RevothsavaModal from '../components/RevothsavaModal';

// UI Components
import AuroraBackground from '../components/ui/AuroraBackground';
import ParticleField from '../components/ui/ParticleField';
import FloatingObject from '../components/ui/FloatingObject';
import SplitText from '../components/ui/SplitText';
import MagneticButton from '../components/ui/MagneticButton';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ScrollReveal from '../components/ui/ScrollReveal';
import SpotlightCard from '../components/ui/SpotlightCard';
import TextReveal from '../components/ui/TextReveal';
import GlowOrb from '../components/ui/GlowOrb';
import { ArrowRight, Calendar, Users, Image as ImageIcon, MessageSquare, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [revothsavaOpen, setRevothsavaOpen] = useState(false);
  const upcomingEvents = events.filter(e => e.category === 'upcoming').slice(0, 3);
  
  // Custom mock images for gallery preview
  const galleryPreview = [
    { id: 1, text: "TECHSPRINT '25", color: "from-blue-600 to-indigo-800" },
    { id: 2, text: "REVAMP", color: "from-pink-600 to-rose-700" },
    { id: 3, text: "SPORTS MEET", color: "from-emerald-500 to-teal-700" },
    { id: 4, text: "ROBOTICS LAB", color: "from-cyan-600 to-blue-700" },
    { id: 5, text: "FRESHERS", color: "from-amber-500 to-orange-600" },
    { id: 6, text: "ALUMNI TALK", color: "from-purple-600 to-fuchsia-800" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        y: -100,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container overflow-hidden"
    >
      {/* ── [1] HERO ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col items-center justify-center text-center pt-20 px-4">
        <AuroraBackground />
        <ParticleField count={30} />

        {/* Campus background — blended at ~40% visibility */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" style={{ opacity: 0.35 }}>
          <motion.img
            src="/campus-bg.jpg"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
            style={{ filter: 'saturate(0.3) brightness(0.5)' }}
          />
          {/* Dark overlay to tint the image into the dark theme */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(11,15,26,0.5)', mixBlendMode: 'multiply' }}
          />
          {/* Bottom fade — dissolves image into the rest of the page */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[45%]"
            style={{ background: 'linear-gradient(to top, #0B0F1A 0%, transparent 100%)' }}
          />
          {/* Top fade — subtle vignette at top */}
          <div
            className="absolute top-0 left-0 right-0 h-[20%]"
            style={{ background: 'linear-gradient(to bottom, rgba(11,15,26,0.6) 0%, transparent 100%)' }}
          />
        </div>

        <div className="hero-content relative z-10 max-w-4xl w-full flex flex-col items-center">
          <FloatingObject floatY={20} duration={6} className="mb-8">
            <img src="/RevaStudentCouncil.png" alt="RSC Logo" className="w-[160px] h-auto object-contain drop-shadow-[0_0_30px_rgba(214,40,40,0.4)]" />
          </FloatingObject>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mb-6 px-5 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#D62828]/10 text-[#FFD700] text-xs font-black tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(255,215,0,0.1)]"
          >
            ✦ REVA UNIVERSITY STUDENT COUNCIL
          </motion.div>

          <h1 className="font-outfit leading-[1.05] mb-6 flex flex-col">
            <span className="text-[clamp(3.5rem,8vw,5.5rem)] font-black text-white">
              <SplitText text="Your Voice." delay={0.6} />
            </span>
            <span className="text-[clamp(3.5rem,8vw,5.5rem)] font-black gradient-text">
              <SplitText text="Your Campus." delay={0.9} staggerDelay={0.03} />
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl font-medium mb-10 leading-relaxed"
          >
            The official governing body of REVA University — shaping campus life, amplifying ideas, and building a thriving student ecosystem.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton className="btn-primary px-8 py-4 text-base gap-2" onClick={() => navigate('/events')}>
              Explore Events <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton className="btn-outline px-8 py-4 text-base" onClick={() => navigate('/clubs')}>
              Discover Clubs
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-[26px] h-[44px] border-2 border-white/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1 h-2 bg-[#D62828] rounded-full"
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── [2] STATS BAR ── */}
      <section className="relative bg-[#D62828]/10 border-y border-[#D62828]/20 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Clubs', end: 23, suffix: '+' },
            { label: 'Events / Year', end: 50, suffix: '+' },
            { label: 'Students', end: 8000, suffix: '+' },
            { label: 'Council Members', end: 40, suffix: '' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} direction="up" className="flex flex-col items-center">
              <div className="text-[3rem] font-black text-[#FFD700] leading-none mb-2 font-outfit">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-white/50 text-sm font-semibold tracking-wider uppercase">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── [3] QUICK LINKS GRID ── */}
      <section className="section-padding max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-title">Navigate Campus</h2>
            <p className="section-subtitle">Everything happening at REVA, organized for you</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Calendar, title: "Events", desc: "View upcoming fests, hackathons & talks", to: "/events", color: "from-red-500 to-rose-700" },
            { icon: Users, title: "Clubs", desc: "Join technical, cultural & sports groups", to: "/clubs", color: "from-[#FFD700] to-orange-500" },
            { icon: ImageIcon, title: "Gallery", desc: "Relive the best memories from campus", to: "/gallery", color: "from-purple-500 to-indigo-700" },
            { icon: MessageSquare, title: "Complaint Box", desc: "Share concerns directly with the council", to: "/complaint", color: "from-teal-400 to-cyan-600" }
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <Link to={item.to} className="block h-full outline-none">
                <SpotlightCard className="h-full p-6 flex flex-col items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="mt-auto font-semibold text-[#D62828] text-sm flex items-center gap-1 group-hover/card:text-[#FFD700] transition-colors">
                    Explore <ArrowRight size={14} className="group-hover/card:translate-x-1 transition-transform" />
                  </div>
                </SpotlightCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── [4] UPCOMING EVENTS ── */}
      <section className="section-padding max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal direction="left">
            <div className="badge badge-red mb-3">📅 Upcoming</div>
            <h2 className="section-title !mb-0">What's Next</h2>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <Link to="/events" className="text-[#D62828] font-semibold text-sm hover:text-[#FFD700] flex items-center gap-2 transition-colors">
              View All Events <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((ev, i) => (
            <ScrollReveal key={ev.id} delay={i * 0.1}>
              <SpotlightCard className="p-6 h-full flex flex-col">
                <div className="flex gap-2 mb-4">
                  {ev.tags.map(t => <span key={t} className="badge badge-gold !text-[10px]">{t}</span>)}
                </div>
                <h3 className="text-xl font-bold font-outfit text-white mb-3 leading-tight">{ev.title}</h3>
                <p className="text-white/40 text-sm mb-6 flex-grow">{ev.description}</p>
                <div className="bg-[#0B0F1A] rounded-xl p-3 border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#D62828] text-xs font-semibold">
                    <Calendar size={14} /> {ev.date}
                  </div>
                  <div className="text-white/30 text-[11px] truncate">
                    📍 {ev.venue}
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── [5] FEATURED CLUBS ── */}
      <FeaturedClubs />

      {/* ── [5.5] MYSTERY BOX — REVOTHSAVA TEASER ── */}
      <MysteryBox onReveal={() => setRevothsavaOpen(true)} />
      <AnimatePresence>
        {revothsavaOpen && (
          <RevothsavaModal onClose={() => setRevothsavaOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── [6] MISSION STATEMENT ── */}
      <section className="py-32 px-4 relative flex items-center justify-center text-center overflow-hidden">
        <GlowOrb color="rgba(214,40,40,0.15)" size={600} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl relative z-10">
          <TextReveal 
            text="We exist to amplify every student's voice, build a thriving campus community, and turn ideas into unforgettable experiences."
            className="font-outfit font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-white/90"
          />
        </div>
      </section>

      {/* ── [7] GALLERY PREVIEW ── */}
      <section className="section-padding max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="section-title">Campus Life in Color</h2>
          <p className="section-subtitle">Moments we've built together.</p>
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryPreview.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05} direction="up" className="break-inside-avoid">
              <div className={`relative w-full rounded-2xl overflow-hidden aspect-[${i % 2 === 0 ? '4/3' : '3/4'}] bg-gradient-to-br ${item.color} p-8 flex items-center justify-center group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <span className="relative z-10 font-outfit font-black text-white/40 text-2xl rotate-[-10deg] scale-150 transform-gpu group-hover:scale-100 group-hover:rotate-0 group-hover:text-white transition-all duration-500">
                  {item.text}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link to="/gallery">
            <MagneticButton className="btn-outline px-8 py-3">View Full Gallery</MagneticButton>
          </Link>
        </div>
      </section>

      {/* ── [8] AI CHAT TEASER ── */}
      <section className="section-padding max-w-5xl mx-auto">
        <SpotlightCard className="p-10 md:p-16 flex flex-col items-center text-center gap-8 border-[#FFD700]/10 bg-gradient-to-br from-[#0B0F1A] to-[#1a1100]">
          <div className="badge badge-gold">✨ New Feature</div>
          <h2 className="font-outfit font-black text-3xl md:text-4xl text-white leading-tight max-w-lg">
            Have a question about campus?
          </h2>
          <p className="text-white/50 leading-relaxed max-w-md">
            Skip the long lines. Ask our smart AI Assistant about clubs, events, faculty rooms, or how to register a complaint.
          </p>
          <Link to="/ai-chat">
            <MagneticButton className="btn-primary px-6 py-3">
              Chat with RSC AI
            </MagneticButton>
          </Link>
          <div className="relative w-full max-w-md h-40 mt-4">
            <FloatingObject floatY={10} duration={4} className="absolute right-4 top-0 glass-card p-4 rounded-b-none rounded-2xl px-6 bg-[#D62828]/20 border-[#D62828]/30">
              <span className="text-white text-sm">When is REVAMP? 🤩</span>
            </FloatingObject>
            <FloatingObject floatY={8} duration={3.5} delay={1} className="absolute left-4 bottom-0 glass-card p-4 rounded-t-none rounded-2xl px-6 bg-[#FFD700]/10 border-[#FFD700]/20">
              <span className="text-white/80 text-sm">REVAMP is perfectly timed for March 15th! Get your squad ready. 🎉</span>
            </FloatingObject>
          </div>
        </SpotlightCard>
      </section>

      {/* ── [9] INSTAGRAM CTA ── */}
      <section className="py-32 relative flex flex-col items-center justify-center text-center overflow-hidden border-t border-white/5">
        <GlowOrb color="rgba(225,48,108,0.15)" size={500} className="absolute left-1/4 top-0" />
        <GlowOrb color="rgba(64,93,230,0.15)" size={400} className="absolute right-1/4 bottom-0" />
        
        <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
          <FloatingObject floatY={15} duration={5} className="text-6xl mb-8">📸</FloatingObject>
          <h2 className="section-title mb-6">Stay in the Loop</h2>
          <p className="section-subtitle mb-10">Follow us on Instagram for live campus updates, event reels, and flash announcements.</p>
          <a href={councilInfo.instagram} target="_blank" rel="noreferrer">
            <MagneticButton className="px-8 py-4 rounded-2xl font-outfit font-bold text-white shadow-[0_10px_30px_rgba(225,48,108,0.3)] transition-transform hover:scale-105 flex items-center gap-3"
              style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <Star size={18} fill="currentColor" /> Follow @reva_student_affairs
            </MagneticButton>
          </a>
        </div>
      </section>

    </motion.div>
  );
}
