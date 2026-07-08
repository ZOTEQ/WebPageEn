import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const scenes = [
  { title: '冰川萃取', titleEn: 'Glacier Extraction', desc: '在极净冰川水中冷萃植物的原始精华', image: '/images/hero-glacier-wide.jpg' },
  { title: '植物疗愈', titleEn: 'Botanical Healing', desc: '探索大自然赋予植物的芳香力量', image: '/images/v5-bottle-euca.jpg' },
  { title: '炼金仪式', titleEn: 'Alchemy Ritual', desc: '每一滴都来自最纯净的自然馈赠', image: '/images/scene-collection.jpg' },
];

export default function SceneShowcase() {
  const [activeScene, setActiveScene] = useState(0);
  const { ref: hRef, inView: hV } = useInView<HTMLDivElement>();
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax on the main image
  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      parallaxRef.current.style.transform = `translateY(${progress * 40}px) scale(1.05)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="scenes" className="relative w-full py-24 lg:py-32 bg-[#e8f4f8] overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(143,188,143,0.15) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={hRef} className={`anim text-center mb-12 ${hV ? 'anim-visible' : ''}`}>
          <span className="text-[10px] tracking-[0.4em] uppercase block mb-3 font-sans" style={{ color: '#5b8c5a' }}>Aromatherapy Scenes</span>
          <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>芳疗场景</h2>
        </div>

        {/* Main image with parallax + glassmorphism card */}
        <div className="relative overflow-hidden rounded-2xl mb-5 cursor-pointer" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }} onClick={() => setActiveScene((activeScene + 1) % scenes.length)}>
          <div className="aspect-[21/9] overflow-hidden">
            <div ref={parallaxRef} className="w-full h-[130%] -mt-[10%]" style={{ willChange: 'transform' }}>
              <img src={scenes[activeScene].image} alt={scenes[activeScene].title} className="w-full h-full object-cover transition-all duration-700" />
            </div>
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(45,55,72,0.5) 0%, transparent 40%)' }} />
          {/* Glassmorphism info card */}
          <div className="absolute bottom-6 left-6 right-6 lg:left-8 lg:right-auto lg:max-w-md p-5 rounded-xl glass">
            <span className="text-[10px] tracking-[0.2em] uppercase block mb-1 font-sans" style={{ color: '#5b8c5a' }}>{scenes[activeScene].titleEn}</span>
            <h3 className="text-xl font-normal mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>{scenes[activeScene].title}</h3>
            <p className="text-xs font-sans" style={{ color: '#718096' }}>{scenes[activeScene].desc}</p>
          </div>
          {/* Dots */}
          <div className="absolute bottom-6 right-8 flex gap-2">
            {scenes.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActiveScene(i); }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === activeScene ? '#5b8c5a' : 'rgba(255,255,255,0.5)', transform: i === activeScene ? 'scale(1.3)' : 'scale(1)' }} />
            ))}
          </div>
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l rounded-tl-sm pointer-events-none" style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r rounded-tr-sm pointer-events-none" style={{ borderColor: 'rgba(255,255,255,0.25)' }} />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-4">
          {scenes.map((scene, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
              style={{ border: i === activeScene ? '2px solid #5b8c5a' : '2px solid transparent', boxShadow: i === activeScene ? '0 4px 12px rgba(91,140,90,0.15)' : 'none' }}
              onClick={() => setActiveScene(i)}>
              <img src={scene.image} alt={scene.title} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: i === activeScene ? 'scale(1.03)' : 'scale(1)' }} />
              <div className="absolute inset-0" style={{ background: i === activeScene ? 'linear-gradient(to top, rgba(45,55,72,0.55) 0%, transparent 50%)' : 'linear-gradient(to top, rgba(45,55,72,0.3) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[9px] tracking-wider uppercase block font-sans" style={{ color: i === activeScene ? '#fff' : 'rgba(255,255,255,0.6)' }}>{scene.titleEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
