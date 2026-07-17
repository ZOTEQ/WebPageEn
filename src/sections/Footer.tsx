const cols = [
  { title: '产品', items: ['单方精油', '复方精油', '基础油', '香薰器具'] },
  { title: '品牌', items: ['品牌故事', '芳疗哲学', '成分溯源', '可持续发展'] },
  { title: '服务', items: ['使用指南', '常见问题', '配送说明', '退换政策'] },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: '#2a3f3c' }}>
      {/* CTA */}
      <div className="py-28 text-center relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute top-20 left-[15%] w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(72,187,156,0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-16 right-[20%] w-32 h-32 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, rgba(56,168,216,0.3) 0%, transparent 70%)' }} />

        <p className="text-[10px] tracking-[0.5em] uppercase font-sans font-light mb-6 relative z-10" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Begin Your Journey
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-10 relative z-10" style={{ fontFamily: "'Noto Serif SC', serif", color: '#fff' }}>
          开启芳疗仪式
        </h2>
        <button
          onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase font-sans rounded-full transition-all hover:scale-105 relative z-10"
          style={{ background: 'linear-gradient(135deg, #48bb9c, #38a8d8)', color: '#fff', boxShadow: '0 4px 20px rgba(72,187,156,0.3)' }}>
          探索全部产品
        </button>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <span className="text-[14px] tracking-wider font-medium block mb-4" style={{ color: '#fff', fontFamily: "'Noto Serif SC', serif" }}>芳境 <span style={{ color: '#48bb9c' }}>.</span></span>
            <p className="text-[11px] font-sans font-light leading-[1.9]" style={{ color: 'rgba(255,255,255,0.3)' }}>源自自然的纯净能量。在每一次呼吸中寻回内心的宁静。</p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-light block mb-5" style={{ color: 'rgba(255,255,255,0.2)' }}>{col.title}</span>
              <ul className="space-y-3">
                {col.items.map(item => (
                  <li key={item}><button className="text-[12px] font-sans font-light transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.35)' }}>{item}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-[9px] tracking-[0.1em] font-sans font-light" style={{ color: 'rgba(255,255,255,0.15)' }}>&copy; 2024 芳境. All rights reserved.</span>
        <div className="flex gap-6">
          <button className="text-[9px] tracking-[0.1em] font-sans font-light transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.15)' }}>Privacy</button>
          <button className="text-[9px] tracking-[0.1em] font-sans font-light transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.15)' }}>Terms</button>
        </div>
      </div>
    </footer>
  );
}
