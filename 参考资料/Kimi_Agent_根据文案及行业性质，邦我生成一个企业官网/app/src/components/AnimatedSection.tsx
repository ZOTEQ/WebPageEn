import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  distance?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const childElements = el.children.length > 1 ? el.children : [el];

    const getFrom = () => {
      switch (direction) {
        case 'left': return { opacity: 0, x: -distance };
        case 'right': return { opacity: 0, x: distance };
        default: return { opacity: 0, y: distance };
      }
    };

    const getTo = () => {
      switch (direction) {
        case 'left':
        case 'right': return { opacity: 1, x: 0 };
        default: return { opacity: 1, y: 0 };
      }
    };

    gsap.set(childElements, getFrom());

    const tween = gsap.to(childElements, {
      ...getTo(),
      duration,
      delay,
      stagger: childElements.length > 1 ? stagger : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, distance, delay, duration, stagger, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
