import { useEffect, useRef } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Move dot immediately
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    const handleMouseDown = () => {
      dot.style.transform += ' scale(0.6)';
      ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.7)';
    };

    const handleMouseUp = () => {
      dot.style.transform = dot.style.transform.replace(/scale\([^)]*\)/, '');
      ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/, '');
    };

    const handleMouseEnterLink = () => {
      dot.style.transform += ' scale(0)';
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(177,95,44,0.8)';
      ring.style.background = 'rgba(177,95,44,0.1)';
    };

    const handleMouseLeaveLink = () => {
      dot.style.transform = dot.style.transform.replace(/scale\([^)]*\)/, '');
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(177,95,44,0.5)';
      ring.style.background = 'transparent';
    };

    // Smooth ring follow
    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;
      ring.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects for interactive elements
    const addLinkHovers = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label');
      links.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    addLinkHovers();

    // Observe DOM changes to add hover to new elements
    const observer = new MutationObserver(addLinkHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Burnt orange dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.05s ease',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(177,95,44,0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  );
};

export default Cursor;
