import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      {/* Main aurora blobs */}
      {[
        { color: 'rgba(214,40,40,0.18)', x: '20%', y: '30%', size: 600, duration: 8 },
        { color: 'rgba(255,215,0,0.10)', x: '75%', y: '20%', size: 500, duration: 10 },
        { color: 'rgba(139,92,246,0.12)', x: '50%', y: '70%', size: 700, duration: 12 },
        { color: 'rgba(214,40,40,0.08)', x: '85%', y: '60%', size: 400, duration: 9 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
      {/* Noise grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}
