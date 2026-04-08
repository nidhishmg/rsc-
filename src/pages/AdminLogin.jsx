import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertTriangle, Shield } from 'lucide-react';
import { adminCredentials } from '../data/mockData';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const match = adminCredentials.find(a => a.email === email && a.password === password);
      if (match) {
        sessionStorage.setItem('adminSession', 'true');
        sessionStorage.setItem('adminName', match.name);
        sessionStorage.setItem('adminRole', match.role);
        navigate('/admin');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = () => {
    setEmail('admin@reva.edu.in');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4 page-enter">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-reva-red to-reva-darkred rounded-2xl items-center justify-center font-outfit font-black text-white text-2xl shadow-2xl shadow-reva-red/40 mb-4">
            R
          </div>
          <h1 className="font-outfit font-black text-3xl text-white mb-1">Admin Login</h1>
          <p className="text-white/40 text-sm">REVA Student Council — Core Team Access</p>
        </div>

        <div className="glass-card p-8">
          {/* Demo hint */}
          <div className="flex items-start gap-3 bg-reva-gold/10 border border-reva-gold/20 rounded-xl p-4 mb-6">
            <Shield size={16} className="text-reva-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-reva-gold text-xs font-semibold mb-1">Demo Credentials</p>
              <p className="text-white/50 text-xs">Email: admin@reva.edu.in</p>
              <p className="text-white/50 text-xs mb-2">Password: admin123</p>
              <button onClick={fillDemo} className="text-reva-gold text-xs underline hover:text-white transition-colors">
                Auto-fill →
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 bg-reva-red/10 border border-reva-red/30 rounded-xl px-4 py-3">
                <AlertTriangle size={15} className="text-reva-red shrink-0" />
                <p className="text-reva-red text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-white/70 text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@reva.edu.in"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-field pl-11 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</>
              ) : (
                <><Lock size={16} /> Access Dashboard</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Access restricted to authorized Student Council members only.
        </p>
      </div>
    </div>
  );
}
