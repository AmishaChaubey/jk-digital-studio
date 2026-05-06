import { useState, useEffect, useRef } from 'react';
import {
  Camera, Video, Bell, Trash2, Upload,
  Image, Film, ChevronDown, X, CheckCircle, AlertCircle,
  Layers, LayoutGrid, Plus, Eye, Package, TrendingUp, Grid,
  LogOut, Sparkles
} from 'lucide-react';
import API from '../api/axios';

const SERVICES_LIST = [
  'wedding', 'babyshoot', 'birthday', 'portrait',
  'maternity', 'corporate', 'fashion', 'prewedding'
];

const NAV_ITEMS = [
  { label: 'Photos', id: 0, icon: Camera, desc: 'Upload & manage photos' },
  { label: 'Videos', id: 1, icon: Film, desc: 'Upload & manage videos' },
  // { label: 'Services', id: 2, icon: Bell, desc: 'Manage service offerings' },
  { label: 'Overview', id: 3, icon: Grid, desc: 'All content at a glance' },
];

function StableTextarea({ value, onChange, placeholder, style }) {
  const ref = useRef(null);
  const sel = useRef({ start: 0, end: 0 });
  const handle = (e) => { sel.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; onChange(e.target.value); };
  useEffect(() => { if (ref.current && document.activeElement === ref.current) requestAnimationFrame(() => ref.current.setSelectionRange(sel.current.start, sel.current.end)); }, [value]);
  return <textarea ref={ref} value={value} onChange={handle} placeholder={placeholder} style={style} />;
}
function StableInput({ value, onChange, placeholder, style, type = 'text' }) {
  const ref = useRef(null);
  const sel = useRef({ start: 0, end: 0 });
  const handle = (e) => { sel.current = { start: e.target.selectionStart, end: e.target.selectionEnd }; onChange(e.target.value); };
  useEffect(() => { if (ref.current && document.activeElement === ref.current) requestAnimationFrame(() => ref.current.setSelectionRange(sel.current.start, sel.current.end)); }, [value]);
  return <input ref={ref} type={type} value={value} onChange={handle} placeholder={placeholder} style={style} />;
}

const inp = {
  width: '100%', padding: '10px 14px',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px', color: '#f1f5f9', fontSize: '13px',
  fontFamily: "'DM Sans', sans-serif", outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
};

const Field = ({ label, children, required }) => (
  <div style={{ marginBottom: '14px' }}>
    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" }}>
      {label}{required && <span style={{ color: '#f87171', marginLeft: '2px' }}>*</span>}
    </label>
    {children}
  </div>
);

function ServiceSelect({ value, onChange, services }) {
  const opts = services.length > 0 ? services : SERVICES_LIST;
  return (
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={onChange} style={{ ...inp, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}>
        {opts.map(sv => {
          const val = typeof sv === 'string' ? sv : sv.name.toLowerCase().replace(/\s/g, '');
          const lbl = typeof sv === 'string' ? sv.charAt(0).toUpperCase() + sv.slice(1) : sv.name;
          return <option key={val} value={val} style={{ background: '#1a1625', color: '#f1f5f9' }}>{lbl}</option>;
        })}
      </select>
      <ChevronDown size={13} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}

const PageTypeSelect = ({ value, onChange }) => (
  <div style={{ position: 'relative' }}>
    <select value={value} onChange={onChange} style={{ ...inp, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}>
      <option value="both" style={{ background: '#1a1625' }}>Gallery + Service Page</option>
      <option value="gallery" style={{ background: '#1a1625' }}>Gallery Only</option>
      <option value="service" style={{ background: '#1a1625' }}>Service Page Only</option>
    </select>
    <ChevronDown size={13} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
  </div>
);

const FileZone = ({ accept, onChange, label, icon: Icon }) => {
  const [hov, setHov] = useState(false);
  return (
    <label onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', height: '90px', border: `1.5px dashed ${hov ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', background: hov ? 'rgba(248,113,113,0.05)' : 'rgba(255,255,255,0.02)' }}>
      <Icon size={18} color={hov ? '#f87171' : 'rgba(255,255,255,0.2)'} style={{ transition: 'color 0.2s' }} />
      <span style={{ fontSize: '11px', color: hov ? '#f87171' : 'rgba(255,255,255,0.25)', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', padding: '0 10px', transition: 'color 0.2s' }}>{label}</span>
      <input type="file" accept={accept} style={{ display: 'none' }} onChange={onChange} />
    </label>
  );
};

function Btn({ onClick, loading, label, icon: Icon, full }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={loading} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: full ? '100%' : 'auto', padding: '11px 20px', background: hov && !loading ? 'rgba(220,38,38,0.9)' : 'rgba(220,38,38,0.7)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', color: '#fff', fontWeight: 700, fontSize: '12px', letterSpacing: '0.8px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', opacity: loading ? 0.5 : 1, fontFamily: "'DM Sans', sans-serif", boxShadow: hov && !loading ? '0 8px 24px rgba(220,38,38,0.35)' : '0 2px 10px rgba(220,38,38,0.15)', transform: hov && !loading ? 'translateY(-1px)' : 'none' }}>
      <Icon size={13} />{loading ? 'Processing…' : label}
    </button>
  );
}

