import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';


// Certifications loaded dynamically from MongoDB


const CertCard = ({ cert, index }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const accentColor = cert.color || 'var(--accent)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(0,0,0,0.2)` }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '18px 22px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px', right: '-40px',
        width: '140px', height: '140px',
        borderRadius: '50%',
        background: cert.glow || (accentColor + '20'),
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Top border accent */}
      <div style={{
        position: 'absolute',
        top: 0, left: '20%', right: '20%',
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        borderRadius: '100px',
      }} />

      {/* Icon */}
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '12px',
        background: `${accentColor}15`,
        border: `1.5px solid ${accentColor}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        marginBottom: '14px',
        boxShadow: cert.glow ? `0 0 20px ${cert.glow}` : 'none',
      }}>
        {cert.icon}
      </div>

      {/* Issuer badge */}
      <div style={{
        position: 'absolute',
        top: '18px', right: '20px',
        padding: '4px 12px',
        background: `${accentColor}12`,
        border: `1px solid ${accentColor}25`,
        borderRadius: '100px',
        fontSize: '11px',
        fontFamily: 'var(--font-body)',
        fontWeight: '600',
        color: accentColor,
        letterSpacing: '0.05em',
      }}>
        {cert.badge}
      </div>

      <h3 style={{
        fontSize: '15px',
        fontFamily: 'var(--font-heading)',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '6px',
        lineHeight: '1.3',
        paddingRight: '60px',
      }}>
        {cert.name}
      </h3>

      <p style={{
        fontSize: '13px',
        color: accentColor,
        fontFamily: 'var(--font-body)',
        fontWeight: '500',
        marginBottom: '12px',
      }}>
        {cert.issuer}
      </p>

      <p style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.55)',
        fontFamily: 'var(--font-body)',
        lineHeight: '1.6',
      }}>
        {cert.desc}
      </p>

      {/* Bottom verified badge & link */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '14px', paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#22c55e', fontSize: '12px' }}>✓</span>
          <span style={{ fontSize: '12px', color: '#4ade80', fontFamily: 'var(--font-body)', fontWeight: '500' }}>
            Certified
          </span>
        </div>
        {cert.link && cert.link !== '#' && (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, color: 'var(--accent)' }}
            style={{
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
            }}
          >
            Verify ↗
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { portfolio } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const certsData = portfolio?.certifications || [];


  return (
    <section id="certifications" ref={ref} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
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
              Achievements
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
          }}>
            Certifi
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              cations
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '12px' }}>
            Verified skills from top platforms — Coursera, GeeksforGeeks, and NPTEL.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {certsData.map((cert, i) => (
            <CertCard key={cert._id || cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
