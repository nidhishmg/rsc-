import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0F1A] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#D62828] to-transparent opacity-30" />
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D62828] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/RevaStudentCouncil.png" alt="RSC Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-outfit font-black text-white text-lg leading-tight">REVA Student Council</div>
                <div className="text-[#FFD700] text-xs font-semibold tracking-widest uppercase">Your Voice. Your Campus.</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              The official student governing body of REVA University, dedicated to student welfare, dynamic events, and campus enrichment.
            </p>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="space-y-3 flex flex-col">
              {[['/events', 'Events'], ['/clubs', 'Clubs'], ['/gallery', 'Gallery'], ['/council', 'The Council']].map(([to, label]) => (
                <Link key={to} to={to} className="text-white/50 hover:text-[#FFD700] text-sm transition-colors w-fit">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-bold text-white mb-4 uppercase tracking-wider text-sm">Connect</h4>
            <div className="space-y-3 text-sm text-white/50 flex flex-col">
              <a href="https://www.instagram.com/reva_studentcouncil/" target="_blank" rel="noreferrer" className="hover:text-[#FFD700] transition-colors w-fit">Instagram (@reva_studentcouncil)</a>
              <span className="w-fit">Email: studentcouncil@reva.edu.in</span>
              <span className="w-fit">Location: REVA University, Bengaluru</span>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2025 REVA University Student Council.</p>
          <p className="text-white/30 text-xs flex items-center gap-1">Built with <span className="text-[#D62828]">❤️</span> by REVA Student Council</p>
        </div>
      </div>
    </footer>
  );
}
