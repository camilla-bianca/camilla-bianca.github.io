import { useEffect, useRef, useState } from 'react';

// Detects when an element enters the viewport, to trigger scroll animations.
// Once visible, it stays visible (once: true by default), so the animation
// doesn't restart when scrolling back up.
//
// Uses threshold: 0 + a negative bottom rootMargin: triggers as soon as the
// element starts entering the screen, regardless of its height. Avoids long
// elements (lists, content-heavy sections) needing excessive scroll before
// the animation fires.
export function useInView(options = {}) {
  const {
    threshold = 0,
    rootMargin = '0px 0px -80px 0px',
    once = true,
  } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}