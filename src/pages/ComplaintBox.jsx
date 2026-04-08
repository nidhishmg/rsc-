import React, { useState } from 'react';
import { MessageSquare, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { getData, setData, complaintCategories } from '../data/mockData';

export default function ComplaintBox() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    email: '',
    isAnonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) { setError('Please select a complaint category.'); return; }
    if (!formData.description.trim()) { setError('Please describe your complaint.'); return; }
    if (formData.description.trim().length < 20) { setError('Please provide more details (at least 20 characters).'); return; }
    setError('');

    const existing = getData('COMPLAINTS') || [];
    const newComplaint = {
      id: Date.now(),
      ...formData,
      email: formData.isAnonymous ? '' : formData.email,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    setData('COMPLAINTS', [...existing, newComplaint]);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ category: '', description: '', email: '', isAnonymous: false });
    setSubmitted(false);
  };

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <div className="hero-gradient border-b border-white/10 pt-28 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-5 py-2 mb-6">
          <MessageSquare size={14} className="text-amber-400" />
          <span className="text-amber-400 text-sm font-semibold">Anonymous Complaint Box</span>
        </div>
        <h1 className="section-title text-5xl md:text-6xl mb-3">Your Voice Matters</h1>
        <p className="section-subtitle max-w-xl mx-auto">
          Share your concerns safely. All submissions are confidential and reviewed by the council.
        </p>
      </div>

      <div className="section-padding max-w-2xl mx-auto">
        {/* Privacy Notice */}
        <div className="glass-card p-5 mb-8 flex items-start gap-4 border-l-4 border-reva-gold">
          <Shield size={22} className="text-reva-gold shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-1">Your Privacy is Protected</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Complaints are stored securely and visible only to the Student Council admin team.
              You can choose to submit completely anonymously — no personal details required.
            </p>
          </div>
        </div>

        {submitted ? (
          /* Success State */
          <div className="glass-card p-10 text-center animate-slide-up">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={34} className="text-green-400" />
            </div>
            <h2 className="font-outfit font-black text-3xl text-white mb-3">Complaint Submitted!</h2>
            <p className="text-white/60 mb-2">Your concern has been recorded and will be reviewed by the Student Council.</p>
            <p className="text-white/40 text-sm mb-8">We aim to address all complaints within 3–5 working days.</p>
            <button onClick={handleReset} className="btn-primary">Submit Another</button>
          </div>
        ) : (
          /* Complaint Form */
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <h2 className="font-outfit font-bold text-2xl text-white mb-2">Submit a Complaint</h2>

            {error && (
              <div className="flex items-center gap-3 bg-reva-red/10 border border-reva-red/30 rounded-xl px-4 py-3">
                <AlertTriangle size={16} className="text-reva-red shrink-0" />
                <p className="text-reva-red text-sm">{error}</p>
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-white/70 text-sm font-semibold mb-2">
                Complaint Category <span className="text-reva-red">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="" className="bg-reva-navy">Select a category...</option>
                {complaintCategories.map(cat => (
                  <option key={cat} value={cat} className="bg-reva-navy">{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white/70 text-sm font-semibold mb-2">
                Description <span className="text-reva-red">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your complaint in detail. The more specific you are, the better we can help..."
                className="input-field resize-none"
              />
              <p className="text-white/30 text-xs mt-1">{formData.description.length} characters (minimum 20)</p>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-4 h-4 accent-reva-red"
              />
              <div>
                <label htmlFor="isAnonymous" className="text-white font-semibold text-sm cursor-pointer">Submit Anonymously</label>
                <p className="text-white/40 text-xs">Your name and email will not be recorded</p>
              </div>
            </div>

            {/* Optional Email */}
            {!formData.isAnonymous && (
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2">
                  Email (Optional — for follow-up)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@reva.edu.in"
                  className="input-field"
                />
              </div>
            )}

            <button type="submit" className="btn-primary w-full text-base py-4 flex items-center justify-center gap-2">
              <MessageSquare size={18} /> Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
