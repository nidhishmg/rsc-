import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { councilMembers } from '../data/mockData';
import SplitText from '../components/ui/SplitText';
import ScrollReveal from '../components/ui/ScrollReveal';
import FloatingObject from '../components/ui/FloatingObject';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Council() {
  const timelineEvents = [
    { year: "Sept 2024", title: "Council Formation", desc: "The new official student council for the academic year was inaugurated by the Honorable Chancellor." },
    { year: "Nov 2024", title: "First Major Fest", desc: "Successfully organized the Inter-School Techathon uniting 800+ developers." },
    { year: "Jan 2025", title: "1000+ Club Members", desc: "Crossed 1000 active student registrations across 21 technical and cultural clubs." },
    { year: "March 2026", title: "REVAMP '26", desc: "Gearing up for the biggest cultural extravaganza in university history." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen pb-32 overflow-hidden"
    >
      <section className="pt-32 pb-20 px-4 text-center border-b border-white/5">
        <div className="badge badge-gold mb-4">👑 Leadership</div>
        <h1 className="font-outfit font-black text-5xl md:text-7xl text-white mb-6">
          <SplitText text="Meet the Council" />
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
          The brilliant minds working tirelessly behind the scenes to make your campus life incredible.
        </p>
      </section>

      {/* Grid of Members */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-10">
          {councilMembers.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.1}>
              <div className="relative group text-center flex flex-col items-center">
                <FloatingObject floatY={6} duration={4} delay={i * 0.2}>
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#D62828] to-[#991515] mb-6 p-1 relative z-10 transition-transform group-hover:scale-105 duration-300">
                    <div className="w-full h-full bg-[#111827] rounded-full flex items-center justify-center font-outfit font-black text-4xl text-[#FFD700]">
                      {member.avatar}
                    </div>
                  </div>
                </FloatingObject>
                
                <h3 className="font-outfit font-bold text-xl text-white mb-1 group-hover:text-[#D62828] transition-colors">{member.name}</h3>
                <div className="text-[#FFD700] text-sm font-semibold tracking-wider uppercase mb-2">{member.role}</div>
                <p className="text-white/40 text-xs">{member.department}</p>
                
                <motion.div 
                  className="flex items-center gap-3 mt-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto overflow-hidden transition-all duration-300 ease-out"
                >
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#D62828] hover:text-white transition-colors">
                    <Linkedin size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#D62828] hover:text-white transition-colors">
                    <Mail size={14} />
                  </a>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Vertical Timeline */}
      <section className="max-w-4xl mx-auto px-4 py-24 relative">
        <ScrollReveal className="text-center mb-20">
          <h2 className="font-outfit font-black text-4xl mt-4">Council Journey</h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D62828] to-transparent" />
          
          {timelineEvents.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`relative flex items-center justify-between mb-16 w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#FFD700] border-4 border-[#111827] z-10 shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                
                <ScrollReveal direction={isLeft ? 'left' : 'right'} className="w-full md:w-5/12 px-8">
                  <div className={`glass-card p-6 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="badge badge-red mb-3">{ev.year}</span>
                    <h3 className="font-outfit font-bold text-2xl text-white mb-2">{ev.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{ev.desc}</p>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
