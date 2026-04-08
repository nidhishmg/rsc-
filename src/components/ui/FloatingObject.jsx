import React from 'react';
import { motion, useSpring } from 'framer-motion';

export default function FloatingObject({ children, floatY = 18, duration = 4, delay = 0, className = '' }) {
  const rotX = useSpring(0, { stiffness: 120, damping: 18 });
  const rotY = useSpring(0, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotY.set((e.clientX - cx) / 6);
    rotX.set(-(e.clientY - cy) / 6);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      animate={{ y: [0, -floatY, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
