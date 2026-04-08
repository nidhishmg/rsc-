import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { clubs } from '../data/mockData';
import SpotlightCard from '../components/ui/SpotlightCard';
import FloatingObject from '../components/ui/FloatingObject';
import SplitText from '../components/ui/SplitText';

export default function Clubs() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Tech', 'Arts', 'Sports', 'Cultural', 'Social'];

  const filteredClubs = clubs.filter(c => filter === 'All' || c.category === filter);

  useEffect(() => {
    // Reveal animation when filtered list changes
    gsap.fromTo('.club-card-stagger', 
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)", clearProps: "all" }
    );
  }, [filter]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen pb-32"
    >
      <section className="pt-32 pb-16 px-4 text-center border-b border-white/5 bg-gradient-to-b from-[#111827] to-transparent">
        <div className="badge badge-red mb-4">🏛️ Find Your Tribe</div>
        <h1 className="font-outfit font-black text-5xl md:text-7xl text-white mb-6">
          <SplitText text="Our Clubs & Forums" />
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
          From cutting-edge robotics to classical dance, our 21 student-run clubs offer a platform for every passion.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2 rounded-lg font-outfit text-sm font-semibold transition-colors outline-none ${filter === cat ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="club-tab-bg"
                  className="absolute inset-0 bg-[#D62828] rounded-lg -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredClubs.map((club, i) => (
              <motion.div key={club.id} layout className="club-card-stagger">
                <SpotlightCard className="p-8 h-full flex flex-col group items-center text-center">
                  <FloatingObject floatY={8} duration={3.5 + (i % 3) * 0.5} className="mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#111827] to-[#1a2333] border border-white/10 flex items-center justify-center text-4xl shadow-xl overflow-hidden group-hover:border-[#D62828]/50 group-hover:shadow-[0_10px_40px_rgba(214,40,40,0.2)] transition-all duration-300">
                      {club.logo ? (
                        <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-outfit font-black text-white/20">{club.name.charAt(0)}</span>
                      )}
                    </div>
                  </FloatingObject>

                  <span className="badge badge-gold mb-3 !text-[9px]">{club.category}</span>
                  <h3 className="font-outfit font-bold text-2xl text-white mb-3 group-hover:text-[#FFD700] transition-colors">{club.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">{club.description}</p>
                  
                  <div className="w-full h-[1px] bg-white/5 mb-4 group-hover:bg-[#D62828]/20 transition-colors" />
                  
                  <button className="text-[#D62828] text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    View Details →
                  </button>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
