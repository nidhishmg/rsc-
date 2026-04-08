import React, { useState } from 'react';
import { X, ExternalLink, Users, Star, Zap, Globe, Code, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { centralClubs, forums, technicalClubs, communities, generalClubs } from '../data/mockData';
import { FloatingObject } from '../components/Animations';

function ClubModal({ club, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header gradient */}
        <div className={`h-24 w-full bg-gradient-to-br ${club.color} flex items-center justify-center relative rounded-t-2xl overflow-hidden`}>
          {club.logo ? (
            <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl">{club.icon}</span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-1.5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-outfit font-black text-3xl text-white mb-1">{club.name}</h2>
                <p className="text-white/50 italic">{club.tagline}</p>
              </div>
              <div className="text-right">
                <div className="text-reva-gold font-bold text-xl">{club.members}+</div>
                <div className="text-white/40 text-xs">Members</div>
              </div>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">{club.description}</p>

          <div className="mb-6">
            <h3 className="font-outfit font-semibold text-white mb-3 flex items-center gap-2">
              <Star size={16} className="text-reva-gold" /> Regular Activities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {club.activities.map((act, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5">
                  <div className="w-1.5 h-1.5 bg-reva-red rounded-full" />
                  <span className="text-white/70 text-sm">{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${club.color} flex items-center justify-center text-white font-bold text-sm`}>
                {club.coordinator.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{club.coordinator}</div>
                <div className="text-white/40 text-xs">Club Coordinator • Est. {club.founded}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={club.instagram} target="_blank" rel="noreferrer" className="btn-primary text-xs py-2 px-3 inline-flex items-center gap-1.5">
                <ExternalLink size={12} /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClubCard({ club, onClick, index }) {
  return (
    <motion.button
      onClick={() => onClick(club)}
      className="glass-card p-6 card-hover group text-left w-full focus:outline-none block"
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.04, y: -6, boxShadow: '0 20px 40px rgba(214,40,40,0.25)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <FloatingObject floatY={8} duration={3.5 + (index % 3) * 0.5}>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center text-3xl mb-5 shadow-lg overflow-hidden`}>
          {club.logo ? (
            <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
          ) : (
            club.icon
          )}
        </div>
      </FloatingObject>
      <h3 className="font-outfit font-bold text-lg text-white mb-1 group-hover:text-reva-gold transition-colors">{club.name}</h3>
      <p className="text-white/40 text-xs italic mb-3">{club.tagline}</p>
      <p className="text-white/50 text-sm line-clamp-2 mb-4">{club.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/30 text-xs">
          <Users size={11} /> {club.members}+ members
        </div>
        <span className="text-reva-red text-xs font-semibold group-hover:text-reva-gold transition-colors">View →</span>
      </div>
    </motion.button>
  );
}

function SectionHeader({ icon: Icon, iconBg, title, subtitle, count, countColor, countBorder }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h2 className="font-outfit font-black text-2xl text-white">{title}</h2>
        <p className="text-white/40 text-sm">{subtitle}</p>
      </div>
      <div className={`ml-auto hidden sm:flex items-center gap-2 ${countBorder} rounded-full px-4 py-1.5`}>
        <span className={`${countColor} text-xs font-semibold`}>{count}</span>
      </div>
    </div>
  );
}

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState(null);

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <div className="hero-gradient border-b border-white/10 pt-28 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-reva-gold/15 border border-reva-gold/30 rounded-full px-5 py-2 mb-6">
          <Star size={14} className="text-reva-gold" />
          <span className="text-reva-gold text-sm font-semibold">Clubs, Forums & Communities</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl mb-3">Find Your Tribe</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Explore REVA's vibrant club culture — from arts to tech, forums to communities, there's a place for everyone
        </p>
      </div>

      <div className="section-padding max-w-7xl mx-auto space-y-16">

        {/* ── Forums ── */}
        <div>
          <SectionHeader
            icon={Zap}
            iconBg="bg-gradient-to-br from-cyan-500 to-blue-600"
            title="Forums"
            subtitle="School-specific academic & departmental forums • Active members 30+"
            count={`${forums.length} Forums`}
            countColor="text-cyan-400"
            countBorder="bg-cyan-500/10 border border-cyan-500/20"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forums.map((forum, i) => (
              <ClubCard key={forum.id} club={forum} onClick={setSelectedClub} index={i} />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── Technical Clubs ── */}
        <div>
          <SectionHeader
            icon={Code}
            iconBg="bg-gradient-to-br from-green-500 to-teal-600"
            title="Technical Clubs"
            subtitle="Coding, robotics, AI & emerging tech clusters • Active members 30+"
            count={`${technicalClubs.length} Clubs`}
            countColor="text-green-400"
            countBorder="bg-green-500/10 border border-green-500/20"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technicalClubs.map((club, i) => (
              <ClubCard key={club.id} club={club} onClick={setSelectedClub} index={i} />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── Communities ── */}
        <div>
          <SectionHeader
            icon={Globe}
            iconBg="bg-gradient-to-br from-emerald-500 to-green-700"
            title="Communities"
            subtitle="Cultural & regional student communities • Active members 25+"
            count={`${communities.length} Communities`}
            countColor="text-emerald-400"
            countBorder="bg-emerald-500/10 border border-emerald-500/20"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {communities.map((community, i) => (
              <ClubCard key={community.id} club={community} onClick={setSelectedClub} index={i} />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── Clubs ── */}
        <div>
          <SectionHeader
            icon={Cpu}
            iconBg="bg-gradient-to-br from-purple-500 to-fuchsia-600"
            title="Clubs"
            subtitle="Innovation, leadership & special interest clubs • Active members 20+"
            count={`${generalClubs.length} Clubs`}
            countColor="text-purple-400"
            countBorder="bg-purple-500/10 border border-purple-500/20"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generalClubs.map((club, i) => (
              <ClubCard key={club.id} club={club} onClick={setSelectedClub} index={i} />
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* ── Central Clubs ── */}
        <div>
          <SectionHeader
            icon={Star}
            iconBg="bg-gradient-to-br from-reva-red to-reva-darkred"
            title="Central Clubs"
            subtitle="Arts, culture & performance teams • Active members 35+"
            count={`${centralClubs.length} Clubs`}
            countColor="text-reva-red"
            countBorder="bg-reva-red/10 border border-reva-red/20"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {centralClubs.map((club, i) => (
              <ClubCard key={club.id} club={club} onClick={setSelectedClub} index={i} />
            ))}
          </div>
        </div>

      </div>

      {selectedClub && <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />}
    </div>
  );
}
