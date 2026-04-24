/**
 * useScrollAnimation Hook
 * 
 * Service Layer — Contains ALL scroll animation logic.
 * 
 * Single Responsibility: Only manages IntersectionObserver
 * for scroll-triggered animations.
 */
import { useEffect } from 'react';

export function useScrollAnimation(isReady) {
  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '50px' }
    );

    let timer, fallbackTimer;

    timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    // Fallback: Force visibility after 2 seconds to prevent blank page
    fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('visible');
      });
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isReady]);
}
