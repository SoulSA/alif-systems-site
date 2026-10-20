/**
 * ============================================================================
 * Reveal.tsx — a simple ONE-SHOT fade/slide-in when an element first enters
 * the viewport. (The newer, scroll-SCRUBBED version is Scrub.tsx — prefer
 * <Scrub> for scroll-reactive reveals; <Reveal> just plays once and stays.)
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll. Returns a ref + visibility flag.
 * Used to fade/slide sections in as they enter the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; once?: boolean }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: options?.threshold ?? 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, options?.threshold]);

  return { ref, visible };
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}

/** Wrapper that fades + slides its children up when scrolled into view. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 28, style, className }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
