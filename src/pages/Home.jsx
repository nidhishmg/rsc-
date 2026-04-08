import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Users, Image, MessageSquare, Star, Trophy, Zap, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { councilInfo, events } from '../data/mockData';
import { FloatingObject, MagneticButton, AnimatedCounter, ScrollReveal, SplitText, SpotlightCard, AuroraBackground, ParticleField } from '../components/Animations';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const upcomingEvents = events.filter((e) => e.category === 'upcoming').slice(0, 3);
  const pastEvents = events.filter((e) => e.category === 'past').slice(0, 3);

  // GSAP parallax on scroll for hero
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        y: -80,
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

  // GSAP stagger for club logos on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.club-logo-item',
        { scale: 0.7, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.clubs-logo-grid', start: 'top 85%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Active Clubs', value: 23, suffix: '+', icon: '🏛️' },
    { label: 'Events / Year', value: 50, suffix: '+', icon: '🎉' },
    { label: 'Students', value: 8000, suffix: '+', icon: '👥' },
    { label: 'Council Members', value: 40, suffix: '', icon: '⭐' },
  ];

  const clubNames = [
    'Archons', 'Devbraze', 'Dopamine', 'Elite', 'FACE', 'Force',
    'Fractionz', 'GDG', 'Incentia', 'KALAAPARVA', 'Mars', 'Mavericks',
    'NARCISSA', 'Northeast Community', 'OsCode', 'Realitix',
    'REVA Kannada Club', 'REVA Roboosphere', 'RISA', 'SPARC', 'Under25',
  ];

  const quickLinks = [
    { to: '/events', icon: Calendar, label: 'Events', desc: 'Upcoming & past campus events', color: 'from-red-600 to-rose-700' },
    { to: '/clubs', icon: Users, label: 'Clubs & Forums', desc: 'Explore all student clubs', color: 'from-amber-500 to-yellow-600' },
    { to: '/gallery', icon: Image, label: 'Gallery', desc: 'Moments from campus life', color: 'from-violet-600 to-purple-700' },
    { to: '/complaint', icon: MessageSquare, label: 'Complaint Box', desc: 'Share your concerns', color: 'from-teal-600 to-cyan-700' },
  ];

  return (
    <div className="page-container" style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1a0a0a 60%, #0D1B2A 100%)',
        }}
      >
        <AuroraBackground />
        <ParticleField count={25} />

        {/* Hero content with GSAP parallax class */}
        <div
          className="hero-content"
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 1.5rem',
            maxWidth: 800,
            perspective: '1200px',
          }}
        >
          {/* Floating council badge */}
          <FloatingObject floatY={22} duration={5}>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'backOut', delay: 0.2 }}
              style={{
                width: 120,
                height: 120,
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 0 40px rgba(214,40,40,0.4))'
              }}
            >
              <img src="/RevaStudentCouncil.png" alt="REVA Student Council Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </motion.div>
          </FloatingObject>

          {/* Tag line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(214,40,40,0.15)',
              border: '1px solid rgba(214,40,40,0.35)',
              borderRadius: 999,
              marginBottom: '1.5rem',
            }}
          >
            <Zap size={12} style={{ color: '#D62828' }} />
            <span style={{ color: '#FFD700', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              REVA University Student Council
            </span>
          </motion.div>

          {/* Main heading — SplitText */}
          <h1 style={{ fontFamily: "'Outfit', sans-serif", lineHeight: 1.1, marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, color: '#fff' }}>
              <SplitText text="Your Voice." delay={0.8} staggerDelay={0.05} />
            </div>
            <div style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900 }}>
              <SplitText
                text="Your Campus."
                delay={1.1}
                staggerDelay={0.04}
                className="gradient-text"
              />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', marginBottom: '2.5rem', lineHeight: 1.7 }}
          >
            The official governing body of REVA University — shaping campus life, <br className="hidden md:block" />
            empowering students, building futures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/events">
              <MagneticButton className="btn-primary" style={{ fontSize: '1rem', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                Explore Events <ArrowRight size={16} />
              </MagneticButton>
            </Link>
            <Link to="/clubs">
              <MagneticButton className="btn-outline" style={{ fontSize: '1rem', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                Discover Clubs
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div style={{ width: 24, height: 40, border: '2px solid rgba(255,255,255,0.25)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <motion.div
              style={{ width: 4, height: 8, background: '#D62828', borderRadius: 2 }}
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: 'rgba(214,40,40,0.08)', borderTop: '1px solid rgba(214,40,40,0.2)', borderBottom: '1px solid rgba(214,40,40,0.2)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '2.5rem', color: '#FFD700', lineHeight: 1.1 }}>
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section className="section-padding" style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Navigate the Council</h2>
            <p className="section-subtitle">Everything you need, one click away</p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {quickLinks.map((link, i) => (
            <ScrollReveal key={link.to} delay={i * 0.1}>
              <Link to={link.to} style={{ textDecoration: 'none' }}>
                <SpotlightCard className="p-6 h-full">
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `linear-gradient(135deg, ${link.color.replace('from-', '').replace(' to-', ', ')})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                  }}>
                    <link.icon size={22} style={{ color: '#fff' }} />
                  </div>
                  <h3 style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>{link.label}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.5 }}>{link.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#D62828', fontSize: '0.8rem', fontWeight: 600, marginTop: '1rem' }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </SpotlightCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding" style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div className="badge badge-red" style={{ marginBottom: 8 }}>📅 Upcoming</div>
                <h2 className="section-title" style={{ margin: 0 }}>What's Coming</h2>
              </div>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <motion.span
                  whileHover={{ x: 4 }}
                  style={{ color: '#D62828', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  All Events <ArrowRight size={14} />
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {upcomingEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.12}>
                <SpotlightCard className="p-6">
                  <div style={{ display: 'flex', gap: 8, marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                    {event.tags?.slice(0, 2).map((tag) => (
                      <span key={tag} className="badge badge-gold">{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.15rem', marginBottom: 8, lineHeight: 1.35 }}>{event.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {event.description?.slice(0, 100)}…
                  </p>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={13} />
                    {event.date} · {event.venue}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CLUBS LOGO SHOWCASE ── */}
      <section className="section-padding" style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge badge-gold" style={{ marginBottom: 8 }}>🏛️ Student Clubs</div>
            <h2 className="section-title">Our Clubs & Forums</h2>
            <p className="section-subtitle">23+ active clubs across arts, tech, sports & culture</p>
          </div>
        </ScrollReveal>

        <div
          className="clubs-logo-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
          }}
        >
          {clubNames.map((name, i) => (
            <Link key={name} to="/clubs" style={{ textDecoration: 'none' }}>
              <motion.div
                className="club-logo-item glass-card"
                whileHover={{ scale: 1.08, y: -4, borderColor: 'rgba(214,40,40,0.5)' }}
                style={{
                  padding: '8px 18px',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
                onHoverStart={(e) => {
                  e.currentTarget.style.color = '#FFD700';
                }}
                onHoverEnd={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                {name}
              </motion.div>
            </Link>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/clubs">
              <MagneticButton className="btn-primary" style={{ fontSize: '0.9rem', padding: '10px 24px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Explore All Clubs <ArrowRight size={15} />
              </MagneticButton>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <section style={{ padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Floating decorative orbs */}
          {[
            { color: 'rgba(214,40,40,0.2)', x: -100, y: -50, size: 300, delay: 0 },
            { color: 'rgba(255,215,0,0.12)', x: 200, y: 80, size: 250, delay: 2 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${orb.x}px)`,
                top: `calc(50% + ${orb.y}px)`,
                width: orb.size,
                height: orb.size,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, delay: orb.delay, repeat: Infinity }}
            />
          ))}

          <ScrollReveal>
            <FloatingObject floatY={12} duration={6}>
              <div style={{ fontSize: 56, marginBottom: '1rem' }}>📸</div>
            </FloatingObject>
            <h2 className="section-title">Stay in the Loop</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '1rem' }}>
              Follow REVA Student Council on Instagram for live updates, event highlights, and campus stories.
            </p>
            <a
              href={councilInfo.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <MagneticButton
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #E1306C, #833AB4, #405DE6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Star size={16} /> Follow @reva_studentcouncil
              </MagneticButton>
            </a>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
