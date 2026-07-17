import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const stats = [
  { value: 26, suffix: '+', label: '全球产地' },
  { value: 100, suffix: '%', label: '天然植物萃取' },
  { value: 50, suffix: '+', label: '单方精油品种' },
  { value: 3000, suffix: 'm', label: '最高海拔种植园' },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const done = useRef(false);
  useEffect(() => { if (!inView || done.current) return; done.current = true; const d = 2500; const t0 = performance.now(); const tick = (t: number) => { const p = Math.min((t - t0) / d, 1); setCount(Math.round(target * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [inView, target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function OriginsSection() {
  const { ref: hRef, inView: hV } = useInView<HTMLDivElement>();
  const { ref: sRef, inView: sV } = useInView<HTMLDivElement>();

  return (
    <section id="origins" className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-1/4 w-px h-full opacity-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)' }} />
      <div className="absolute top-0 right-1/4 w-px h-full opacity-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)' }} />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div ref={hRef} className={`anim text-center mb-16 ${hV ? 'anim-visible' : ''}`}>
          <span className="text-[10px] tracking-[0.4em] uppercase block mb-3 font-sans" style={{ color: '#a0aec0' }}>Origins</span>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>寻香之旅</h2>
          <div className="w-10 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }} />
          <p className="text-sm max-w-md mx-auto font-sans" style={{ color: '#a0aec0' }}>从普罗旺斯到马达加斯加，只为寻找最纯净的植物精油</p>
        </div>

        <div ref={sRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center anim anim-d${i + 1} ${sV ? 'anim-visible' : ''}`}>
              {/* Decorative circle */}
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 -m-3 rounded-full opacity-0 transition-opacity duration-500" style={{ border: '1px solid rgba(91,140,90,0.15)', opacity: sV ? 1 : 0, animation: sV ? `breathe 3s ease-in-out infinite ${i * 0.4}s` : 'none' }} />
                <div className="text-3xl md:text-4xl font-light font-sans" style={{ color: '#5b8c5a' }}>
                  <Counter target={stat.value} suffix={stat.suffix} inView={sV} />
                </div>
              </div>
              <div className="text-xs font-sans" style={{ color: '#718096' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
