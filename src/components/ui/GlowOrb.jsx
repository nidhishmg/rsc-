import React from 'react';
import { motion } from 'framer-motion';

export default function GlowOrb({ color = 'rgba(214,40,40,0.4)', size = 200, className = '' }) {
  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(30px)',
        pointerEvents: 'none',
        zIndex: 0
      }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
