import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

const collections = [
  { id: 'herbal', name: '草本系列', nameEn: 'Herbal', desc: '迷迭香、百里香、罗勒——来自地中海的清新草本精华', image: '/images/v5-rosemary.jpg' },
  { id: 'citrus', name: '暖阳系列', nameEn: 'Citrus', desc: '甜橙、柠檬、葡萄柚——阳光亲吻过的果实芬芳', image: '/images/v5-bergamot.jpg' },
  { id: 'woody', name: '木质系列', nameEn: 'Woody', desc: '檀香、雪松、沉香——千年古树的灵魂沉淀', image: '/images/v5-sandalwood.jpg' },
  { id: 'floral', name: '花语系列', nameEn: 'Floral', desc: '玫瑰、茉莉、薰衣草——百花盛开的温柔时刻', image: '/images/v5-rose.jpg' },
];

export default function CollectionShowcase() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { ref: hRef, inView: hV } = useInView<HTMLDivElement>();
  const { ref: gRef, inView: gV } = useInView<HTMLDivElement>();

  return (
    <section id="collections" className="relative w-full py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={hRef} className={`anim mb-12 lg:mb-16 flex items-end justify-between ${hV ? 'anim-visible' : ''}`}>
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase block mb-3 font-sans" style={{ color: '#a0aec0' }}>Collection</span>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>甄选系列</h2>
          </div>
          <a href="#catalog" className="hidden md:flex items-center gap-2 text-[11px] tracking-wide font-sans transition-all hover:gap-3 hover:text-[#5b8c5a]" style={{ color: '#718096' }}>
            查看全部 <ArrowRight size={13} />
          </a>
        </div>

        {/* Desktop horizontal expanding cards */}
        <div ref={gRef} className="hidden lg:flex gap-4" style={{ perspective: '1200px' }}>
          {collections.map((col, i) => {
            const isActive = activeIdx === i;
            return (
              <div key={col.id}
                className={`relative overflow-hidden cursor-pointer rounded-xl transition-all duration-700 ease-out anim anim-d${i + 1} ${gV ? 'anim-visible' : ''}`}
                style={{
                  flex: isActive ? '3.5 1 0%' : '1 1 0%',
                  minHeight: '480px',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}>
                <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000" style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }} />
                <div className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: isActive ? 'linear-gradient(to top, rgba(45,55,72,0.88) 0%, rgba(45,55,72,0.2) 50%, transparent 80%)' : 'linear-gradient(to top, rgba(45,55,72,0.6) 0%, transparent 65%)' }} />
                {/* Shimmer overlay on active */}
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,188,143,0.08), transparent)', animation: 'shimmerLine 2.5s ease-in-out infinite' }} />
                  </div>
                )}
                {/* Green border glow on active */}
                <div className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0, border: '1px solid rgba(143,188,143,0.3)', boxShadow: 'inset 0 0 30px rgba(143,188,143,0.05)' }} />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: '#8fbc8f' }}>{col.nameEn}</span>
                    <span className="w-6 h-px transition-all duration-500" style={{ background: '#8fbc8f', opacity: isActive ? 1 : 0 }} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-normal mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fff' }}>{col.name}</h3>
                  <p className="text-xs leading-relaxed mb-4 overflow-hidden transition-all duration-500 font-sans" style={{ color: 'rgba(255,255,255,0.7)', maxHeight: isActive ? '80px' : '0px', opacity: isActive ? 1 : 0 }}>{col.desc}</p>
                  <div className="flex items-center gap-2 transition-all duration-500 font-sans" style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-8px)' }}>
                    <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: '#8fbc8f' }}>Explore</span>
                    <ArrowRight size={12} style={{ color: '#8fbc8f' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {collections.map((col, i) => (
            <div key={col.id} className={`relative aspect-square overflow-hidden rounded-xl group anim anim-d${i + 1} ${gV ? 'anim-visible' : ''}`}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,55,72,0.7) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] tracking-wider uppercase block mb-0.5 font-sans" style={{ color: '#8fbc8f' }}>{col.nameEn}</span>
                <h3 className="text-sm font-normal" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fff' }}>{col.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
