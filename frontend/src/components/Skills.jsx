import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation.js';
import { usePortfolio } from '../context/PortfolioContext.jsx';

const SkillCard = ({ skill }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    whileHover={{ y: -3, borderColor: 'var(--accent)', boxShadow: `0 8px 24px var(--glow)` }}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 14px',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
  >
    <span style={{ fontSize: '16px' }}>{skill.icon}</span>
    <span style={{ fontSize: '13px', fontFamily: 'var(--font-body)', fontWeight: '500', color: 'var(--text-primary)' }}>
      {skill.name}
    </span>
  </motion.div>
);

const Skills = () => {
  const { portfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState('Languages');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const skillsData = portfolio?.skills || {
    languages: [],
    frontend: [],
    backend: [],
    databases: [],
    tools: []
  };

  const SKILL_GROUPS = {
    Languages: { icon: '💬', color: '#f59e0b', skills: skillsData.languages || [] },
    Frontend: { icon: '🎨', color: '#61DAFB', skills: skillsData.frontend || [] },
    Backend: { icon: '⚙️', color: '#339933', skills: skillsData.backend || [] },
    Database: { icon: '🗄️', color: '#47A248', skills: skillsData.databases || [] },
    Tools: { icon: '🛠️', color: '#a855f7', skills: skillsData.tools || [] },
  };

  const tabs = Object.keys(SKILL_GROUPS);

  // Collect all skills for search override, or active tab skills
  const isSearching = searchQuery.trim() !== '';
  
  let displayedSkills = [];
  if (isSearching) {
    const allSkills = [];
    Object.keys(SKILL_GROUPS).forEach((key) => {
      const groupSkills = SKILL_GROUPS[key].skills.map((s) => ({
        ...s,
        color: s.color || SKILL_GROUPS[key].color,
      }));
      allSkills.push(...groupSkills);
    });
    // Remove duplicates
    const seen = new Set();
    displayedSkills = allSkills.filter((s) => {
      const duplicate = seen.has(s.name.toLowerCase());
      seen.add(s.name.toLowerCase());
      return !duplicate;
    });
  } else {
    displayedSkills = SKILL_GROUPS[activeTab]?.skills.map((s) => ({
      ...s,
      color: s.color || SKILL_GROUPS[activeTab].color,
    })) || [];
  }

  const filteredSkills = displayedSkills.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleSkills = (expanded || isSearching) ? filteredSkills : filteredSkills.slice(0, 6);

  return (
    <section id="skills" ref={ref} style={{ padding: '70px 0', background: 'var(--bg-primary)' }}>
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
              Tech Stack
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
          }}>
            Skills &{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Technologies
            </span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', marginTop: '10px' }}>
            Interactive filters showing my tools categorized by domain
          </p>
        </motion.div>

        {/* Tab & Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '16px',
          }}
        >
          {/* Tab buttons */}
          <div style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
          }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab && !isSearching;
              const group = SKILL_GROUPS[tab];
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchQuery('');
                    setExpanded(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: isActive ? 'rgba(177,95,44,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(177,95,44,0.2)' : 'transparent'}`,
                    borderRadius: '10px',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '13.5px',
                    fontWeight: '500',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span>{group.icon}</span>
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px 8px 32px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '100%',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.background = '#fff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.background = 'var(--bg-secondary)';
              }}
            />
            <span style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              pointerEvents: 'none',
            }}>
              🔍
            </span>
          </div>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
            minHeight: '40px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty States */}
        {filteredSkills.length === 0 && isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            }}
          >
            No skills found matching "{searchQuery}"
          </motion.div>
        )}

        {displayedSkills.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
            }}
          >
            No skills added to this category yet.
          </motion.div>
        )}

        {/* Expandable trigger button */}
        {filteredSkills.length > 6 && !isSearching && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(177, 95, 44, 0.08)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {expanded ? 'Collapse List' : `+ Show ${filteredSkills.length - 6} More`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
