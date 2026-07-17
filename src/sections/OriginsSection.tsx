import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { MapPin } from 'lucide-react';

const origins = [
  { name: '普罗旺斯', country: '法国', note: '薰衣草的故乡' },
  { name: '阿特拉斯山脉', country: '摩洛哥', note: '迷迭香与雪松' },
  { name: '卡纳塔克邦', country: '印度', note: '神圣檀香木' },
  { name: '玫瑰谷', country: '保加利亚', note: '大马士革玫瑰' },
  { name: '佐法尔地区', country: '阿曼', note: '沙漠黄金乳香' },
  { name: '圣保罗州', country: '巴西', note: '甜橙果园' },
  { name: '尼罗河三角洲', country: '埃及', note: '茉莉花的故乡' },
  { name: '马达加斯加岛', country: '马达加斯加', note: '依兰依兰' },
];

const stats = [
  { value: 26, suffix: '+', label: '全球产地' },
  { value: 100, suffix: '%', label: '天然萃取' },
  { value: 50, suffix: '+', label: '精油品种' },
  { value: 3000, suffix: 'm', label: '最高海拔' },
];

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const dur = 2000;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setV(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span>{v.toLocaleString()}</span>;
}

export default function OriginsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="origins" className="relative w-full py-28" style={{ background: 'linear-gradient(180deg, #f0f7f4 0%, #e8f4f0 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light mb-4 block" style={{ color: '#48bb9c' }}>Origins</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>
              寻香<span className="shimmer-mint">之旅</span>
            </h2>
            <p className="text-[13px] font-sans font-light max-w-md mx-auto" style={{ color: '#5a7a72' }}>从普罗旺斯到马达加斯加，只为寻找最纯净的植物精油</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
            {origins.map((o, i) => (
              <div key={i} className={`reveal reveal-d${(i % 4) + 1} ${inView ? 'visible' : ''} glass rounded-2xl p-5 flex items-center gap-3 transition-all duration-300 hover:shadow-md`} style={{ border: '1px solid rgba(255,255,255,0.8)' }}>
                <div className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: 'rgba(72,187,156,0.08)' }}>
                  <MapPin size={15} strokeWidth={1.5} style={{ color: '#48bb9c' }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-medium truncate" style={{ color: '#2a3f3c' }}>{o.name}</h4>
                    <span className="text-[10px] font-sans font-light flex-shrink-0" style={{ color: '#b8e0d4' }}>{o.country}</span>
                  </div>
                  <p className="text-[11px] font-sans font-light" style={{ color: '#48bb9c' }}>{o.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className={`reveal reveal-d${i + 1} ${inView ? 'visible' : ''} text-center glass rounded-3xl py-6`} style={{ border: '1px solid rgba(255,255,255,0.8)' }}>
                <div className="text-3xl md:text-4xl font-light mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>
                  <Counter target={s.value} inView={inView} /><span style={{ color: '#48bb9c' }}>{s.suffix}</span>
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase font-sans font-light" style={{ color: '#8ab0a4' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
