import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import useCounter from '../hooks/useCounter.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';


const CARDS = [
  {
    icon: '👤',
    title: 'Who I Am',
    description:
      'CS student at Lovely Professional University (2026), passionate about building full-stack applications that solve real problems at scale.',
    color: '#61DAFB',
  },
  {
    icon: '🔧',
    title: 'What I Build',
    description:
      'Production MERN apps, SaaS platforms, REST APIs secured with JWT & OAuth 2.0, and responsive React + Redux frontends.',
    color: '#f97316',
  },
  {
    icon: '💡',
    title: 'My Philosophy',
    description:
      'Clean code, scalable architecture, and user-first thinking. I write code that is easy to read, maintain, and extend.',
    color: '#a855f7',
  },
  {
    icon: '🚀',
    title: 'What I Enjoy',
    description:
      'Problem solving, building products from 0 to 1, cracking DSA challenges on LeetCode, and learning new tech stacks.',
    color: '#22c55e',
  },
];

// Cards remain as static guides, but stats are dynamic


const StatCounter = ({ stat, isVisible }) => {
  const { count, startCounting } = useCounter(stat.end, 1800);

  useEffect(() => {
    if (isVisible) startCounting();
  }, [isVisible]);

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      padding: '16px 18px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(177, 95, 44, 0.3)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(177, 95, 44, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
      <div style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontFamily: 'var(--font-heading)',
        fontWeight: '700',
        background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1',
        marginBottom: '8px',
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontWeight: '500' }}>
        {stat.label}
      </div>
    </div>
  );
};

const About = () => {
  const { portfolio } = usePortfolio();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const personal = portfolio?.personal || {};
  const statsData = portfolio?.stats || {
    projectsDeployed: 3,
    apisBuilt: 10,
    certifications: 4,
    yearsOfCoding: 3
  };
  const eduData = portfolio?.education || {
    institution: 'Lovely Professional University'
  };

  const dynamicStats = [
    { end: statsData.projectsDeployed, suffix: '', label: 'Projects Deployed', icon: '📦' },
    { end: statsData.apisBuilt, suffix: '+', label: 'REST APIs Built', icon: '🔌' },
    { end: statsData.certifications, suffix: '', label: 'Certifications', icon: '🏆' },
    { end: statsData.yearsOfCoding, suffix: '+', label: 'Years Coding', icon: '💻' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" ref={sectionRef} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '72px' }}
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
              About Me
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
          }}>
            I build things that{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              scale.
            </span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start',
        }}>
          {/* LEFT - Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
          >
            {CARDS.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: `0 16px 48px ${card.color}12` }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent corner */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '3px', height: '40px',
                  background: card.color,
                  borderRadius: '0 0 3px 3px',
                }} />

                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{card.icon}</div>
                <h3 style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  color: '#fff',
                  marginBottom: '8px',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

            {/* RIGHT - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Quick bio */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px',
                }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-heading)', color: '#fff',
                    flexShrink: 0,
                  }}>
                    SY
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: '16px', color: '#fff' }}>
                      {personal.name || 'Siddharth Yadav'}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
                      {personal.title || 'Full Stack Developer · SDE-I'}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>
                  {personal.summary || 'B.Tech Computer Science & Engineering student at Lovely Professional University, Punjab.'}
                </p>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {[
                    `📍 ${personal.location || 'Prayagraj, India'}`,
                    `🎓 ${eduData.institution || 'LPU Punjab'}`,
                    '💼 Open to Work'
                  ].map((tag) => (
                    <span key={tag} style={{
                      fontSize: '12px', padding: '4px 12px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '100px',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {dynamicStats.map((stat) => (
                  <StatCounter key={stat.label} stat={stat} isVisible={isVisible} />
                ))}
              </div>
            </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #about > div > div:last-child > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
