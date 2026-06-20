import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';


// Experience timeline loaded dynamically from MongoDB


const TimelineItem = ({ item, index, isLeft }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        gap: '0',
        marginBottom: '32px',
      }}
    >
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '32px',
        }}
      >
        {isLeft ? (
          <TimelineCard item={item} />
        ) : (
          <div style={{ height: '1px' }} />
        )}
      </motion.div>

      {/* Center dot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: 'spring', bounce: 0.5 }}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
            boxShadow: '0 0 20px var(--glow)',
            zIndex: 2,
            position: 'relative',
          }}
        >
          {item.icon}
        </motion.div>
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ paddingLeft: '32px' }}
      >
        {!isLeft ? (
          <TimelineCard item={item} />
        ) : (
          <div style={{ height: '1px' }} />
        )}
      </motion.div>
    </div>
  );
};

const TimelineCard = ({ item }) => {
  const accentColor = item.color || 'var(--accent)';
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '20px',
      padding: '16px 20px',
      maxWidth: '420px',
      width: '100%',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.2)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{
          fontSize: '11px', fontFamily: 'var(--font-body)', fontWeight: '600',
          color: accentColor,
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}25`,
          padding: '3px 10px', borderRadius: '100px',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          {item.type === 'education' ? 'Education' : 'Project'}
        </span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
          {item.period}
        </span>
      </div>

      <h3 style={{
        fontSize: '15px',
        fontFamily: 'var(--font-heading)',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '2px',
        lineHeight: '1.3',
      }}>
        {item.title}
      </h3>
      <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>
        {item.org} · {item.location}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {item.details.map((d, i) => (
          <li key={i} style={{
            display: 'flex', gap: '8px', alignItems: 'flex-start',
            fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: '1.4',
          }}>
            <span style={{ color: accentColor, flexShrink: 0 }}>▸</span>
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Experience = () => {
  const { portfolio } = usePortfolio();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const timelineData = portfolio?.experience || [];


  return (
    <section id="experience" ref={ref} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
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
              Journey
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
          }}>
            Education &{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Timeline
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '24px',
            bottom: '24px',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--border), var(--border), transparent)',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }} />

          {timelineData.map((item, i) => (
            <TimelineItem key={item._id || item.title} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .timeline-grid {
            grid-template-columns: 48px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
