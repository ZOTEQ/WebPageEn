import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: '精油目录', href: '#catalog' },
  { label: '品牌理念', href: '#philosophy' },
  { label: '寻香之旅', href: '#origins' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl">
      <div
        className="flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.3)' : 'blur(12px) saturate(1.1)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.3)' : 'blur(12px) saturate(1.1)',
          boxShadow: scrolled ? '0 4px 30px rgba(72,187,156,0.08)' : '0 2px 20px rgba(72,187,156,0.04)',
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <a href="#" className="text-[14px] font-medium tracking-wider" style={{ color: '#2a3f3c', fontFamily: "'Noto Serif SC', serif" }}>
          芳境 <span style={{ color: '#48bb9c' }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.href} onClick={() => nav(l.href)} className="text-[12px] font-sans tracking-wide transition-colors hover:text-[#48bb9c]" style={{ color: '#5a7a72' }}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: '#2a3f3c' }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-2 p-6 rounded-3xl space-y-4" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}>
          {links.map(l => (
            <button key={l.href} onClick={() => nav(l.href)} className="block text-[13px] font-sans" style={{ color: '#5a7a72' }}>{l.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
