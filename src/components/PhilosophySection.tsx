import { useInView } from '../hooks/useInView';
import { Leaf, Droplets, Wind } from 'lucide-react';

const items = [
  { icon: Leaf, num: '100%', label: '天然植物萃取', desc: '每一滴精油都来自纯正的植物蒸馏与冷压萃取' },
  { icon: Droplets, num: '26+', label: '全球甄选产地', desc: '从普罗旺斯到马达加斯加，跨越山海寻找最纯净原料' },
  { icon: Wind, num: '50+', label: '单方精油品种', desc: '覆盖草本、木质、花语、暖阳四大芳香系列' },
];

export default function PhilosophySection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#f7fafc] overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, #e2e8f0)' }} />

      <div ref={ref} className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className={`text-[10px] tracking-[0.4em] uppercase block mb-3 font-sans anim ${inView ? 'anim-visible' : ''}`} style={{ color: '#a0aec0' }}>Philosophy</span>
          <h2 className={`text-2xl md:text-3xl font-light anim anim-d1 ${inView ? 'anim-visible' : ''}`} style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>
            源于自然，归于纯净
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`text-center group anim anim-d${i + 1} ${inView ? 'anim-visible' : ''}`}>
                <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
                  style={{ background: 'rgba(91,140,90,0.08)', border: '1px solid rgba(91,140,90,0.12)' }}>
                  <Icon size={20} className="transition-colors duration-300" style={{ color: '#5b8c5a' }} />
                </div>
                <div className="text-2xl font-light mb-1 font-sans transition-transform duration-300 group-hover:-translate-y-0.5" style={{ color: '#5b8c5a' }}>{item.num}</div>
                <div className="text-sm mb-2" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>{item.label}</div>
                <div className="text-xs leading-relaxed max-w-[240px] mx-auto font-sans" style={{ color: '#a0aec0' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
