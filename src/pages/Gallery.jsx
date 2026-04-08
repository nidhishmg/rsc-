import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/mockData';
import SplitText from '../components/ui/SplitText';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  
  const categories = ['All', 'Events', 'Clubs', 'Campus', 'Sports'];

  const filteredImages = galleryImages.filter(img => filter === 'All' || img.category === filter);

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImgIndex !== null) setSelectedImgIndex((selectedImgIndex + 1) % filteredImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImgIndex !== null) setSelectedImgIndex((selectedImgIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImgIndex === null) return;
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') setSelectedImgIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImgIndex, filteredImages.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen pb-32"
    >
      <section className="pt-32 pb-12 px-4 text-center">
        <h1 className="font-outfit font-black text-5xl md:text-7xl text-white mb-6">
          <SplitText text="Campus Gallery" />
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
          A visual journey through the events, initiatives, and everyday life at REVA University.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-5 py-2 rounded-full font-outfit text-sm font-semibold transition-colors outline-none ${filter === cat ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="gallery-tab-bg"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <motion.div layout className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="masonry-item relative group cursor-pointer rounded-2xl overflow-hidden bg-[#111827]"
                onClick={() => setSelectedImgIndex(i)}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 ease-out" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#D62828]/0 group-hover:bg-[#D62828]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-300 delay-100">
                    <Maximize2 size={20} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="badge badge-gold !text-[9px] mb-1">{img.category}</span>
                  <h3 className="text-white font-outfit font-bold text-lg">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F1A]/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedImgIndex(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10" onClick={() => setSelectedImgIndex(null)}>
              <X size={24} />
            </button>

            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10 hidden sm:block" onClick={handlePrev}>
              <ChevronLeft size={28} />
            </button>
            
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10 hidden sm:block" onClick={handleNext}>
              <ChevronRight size={28} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={filteredImages[selectedImgIndex].url} 
                alt={filteredImages[selectedImgIndex].title} 
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-center rounded-b-lg">
                <span className="badge badge-gold !text-[10px] mb-2">{filteredImages[selectedImgIndex].category}</span>
                <h3 className="text-white font-outfit font-bold text-2xl">{filteredImages[selectedImgIndex].title}</h3>
                <p className="text-white/40 text-sm mt-1">{selectedImgIndex + 1} of {filteredImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
