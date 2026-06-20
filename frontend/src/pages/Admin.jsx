import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';

// ── Login Form ────────────────────────────────────────────────────────────────
const LoginForm = ({ onLogin }) => {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creds.email || !creds.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/admin/login', creds);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminData', JSON.stringify(res.data.admin));
      onLogin(res.data.admin);
      toast.success('Welcome back, Siddharth!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', padding: '24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '420px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', padding: '40px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '700', fontFamily: 'var(--font-body)',
            color: '#fff', margin: '0 auto 16px',
          }}>SY</div>
          <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
            Admin Login
          </h1>
          <p style={{ fontSize: '14px', color: '#71717a', fontFamily: 'var(--font-body)' }}>
            Portfolio management dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', fontFamily: 'var(--font-body)', fontWeight: '500', marginBottom: '8px' }}>
              Email
            </label>
            <input type="email" value={creds.email}
              onChange={(e) => setCreds(p => ({ ...p, email: e.target.value }))}
              placeholder="hydrasiddhu213@gmail.com"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                padding: '13px 16px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(177,95,44,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#a1a1aa', fontFamily: 'var(--font-body)', fontWeight: '500', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input type={showPwd ? 'text' : 'password'} value={creds.password}
                onChange={(e) => setCreds(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                  padding: '13px 48px 13px 16px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(177,95,44,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none'; }}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#71717a', fontSize: '16px' }}>
                {showPwd ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <motion.button type="submit" disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 24px rgba(177,95,44,0.4)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(177,95,44,0.4)' : 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
              border: 'none', borderRadius: '12px', color: '#fff',
              fontSize: '15px', fontFamily: 'var(--font-body)', fontWeight: '600',
              boxShadow: '0 4px 20px rgba(177,95,44,0.25)',
            }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// ── Project Modal ─────────────────────────────────────────────────────────────
const EMPTY_PROJECT = {
  title: '', shortDescription: '', description: '',
  techStack: '', achievements: '', githubUrl: '', liveUrl: '',
  imageGradient: 'linear-gradient(135deg,#667eea,#764ba2)', featured: false, order: 0,
  startDate: '', endDate: 'Present', category: 'fullstack',
};

