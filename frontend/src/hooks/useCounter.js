import { useState, useEffect, useRef } from 'react';

const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const frameRef = useRef(null);

  const startCounting = () => {
    if (isRunning) return;
    setIsRunning(true);
    const startTime = performance.now();
    const range = end - start;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.round(start + range * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
        setIsRunning(false);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  const reset = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setCount(start);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { count, startCounting, reset, isRunning };
};

export default useCounter;
