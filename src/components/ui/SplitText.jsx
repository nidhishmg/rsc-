import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SplitText({ text, className = '', staggerDelay = 0.04, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * staggerDelay, ease: 'backOut' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
