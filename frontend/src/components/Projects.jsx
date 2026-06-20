import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api.js';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { SOCIAL_LINKS } from '../utils/constants.js';
import { FALLBACK_PORTFOLIO } from '../utils/fallbackData.js';

const getProjectMeta = (proj) => {
  const title = proj.title || '';
  if (title.toLowerCase().includes('image') || title.toLowerCase().includes('ai')) {
    return { accentColor: '#a855f7', glowColor: 'rgba(168,85,247,0.25)', emoji: '🤖' };
  } else if (title.toLowerCase().includes('analytics') || title.toLowerCase().includes('affiliate') || title.toLowerCase().includes('chart')) {
    return { accentColor: '#06b6d4', glowColor: 'rgba(6,182,212,0.25)', emoji: '📊' };
  } else if (title.toLowerCase().includes('task') || title.toLowerCase().includes('role') || title.toLowerCase().includes('manage')) {
    return { accentColor: '#b15f2c', glowColor: 'rgba(177,95,44,0.25)', emoji: '📋' };
  }
  return { accentColor: '#b15f2c', glowColor: 'rgba(177,95,44,0.25)', emoji: '💻' };
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const { accentColor, glowColor, emoji } = getProjectMeta(project);
  const dateRange = project.startDate && project.endDate 
    ? `${project.startDate} – ${project.endDate}` 
    : (project.startDate || project.endDate || 'Present');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * 6, y: -dx * 6 });
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px',
          overflow: 'hidden',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          position: 'relative',
          cursor: 'default',
        }}
        whileHover={{
          boxShadow: `0 24px 80px ${glowColor}`,
          borderColor: accentColor + '30',
        }}
      >
        {/* Spotlight effect */}
        {spotlight.visible && (
          <div style={{
            position: 'absolute',
            left: spotlight.x,
            top: spotlight.y,
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 5,
          }} />
        )}

        {/* Banner */}
        <div style={{
          height: '135px',
          background: project.imageGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Emoji */}
          <span style={{
            fontSize: '50px',
            filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))',
            position: 'relative', zIndex: 2,
            animation: 'float 4s ease-in-out infinite',
          }}>
            {emoji}
          </span>

          {/* Date badge */}
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            padding: '5px 12px',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            fontSize: '11px',
            fontFamily: 'Inter',
            color: '#e2e8f0',
            fontWeight: '500',
            zIndex: 3,
          }}>
            {dateRange}
          </div>

          {/* Glow overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 100%, ${accentColor}20 0%, transparent 70%)`,
            zIndex: 1,
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '18px 22px' }}>
          <h3 style={{
            fontSize: '18px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '6px',
            letterSpacing: '-0.5px',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '13.5px',
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.5',
            marginBottom: '12px',
          }}>
            {project.shortDescription}
          </p>

          {/* Achievements */}
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {(project.achievements || []).map((a, i) => (
              <li key={i} style={{
                display: 'flex', gap: '8px', alignItems: 'flex-start',
                fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: '1.4',
              }}>
                <span style={{ color: accentColor, flexShrink: 0, marginTop: '2px' }}>▸</span>
                {a}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {(project.techStack || []).map((tech) => (
              <span key={tech} style={{
                padding: '3px 10px',
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
                borderRadius: '100px',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                color: accentColor,
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.a
              href={project.githubUrl || SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 16px rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                flex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#e2e8f0',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>GitHub</span>
              <span style={{ fontSize: '11px', opacity: 0.7 }}>↗</span>
            </motion.a>

            {project.liveUrl && project.liveUrl !== '#' && project.liveUrl !== '' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${glowColor}`, borderColor: accentColor + '60' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '8px 12px',
                  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                  border: `1px solid ${accentColor}30`,
                  borderRadius: '12px',
                  color: accentColor,
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Live Demo</span>
                <span style={{ fontSize: '11px' }}>↗</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          setProjectsList(res.data.data);
        } else {
          setProjectsList(FALLBACK_PORTFOLIO.projects);
        }
      } catch (err) {
        console.warn('Projects database offline. Using local premium fallback projects.');
        setProjectsList(FALLBACK_PORTFOLIO.projects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
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
              My Work
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
            Projects I've{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Shipped
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '12px', maxWidth: '500px' }}>
            Dynamic full-stack and frontend applications powered by modern technologies.
          </p>
        </motion.div>

        {/* Projects grid / Loading */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{
                height: '480px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(177,95,44,0.03), transparent)',
                  animation: 'shimmer 1.5s infinite',
                }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {projectsList.map((project, i) => (
              <ProjectCard key={project._id || project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '36px' }}
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px var(--glow)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 24px',
              background: 'transparent',
              border: '1.5px solid rgba(177, 95, 44, 0.3)',
              borderRadius: '12px',
              color: 'var(--accent)',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            View all projects on GitHub →
          </motion.a>
        </motion.div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Projects;

