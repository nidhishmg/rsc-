import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clubs, events, councilInfo } from '../data/mockData';

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

const categoryColors = {
  Tech: '#3B82F6',
  Arts: '#8B5CF6',
  Sports: '#10B981',
  Cultural: '#F59E0B',
  Social: '#EF4444',
  default: '#6B7280'
};

function TiltCard({ children, club }) {

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const color = categoryColors[club?.category] || categoryColors.default;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <SpotlightCard className="p-6 flex flex-col items-start relative overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: color }} />
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center font-outfit font-black text-2xl text-white mb-4 shadow-lg shrink-0 overflow-hidden"
          style={{ backgroundColor: color }}
        >
          {club.logo ? (
            <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
          ) : (
            club.name.charAt(0)
          )}
        </div>
        <div className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: `${color}20`, color: color }}>
          {club.category}
        </div>
        <h3 className="font-outfit font-bold text-lg text-white group-hover:text-white transition-colors">{club.name}</h3>
      </SpotlightCard>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
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

      {/* ── [5] TICKER & MASONRY CLUBS ── */}
      <section className="relative py-24 border-y border-white/5 bg-[#111827]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="section-title">23+ Active Clubs</h2>
          <p className="section-subtitle">Find your people, build your passion.</p>
        </div>

        {/* Part A: Marquee Ticker */}
        <div className="relative w-full overflow-hidden mb-16 border-y border-white/5 bg-[#0B0F1A]/80 py-4 flex items-center">
          {/* Double list for seamless loop */}
          <div className="animate-marquee flex gap-8 px-4 items-center whitespace-nowrap">
            {[...clubs, ...clubs].map((club, i) => (
              <React.Fragment key={i}>
                <span className="text-white/30 hover:text-white/70 font-outfit font-semibold text-sm tracking-wide transition-colors cursor-pointer">
                  {club.name}
                </span>
                {i !== (clubs.length * 2 - 1) && <span className="text-[#D62828] font-bold opacity-50">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Part B: Masonry Reveal Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {clubs.map((club, i) => (
              <ScrollReveal key={club.id} delay={0.04 * (i % 6)} className="break-inside-avoid">
                <TiltCard club={club} />
              </ScrollReveal>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 relative z-10">
            <Link to="/clubs">
              <button className="btn-primary px-8 py-3">View All Clubs Directory</button>
            </Link>
          </div>
        </div>
      </section>

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
        <SpotlightCard className="p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border-[#FFD700]/10 bg-gradient-to-br from-[#0B0F1A] to-[#1a1100]">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="badge badge-gold mb-4">✨ New Feature</div>
            <h2 className="font-outfit font-black text-3xl md:text-4xl text-white mb-4 leading-tight">
              Have a question about campus?
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Skip the long lines. Ask our smart AI Assistant about clubs, events, faculty rooms, or how to register a complaint.
            </p>
            <Link to="/ai-chat">
              <MagneticButton className="btn-primary px-6 py-3">
                Chat with RSC AI
              </MagneticButton>
            </Link>
          </div>
          <div className="md:w-1/2 relative h-64 w-full">
            <FloatingObject floatY={10} duration={4} className="absolute right-10 top-0 glass-card p-4 rounded-b-none rounded-2xl px-6 bg-[#D62828]/20 border-[#D62828]/30">
              <span className="text-white text-sm">When is REVAMP? 🤩</span>
            </FloatingObject>
            <FloatingObject floatY={8} duration={3.5} delay={1} className="absolute left-0 bottom-10 glass-card p-4 rounded-t-none rounded-2xl px-6 bg-[#FFD700]/10 border-[#FFD700]/20">
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
              <Star size={18} fill="currentColor" /> Follow @reva_studentcouncil
            </MagneticButton>
          </a>
        </div>
      </section>

    </motion.div>
  );
}
