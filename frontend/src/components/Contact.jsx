import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api.js';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { SOCIAL_LINKS } from '../utils/constants.js';


// Dynamic contact information loaded from database


const InputField = ({ label, name, type = 'text', value, onChange, error, multiline = false, rows = 4, placeholder }) => (
  <div style={{ marginBottom: '12px' }}>
    <label style={{
      display: 'block',
      fontSize: '12.5px',
      fontFamily: 'var(--font-body)',
      fontWeight: '500',
      color: 'var(--text-secondary)',
      marginBottom: '6px',
    }}>
      {label} <span style={{ color: 'var(--accent)' }}>*</span>
    </label>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'rgba(241, 240, 238, 0.5)',
          border: `1.5px solid ${error ? '#ef4444' : 'var(--border)'}`,
          borderRadius: '12px',
          padding: '10px 14px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          resize: 'vertical',
          minHeight: '110px',
          outline: 'none',
          transition: 'all 0.25s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.background = '#fff';
          e.target.style.boxShadow = '0 0 0 3px var(--glow)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#ef4444' : 'var(--border)';
          e.target.style.background = 'rgba(241, 240, 238, 0.5)';
          e.target.style.boxShadow = 'none';
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          background: 'rgba(241, 240, 238, 0.5)',
          border: `1.5px solid ${error ? '#ef4444' : 'var(--border)'}`,
          borderRadius: '12px',
          padding: '10px 14px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          outline: 'none',
          transition: 'all 0.25s ease',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.background = '#fff';
          e.target.style.boxShadow = '0 0 0 3px var(--glow)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#ef4444' : 'var(--border)';
          e.target.style.background = 'rgba(241, 240, 238, 0.5)';
          e.target.style.boxShadow = 'none';
        }}
      />
    )}
    {error && (
      <p style={{ fontSize: '12px', color: '#ef4444', fontFamily: 'var(--font-body)', marginTop: '6px' }}>
        {error}
      </p>
    )}
  </div>
);

const SuccessAnimation = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '60px 40px',
      textAlign: 'center',
    }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
      style={{
        width: '80px', height: '80px',
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.08)',
        border: '2px solid rgba(34,197,94,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '36px',
        boxShadow: '0 0 30px rgba(34,197,94,0.15)',
      }}
    >
      ✓
    </motion.div>
    <div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '22px', color: 'var(--text-primary)', marginBottom: '8px' }}>
        Message Sent!
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-secondary)' }}>
        Thanks for reaching out. I'll get back to you soon.
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => window.location.reload()}
      style={{
        padding: '11px 28px',
        background: 'rgba(177,95,44,0.08)',
        border: '1.5px solid rgba(177,95,44,0.25)',
        borderRadius: '12px',
        color: 'var(--accent)',
        fontSize: '14px',
        fontFamily: 'var(--font-body)',
        fontWeight: '500',
      }}
    >
      Send another message
    </motion.button>
  </motion.div>
);

const Contact = () => {
  const { portfolio } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});

  const personal = portfolio?.personal || {
    email: 'hydrasiddhu213@gmail.com',
    phone: '+916393380272',
    github: 'https://github.com/siddharthaarao',
    location: 'Prayagraj, India'
  };

  const CONTACT_INFO = [
    { icon: '✉', label: 'Email', value: personal.email || 'hydrasiddhu213@gmail.com', href: SOCIAL_LINKS.email },
    { icon: '📞', label: 'Phone', value: personal.phone || '+916393380272', href: `tel:${personal.phone || '+916393380272'}` },
    { icon: '⌥', label: 'GitHub', value: (personal.github || SOCIAL_LINKS.github).replace('https://', ''), href: personal.github || SOCIAL_LINKS.github },
    { icon: '📍', label: 'Location', value: personal.location || 'Prayagraj, India', href: null },
  ];


  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', form);
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            background: 'rgba(177, 95, 44, 0.08)',
            border: '1px solid rgba(177, 95, 44, 0.15)',
            borderRadius: '100px',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--font-body)', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Get in Touch
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
            maxWidth: '600px',
          }}>
            Let's Build Something{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Together
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '12px' }}>
            Open to full-time roles, freelance projects, and exciting collaborations.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '36px',
          alignItems: 'start',
        }}>
          {/* LEFT - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {CONTACT_INFO.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 6, borderColor: 'var(--accent)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 18px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', flexShrink: 0,
                    borderRadius: '10px',
                    background: 'rgba(177, 95, 44, 0.08)',
                    border: '1px solid rgba(177, 95, 44, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: '500', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontWeight: '500' }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability card */}
            <div style={{
              padding: '16px',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                  animation: 'pulse-ring 1.5s infinite',
                }} />
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: '#16a34a' }}>
                  Available for Opportunities
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
                Actively seeking SDE-I or Full Stack Developer roles. Open to remote, hybrid, or on-site positions in India.
              </p>
            </div>
          </motion.div>

          {/* RIGHT - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessAnimation key="success" />
              ) : (
                <motion.div key="form" style={{ padding: '24px 28px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}>
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                      <InputField
                        label="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="John Doe"
                      />
                      <InputField
                        label="Your Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="john@example.com"
                      />
                    </div>

                    <InputField
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="Job opportunity / Project collaboration"
                    />

                    <InputField
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      error={errors.message}
                      multiline
                      rows={5}
                      placeholder="Tell me about the opportunity or what you'd like to build together..."
                    />

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 30px var(--glow)' } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      style={{
                        width: '100%',
                        padding: '15px',
                        background: loading
                          ? 'rgba(177,95,44,0.4)'
                          : 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '16px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 24px var(--glow)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'inline-block' }}
                          >
                            ◌
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>Send Message ✉</>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
