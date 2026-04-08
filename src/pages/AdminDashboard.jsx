import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit3, CheckCircle, Clock, XCircle, Save, X, Calendar, Users, Image, MessageSquare, ChevronDown } from 'lucide-react';
import { getData, setData, events as seedEvents, councilMembers as seedMembers, galleryImages as seedGallery } from '../data/mockData';

const SECTIONS = [
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'members', label: 'Members', icon: Users },
  { key: 'gallery', label: 'Gallery', icon: Image },
  { key: 'complaints', label: 'Complaints', icon: MessageSquare },
];

// ─── Events CRUD ─────────────────────────────────────────────────────────
function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'upcoming', date: '', venue: '', description: '', tags: '' });

  useEffect(() => { setEvents(getData('EVENTS') || seedEvents); }, []);

  const save = () => {
    if (!form.title || !form.date) return;
    const tagArr = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (editItem) {
      const updated = events.map(e => e.id === editItem.id ? { ...e, ...form, tags: tagArr } : e);
      setData('EVENTS', updated); setEvents(updated);
    } else {
      const newE = { ...form, tags: tagArr, id: Date.now() };
      const updated = [...events, newE];
      setData('EVENTS', updated); setEvents(updated);
    }
    setForm({ title: '', category: 'upcoming', date: '', venue: '', description: '', tags: '' });
    setShowForm(false); setEditItem(null);
  };

  const del = (id) => {
    const updated = events.filter(e => e.id !== id);
    setData('EVENTS', updated); setEvents(updated);
  };

  const startEdit = (ev) => {
    setEditItem(ev);
    setForm({ ...ev, tags: ev.tags?.join(', ') || '' });
    setShowForm(true);
  };

  const catColor = { current: 'badge-red', upcoming: 'badge-gold', past: 'text-white/40 text-xs' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-outfit font-bold text-2xl text-white">Events <span className="text-white/40 text-base font-normal">({events.length})</span></h2>
        <button onClick={() => { setShowForm(true); setEditItem(null); setForm({ title: '', category: 'upcoming', date: '', venue: '', description: '', tags: '' }); }} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2">
          <Plus size={15} /> Add Event
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 border border-reva-red/20">
          <h3 className="font-outfit font-semibold text-white mb-4">{editItem ? 'Edit Event' : 'Add New Event'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="input-field" placeholder="Event Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option value="current" className="bg-reva-navy">Current</option>
              <option value="upcoming" className="bg-reva-navy">Upcoming</option>
              <option value="past" className="bg-reva-navy">Past</option>
            </select>
            <input className="input-field" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <input className="input-field" placeholder="Venue" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} />
            <input className="input-field md:col-span-2" placeholder="Tags (comma-separated, e.g. Cultural, Music)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
            <textarea className="input-field md:col-span-2 resize-none" rows={3} placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary text-sm py-2 px-5 inline-flex items-center gap-1.5"><Save size={14} /> Save</button>
            <button onClick={() => { setShowForm(false); setEditItem(null); }} className="btn-ghost text-sm inline-flex items-center gap-1.5"><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {events.map(ev => (
          <div key={ev.id} className="glass-card p-4 flex items-center justify-between gap-4 group hover:border-white/20 transition-colors">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold text-white truncate">{ev.title}</h4>
                <span className={catColor[ev.category] || 'badge-blue'}>{ev.category}</span>
              </div>
              <p className="text-white/40 text-sm">{ev.date} • {ev.venue}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(ev)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><Edit3 size={14} /></button>
              <button onClick={() => del(ev.id)} className="p-2 rounded-lg bg-reva-red/10 text-reva-red hover:bg-reva-red/20 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Members CRUD ─────────────────────────────────────────────────────────
function AdminMembers() {
  const [members, setMembers] = useState({ current: [], foundation: [] });
  const [activeTab, setActiveTab] = useState('current');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', email: '', department: '', year: '' });

  useEffect(() => {
    // Always sync from seed so real council names are up to date
    setData('MEMBERS', seedMembers);
    setMembers(seedMembers);
  }, []);

  const list = members[activeTab] || [];

  const save = () => {
    if (!form.name || !form.role) return;
    let updated = { ...members };
    if (editItem) {
      updated[activeTab] = members[activeTab].map(m => m.id === editItem.id ? { ...m, ...form } : m);
    } else {
      updated[activeTab] = [...members[activeTab], { ...form, id: Date.now(), badges: [form.role], batch: '2024–25' }];
    }
    setData('MEMBERS', updated); setMembers(updated);
    setForm({ name: '', role: '', email: '', department: '', year: '' });
    setShowForm(false); setEditItem(null);
  };

  const del = (id) => {
    const updated = { ...members, [activeTab]: members[activeTab].filter(m => m.id !== id) };
    setData('MEMBERS', updated); setMembers(updated);
  };

  const startEdit = (m) => {
    setEditItem(m); setForm({ name: m.name, role: m.role, email: m.email, department: m.department || '', year: m.year || '' });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-outfit font-bold text-2xl text-white">Members</h2>
        <button onClick={() => { setShowForm(true); setEditItem(null); setForm({ name: '', role: '', email: '', department: '', year: '' }); }} className="btn-primary text-sm py-2 px-4 inline-flex items-center gap-2">
          <Plus size={15} /> Add Member
        </button>
      </div>
      <div className="flex gap-2 mb-6">
        {['current', 'foundation'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all ${activeTab === tab ? 'bg-reva-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
            {tab === 'current' ? 'Current' : 'Foundation'}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6 border border-reva-red/20">
          <h3 className="font-outfit font-semibold text-white mb-4">{editItem ? 'Edit Member' : 'Add Member'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="input-field" placeholder="Role *" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
            <input className="input-field" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input className="input-field" placeholder="Department" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
            <input className="input-field" placeholder="Year (e.g. 2nd Year)" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-primary text-sm py-2 px-5 inline-flex items-center gap-1.5"><Save size={14} /> Save</button>
            <button onClick={() => { setShowForm(false); setEditItem(null); }} className="btn-ghost text-sm inline-flex items-center gap-1.5"><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {list.map(m => (
          <div key={m.id} className="glass-card p-4 flex items-center justify-between gap-4 group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-reva-red to-reva-darkred flex items-center justify-center font-outfit font-bold text-white text-xs shrink-0">
                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm truncate">{m.name}</h4>
                <p className="text-white/40 text-xs">{m.role} • {m.department}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(m)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><Edit3 size={14} /></button>
              <button onClick={() => del(m.id)} className="p-2 rounded-lg bg-reva-red/10 text-reva-red hover:bg-reva-red/20 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery CRUD ─────────────────────────────────────────────────────────
function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'Events' });

  useEffect(() => { setGallery(getData('GALLERY') || seedGallery); }, []);

  const add = () => {
    if (!form.title) return;
    const colors = ['from-purple-800 to-pink-900', 'from-blue-800 to-cyan-900', 'from-green-800 to-teal-900', 'from-amber-700 to-orange-800'];
    const newImg = { ...form, id: Date.now(), color: colors[Math.floor(Math.random() * colors.length)] };
    const updated = [...gallery, newImg];
    setData('GALLERY', updated); setGallery(updated);
    setForm({ title: '', category: 'Events' });
  };

  const del = (id) => {
    const updated = gallery.filter(g => g.id !== id);
    setData('GALLERY', updated); setGallery(updated);
  };

  return (
    <div>
      <h2 className="font-outfit font-bold text-2xl text-white mb-6">Gallery <span className="text-white/40 text-base font-normal">({gallery.length} photos)</span></h2>
      <div className="glass-card p-6 mb-6 border border-reva-red/20">
        <h3 className="font-outfit font-semibold text-white mb-4">Add New Photo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input className="input-field" placeholder="Photo Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {['Events', 'Competitions', 'Workshops', 'Achievements'].map(c => (
              <option key={c} value={c} className="bg-reva-navy">{c}</option>
            ))}
          </select>
          <button onClick={add} className="btn-primary inline-flex items-center justify-center gap-2"><Plus size={15} /> Add Photo</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {gallery.map(img => (
          <div key={img.id} className={`relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br ${img.color} group`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
              <p className="text-white/70 text-xs font-semibold leading-tight">{img.title}</p>
              <span className="badge-blue text-xs mt-1">{img.category}</span>
            </div>
            <button onClick={() => del(img.id)} className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-black/50 text-white/70 hover:text-reva-red opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Complaints View ───────────────────────────────────────────────────────
function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => { setComplaints(getData('COMPLAINTS') || []); }, []);

  const toggleStatus = (id) => {
    const updated = complaints.map(c => c.id === id
      ? { ...c, status: c.status === 'Pending' ? 'Resolved' : 'Pending' }
      : c
    );
    setData('COMPLAINTS', updated); setComplaints(updated);
  };

  return (
    <div>
      <h2 className="font-outfit font-bold text-2xl text-white mb-6">
        Complaints <span className="text-white/40 text-base font-normal">({complaints.length})</span>
      </h2>
      {complaints.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-white/40">No complaints submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map(c => (
            <div key={c.id} className="glass-card p-5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge-red">{c.category}</span>
                  <span className={`badge ${c.status === 'Resolved' ? 'badge-green' : 'badge-gold'}`}>
                    {c.status === 'Resolved' ? <CheckCircle size={11} className="mr-1" /> : <Clock size={11} className="mr-1" />}
                    {c.status}
                  </span>
                </div>
                <button onClick={() => toggleStatus(c.id)} className="btn-ghost text-xs py-1.5 px-3 shrink-0">
                  Toggle Status
                </button>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-3">{c.description}</p>
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span>{c.isAnonymous ? '🕶️ Anonymous' : `📧 ${c.email || 'No email'}`}</span>
                <span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('events');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const adminName = sessionStorage.getItem('adminName') || 'Admin';
  const adminRole = sessionStorage.getItem('adminRole') || 'core-team';

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminName');
    sessionStorage.removeItem('adminRole');
    navigate('/');
  };

  const sectionComponents = {
    events: <AdminEvents />,
    members: <AdminMembers />,
    gallery: <AdminGallery />,
    complaints: <AdminComplaints />,
  };

  return (
    <div className="min-h-screen pt-16 flex bg-reva-navy">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-40 w-64 bg-reva-navylight border-r border-white/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-reva-red to-reva-darkred rounded-xl flex items-center justify-center font-outfit font-black text-white text-sm">
              {adminName[0]}
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{adminName}</div>
              <div className="text-white/40 text-xs capitalize">{adminRole.replace('-', ' ')}</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                onClick={() => { setActiveSection(section.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeSection === section.key
                    ? 'bg-reva-red text-white shadow-lg shadow-reva-red/20'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={17} />
                {section.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/50 hover:bg-reva-red/10 hover:text-reva-red transition-all duration-200">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 md:p-8 overflow-auto page-enter">
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="btn-ghost flex items-center gap-2 text-sm">
            <ChevronDown size={16} /> Menu
          </button>
          <h1 className="font-outfit font-bold text-lg text-white capitalize">{activeSection}</h1>
        </div>

        {/* Admin badge */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 text-white/40 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" /> Admin Dashboard — {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </div>
        </div>

        {sectionComponents[activeSection]}
      </main>
    </div>
  );
}
