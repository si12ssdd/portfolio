import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '../utils/constants.js';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(10, 10, 20, 0.72)' : 'transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavClick('#home')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}
        >
          Siddharth
          <span style={{ color: 'var(--accent)' }}>.</span>
        </motion.button>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: '15px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-body)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!isActive) e.target.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { if (!isActive) e.target.style.color = 'var(--text-secondary)'; }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '2px',
                      background: 'var(--accent)',
                      borderRadius: '100px',
                      boxShadow: '0 0 8px var(--glow)',
                    }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </button>
            );
          })}

          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(177,95,44,0.15)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginLeft: '12px',
              padding: '9px 20px',
              background: 'rgba(177,95,44,0.06)',
              border: '1.5px solid rgba(177,95,44,0.25)',
              borderRadius: '10px',
              color: 'var(--accent)',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
            }}
          >
            GitHub
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 10 : i === 2 ? -10 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: menuOpen ? '#fff' : 'var(--text-primary)',
                borderRadius: '2px',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(10,10,10,0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: activeSection === link.href.replace('#', '') ? 'var(--accent-light)' : 'rgba(255,255,255,0.7)',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-body)',
                  padding: '16px 24px',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
