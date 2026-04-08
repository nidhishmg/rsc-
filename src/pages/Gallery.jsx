import React, { useState } from 'react';
import { X, Image, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/mockData';

const categories = ['All', 'Events', 'Competitions', 'Workshops', 'Achievements'];

function Lightbox({ image, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all" onClick={onClose}>
        <X size={22} />
      </button>
      <div className="relative max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className={`rounded-2xl bg-gradient-to-br ${image.color} h-[60vh] flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-white font-outfit font-bold text-2xl">{image.title}</p>
            <p className="text-white/60 text-sm mt-2">{image.category}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-outfit font-bold text-white text-xl">{image.title}</h3>
          <span className="badge-blue mt-2 inline-block">{image.category}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <div className="hero-gradient border-b border-white/10 pt-28 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/30 rounded-full px-5 py-2 mb-6">
          <Image size={14} className="text-teal-400" />
          <span className="text-teal-400 text-sm font-semibold">Gallery</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl mb-3">Memories & Moments</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Relive the best moments from REVA Student Council events, competitions, and achievements
        </p>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-reva-red text-white shadow-lg shadow-reva-red/30 scale-105'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Count */}
        <p className="text-white/30 text-sm text-center mb-8">{filtered.length} photos</p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative group rounded-2xl overflow-hidden aspect-square cursor-pointer card-hover"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${img.color} flex items-center justify-center`}>
                <span className="text-white/20 text-4xl">🖼️</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={24} className="text-white" />
                <p className="text-white font-semibold text-sm text-center px-2 leading-tight">{img.title}</p>
                <span className="badge-blue text-xs">{img.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
}
