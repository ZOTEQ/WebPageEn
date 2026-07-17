import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Leaf, Droplets, Wind } from 'lucide-react';

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 2000;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span>{v.toLocaleString()}{suffix}</span>;
}

const items = [
  { icon: Leaf, num: 100, suffix: '%', label: '天然植物萃取', desc: '纯正植物蒸馏与冷压萃取', color: '#48bb9c' },
  { icon: Droplets, num: 26, suffix: '+', label: '全球甄选产地', desc: '从普罗旺斯到马达加斯加', color: '#38a8d8' },
  { icon: Wind, num: 50, suffix: '+', label: '单方精油品种', desc: '草本 · 木质 · 花语 · 暖阳', color: '#5a9e7d' },
];

export default function PhilosophySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="philosophy" className="relative w-full py-28" style={{ background: '#f0f7f4' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div ref={ref} className={`reveal ${inView ? 'visible' : ''} text-center mb-16`}>
          <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light mb-4 block" style={{ color: '#48bb9c' }}>Philosophy</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>
            源于自然，归于<span className="shimmer-mint">纯净</span>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, #b8e0d4, transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className={`reveal reveal-d${i + 1} ${inView ? 'visible' : ''} glass rounded-3xl p-8 text-center group transition-all duration-500 hover:shadow-lg`} style={{ border: '1px solid rgba(255,255,255,0.8)' }}>
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110" style={{ background: `${item.color}15` }}>
                <item.icon size={24} strokeWidth={1.5} style={{ color: item.color }} />
              </div>
              <div className="text-3xl md:text-4xl font-light mb-2" style={{ color: '#2a3f3c', fontFamily: "'Noto Serif SC', serif" }}>
                <Counter target={item.num} suffix={item.suffix} inView={inView} />
              </div>
              <h3 className="text-sm font-medium mb-1" style={{ color: '#2a3f3c' }}>{item.label}</h3>
              <p className="text-[11px] font-sans font-light" style={{ color: '#8ab0a4' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