const ProjectModal = ({ project, onClose, onSave }) => {
  const [form, setForm] = useState(
    project
      ? { ...project, techStack: project.techStack?.join(', ') || '', achievements: project.achievements?.join('\n') || '' }
      : EMPTY_PROJECT
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.shortDescription) { toast.error('Title and short description required'); return; }
    setLoading(true);
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
        achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
        order: Number(form.order) || 0,
      };
      if (project?._id) {
        await api.put(`/projects/${project._id}`, payload);
        toast.success('Project updated!');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created!');
      }
      onSave();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'title', label: 'Title', placeholder: 'Project name' },
    { name: 'shortDescription', label: 'Short Description', placeholder: '1-2 line summary' },
    { name: 'description', label: 'Full Description', placeholder: 'Detailed description', multi: true },
    { name: 'techStack', label: 'Tech Stack (comma-separated)', placeholder: 'React.js, Node.js, MongoDB' },
    { name: 'achievements', label: 'Achievements (one per line)', placeholder: 'Built X that does Y\nAchieved Z metric', multi: true },
    { name: 'githubUrl', label: 'GitHub URL', placeholder: 'https://github.com/...' },
    { name: 'liveUrl', label: 'Live URL', placeholder: 'https://...' },
    { name: 'imageGradient', label: 'CSS Gradient', placeholder: 'linear-gradient(...)' },
    { name: 'startDate', label: 'Start Date', placeholder: 'Jul 2025' },
    { name: 'endDate', label: 'End Date', placeholder: 'Present' },
  ];

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '11px 14px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '24px',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
          padding: '32px', width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '22px' }}>×</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {fields.map(f => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '12px', color: '#71717a', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>{f.label}</label>
              {f.multi ? (
                <textarea name={f.name} value={form[f.name]} onChange={handleChange}
                  placeholder={f.placeholder} rows={3} style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
              ) : (
                <input name={f.name} value={form[f.name]} onChange={handleChange}
                  placeholder={f.placeholder} style={inputStyle} />
              )}
            </div>
          ))}
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a1a1aa', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Featured project
          </label>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#a1a1aa', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
            Cancel
          </button>
          <motion.button onClick={handleSave} disabled={loading}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))', border: 'none', borderRadius: '10px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '600' }}>
            {loading ? 'Saving...' : 'Save Project'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Profile and Stats Tab ─────────────────────────────────────────────────────
const ProfileTab = ({ portfolio, onSave }) => {
  const [form, setForm] = useState({
    name: portfolio?.personal?.name || '',
    title: portfolio?.personal?.title || '',
    email: portfolio?.personal?.email || '',
    phone: portfolio?.personal?.phone || '',
    location: portfolio?.personal?.location || '',
    github: portfolio?.personal?.github || '',
    leetcode: portfolio?.personal?.leetcode || '',
    summary: portfolio?.personal?.summary || '',
    projectsDeployed: portfolio?.stats?.projectsDeployed || 0,
    apisBuilt: portfolio?.stats?.apisBuilt || 0,
    certifications: portfolio?.stats?.certifications || 0,
    yearsOfCoding: portfolio?.stats?.yearsOfCoding || 0,
    eduInstitution: portfolio?.education?.institution || '',
    eduLocation: portfolio?.education?.location || '',
    eduDegree: portfolio?.education?.degree || '',
    eduPeriod: portfolio?.education?.period || '',
    eduCgpa: portfolio?.education?.cgpa || '',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const updated = {
      personal: {
        name: form.name,
        title: form.title,
        email: form.email,
        phone: form.phone,
        location: form.location,
        github: form.github,
        leetcode: form.leetcode,
        summary: form.summary,
      },
      stats: {
        projectsDeployed: Number(form.projectsDeployed) || 0,
        apisBuilt: Number(form.apisBuilt) || 0,
        certifications: Number(form.certifications) || 0,
        yearsOfCoding: Number(form.yearsOfCoding) || 0,
      },
      education: {
        institution: form.eduInstitution,
        location: form.eduLocation,
        degree: form.eduDegree,
        period: form.eduPeriod,
        cgpa: form.eduCgpa,
      }
    };
    const success = await onSave(updated);
    if (success) toast.success('Profile details saved!');
    setSaving(false);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '11px 14px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '700', color: 'var(--accent)', marginBottom: '18px' }}>Hero & Personal Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Hero Title (Roles split by |)</label>
            <input name="title" value={form.title} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Email</label>
            <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>GitHub Profile Link</label>
            <input name="github" value={form.github} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>LeetCode Link</label>
            <input name="leetcode" value={form.leetcode} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Biography Summary</label>
          <textarea name="summary" value={form.summary} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '700', color: 'var(--accent)', marginBottom: '18px' }}>Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Projects Deployed</label>
            <input type="number" name="projectsDeployed" value={form.projectsDeployed} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>REST APIs Built</label>
            <input type="number" name="apisBuilt" value={form.apisBuilt} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Certifications count</label>
            <input type="number" name="certifications" value={form.certifications} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Years Coding</label>
            <input type="number" name="yearsOfCoding" value={form.yearsOfCoding} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '700', color: 'var(--accent)', marginBottom: '18px' }}>Education</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Institution</label>
            <input name="eduInstitution" value={form.eduInstitution} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Location</label>
            <input name="eduLocation" value={form.eduLocation} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Degree</label>
            <input name="eduDegree" value={form.eduDegree} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Period</label>
            <input name="eduPeriod" value={form.eduPeriod} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>CGPA / Grades</label>
            <input name="eduCgpa" value={form.eduCgpa} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
      </div>

      <motion.button type="submit" disabled={saving}
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
        style={{
          padding: '14px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
          border: 'none', borderRadius: '12px', color: '#fff',
          fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '15px', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(177,95,44,0.25)',
        }}>
        {saving ? 'Saving...' : 'Save Portfolio Settings'}
      </motion.button>
    </form>
  );
};

