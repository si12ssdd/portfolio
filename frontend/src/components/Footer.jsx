import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../utils/constants.js';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 0 32px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
      }}>
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={scrollToTop}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '-0.5px',
          }}
        >
          Siddharth
          <span style={{ color: 'var(--accent)' }}>.</span>
        </motion.button>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => {
                const el = document.getElementById(item.toLowerCase());
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.45)'}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'GitHub', href: SOCIAL_LINKS.github, icon: '⌥' },
            { label: 'LeetCode', href: SOCIAL_LINKS.leetcode, icon: '⚡' },
            { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: '🔗' },
            { label: 'Email', href: SOCIAL_LINKS.email, icon: '✉' },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: 'var(--accent)' }}
              style={{
                width: '40px', height: '40px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.55)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'rgba(255,255,255,0.05)',
        }} />

        {/* Copyright + back to top */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.35)',
            fontFamily: 'var(--font-body)',
          }}>
            © {new Date().getFullYear()} Siddharth Yadav. Built with React + Node.js.
          </p>

          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.35)', fontFamily: 'var(--font-body)' }}>
            Crafted with ❤️ in Prayagraj, India
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--glow)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px', height: '40px',
              borderRadius: '12px',
              background: 'rgba(177, 95, 44, 0.1)',
              border: '1px solid rgba(177, 95, 44, 0.25)',
              color: 'var(--accent)',
              fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            title="Back to top"
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
