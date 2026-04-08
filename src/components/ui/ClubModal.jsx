import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function ClubModal({ club, isOpen, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImgError(false); // Reset on open
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const logoPath = club?.logo || '';

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[8px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          data-category={club.category}
          className="w-full max-w-[480px] bg-[#161920] border border-white/10 rounded-[20px] p-8 relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Blob */}
          <div 
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Large Avatar */}
            <div 
              className="w-24 h-24 rounded-[22px] flex items-center justify-center text-4xl font-extrabold text-white shadow-xl mb-6 overflow-hidden border border-white/10"
              style={{ background: 'var(--avatar-gradient)' }}
            >
              {!imgError ? (
                <img 
                  src={logoPath} 
                  alt={club.name} 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                club.initial
              )}
            </div>

            {/* Content */}
            <div 
              className="px-3 py-1.5 rounded-full text-xs uppercase font-bold tracking-wider mb-4 border border-white/5"
              style={{ background: 'var(--badge-bg)', color: 'var(--badge-color)' }}
            >
              {club.category}
            </div>

            <h2 className="font-outfit font-black text-3xl text-white mb-2">{club.name}</h2>
            <p className="text-white/40 text-sm font-medium mb-6">{club.members} active members</p>

            <div className="w-full h-[1px] bg-white/5 mb-6" />

            <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
              Join the {club.name} club and participate in exciting events, hands-on workshops, and collaborative projects. This is your chance to build ideas, expand your network, and shape the campus culture.
            </p>

            <button 
              className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FF6B2B, #f97316)' }}
            >
              Join Club Now
            </button>
            
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
