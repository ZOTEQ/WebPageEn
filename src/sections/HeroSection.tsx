import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const chars = titleRef.current?.querySelectorAll('.char');
    chars?.forEach((c, i) => {
      const el = c as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        el.style.transition = `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #e0f2ec 0%, #f0f7f4 40%, #edf6fc 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute top-32 left-[10%] w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(72,187,156,0.3) 0%, transparent 70%)' }} />
      <div className="absolute bottom-24 right-[15%] w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(56,168,216,0.25) 0%, transparent 70%)' }} />
      <div className="absolute top-1/3 right-[25%] w-32 h-32 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(120,200,170,0.3) 0%, transparent 70%)' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.5em] uppercase font-sans font-light mb-8" style={{ color: '#48bb9c', opacity: 0, animation: 'fade-in 1s ease 0.3s forwards' }}>
          Essential Oil Collection
        </p>

        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide leading-[1.15] mb-8" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>
          {'呼吸自然'.split('').map((ch, i) => (
            <span key={i} className="char inline-block">{ch}</span>
          ))}
        </h1>

        <p className="text-base sm:text-lg font-sans font-light mb-4 max-w-md mx-auto leading-relaxed" style={{ color: '#5a7a72', opacity: 0, animation: 'fade-in 1s ease 0.8s forwards' }}>
          源自高海拔纯净植物萃取
          <br />
          每一滴都是自然的馈赠
        </p>

        <div style={{ opacity: 0, animation: 'fade-in 1s ease 1.2s forwards' }}>
          <button
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 text-[12px] font-sans rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #48bb9c, #38a8d8)', color: '#fff', boxShadow: '0 4px 20px rgba(72,187,156,0.3)' }}
          >
            探索精油世界
          </button>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #f0f7f4, transparent)' }} />
    </section>
  );
}
