import { useInView } from '../hooks/useInView';

export default function CTASection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="cta" className="relative w-full py-28 lg:py-36 bg-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,140,90,0.04) 0%, transparent 60%)' }} />

      <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className={`anim mb-8 ${inView ? 'anim-visible' : ''}`}>
          <div className="w-12 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }} />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>
            开启你的<span style={{ color: '#5b8c5a' }}>芳疗仪式</span>
          </h2>
          <p className="text-sm max-w-md mx-auto font-sans" style={{ color: '#a0aec0' }}>在每一次呼吸中，感受植物带来的纯净能量</p>
        </div>
        <div className={`anim anim-d2 ${inView ? 'anim-visible' : ''}`}>
          <button className="px-8 py-3 text-[13px] tracking-wide rounded-full font-sans transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: '#5b8c5a', color: '#fff', boxShadow: '0 4px 16px rgba(91,140,90,0.25)', animation: 'pulseGlow 3s ease-in-out infinite' }}>
            立即体验
          </button>
        </div>
      </div>
    </section>
  );
}
