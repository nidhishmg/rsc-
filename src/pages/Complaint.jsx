import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '../components/ui/SpotlightCard';
import FloatingObject from '../components/ui/FloatingObject';
import MagneticButton from '../components/ui/MagneticButton';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ComplaintBox() {
  const [formData, setFormData] = useState({ name: '', id: '', dept: '', category: 'Academics', subject: '', message: '', anon: false });
  const [status, setStatus] = useState('idle'); // idle, error, success

  const handleSubmit = (e) => {
    e.handleChange = undefined;
    e.preventDefault();
    if (!formData.subject || !formData.message || (!formData.anon && (!formData.name || !formData.id))) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 800);
      return;
    }
    
    // Simulate API call
    setStatus('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D62828', '#FFD700', '#ffffff']
    });
    
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', id: '', dept: '', category: 'Academics', subject: '', message: '', anon: false });
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="page-container min-h-screen py-32 px-4 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D62828] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00e5ff] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />

      <FloatingObject floatY={15} duration={4} className="mb-6">
        <div className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">📬</div>
      </FloatingObject>

      <h1 className="font-outfit font-black text-4xl md:text-5xl text-white mb-2 text-center">Complaint Box</h1>
      <p className="text-white/50 text-center mb-10 max-w-md">Your concerns matter. Submit a complaint and the council will review it to ensure a better campus experience.</p>

      {status === 'success' ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card max-w-md w-full p-10 text-center flex flex-col items-center border-[#FFD700]/30 bg-[#FFD700]/5"
        >
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 className="font-outfit font-bold text-2xl text-white mb-3">Complaint Submitted</h2>
          <p className="text-white/60 mb-6">Thank you for bringing this to our attention. The relevant committee will address it shortly.</p>
          <button className="btn-outline px-6 py-2" onClick={() => setStatus('idle')}>Submit Another</button>
        </motion.div>
      ) : (
        <SpotlightCard className="max-w-2xl w-full p-8 md:p-12">
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 mb-4">
                <AlertCircle size={16} /> Please fill out all required fields correctly.
              </div>
            )}

            <div className="bg-[#0B0F1A]/50 p-4 rounded-xl border border-white/5 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="anon" checked={formData.anon} onChange={handleChange} className="w-5 h-5 accent-[#D62828] bg-transparent border-white/20 rounded" />
                <div>
                  <div className="text-white font-medium text-sm">Submit Anonymously</div>
                  <div className="text-white/40 text-xs">Your identity will be completely hidden from the council.</div>
                </div>
              </label>
            </div>

            <AnimatePresence>
              {!formData.anon && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                >
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D62828] transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Student ID (SRN) *</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D62828] transition-colors" placeholder="R21CSXXX" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Department</label>
                <input type="text" name="dept" value={formData.dept} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] transition-colors" placeholder="E.g., CSE" />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FFD700] transition-colors appearance-none">
                  <option>Academics</option>
                  <option>Hostel / Food</option>
                  <option>Infrastructure</option>
                  <option>Events / Clubs</option>
                  <option>Anti-Ragging</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Subject *</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D62828] transition-colors" placeholder="Brief subject of the complaint" />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Message Details *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D62828] transition-colors resize-none" placeholder="Provide as much detail as possible..." />
            </div>

            <div className="pt-4 flex justify-end">
              <MagneticButton className="btn-primary px-8 py-3 w-full sm:w-auto" type="submit">
                Submit Complaint <Send size={16} />
              </MagneticButton>
            </div>
          </motion.form>
        </SpotlightCard>
      )}
    </motion.div>
  );
}
