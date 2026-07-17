import { useState, useMemo, useCallback, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Search, ChevronLeft, ChevronRight, X, Wind, Heart, Sparkles, CheckCircle2, BookOpen, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { products, categories } from '../data/products';
import type { Product } from '../data/products';

const PER_PAGE = 12;

function parsePrice(p: string) { return parseInt(p.replace(/,/g, '')); }

export default function ProductCatalog() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const { ref: hRef, inView: hV } = useInView<HTMLDivElement>();
  const { ref: gRef, inView: gV } = useInView<HTMLDivElement>();

  useEffect(() => { document.body.style.overflow = selected ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [selected]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (cat !== 'all') r = r.filter(p => p.category === cat);
    if (query.trim()) { const q = query.toLowerCase(); r = r.filter(p => p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q)); }
    return r;
  }, [cat, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items = useMemo(() => { const s = (page - 1) * PER_PAGE; return filtered.slice(s, s + PER_PAGE); }, [filtered, page]);

  const changePage = useCallback((p: number) => { setPage(p); document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }); }, []);
  const catColor = (id: string) => categories.find(c => c.id === id)?.color || '#48bb9c';

  return (
    <>
      <section id="catalog" className="relative w-full py-28" style={{ background: '#f0f7f4' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div ref={hRef} className={`reveal ${hV ? 'visible' : ''} mb-14`}>
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans font-light block mb-4" style={{ color: '#48bb9c' }}>Product Catalog</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>
                精油产品<span className="shimmer-mint">目录</span>
              </h2>
              <p className="text-[13px] font-sans font-light max-w-sm leading-relaxed" style={{ color: '#5a7a72' }}>
                从世界各地精选的植物精油，每一款都承载着独特的产地记忆
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-6" style={{ borderBottom: '1px solid rgba(72,187,156,0.1)' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setPage(1); }}
                className="px-5 py-2 text-[11px] font-sans rounded-full transition-all duration-300"
                style={{ background: cat === c.id ? c.color : 'rgba(255,255,255,0.6)', color: cat === c.id ? '#fff' : '#5a7a72', boxShadow: cat === c.id ? `0 2px 12px ${c.color}30` : 'none' }}>
                {c.label}
              </button>
            ))}
            <div className="flex-1" />
            <div className="relative">
              <Search size={13} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#b8e0d4' }} />
              <input type="text" placeholder="搜索..." value={query} onChange={e => setQuery(e.target.value)}
                className="pl-8 pr-6 py-2 text-[12px] font-sans w-36 outline-none bg-transparent focus:w-48 transition-all rounded-full"
                style={{ border: '1px solid rgba(72,187,156,0.15)', color: '#2a3f3c' }} />
              {query && <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2" style={{ color: '#b8e0d4' }}><X size={10} /></button>}
            </div>
          </div>

          <div className="mb-8 text-[11px] font-sans" style={{ color: '#8ab0a4' }}>
            共 <span style={{ color: '#48bb9c' }}>{filtered.length}</span> 款精油
          </div>

          {/* Grid */}
          <div ref={gRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p, i) => (
              <div key={p.id}
                className={`group cursor-pointer rounded-2xl overflow-hidden reveal reveal-d${(i % 4) + 1} ${gV ? 'visible' : ''} card-float`}
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)' }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(p)}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: hovered === p.id ? 'scale(1.06)' : 'scale(1)' }} loading="lazy" />
                  {hovered === p.id && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(42,63,60,0.05)' }}>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                        <ArrowUpRight size={14} strokeWidth={1.5} style={{ color: '#48bb9c' }} />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-sans rounded-full" style={{ background: 'rgba(255,255,255,0.85)', color: catColor(p.category) }}>
                    {p.categoryLabel}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[9px] tracking-[0.15em] uppercase font-sans block mb-1" style={{ color: '#b8e0d4' }}>{p.nameEn}</span>
                  <h3 className="text-sm font-medium mb-0.5" style={{ color: '#2a3f3c' }}>{p.name}</h3>
                  <span className="text-[10px] font-sans font-light" style={{ color: '#8ab0a4' }}>{p.note}</span>
                  <div className="mt-2 text-[13px] font-sans font-light" style={{ color: '#48bb9c' }}>&yen;{p.price}</div>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-sm font-sans font-light" style={{ color: '#8ab0a4' }}>未找到匹配的产品</p>
            </div>
          )}

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <PgBtn onClick={() => changePage(page - 1)} disabled={page === 1}><ChevronLeft size={14} strokeWidth={1.5} /></PgBtn>
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => <PgBtn key={p} onClick={() => changePage(p)} active={page === p}>{p}</PgBtn>)}
              <PgBtn onClick={() => changePage(page + 1)} disabled={page === pages}><ChevronRight size={14} strokeWidth={1.5} /></PgBtn>
            </div>
          )}
        </div>
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function PgBtn({ children, onClick, active, disabled }: { children: React.ReactNode; onClick?: () => void; active?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-9 h-9 flex items-center justify-center text-[12px] font-sans rounded-full transition-all"
      style={{ background: active ? '#48bb9c' : 'rgba(255,255,255,0.6)', color: active ? '#fff' : '#8ab0a4', boxShadow: active ? '0 2px 8px rgba(72,187,156,0.3)' : 'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.3 : 1 }}>
      {children}
    </button>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const cColor = categories.find(c => c.id === product.category)?.color || '#48bb9c';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10" onClick={onClose}>
      <div className="absolute inset-0 bg-[rgba(42,63,60,0.15)] backdrop-blur-md" />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl" style={{ background: '#f0f7f4', boxShadow: '0 20px 60px rgba(72,187,156,0.15)' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all hover:bg-[rgba(72,187,156,0.1)]" style={{ background: 'rgba(255,255,255,0.8)' }}>
          <X size={14} strokeWidth={1.5} style={{ color: '#5a7a72' }} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 aspect-[3/4] lg:aspect-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-3 p-8 lg:p-10">
            <span className="text-[9px] tracking-[0.3em] uppercase font-sans block mb-3" style={{ color: cColor }}>{product.categoryLabel} &middot; {product.origin}</span>
            <h2 className="text-2xl md:text-3xl font-light mb-1" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2a3f3c' }}>{product.name}</h2>
            <span className="text-[11px] tracking-[0.15em] uppercase font-sans block mb-6" style={{ color: '#b8e0d4' }}>{product.nameEn}</span>

            <p className="text-[13px] font-sans font-light leading-[1.9] mb-8" style={{ color: '#5a7a72' }}>{product.description}</p>

            {product.scentProfile && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3"><Wind size={13} strokeWidth={1.5} style={{ color: cColor }} /><span className="text-[11px] font-sans tracking-wide" style={{ color: '#2a3f3c' }}>香气调性</span></div>
                <div className="grid grid-cols-3 gap-2">
                  {(['top', 'middle', 'base'] as const).map((k, i) => product.scentProfile?.[k] && (
                    <div key={k} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.6)' }}>
                      <span className="text-[8px] tracking-[0.2em] uppercase font-sans block mb-1" style={{ color: [cColor, '#38a8d8', '#8ab0a4'][i] }}>{k === 'top' ? '前调' : k === 'middle' ? '中调' : '后调'}</span>
                      <p className="text-[11px] font-sans" style={{ color: '#5a7a72' }}>{product.scentProfile[k]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.benefits && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3"><Heart size={13} strokeWidth={1.5} style={{ color: cColor }} /><span className="text-[11px] font-sans tracking-wide" style={{ color: '#2a3f3c' }}>主要功效</span></div>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((b, i) => (
                    <span key={i} className="px-3 py-1.5 text-[11px] font-sans rounded-full" style={{ background: `${cColor}10`, color: cColor }}>{b}</span>
                  ))}
                </div>
              </div>
            )}

            {product.story && (
              <div className="mb-8 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
                <div className="flex items-center gap-2 mb-2"><BookOpen size={12} strokeWidth={1.5} style={{ color: cColor }} /><span className="text-[10px] font-sans tracking-wide" style={{ color: '#2a3f3c' }}>植物故事</span></div>
                <p className="text-[11px] font-sans font-light leading-relaxed" style={{ color: '#8ab0a4' }}>{product.story}</p>
              </div>
            )}

            {product.safety && (
              <div className="mb-6 p-3 rounded-xl" style={{ background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.1)' }}>
                <div className="flex items-center gap-2 mb-1"><AlertTriangle size={11} style={{ color: '#eab308' }} /><span className="text-[9px] tracking-wider uppercase font-sans" style={{ color: '#eab308' }}>注意事项</span></div>
                <p className="text-[10px] font-sans font-light" style={{ color: '#a3a3a3' }}>{product.safety}</p>
              </div>
            )}

            <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #48bb9c, #38a8d8)' }}>
              <div>
                <span className="text-[9px] tracking-wider uppercase font-sans block mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>价格</span>
                <span className="text-xl font-light" style={{ color: '#fff' }}>&yen;{product.price}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] tracking-wider uppercase font-sans block mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>容量</span>
                <span className="text-sm font-sans" style={{ color: '#fff' }}>{product.capacity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