// ── Skills Tab ───────────────────────────────────────────────────────────────
const SkillsTab = ({ portfolio, onSave }) => {
  const skills = portfolio?.skills || { languages: [], frontend: [], backend: [], databases: [], tools: [] };
  const [newSkill, setNewSkill] = useState({ name: '', icon: '', color: 'var(--accent)', category: 'languages' });

  const categories = [
    { key: 'languages', label: 'Languages' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'databases', label: 'Databases' },
    { key: 'tools', label: 'Tools' },
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSkill.name) { toast.error('Skill name is required'); return; }
    const catList = skills[newSkill.category] || [];
    if (catList.some(s => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      toast.error('Skill already exists in this category');
      return;
    }
    const updated = {
      skills: {
        ...skills,
        [newSkill.category]: [...catList, { name: newSkill.name, icon: newSkill.icon, color: newSkill.color }]
      }
    };
    const success = await onSave(updated);
    if (success) {
      toast.success('Skill added!');
      setNewSkill(p => ({ ...p, name: '', icon: '' }));
    }
  };

  const handleDelete = async (cat, index) => {
    if (!window.confirm('Delete this skill?')) return;
    const catList = skills[cat] || [];
    const updated = {
      skills: {
        ...skills,
        [cat]: catList.filter((_, i) => i !== index)
      }
    };
    const success = await onSave(updated);
    if (success) toast.success('Skill removed');
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '11px 14px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Add Skill Form */}
      <form onSubmit={handleAdd} style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '700', color: 'var(--accent)', marginBottom: '18px' }}>Add New Technology / Skill</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Category</label>
            <select name="category" value={newSkill.category} onChange={e => setNewSkill(p => ({ ...p, category: e.target.value }))}
              style={{ ...inputStyle, background: '#111', color: '#fff' }}>
              {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Technology Name</label>
            <input name="name" value={newSkill.name} onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))} placeholder="React.js" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Emoji / Icon</label>
            <input name="icon" value={newSkill.icon} onChange={e => setNewSkill(p => ({ ...p, icon: e.target.value }))} placeholder="⚛️" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '6px' }}>Branding Hex Color</label>
            <input name="color" value={newSkill.color} onChange={e => setNewSkill(p => ({ ...p, color: e.target.value }))} placeholder="#61DAFB" style={inputStyle} />
          </div>
        </div>
        <button type="submit" style={{
          marginTop: '20px', padding: '11px 24px', background: 'rgba(177,95,44,0.12)', border: '1px solid rgba(177,95,44,0.3)',
          borderRadius: '10px', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
        }}>+ Add Skill</button>
      </form>

      {/* Skills Group Lists */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {categories.map(cat => {
          const list = skills[cat.key] || [];
          return (
            <div key={cat.key} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '700', color: '#e2e8f0', marginBottom: '14px' }}>
                {cat.label} ({list.length})
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {list.length === 0 && <span style={{ color: '#52525b', fontSize: '13px', fontFamily: 'var(--font-body)' }}>No skills in this category yet.</span>}
                {list.map((s, idx) => (
                  <div key={s.name} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
                    background: 'rgba(255,255,255,0.03)', border: `1.5px solid ${s.color || '#fff'}20`, borderRadius: '8px',
                  }}>
                    <span>{s.icon}</span>
                    <span style={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: '#fff' }}>{s.name}</span>
                    <button onClick={() => handleDelete(cat.key, idx)} style={{
                      background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', padding: '0 0 0 6px', cursor: 'pointer',
                    }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Timeline / Experience Modal ───────────────────────────────────────────────
const TimelineModal = ({ item, index, onClose, onSave }) => {
  const [form, setForm] = useState(
    item
      ? { ...item, details: item.details?.join('\n') || '' }
      : { type: 'project', title: '', org: '', location: 'Remote', period: '', icon: '💼', color: 'var(--accent)', details: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    if (!form.title || !form.org || !form.period) { toast.error('Title, organization, and period are required'); return; }
    const payload = {
      ...form,
      details: form.details.split('\n').map(s => s.trim()).filter(Boolean),
    };
    onSave(payload, index);
    onClose();
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '11px 14px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '24px',
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
          padding: '32px', width: '100%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto',
        }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
          {item ? 'Edit Timeline Item' : 'Add Timeline Item'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} style={{ ...inputStyle, background: '#111' }}>
              <option value="education">Education</option>
              <option value="project">Project</option>
              <option value="experience">Experience</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Title</label>
            <input name="title" value={form.title} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Organization / Issuer</label>
            <input name="org" value={form.org} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Period</label>
            <input name="period" value={form.period} onChange={handleChange} placeholder="Aug 2022 - May 2026" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Icon</label>
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="🎓" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Branding Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="var(--accent)" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Details Bullets (one per line)</label>
            <textarea name="details" value={form.details} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#a1a1aa' }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 2, padding: '11px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '600' }}>Save</button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Experience / Timeline Tab ────────────────────────────────────────────────
const TimelineTab = ({ portfolio, onSave }) => {
  const experience = portfolio?.experience || [];
  const [modal, setModal] = useState(null); // null | { item, index } | 'add'

  const handleSaveItem = async (item, index) => {
    let updated;
    if (index !== undefined) {
      updated = experience.map((exp, i) => i === index ? item : exp);
    } else {
      updated = [...experience, item];
    }
    const success = await onSave({ experience: updated });
    if (success) toast.success('Timeline updated!');
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Delete this timeline item?')) return;
    const updated = experience.filter((_, i) => i !== index);
    const success = await onSave({ experience: updated });
    if (success) toast.success('Timeline item removed');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
          Education & Experience Timeline ({experience.length})
        </h2>
        <button onClick={() => setModal('add')} style={{
          padding: '10px 20px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
          border: 'none', borderRadius: '10px', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
        }}>+ Add Item</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {experience.length === 0 && <div style={{ textAlign: 'center', padding: '48px', color: '#71717a', fontFamily: 'var(--font-body)' }}>No timeline items yet. Add one.</div>}
        {experience.map((item, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: '700', color: '#fff' }}>{item.title}</h3>
                <span style={{ fontSize: '11px', background: `${item.color}15`, border: `1.5px solid ${item.color}25`, color: item.color, padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase' }}>{item.type}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-body)' }}>{item.org} · {item.period}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setModal({ item, index: idx })} style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(idx)} style={{ padding: '7px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <TimelineModal
            item={modal === 'add' ? null : modal.item}
            index={modal === 'add' ? undefined : modal.index}
            onClose={() => setModal(null)}
            onSave={handleSaveItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Certification Modal ──────────────────────────────────────────────────────
const CertModal = ({ item, index, onClose, onSave }) => {
  const [form, setForm] = useState(
    item || { name: '', issuer: '', desc: '', icon: '🏆', color: 'var(--accent)', badge: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.issuer) { toast.error('Certification name and issuer are required'); return; }
    onSave(form, index);
    onClose();
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '11px 14px', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '14px', outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '24px',
    }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
          padding: '32px', width: '100%', maxWidth: '450px', maxHeight: '80vh', overflowY: 'auto',
        }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
          {item ? 'Edit Certification' : 'Add Certification'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Certification Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Issuer</label>
            <input name="issuer" value={form.issuer} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Badge (Platform Name)</label>
            <input name="badge" value={form.badge} onChange={handleChange} placeholder="Google / GfG / NPTEL" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Icon</label>
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="🏆" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="var(--accent)" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#71717a', marginBottom: '5px' }}>Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '11px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#a1a1aa' }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 2, padding: '11px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '600' }}>Save</button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Certifications Tab ────────────────────────────────────────────────────────
const CertsTab = ({ portfolio, onSave }) => {
  const certifications = portfolio?.certifications || [];
  const [modal, setModal] = useState(null); // null | { item, index } | 'add'

  const handleSaveCert = async (cert, index) => {
    let updated;
    if (index !== undefined) {
      updated = certifications.map((c, i) => i === index ? cert : c);
    } else {
      updated = [...certifications, cert];
    }
    const success = await onSave({ certifications: updated });
    if (success) toast.success('Certification saved!');
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Delete this certification?')) return;
    const updated = certifications.filter((_, i) => i !== index);
    const success = await onSave({ certifications: updated });
    if (success) toast.success('Certification removed');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
          Certifications ({certifications.length})
        </h2>
        <button onClick={() => setModal('add')} style={{
          padding: '10px 20px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
          border: 'none', borderRadius: '10px', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
        }}>+ Add Certificate</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {certifications.length === 0 && <div style={{ textAlign: 'center', padding: '48px', color: '#71717a', fontFamily: 'var(--font-body)' }}>No certifications yet. Add one.</div>}
        {certifications.map((item, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: '700', color: '#fff' }}>{item.name}</h3>
                <span style={{ fontSize: '11px', background: `${item.color}15`, border: `1.5px solid ${item.color}25`, color: item.color, padding: '2px 8px', borderRadius: '100px' }}>{item.badge}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-body)' }}>{item.issuer}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setModal({ item, index: idx })} style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDelete(idx)} style={{ padding: '7px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modal && (
          <CertModal
            item={modal === 'add' ? null : modal.item}
            index={modal === 'add' ? undefined : modal.index}
            onClose={() => setModal(null)}
            onSave={handleSaveCert}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = ({ admin, onLogout }) => {
  const { portfolio, updatePortfolio } = usePortfolio();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [modal, setModal] = useState(null); // null | 'add' | project object
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data || []);
    } catch { toast.error('Failed to load projects'); }
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact');
      setMessages(res.data.data || []);
    } catch { toast.error('Failed to load messages'); }
  };

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch { toast.error('Delete failed'); }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/contact/${id}/read`);
      fetchMessages();
    } catch {}
  };

  const handleDeleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch { toast.error('Delete failed'); }
  };

  const sidebarItems = [
    { id: 'projects', icon: '📁', label: 'Projects', count: projects.length },
    { id: 'messages', icon: '✉', label: 'Messages', count: messages.filter(m => !m.isRead).length },
    { id: 'profile', icon: '👤', label: 'Profile & Stats', count: 0 },
    { id: 'skills', icon: '⚡', label: 'Skills', count: 0 },
    { id: 'timeline', icon: '🎓', label: 'Timeline', count: 0 },
    { id: 'certs', icon: '🏆', label: 'Certifications', count: 0 },
  ];

  const sidebarStyle = {
    width: sidebarOpen ? '220px' : '64px',
    background: 'rgba(255,255,255,0.02)',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column',
    transition: 'width 0.25s ease',
    flexShrink: 0,
    overflow: 'hidden',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        height: '60px', background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '18px', cursor: 'pointer' }}>
            ☰
          </button>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: '#fff', fontSize: '18px' }}>
            Admin <span style={{ color: 'var(--accent)' }}>Dashboard</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-body)' }}>
            👤 {admin?.name || 'Admin'}
          </span>
          <motion.button onClick={onLogout}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: '7px 16px', background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px',
              color: '#f87171', fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: '500', cursor: 'pointer'
            }}>
            Logout
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sidebarItems.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px', border: 'none',
                  background: tab === item.id ? 'rgba(177,95,44,0.12)' : 'transparent',
                  color: tab === item.id ? 'var(--accent)' : '#71717a',
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '500',
                  transition: 'all 0.15s ease', width: '100%', textAlign: 'left', cursor: 'pointer'
                }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
                {sidebarOpen && item.count > 0 && (
                  <span style={{
                    marginLeft: 'auto', background: tab === item.id ? 'var(--accent)' : 'rgba(177,95,44,0.3)',
                    color: '#fff', fontSize: '11px', fontWeight: '600', padding: '2px 7px', borderRadius: '100px',
                  }}>{item.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px', background: '#070707' }}>
          {tab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: '700', color: '#fff' }}>
                  Projects ({projects.length})
                </h2>
                <motion.button onClick={() => setModal('add')}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(177,95,44,0.3)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: '10px 20px', background: 'linear-gradient(135deg,var(--accent),var(--accent-dark))',
                    border: 'none', borderRadius: '10px', color: '#fff',
                    fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: '600', cursor: 'pointer'
                  }}>
                  + Add Project
                </motion.button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#71717a', fontFamily: 'var(--font-body)' }}>
                    No projects yet. Run the seed script or add one.
                  </div>
                )}
                {projects.map(p => (
                  <motion.div key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{
                      background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '16px', padding: '20px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px',
                    }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: '700', color: '#fff' }}>{p.title}</h3>
                        {p.featured && <span style={{ fontSize: '11px', color: 'var(--accent)', background: 'rgba(177,95,44,0.1)', border: '1px solid rgba(177,95,44,0.2)', padding: '2px 8px', borderRadius: '100px' }}>Featured</span>}
                      </div>
                      <p style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{p.shortDescription}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {p.techStack?.slice(0, 5).map(t => (
                          <span key={t} style={{ fontSize: '11px', padding: '2px 8px', background: 'rgba(177,95,44,0.08)', border: '1px solid rgba(177,95,44,0.15)', borderRadius: '100px', color: '#fb923c', fontFamily: 'var(--font-body)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button onClick={() => setModal(p)}
                        style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p._id)}
                        style={{ padding: '8px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {tab === 'messages' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '24px' }}>
                Messages ({messages.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px', color: '#71717a', fontFamily: 'var(--font-body)' }}>
                    No messages yet.
                  </div>
                )}
                {messages.map(msg => (
                  <motion.div key={msg._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{
                      background: msg.isRead ? 'rgba(255,255,255,0.02)' : 'rgba(177,95,44,0.05)',
                      border: `1px solid ${msg.isRead ? 'rgba(255,255,255,0.06)' : 'rgba(177,95,44,0.15)'}`,
                      borderRadius: '16px', padding: '20px',
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '15px', color: '#fff' }}>{msg.name}</span>
                          <span style={{ fontSize: '13px', color: '#71717a', fontFamily: 'var(--font-body)' }}>{msg.email}</span>
                          {!msg.isRead && <span style={{ fontSize: '10px', background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '100px', fontFamily: 'var(--font-body)', fontWeight: '600' }}>NEW</span>}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: '500', marginBottom: '8px' }}>{msg.subject}</div>
                        <p style={{ fontSize: '13px', color: '#a1a1aa', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>{msg.message}</p>
                        <div style={{ fontSize: '11px', color: '#52525b', fontFamily: 'var(--font-body)', marginTop: '8px' }}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        {!msg.isRead && (
                          <button onClick={() => handleMarkRead(msg._id)}
                            style={{ padding: '7px 12px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', color: '#4ade80', fontSize: '12px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                            Mark read
                          </button>
                        )}
                        <button onClick={() => handleDeleteMsg(msg._id)}
                          style={{ padding: '7px 12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#f87171', fontSize: '12px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {tab === 'profile' && portfolio && (
            <ProfileTab portfolio={portfolio} onSave={updatePortfolio} />
          )}

          {tab === 'skills' && portfolio && (
            <SkillsTab portfolio={portfolio} onSave={updatePortfolio} />
          )}

          {tab === 'timeline' && portfolio && (
            <TimelineTab portfolio={portfolio} onSave={updatePortfolio} />
          )}

          {tab === 'certs' && portfolio && (
            <CertsTab portfolio={portfolio} onSave={updatePortfolio} />
          )}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {modal && (
          <ProjectModal
            project={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={fetchProjects}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Admin Component ──────────────────────────────────────────────────────
const Admin = () => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('adminData');
    const token = localStorage.getItem('adminToken');
    if (stored && token) {
      try { return JSON.parse(stored); } catch { return null; }
    }
    return null;
  });

  const handleLogin = (adminData) => setAdmin(adminData);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
    toast.success('Logged out');
  };

  if (!admin) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard admin={admin} onLogout={handleLogout} />;
};

export default Admin;
