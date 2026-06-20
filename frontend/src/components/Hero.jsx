import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import { SOCIAL_LINKS } from '../utils/constants.js';


const STACK_NODES = [
  { label: 'React', sub: 'Frontend UI', color: '#61DAFB', emoji: '⚛️', glow: 'rgba(97,218,251,0.4)' },
  { label: 'Express', sub: 'REST APIs', color: '#68A063', emoji: '🚀', glow: 'rgba(104,160,99,0.4)' },
  { label: 'Node.js', sub: 'Runtime', color: '#339933', emoji: '🟢', glow: 'rgba(51,153,51,0.4)' },
  { label: 'MongoDB', sub: 'Database', color: '#47A248', emoji: '🍃', glow: 'rgba(71,162,72,0.4)' },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 6,
}));

const StackVisualization = () => {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const animRef = useRef(null);
  const packetsRef = useRef([]);
  const timeRef = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });

  // Node positions (relative %, node height=80, spacing=60, start y=60)
  const nodePositions = [60, 200, 340, 480];
  const nodeX = 50; // % center

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize packets for each connection
    const initPackets = () => {
      packetsRef.current = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          packetsRef.current.push({
            fromNode: j,
            toNode: j + 1,
            progress: (i / 3) + (j * 0.35),
            speed: 0.004 + Math.random() * 0.003,
            color: STACK_NODES[j].color,
          });
        }
      }
    };
    initPackets();

    const drawFrame = (time) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Tilt lerp
      tiltRef.current.x += (targetTiltRef.current.x - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (targetTiltRef.current.y - tiltRef.current.y) * 0.08;

      // Grid pattern
      ctx.strokeStyle = 'rgba(17,17,17,0.03)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      const xFactor = W / 400;
      const yFactor = H / 620;

      // Node center positions
      const nodeCenters = nodePositions.map((y, i) => ({
        x: W * 0.5,
        y: y * yFactor + 30,
      }));

      // Draw connection lines between nodes
      for (let i = 0; i < nodeCenters.length - 1; i++) {
        const from = nodeCenters[i];
        const to = nodeCenters[i + 1];

        // Dashed animated line
        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -timeRef.current * 0.05;
        const grad = ctx.createLinearGradient(from.x, from.y + 40, to.x, to.y);
        grad.addColorStop(0, STACK_NODES[i].color + '80');
        grad.addColorStop(1, STACK_NODES[i + 1].color + '80');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y + 40);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw packets traveling along connections
      packetsRef.current.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const from = nodeCenters[pkt.fromNode];
        const to = nodeCenters[pkt.toNode];
        const startY = from.y + 40;
        const endY = to.y;

        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = startY + (endY - startY) * pkt.progress;

        // Packet glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grad.addColorStop(0, pkt.color + 'ff');
        grad.addColorStop(0.5, pkt.color + '80');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Packet core
        ctx.fillStyle = pkt.color;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      STACK_NODES.forEach((node, i) => {
        const cx = nodeCenters[i].x;
        const cy = nodeCenters[i].y;
        const breathe = Math.sin(timeRef.current * 0.04 + i * 1.5) * 0.08 + 0.92;
        const w = 180 * xFactor * breathe;
        const h = 64 * yFactor;
        const x = cx - w / 2;
        const y = cy - h / 2;
        const r = 14;

        // Node glow
        const glowRadius = (w * 0.8) * (0.5 + Math.sin(timeRef.current * 0.04 + i * 1.5) * 0.3);
        const gGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        gGlow.addColorStop(0, node.glow.replace('0.4', '0.15'));
        gGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = gGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node card
        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20 * breathe;
        roundRect(ctx, x, y, w, h, r);
        const bgGrad = ctx.createLinearGradient(x, y, x + w, y + h);
        bgGrad.addColorStop(0, 'rgba(20,20,20,0.95)');
        bgGrad.addColorStop(1, 'rgba(30,30,30,0.9)');
        ctx.fillStyle = bgGrad;
        ctx.fill();
        ctx.restore();

        // Border
        roundRect(ctx, x, y, w, h, r);
        ctx.strokeStyle = node.color + '60';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Left accent bar
        roundRect(ctx, x, y, 4, h, [r, 0, 0, r]);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Emoji
        ctx.font = `${18 * Math.min(xFactor, 1)}px serif`;
        ctx.textBaseline = 'middle';
        ctx.fillText(node.emoji, x + 16, cy);

        // Label
        ctx.font = `bold ${16 * Math.min(xFactor, 1)}px "Onest", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, x + 44, cy - 8);

        // Sub label
        ctx.font = `${11 * Math.min(xFactor, 1)}px "Onest", sans-serif`;
        ctx.fillStyle = node.color + 'cc';
        ctx.fillText(node.sub, x + 44, cy + 10);
      });

      // Floating particles
      timeRef.current++;
      PARTICLES.slice(0, 12).forEach((p, i) => {
        const t = ((timeRef.current * 0.008 + p.delay) % 1);
        const px = (p.x / 100) * W;
        const py = H - t * H * 0.8;
        const opacity = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 0.4;
        ctx.fillStyle = `rgba(249,115,22,${opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(drawFrame);
    };

    animRef.current = requestAnimationFrame(drawFrame);

    // Mouse tilt
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targetTiltRef.current = { x: dy * 8, y: -dx * 8 };
    };
    const resetTilt = () => { targetTiltRef.current = { x: 0, y: 0 }; };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', resetTilt);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', resetTilt);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        height: '580px',
        background: 'rgba(15, 10, 25, 0.4)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '28px',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '800px',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        padding: '16px 20px 12px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
      }}>
        {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontFamily: 'var(--font-heading)', fontSize: 13, color: '#e2e8f0' }}>
          MERN Stack Architecture
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'var(--font-body)' }}>LIVE</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </motion.div>
  );
};

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = [r, r, r, r];
  ctx.beginPath();
  ctx.moveTo(x + r[0], y);
  ctx.lineTo(x + w - r[1], y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r[1]);
  ctx.lineTo(x + w, y + h - r[2]);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
  ctx.lineTo(x + r[3], y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r[3]);
  ctx.lineTo(x, y + r[0]);
  ctx.quadraticCurveTo(x, y, x + r[0], y);
  ctx.closePath();
}

