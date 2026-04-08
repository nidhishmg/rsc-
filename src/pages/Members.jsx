import React, { useState } from 'react';
import { Users, Award, Star } from 'lucide-react';
import { councilMembers } from '../data/mockData';

const roleColors = {
  President: 'from-reva-red to-reva-darkred',
  'Vice President': 'from-purple-600 to-violet-700',
  Secretary: 'from-blue-600 to-indigo-700',
  Treasurer: 'from-teal-600 to-cyan-700',
};

function getRoleColor(role) {
  return roleColors[role] || 'from-white/20 to-white/10';
}

function MemberCard({ member, compact = false }) {
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const color = getRoleColor(member.role);

  if (compact) {
    return (
      <div className="glass-card p-5 card-hover group flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center font-outfit font-black text-white text-sm shrink-0`}>
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-outfit font-bold text-white text-sm group-hover:text-reva-gold transition-colors truncate">{member.name}</h3>
          <p className="text-white/50 text-xs truncate">{member.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden card-hover group">
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6 text-center">
        {/* Avatar */}
        <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center font-outfit font-black text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {initials}
        </div>
        <h3 className="font-outfit font-bold text-xl text-white mb-1 group-hover:text-reva-gold transition-colors">{member.name}</h3>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${color} text-white mb-3`}>
          {member.badges?.includes('President') ? <Award size={11} /> : member.badges?.includes('Vice President') ? <Star size={11} /> : null}
          {member.role}
        </div>
        <p className="text-white/40 text-xs mb-1">{member.department} • {member.year}</p>
        {member.bio && <p className="text-white/50 text-sm mt-3 mb-2 italic leading-relaxed line-clamp-2">{member.bio}</p>}
      </div>
    </div>
  );
}

export default function Members() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <div className="hero-gradient border-b border-white/10 pt-28 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-5 py-2 mb-6">
          <Users size={14} className="text-blue-400" />
          <span className="text-blue-400 text-sm font-semibold">The Team</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl mb-3">Council Members</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Meet the passionate students working hard to make your campus experience extraordinary
        </p>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        {/* Tab Switcher */}
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {[
            { key: 'current', label: 'Current Council 2025', emoji: '⭐' },
            { key: 'foundation', label: 'Foundation Batch 2024–25', emoji: '🏛️' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-reva-red text-white shadow-lg shadow-reva-red/30 scale-105'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Current Council */}
        {activeTab === 'current' && (
          <div>
            {/* Leadership */}
            <div className="mb-10">
              <h2 className="font-outfit font-bold text-xl text-white/50 mb-5 flex items-center gap-2">
                <Award size={18} className="text-reva-gold" /> Leadership
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {councilMembers.current.filter(m =>
                  ['President', 'Vice President', 'Secretary', 'Treasurer'].includes(m.role)
                ).map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
            {/* Core Team */}
            <div>
              <h2 className="font-outfit font-bold text-xl text-white/50 mb-5 flex items-center gap-2">
                <Star size={18} className="text-reva-red" /> Core Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {councilMembers.current.filter(m =>
                  !['President', 'Vice President', 'Secretary', 'Treasurer'].includes(m.role)
                ).map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Foundation Batch */}
        {activeTab === 'foundation' && (
          <div>
            <div className="glass-card p-6 mb-8 border-l-4 border-reva-gold">
              <h3 className="font-outfit font-bold text-white text-lg mb-1">🏛️ Foundation Batch — 2024–25</h3>
              <p className="text-white/50 text-sm">
                The pioneering batch that laid the foundation of the REVA University Student Council. Their vision and dedication set the tone for everything that follows.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {councilMembers.foundation.map(member => (
                <MemberCard key={member.id} member={member} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
