import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { councilMembers } from '../data/mockData';

const AVATAR_GRADIENTS = [
  ["#D62828","#7b0000"], ["#FFD700","#b8860b"], ["#6C3082","#2d0052"],
  ["#1565C0","#0a2342"], ["#00695C","#00251a"], ["#AD1457","#560027"],
  ["#4527A0","#1a0072"], ["#00838F","#00363a"], ["#E65100","#7f2a00"],
  ["#37474F","#102027"],
];

function MemberCard({ member, index }) {
  const [imgError, setImgError] = useState(false);
  const [grad1, grad2] = AVATAR_GRADIENTS[(member.id - 1) % AVATAR_GRADIENTS.length];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <motion.div
      className="glass-card p-6 flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4, borderColor: 'rgba(214,40,40,0.3)' }}
    >
      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white/10 flex items-center justify-center shrink-0"
        style={{ background: `linear-gradient(135deg, ${grad1}, ${grad2})` }}
      >
        {member.photo && !imgError ? (
          <img
            src={`/CouncilMembers/${member.photo}`}
            alt={member.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="font-outfit font-black text-2xl text-white/90">{initials}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-outfit font-bold text-white text-[15px] leading-tight mb-2">
        {member.name}
      </h3>

      {/* Role badge */}
      <span className="badge badge-red !text-[9px] mb-2">{member.role}</span>

      {/* Department */}
      <p className="text-white/40 text-[11px] leading-snug line-clamp-2">
        {member.department}
      </p>
    </motion.div>
  );
}

export default function Members() {
  const members = councilMembers.current;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen pb-32"
    >
      {/* Header */}
      <section className="pt-32 pb-16 px-4 text-center border-b border-white/5 bg-gradient-to-b from-[#111827] to-transparent">
        <div className="badge badge-red mb-4">👥 2025–26</div>
        <h1 className="font-outfit font-black text-5xl md:text-6xl text-white mb-4 mt-4">
          Meet the Council
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg">
          38 students. One vision. Building a campus that belongs to everyone.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
