import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setDone(true), 400);
        return;
      }
      setProgress(Math.floor(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99990,
            gap: '48px',
          }}
        >
          {/* SY Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center', position: 'relative' }}
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(177,95,44,0.3)',
                  '0 0 60px rgba(177,95,44,0.6)',
                  '0 0 20px rgba(177,95,44,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '28px',
                border: '2px solid rgba(177,95,44,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(177,95,44,0.05)',
                margin: '0 auto',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '52px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-2px',
                }}
              >
                SY
              </span>
            </motion.div>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                marginTop: '20px',
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Siddharth Yadav
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ width: '280px' }}
          >
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '100px',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
                  borderRadius: '100px',
                  boxShadow: '0 0 10px rgba(177,95,44,0.5)',
                  originX: 0,
                }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              <span>Loading portfolio</span>
              <span style={{ color: 'var(--accent)' }}>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
