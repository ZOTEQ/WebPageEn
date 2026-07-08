import { useInView } from '../hooks/useInView';

const links = [
  { title: '产品系列', items: ['单方精油', '复方精油', '基础油', '香薰器具', '礼盒套装'] },
  { title: '关于芳境', items: ['品牌故事', '芳疗哲学', '成分溯源', '可持续发展'] },
  { title: '客户服务', items: ['使用指南', '常见问题', '配送说明', '退换政策'] },
];

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <footer id="contact" ref={ref} className="relative w-full bg-[#f7fafc] overflow-hidden" style={{ borderTop: '1px solid #e2e8f0' }}>
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8" style={{ background: 'linear-gradient(to bottom, #e2e8f0, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          <div className={`lg:col-span-2 anim ${inView ? 'anim-visible' : ''}`}>
            <h3 className="text-xl font-normal mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>芳境</h3>
            <p className="text-xs leading-[1.9] mb-4 max-w-xs font-sans" style={{ color: '#a0aec0' }}>源自自然的纯净能量，以植物之息唤醒感官，在每一次呼吸中寻回内心的宁静。</p>
            <div className="flex items-center gap-5 font-sans">
              {['微信', '微博', '小红书'].map((s) => (
                <span key={s} className="text-[11px] tracking-wider cursor-pointer transition-colors duration-300 hover:text-[#5b8c5a]" style={{ color: '#cbd5e0' }}>{s}</span>
              ))}
            </div>
          </div>
          {links.map((col, i) => (
            <div key={col.title} className={`anim anim-d${i + 1} ${inView ? 'anim-visible' : ''}`}>
              <h4 className="text-[10px] tracking-[0.2em] uppercase mb-4 font-sans font-medium" style={{ color: '#2d3748' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => (<li key={item}><a href="#" className="text-xs font-sans transition-colors duration-300 hover:text-[#5b8c5a]" style={{ color: '#a0aec0' }}>{item}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 font-sans" style={{ borderTop: '1px solid #e2e8f0' }}>
          <p className="text-[10px] tracking-wider" style={{ color: '#cbd5e0' }}>&copy; 2024 芳境 Fangjing. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['隐私政策', '使用条款'].map((item) => (<a key={item} href="#" className="text-[10px] tracking-wider transition-colors hover:text-[#5b8c5a]" style={{ color: '#cbd5e0' }}>{item}</a>))}
          </div>
        </div>
      </div>
    </footer>
  );
}
