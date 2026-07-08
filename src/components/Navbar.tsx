import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: '产品目录', href: '#catalog' },
  { label: '甄选系列', href: '#collections' },
  { label: '芳疗场景', href: '#scenes' },
  { label: '成分溯源', href: '#origins' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-3xl"
      style={{ background: scrolled ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.6)', backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(12px) saturate(1.1)', WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(12px) saturate(1.1)', borderRadius: '9999px', border: '1px solid rgba(226,232,240,0.6)', boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.04)' : 'none' }}>
      <div className="px-6 h-12 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-base tracking-wide" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748', fontWeight: 500 }}>芳境</a>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-[12px] tracking-wide transition-colors hover:text-[#5b8c5a] font-sans" style={{ color: '#718096' }}>{item.label}</a>
          ))}
        </div>
        <a href="#cta" className="hidden md:inline-flex items-center px-4 py-1 text-[11px] tracking-wide rounded-full transition-all hover:opacity-80 font-sans" style={{ background: '#5b8c5a', color: '#fff' }}>开启体验</a>
        <button className="md:hidden" style={{ color: '#718096' }} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full py-4 px-6 rounded-2xl mt-1" style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', border: '1px solid #e2e8f0' }}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); setMenuOpen(false); const el = document.querySelector(item.href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="block py-2 text-sm font-sans" style={{ color: '#718096' }}>{item.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
