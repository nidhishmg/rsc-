import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/mockData';
import AuroraBackground from '../components/ui/AuroraBackground';
import SplitText from '../components/ui/SplitText';
import SpotlightCard from '../components/ui/SpotlightCard';
import { Calendar, MapPin, Search } from 'lucide-react';

export default function Events() {
  const [filter, setFilter] = useState('All');
  
  const tabs = ['All', 'Upcoming', 'Past', 'Technical', 'Cultural', 'Sports'];

  const filteredEvents = events.filter(ev => {
    if (filter === 'All') return true;
    if (filter === 'Upcoming') return ev.category === 'upcoming';
    if (filter === 'Past') return ev.category === 'past';
    return ev.tags.includes(filter);
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen pb-32"
    >
      {/* Hero Strip */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden border-b border-white/5">
        <AuroraBackground />
        <div className="relative z-10">
          <div className="badge badge-gold mb-4">🎉 What's Happening</div>
          <h1 className="font-outfit font-black text-5xl md:text-7xl text-white mb-6">
            <SplitText text="Campus Events" />
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From technical hackathons to cultural extravaganzas. Stay updated with everything happening at REVA.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`relative px-6 py-2.5 rounded-full font-outfit text-sm font-semibold transition-colors outline-none ${filter === tab ? 'text-[#FFD700]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              {filter === tab && (
                <motion.div
                  layoutId="event-tab-bg"
                  className="absolute inset-0 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map(ev => {
              const isPast = ev.category === 'past';
              return (
                <motion.div
                  key={ev.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <SpotlightCard className={`h-full p-6 flex flex-col ${isPast ? 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2 flex-wrap">
                        {ev.tags.map(t => <span key={t} className="badge badge-red !text-[10px]">{t}</span>)}
                      </div>
                      {isPast && <span className="bg-white/10 text-white/50 text-[10px] uppercase font-bold px-2 py-1 rounded">Archived</span>}
                    </div>
                    
                    <h3 className="text-2xl font-bold font-outfit text-white mb-3">{ev.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">{ev.description}</p>
                    
                    <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <Calendar size={16} className={isPast ? "text-white/50" : "text-[#FFD700]"} /> {ev.date}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <MapPin size={16} className={isPast ? "text-white/50" : "text-[#D62828]"} /> {ev.venue}
                      </div>
                    </div>

                    <button className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${isPast ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white' : 'bg-[#D62828] text-white hover:bg-red-700'}`}>
                      {isPast ? 'View Gallery' : 'Learn More / Register'}
                    </button>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-4">
              <Search size={32} />
            </div>
            <h3 className="font-outfit font-bold text-2xl text-white mb-2">No events found</h3>
            <p className="text-white/40">Check back later or try a different filter category.</p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