const Hero = () => {
  const { portfolio } = usePortfolio();
  const personal = portfolio?.personal || {};
  const summary = personal.summary || 'B.Tech CSE graduate (LPU, 2026) with 3 production-grade MERN apps shipped. Specializing in REST APIs, JWT/OAuth auth, Razorpay integrations, and scalable React + Redux frontends.';
  
  const nameParts = (personal.name || 'Siddharth Yadav').split(' ');
  const firstName = nameParts[0] || 'Siddharth';
  const lastName = nameParts.slice(1).join(' ') || 'Yadav';

  const typeSequence = [
    'Full Stack Developer',
    2000,
    'MERN Stack Developer',
    2000,
    'Backend Developer',
    2000
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '90px',
      }}
    >


      {/* Floating dots background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
        position: 'relative', zIndex: 1,
      }}>
        {/* LEFT SIDE */}
        <div>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: '100px',
              marginBottom: '18px',
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 0 0 rgba(34,197,94,0.4)',
              animation: 'pulse-ring 1.5s ease-out infinite',
            }} />
            <span style={{ fontSize: '14px', color: '#4ade80', fontWeight: '600', fontFamily: 'var(--font-body)' }}>
              Available for Work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              color: '#e2e8f0',
              fontFamily: 'var(--font-body)',
              fontWeight: '400',
              marginBottom: '8px',
            }}>
              Hi, I'm
            </div>
            <h1 style={{
              fontSize: 'clamp(40px, 5.5vw, 68px)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              lineHeight: '1.0',
              letterSpacing: '-2.5px',
              background: 'linear-gradient(135deg, #ffffff 40%, var(--accent) 80%, var(--accent-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}>
              {firstName}
              <br />
              {lastName}
            </h1>
          </motion.div>

          {/* Type Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              minHeight: '36px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--accent)', fontSize: '22px', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
              {'// '}
            </span>
            <TypeAnimation
              sequence={typeSequence}
              repeat={Infinity}
              style={{
                fontSize: 'clamp(16px, 4.5vw, 20px)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '500',
                color: '#ffffff',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              fontSize: '16px',
              lineHeight: '1.75',
              color: '#cbd5e1',
              fontFamily: 'var(--font-body)',
              maxWidth: '480px',
              marginBottom: '36px',
            }}
          >
            {summary}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(177,95,44,0.35)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '13px 28px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
                boxShadow: '0 4px 24px rgba(177,95,44,0.2)',
                cursor: 'pointer',
              }}
            >
              View Projects →
            </motion.button>

            <motion.a
              href={SOCIAL_LINKS.resume}
              download
              whileHover={{ scale: 1.04, borderColor: 'var(--accent)', color: 'var(--accent)' }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '13px 28px',
                background: 'transparent',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              ↓ Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04, background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '13px 28px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                color: '#e2e8f0',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '500',
                  transition: 'color 0.2s ease',
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE - Stack Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <StackVisualization />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: '#cbd5e1',
        }}
      >
        <span style={{ fontSize: '12px', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '20px', height: '32px',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div style={{
            width: '4px', height: '8px',
            borderRadius: '2px',
            background: 'var(--accent)',
          }} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @media (max-width: 900px) {
          #home > div > div { grid-template-columns: 1fr !important; }
          #home > div > div > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
