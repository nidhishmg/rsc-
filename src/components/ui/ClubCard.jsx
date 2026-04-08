import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClubCard({ club, onClick }) {
  const [imgError, setImgError] = useState(false);
  const logoPath = club.logo;

  return (
    <motion.div
      data-category={club.category}
      className="club-card-hover bg-[#161920] rounded-[16px] p-[20px_16px_16px] border border-white/10 cursor-pointer flex flex-col h-full relative overflow-hidden will-change-transform"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="flex justify-between items-start mb-4">
        {/* Avatar */}
        <div 
          className="w-12 h-12 rounded-[14px] flex items-center justify-center text-xl font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden"
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
        
        {/* Badge */}
        <div 
          className="px-2 py-1 rounded-[20px] text-[10px] uppercase font-semibold tracking-[0.5px]"
          style={{ background: 'var(--badge-bg)', color: 'var(--badge-color)' }}
        >
          {club.category}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <h3 className="font-outfit font-bold text-[18px] text-white leading-tight mb-1">{club.name}</h3>
        <p className="text-white/40 text-[12px] font-medium">{club.members} members</p>
        <div className="club-card-accent-line h-[2px] rounded-[2px] w-[30%] mt-[12px]" />
      </div>
    </motion.div>
  );
}
