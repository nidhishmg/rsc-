import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { clubs } from '../data/clubs';
import ClubCard from '../components/ui/ClubCard';
import ClubModal from '../components/ui/ClubModal';

export default function Clubs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);

  const categories = ['All', 'Tech', 'Cultural', 'Social', 'Arts', 'Sports'];

  const filteredClubs = clubs.filter(c => 
    (activeCategory === 'All' || c.category === activeCategory) &&
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="page-container min-h-[100svh] pb-32 bg-[#0A0B0F]"
    >
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="badge badge-red mb-4">🏛️ Find Your Tribe</div>
        <h1 className="font-outfit font-black text-5xl md:text-6xl text-white mb-6 mt-4">
          Our Clubs & Forums
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
          Find your people. Build your passion. Explore our vibrant student-run communities.
        </p>

        {/* Filter + Search Bar Area */}
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 mb-8">
          
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4D5E]" size={20} />
            <input 
              type="text" 
              placeholder="Search clubs by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161920] border border-white/10 rounded-[30px] py-[10px] pl-[44px] pr-[20px] text-white placeholder-[#4A4D5E] focus:outline-none focus:border-[#FF6B2B] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto max-w-full pb-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-[7px] rounded-[30px] font-outfit text-xs font-semibold whitespace-nowrap outline-none transition-all ${
                  activeCategory === cat 
                    ? 'text-white' 
                    : 'bg-[#161920] border border-white/5 text-[#8B8FA8] hover:border-white/20 hover:text-white'
                }`}
                style={activeCategory === cat ? {} : { border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FF6B2B] border border-[#FF6B2B] rounded-[30px] -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Grid Container */}
      <motion.section 
        className="max-w-[1200px] mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[12px] sm:gap-[16px]">
            <AnimatePresence mode="popLayout">
              {filteredClubs.map((club, index) => (
                <ClubCard 
                  key={club.id} 
                  club={club} 
                  onClick={() => setSelectedClub(club)} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No clubs found matching your search.</p>
          </div>
        )}
      </motion.section>

      {/* Modal rendered via Portal */}
      <ClubModal 
        club={selectedClub} 
        isOpen={!!selectedClub} 
        onClose={() => setSelectedClub(null)} 
      />

    </motion.div>
  );
}