const Card = ({ children, style = {} }) => (
  <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.07)', ...style }}>
    {children}
  </div>
);

const CardTitle = ({ icon: Icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ width: '28px', height: '28px', background: 'rgba(248,113,113,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={13} color="#f87171" />
    </div>
    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
  </div>
);

function ManageRow({ item, onDelete, icon: Icon, showPageType }) {
  const [hov, setHov] = useState(false);
  const ptMap = {
    both:    { label: 'Both',    color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
    gallery: { label: 'Gallery', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
    service: { label: 'Service', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  };
  const pt = ptMap[item.pageType] || ptMap['both'];
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', border: `1px solid ${hov ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.05)'}`, background: hov ? 'rgba(248,113,113,0.05)' : 'rgba(255,255,255,0.02)', transition: 'all 0.18s' }}>
      {item.thumb
        ? <img src={item.thumb} alt={item.title} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '7px', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)' }} />
        : <div style={{ width: '36px', height: '36px', borderRadius: '7px', background: 'rgba(248,113,113,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={14} color="rgba(248,113,113,0.5)" /></div>
      }
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: 600, margin: '0 0 3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: "'DM Sans', sans-serif" }}>{item.title}</p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {item.badge && <span style={{ fontSize: '9px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '1px 7px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>{item.badge}</span>}
          {showPageType && item.pageType && <span style={{ fontSize: '9px', background: pt.bg, color: pt.color, padding: '1px 7px', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', fontFamily: "'DM Sans', sans-serif" }}><Layers size={7} />{pt.label}</span>}
        </div>
      </div>
      <button onClick={onDelete}
        style={{ flexShrink: 0, background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)', borderRadius: '7px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.18s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.18)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.07)'; }}>
        <Trash2 size={12} color="#f87171" />
      </button>
    </div>
  );
}

function EmptyState({ icon: Icon, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Icon size={20} color="rgba(255,255,255,0.12)" />
      </div>
      <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
    </div>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [services, setServices] = useState([]);
  const [svcOpts, setSvcOpts] = useState([]);
  const [pf, setPf] = useState({ title: '', service: '', pageType: 'both', file: null });
  const [vf, setVf] = useState({ title: '', service: '', file: null, thumb: null });
  const [sf, setSf] = useState({ name: '', description: '', file: null });

  const fetchSvcOpts = async () => {
    try {
      const r = await API.get('/services');
      if (r.data?.length > 0) {
        setSvcOpts(r.data);
        const slug = r.data[0].name.toLowerCase().replace(/\s/g, '');
        setPf(f => ({ ...f, service: f.service || slug }));
        setVf(f => ({ ...f, service: f.service || slug }));
      }
    } catch { setSvcOpts([]); }
  };

  const fetchAll = async () => {
    try {
      const [p, v, s] = await Promise.all([API.get('/photos'), API.get('/videos'), API.get('/services')]);
      setPhotos(p.data); setVideos(v.data); setServices(s.data);
      if (s.data?.length > 0) setSvcOpts(s.data);
    } catch (e) { showMsg('Failed to load: ' + e.message, 'error'); }
  };

  useEffect(() => { fetchSvcOpts(); }, []);
  useEffect(() => { fetchAll(); }, [tab]);

  const showMsg = (text, type = 'success') => { setMsg({ text, type }); setTimeout(() => setMsg({ text: '', type: '' }), 3500); };

  const uploadPhoto = async () => {
    if (!pf.title || !pf.file) return showMsg('Title and photo are required.', 'error');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', pf.title); fd.append('service', pf.service); fd.append('pageType', pf.pageType); fd.append('image', pf.file);
      await API.post('/photos/upload', fd);
      showMsg('Photo uploaded!'); setPf(f => ({ ...f, title: '', pageType: 'both', file: null })); fetchAll();
    } catch (e) { showMsg('Upload failed: ' + e.message, 'error'); }
    finally { setLoading(false); }
  };

  const uploadVideo = async () => {
    if (!vf.title || !vf.file) return showMsg('Title and video are required.', 'error');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', vf.title); fd.append('service', vf.service); fd.append('video', vf.file);
      if (vf.thumb) fd.append('thumbnail', vf.thumb);
      await API.post('/videos/upload', fd);
      showMsg('Video uploaded!'); setVf(f => ({ ...f, title: '', file: null, thumb: null })); fetchAll();
    } catch (e) { showMsg('Upload failed: ' + e.message, 'error'); }
    finally { setLoading(false); }
  };

  // const uploadService = async () => {
  //   if (!sf.name) return showMsg('Service name is required.', 'error');
  //   setLoading(true);
  //   try {
  //     const fd = new FormData();
  //     fd.append('name', sf.name); fd.append('description', sf.description);
  //     if (sf.file) fd.append('coverImage', sf.file);
  //     await API.post('/services', fd);
  //     showMsg('Service added!'); setSf({ name: '', description: '', file: null }); fetchAll(); fetchSvcOpts();
  //   } catch (e) { showMsg('Failed: ' + e.message, 'error'); }
  //   finally { setLoading(false); }
  // };

  const delPhoto = async (id) => { if (!window.confirm('Delete photo?')) return; await API.delete(`/photos/${id}`); showMsg('Deleted.'); fetchAll(); };
  const delVideo = async (id) => { if (!window.confirm('Delete video?')) return; await API.delete(`/videos/${id}`); showMsg('Deleted.'); fetchAll(); };
  const delService = async (id) => { if (!window.confirm('Delete service?')) return; await API.delete(`/services/${id}`); showMsg('Deleted.'); fetchAll(); fetchSvcOpts(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        html, body, #root { margin: 0 !important; padding: 0 !important; }
        * { box-sizing: border-box; }
        input, select, textarea { font-family: 'DM Sans', sans-serif; }
        input:focus, select:focus, textarea:focus {
          border-color: rgba(248,113,113,0.5) !important;
          box-shadow: 0 0 0 3px rgba(248,113,113,0.08) !important;
          outline: none;
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        option { background: #1a1625; color: #f1f5f9; }
        @keyframes toastIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes orb1 { 0%,100%{transform:translate(0,0);} 50%{transform:translate(40px,-30px);} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-30px,40px);} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(248,113,113,0.18); border-radius: 4px; }
      `}</style>

      {/* Full-screen takeover — covers everything including navbar/footer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        fontFamily: "'DM Sans', sans-serif",
        background: '#0f0d1a',
        overflow: 'hidden',
      }}>

        {/* Ambient background orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 65%)', animation: 'orb1 14s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-12%', right: '-8%', width: '650px', height: '650px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)', animation: 'orb2 18s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', top: '40%', left: '40%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,113,113,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* Toast */}
        {msg.text && (
          <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 99999, display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', borderRadius: '12px', background: msg.type === 'error' ? 'rgba(220,38,38,0.14)' : 'rgba(52,211,153,0.1)', border: `1px solid ${msg.type === 'error' ? 'rgba(248,113,113,0.35)' : 'rgba(52,211,153,0.3)'}`, backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', color: msg.type === 'error' ? '#f87171' : '#34d399', fontSize: '13px', fontWeight: 600, animation: 'toastIn 0.3s ease' }}>
            {msg.type === 'error' ? <AlertCircle size={14} /> : <CheckCircle size={14} />}{msg.text}
          </div>
        )}

        {/* ── Sidebar ── */}
        <aside style={{ position: 'relative', zIndex: 1, width: '228px', flexShrink: 0, background: 'rgba(255,255,255,0.025)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

          {/* Logo */}
          <div style={{ padding: '26px 20px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #dc2626 0%, #7c2d12 100%)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(220,38,38,0.45), inset 0 1px 0 rgba(255,255,255,0.15)', flexShrink: 0 }}>
                <Camera size={19} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.1 }}>JK Studio</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', fontWeight: 500, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={8} color="rgba(248,113,113,0.5)" />Admin Panel
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 16px 14px' }} />

          {/* Nav */}
          <nav style={{ padding: '0 10px', flex: 1 }}>
            <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.18)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, padding: '0 10px', marginBottom: '8px' }}>Navigation</p>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button key={item.id} onClick={() => setTab(item.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: active ? 'rgba(220,38,38,0.13)' : 'transparent', border: active ? '1px solid rgba(220,38,38,0.22)' : '1px solid transparent', cursor: 'pointer', color: active ? '#f87171' : 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: active ? 700 : 500, transition: 'all 0.18s', marginBottom: '3px', textAlign: 'left' }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; } }}
                >
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: active ? 'rgba(220,38,38,0.18)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                    <div style={{ fontSize: '10px', color: active ? 'rgba(248,113,113,0.45)' : 'rgba(255,255,255,0.18)', fontWeight: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>{item.desc}</div>
                  </div>
                  {active && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#f87171', boxShadow: '0 0 8px #f87171', flexShrink: 0 }} />}
                </button>
              );
            })}
          </nav>

          {/* Stats */}
          <div style={{ margin: '12px 10px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.12)', borderRadius: '14px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <TrendingUp size={11} color="rgba(248,113,113,0.6)" />
              <span style={{ fontSize: '9px', color: 'rgba(248,113,113,0.55)', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase' }}>Quick Stats</span>
            </div>
            {[{ label: 'Photos', count: photos.length, icon: Camera }, { label: 'Videos', count: videos.length, icon: Film }, { label: 'Services', count: services.length, icon: Bell }].map(s => {
              const I = s.icon;
              return (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.38)' }}><I size={11} color="rgba(248,113,113,0.45)" />{s.label}</div>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#f87171' }}>{s.count}</span>
                </div>
              );
            })}
          </div>

          {/* Back to site */}
          <div style={{ padding: '0 10px 22px' }}>
            <a href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.28)', fontSize: '12px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.28)'; }}>
              <LogOut size={13} />Back to Site
            </a>
          </div>
        </aside>

        {/* ── Main ── */}
        <main style={{ position: 'relative', zIndex: 1, flex: 1, overflowY: 'auto', padding: '28px 30px', background: 'transparent' }}>

          {/* Header */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                {(() => { const I = NAV_ITEMS[tab].icon; return <I size={20} color="#f87171" />; })()}
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{NAV_ITEMS[tab].label}</h1>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", margin: 0, marginLeft: '30px' }}>{NAV_ITEMS[tab].desc}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 14px', background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '10px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              <span style={{ fontSize: '11px', color: 'rgba(52,211,153,0.7)', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Live</span>
            </div>
          </div>

          {/* ── Photos ── */}
          {tab === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '288px 1fr', gap: '18px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Card>
                  <CardTitle icon={LayoutGrid} label="Photo Details" />
                  <Field label="Title" required>
                    <StableInput style={inp} placeholder="e.g. Sharma Wedding 2024" value={pf.title} onChange={v => setPf(f => ({ ...f, title: v }))} />
                  </Field>
                  <Field label="Service" required>
                    <ServiceSelect value={pf.service} onChange={e => setPf(f => ({ ...f, service: e.target.value }))} services={svcOpts} />
                  </Field>
                  <Field label="Display In" required>
                    <PageTypeSelect value={pf.pageType} onChange={e => setPf(f => ({ ...f, pageType: e.target.value }))} />
                    <div style={{ marginTop: '8px', padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.5, border: '1px solid rgba(255,255,255,0.04)' }}>
                      {pf.pageType === 'both' && '📸 Gallery + Service page'}
                      {pf.pageType === 'gallery' && '🖼️ Gallery only'}
                      {pf.pageType === 'service' && '🔖 Service page only'}
                    </div>
                  </Field>
                </Card>
                <Card>
                  <CardTitle icon={Upload} label="Select File" />
                  {pf.file ? (
                    <div style={{ position: 'relative' }}>
                      <img src={URL.createObjectURL(pf.file)} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)', display: 'block' }} />
                      <button onClick={() => setPf(f => ({ ...f, file: null }))} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}><X size={11} color="#f87171" /></button>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '6px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pf.file.name}</p>
                    </div>
                  ) : (
                    <FileZone accept="image/*" label="Click to select (JPG, PNG, WEBP)" icon={Image} onChange={e => setPf(f => ({ ...f, file: e.target.files[0] }))} />
                  )}
                  <div style={{ marginTop: '14px' }}><Btn onClick={uploadPhoto} loading={loading} label="Upload Photo" icon={Upload} full /></div>
                </Card>
              </div>

              <Card style={{ minHeight: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', background: 'rgba(248,113,113,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={13} color="#f87171" /></div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.75)', fontFamily: "'DM Sans', sans-serif" }}>Uploaded Photos</span>
                  </div>
                  <span style={{ fontSize: '11px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.18)' }}>{photos.length} total</span>
                </div>
                {photos.length === 0
                  ? <EmptyState icon={Camera} label="No photos uploaded yet" />
                  : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                      {photos.map(p => (
                        <div key={p.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                          <img src={`http://localhost:5000${p.imageUrl}`} alt={p.title} style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }} />
                          <div style={{ padding: '8px 10px' }}>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                            <span style={{ fontSize: '9px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '1px 6px', borderRadius: '20px', fontWeight: 700, textTransform: 'uppercase' }}>{p.service}</span>
                          </div>
                          <button onClick={() => delPhoto(p.id)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(248,113,113,0.22)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
                            <Trash2 size={11} color="#f87171" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
              </Card>
            </div>
          )}

          {/* ── Videos ── */}
          {tab === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '288px 1fr', gap: '18px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Card>
                  <CardTitle icon={LayoutGrid} label="Video Details" />
                  <Field label="Title" required><StableInput style={inp} placeholder="e.g. JK Wedding Highlights" value={vf.title} onChange={v => setVf(f => ({ ...f, title: v }))} /></Field>
                  <Field label="Service" required><ServiceSelect value={vf.service} onChange={e => setVf(f => ({ ...f, service: e.target.value }))} services={svcOpts} /></Field>
                </Card>
                <Card>
                  <CardTitle icon={Upload} label="Upload Files" />
                  <Field label="Video File" required>
                    <FileZone accept="video/*" label={vf.file ? vf.file.name : 'Click to select video (MP4, MOV)'} icon={Video} onChange={e => setVf(f => ({ ...f, file: e.target.files[0] }))} />
                  </Field>
                  <Field label="Thumbnail (Optional)">
                    {vf.thumb
                      ? <div style={{ position: 'relative' }}>
                          <img src={URL.createObjectURL(vf.thumb)} alt="Thumb" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                          <button onClick={() => setVf(f => ({ ...f, thumb: null }))} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={11} color="#f87171" /></button>
                        </div>
                      : <FileZone accept="image/*" label="Click to select thumbnail" icon={Image} onChange={e => setVf(f => ({ ...f, thumb: e.target.files[0] }))} />
                    }
                  </Field>
                  <Btn onClick={uploadVideo} loading={loading} label="Upload Video" icon={Upload} full />
                </Card>
              </div>
              <Card style={{ minHeight: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', background: 'rgba(248,113,113,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={13} color="#f87171" /></div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Uploaded Videos</span>
                  </div>
                  <span style={{ fontSize: '11px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.18)' }}>{videos.length} total</span>
                </div>
                {videos.length === 0 ? <EmptyState icon={Film} label="No videos uploaded yet" />
                  : <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>{videos.map(v => <ManageRow key={v.id} item={{ id: v.id, title: v.title, badge: v.service }} icon={Film} onDelete={() => delVideo(v.id)} />)}</div>
                }
              </Card>
            </div>
          )}

          {/* ── Services ── */}
          {/* {tab === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: '288px 1fr', gap: '18px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Card>
                  <CardTitle icon={Plus} label="New Service" />
                  <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '10px', padding: '10px 12px', marginBottom: '14px' }}>
                    <p style={{ margin: 0, fontSize: '12px', color: 'rgba(248,113,113,0.7)', fontWeight: 500, lineHeight: 1.6 }}>🔗 Auto-appears in <strong style={{ color: '#f87171' }}>Navbar dropdown</strong> after adding.</p>
                  </div>
                  <Field label="Service Name" required><StableInput style={inp} placeholder="e.g. Baby Shoot" value={sf.name} onChange={v => setSf(f => ({ ...f, name: v }))} /></Field>
                  <Field label="Description"><StableTextarea style={{ ...inp, resize: 'none', height: '80px' }} placeholder="Describe the service…" value={sf.description} onChange={v => setSf(f => ({ ...f, description: v }))} /></Field>
                </Card>
                <Card>
                  <CardTitle icon={Image} label="Cover Image" />
                  {sf.file
                    ? <div style={{ position: 'relative' }}>
                        <img src={URL.createObjectURL(sf.file)} alt="Cover" style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px', display: 'block' }} />
                        <button onClick={() => setSf(f => ({ ...f, file: null }))} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={11} color="#f87171" /></button>
                      </div>
                    : <FileZone accept="image/*" label="Click to select cover image" icon={Image} onChange={e => setSf(f => ({ ...f, file: e.target.files[0] }))} />
                  }
                  <div style={{ marginTop: '14px' }}><Btn onClick={uploadService} loading={loading} label="Add Service" icon={Bell} full /></div>
                </Card>
              </div>
              <Card style={{ minHeight: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', background: 'rgba(248,113,113,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={13} color="#f87171" /></div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>Active Services</span>
                  </div>
                  <span style={{ fontSize: '11px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.18)' }}>{services.length} total</span>
                </div>
                {services.length === 0 ? <EmptyState icon={Bell} label="No services yet" />
                  : <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>{services.map(s => <ManageRow key={s.id} item={{ id: s.id, title: s.name, badge: '🔗 Navbar' }} icon={Bell} onDelete={() => delService(s.id)} />)}</div>
                }
              </Card>
            </div>
          )} */}

          {/* ── Overview ── */}
          {tab === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {[
                  { label: 'Total Photos', count: photos.length, icon: Camera, color: '#f87171', glow: 'rgba(248,113,113,0.15)', bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.12)' },
                  { label: 'Total Videos', count: videos.length, icon: Film, color: '#a78bfa', glow: 'rgba(167,139,250,0.15)', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.12)' },
                  {/* { label: 'Total Services', count: services.length, icon: Bell, color: '#34d399', glow: 'rgba(52,211,153,0.15)', bg: 'rgba(52,211,153,0.07)', border: 'rgba(52,211,153,0.12)' }, */}
                ].map(s => {
                  const I = s.icon;
                  return (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '22px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: '16px', boxShadow: `0 8px 32px ${s.glow}` }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${s.bg}`, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><I size={22} color={s.color} /></div>
                      <div>
                        <div style={{ fontSize: '34px', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>{s.count}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.32)', marginTop: '3px' }}>{s.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
                <Card>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><Camera size={13} color="#f87171" /><span style={{ fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>Photos</span></div>
                    <span style={{ fontSize: '10px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '2px 8px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.15)' }}>{photos.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '420px', overflowY: 'auto' }}>
                    {photos.map(p => <ManageRow key={p.id} item={{ id: p.id, title: p.title, badge: p.service, pageType: p.pageType, thumb: `http://localhost:5000${p.imageUrl}` }} icon={Camera} onDelete={() => delPhoto(p.id)} showPageType />)}
                    {!photos.length && <EmptyState icon={Camera} label="No photos" />}
                  </div>
                </Card>
                <Card>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><Film size={13} color="#f87171" /><span style={{ fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>Videos</span></div>
                    <span style={{ fontSize: '10px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '2px 8px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.15)' }}>{videos.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '420px', overflowY: 'auto' }}>
                    {videos.map(v => <ManageRow key={v.id} item={{ id: v.id, title: v.title, badge: v.service }} icon={Film} onDelete={() => delVideo(v.id)} />)}
                    {!videos.length && <EmptyState icon={Film} label="No videos" />}
                  </div>
                </Card>
                <Card>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}><Bell size={13} color="#f87171" /><span style={{ fontWeight: 700, fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>Services</span></div>
                    <span style={{ fontSize: '10px', background: 'rgba(248,113,113,0.1)', color: '#f87171', padding: '2px 8px', borderRadius: '20px', fontWeight: 700, border: '1px solid rgba(248,113,113,0.15)' }}>{services.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '420px', overflowY: 'auto' }}>
                    {services.map(s => <ManageRow key={s.id} item={{ id: s.id, title: s.name, badge: '🔗 Navbar' }} icon={Bell} onDelete={() => delService(s.id)} />)}
                    {!services.length && <EmptyState icon={Bell} label="No services" />}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}