import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Filter } from 'lucide-react';
import { getData, setData, events as seedEvents } from '../data/mockData';

const tabs = [
  { key: 'current', label: 'Current Events', emoji: '🔴', desc: 'Happening right now' },
  { key: 'upcoming', label: 'Upcoming Events', emoji: '🗓️', desc: 'Coming soon' },
  { key: 'past', label: 'Past Events', emoji: '📷', desc: 'Memories & highlights' },
];

const tagColors = {
  Cultural: 'badge-red',
  Music: 'badge-red',
  Dance: 'badge-red',
  Tech: 'badge-blue',
  Hackathon: 'badge-blue',
  Coding: 'badge-blue',
  Sports: 'badge-green',
  Competition: 'badge-green',
  Art: 'badge-gold',
  Photography: 'badge-gold',
  Workshop: 'badge-gold',
  Leadership: 'badge-gold',
  Social: 'badge-blue',
};

function EventCard({ event, type }) {
  return (
    <div className="glass-card overflow-hidden card-hover group">
      {/* Color banner */}
      <div className={`h-2 w-full ${type === 'current' ? 'bg-reva-red' : type === 'upcoming' ? 'bg-reva-gold' : 'bg-white/20'}`} />
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags?.map(tag => (
            <span key={tag} className={tagColors[tag] || 'badge-blue'}>{tag}</span>
          ))}
          {type === 'current' && (
            <span className="badge bg-reva-red text-white animate-pulse">● Live</span>
          )}
        </div>
        <h3 className="font-outfit font-bold text-xl text-white mb-2 group-hover:text-reva-gold transition-colors leading-snug">
          {event.title}
        </h3>
        <p className="text-white/50 text-sm mb-5 line-clamp-3 leading-relaxed">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-white/50">
            <Calendar size={14} className="text-reva-red shrink-0" />
            <span>{event.date}{event.endDate && event.endDate !== event.date ? ` – ${event.endDate}` : ''}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2 text-white/50">
              <Clock size={14} className="text-reva-gold shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-white/50">
            <MapPin size={14} className="text-blue-400 shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {event.highlights && (
          <div className="mt-4 p-3 bg-reva-gold/10 border border-reva-gold/20 rounded-xl">
            <p className="text-reva-gold text-xs font-semibold mb-1">🏆 Highlights</p>
            <p className="text-white/70 text-xs leading-relaxed">{event.highlights}</p>
          </div>
        )}

        {event.registrationLink && type !== 'past' && (
          <a
            href={event.registrationLink}
            className="mt-5 inline-flex items-center gap-2 btn-primary text-sm py-2.5 w-full justify-center"
          >
            Register Now <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState('current');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const stored = getData('EVENTS');
    setEventList(stored || seedEvents);
  }, []);

  const filtered = eventList.filter(e => e.category === activeTab);

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <div className="hero-gradient border-b border-white/10 pt-28 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-reva-red/15 border border-reva-red/30 rounded-full px-5 py-2 mb-6">
          <Calendar size={14} className="text-reva-red" />
          <span className="text-reva-red text-sm font-semibold">Events at REVA</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl mb-3">Campus Events</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Stay up-to-date with everything happening on campus — from cultural fests to hackathons
        </p>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-reva-red text-white shadow-lg shadow-reva-red/30 scale-105'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
              <span className="ml-1 text-xs opacity-60">({eventList.filter(e => e.category === tab.key).length})</span>
            </button>
          ))}
        </div>

        {/* Tab description */}
        <div className="text-center mb-8">
          <p className="text-white/40 text-sm">{tabs.find(t => t.key === activeTab)?.desc}</p>
        </div>

        {/* Events Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="font-outfit font-bold text-2xl text-white/50 mb-2">No events found</h3>
            <p className="text-white/30">Check back soon for updates in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} type={activeTab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
