import { useEffect, useRef, useState } from 'react';

// Generate deterministic snowflakes
const SNOWFLAKES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 13) % 100}%`,
  size: 2 + (i % 4) * 1.5,
  duration: 8 + (i % 6) * 2,
  delay: (i * 0.7) % 12,
  opacity: 0.3 + (i % 5) * 0.12,
}));

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${y * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 z-0" style={{ willChange: 'transform' }}>
        <img
          src="/images/hero-glacier-wide.jpg"
          alt="Nordic Glacier"
          className="w-full h-[120%] object-cover"
          style={{ filter: 'brightness(0.75) saturate(1.1)', marginTop: '-10%' }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(180deg, rgba(45,55,72,0.25) 0%, rgba(45,55,72,0.45) 50%, rgba(255,255,255,0.95) 100%)' }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(45,55,72,0.3) 100%)' }} />

      {/* Snowflake particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {SNOWFLAKES.map((s) => (
          <div
            key={s.id}
            className="snowflake"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mt-[-4vh]">
        <span className={`text-[10px] tracking-[0.5em] uppercase mb-8 block font-sans transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ color: '#8fbc8f' }}>
          Essential Oils Collection
        </span>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-center mb-5 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: "'Noto Serif SC', serif", color: '#fff', letterSpacing: '0.04em', textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}>
          呼吸，与万物连接
        </h1>

        <div className={`w-16 h-px mx-auto mb-5 transition-all duration-800 delay-500 ${loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ background: 'linear-gradient(90deg, transparent, #8fbc8f, transparent)' }} />

        <p className={`text-sm text-center max-w-md mx-auto leading-relaxed transition-all duration-800 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ color: 'rgba(255,255,255,0.75)' }}>
          源自高海拔纯净植物萃取，每一滴都是自然的哲学
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 transition-opacity duration-600 delay-800 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(255,255,255,0.5)', animation: 'breathe 3s ease-in-out infinite' }}>Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', animation: 'breathe 3s ease-in-out infinite' }} />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-10 w-8 h-8 border-t border-l opacity-30 z-10" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      <div className="absolute top-24 right-10 w-8 h-8 border-t border-r opacity-30 z-10" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
    </section>
  );
}
