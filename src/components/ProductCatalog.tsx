import { useState, useMemo, useCallback, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '../data/products';
import type { Product } from '../data/products';

const ITEMS_PER_PAGE = 12;
const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'name', label: '名称排序' },
];

function parsePrice(p: string) { return parseInt(p.replace(/[\u00a5,]/g, '')); }

interface ProductCatalogProps {
  onProductClick?: (id: number) => void;
}

export default function ProductCatalog({ onProductClick }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSort, setShowSort] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { ref: hRef, inView: hV } = useInView<HTMLDivElement>();
  const { ref: gRef, inView: gV } = useInView<HTMLDivElement>();

  useEffect(() => { if (!showSort) return; const handler = () => setShowSort(false); setTimeout(() => document.addEventListener('click', handler), 0); return () => document.removeEventListener('click', handler); }, [showSort]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); result = result.filter((p) => p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q)); }
    if (sortBy === 'price-asc') result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === 'price-desc') result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'zh'));
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => { const start = (currentPage - 1) * ITEMS_PER_PAGE; return filteredProducts.slice(start, start + ITEMS_PER_PAGE); }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page: number) => { setCurrentPage(page); const el = document.getElementById('catalog'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } }, []);

  return (
    <section id="catalog" className="relative w-full py-24 lg:py-32 bg-[#f7fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={hRef} className={`anim mb-10 ${hV ? 'anim-visible' : ''}`}>
          <span className="text-[10px] tracking-[0.4em] uppercase block mb-3 font-sans" style={{ color: '#a0aec0' }}>Product Catalog</span>
          <h2 className="text-3xl md:text-4xl font-light mb-3" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>精油产品目录</h2>
          <p className="text-sm font-sans" style={{ color: '#a0aec0' }}>从世界各地精选的植物精油，每一款都承载着独特的植物记忆</p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setCurrentPage(1); }}
                className="px-4 py-1.5 text-[11px] tracking-wide rounded-full transition-all duration-300 font-sans"
                style={{ background: activeCategory === cat.id ? '#5b8c5a' : '#fff', color: activeCategory === cat.id ? '#fff' : '#718096', border: activeCategory === cat.id ? 'none' : '1px solid #e2e8f0', boxShadow: activeCategory === cat.id ? '0 2px 8px rgba(91,140,90,0.2)' : 'none' }}>{cat.label}</button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#cbd5e0' }} />
            <input type="text" placeholder="搜索精油..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-7 py-1.5 text-[13px] w-full lg:w-48 rounded-full outline-none font-sans transition-all focus:ring-2 focus:ring-[#5b8c5a]/20"
              style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#2d3748' }} />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#cbd5e0' }}><X size={12} /></button>}
          </div>
          <div className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowSort(!showSort); }}
              className="flex items-center gap-2 px-4 py-1.5 text-[11px] tracking-wide rounded-full font-sans transition-all hover:border-[#cbd5e0]"
              style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#718096' }}><SlidersHorizontal size={11} />{sortOptions.find((o) => o.value === sortBy)?.label}</button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 py-1 z-30 min-w-[140px] rounded-lg overflow-hidden" style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                {sortOptions.map((opt) => (<button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false); }} className="block w-full text-left px-4 py-2 text-[12px] font-sans transition-colors hover:bg-[#f7fafc]" style={{ color: sortBy === opt.value ? '#5b8c5a' : '#718096' }}>{opt.label}</button>))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 text-[11px] font-sans" style={{ color: '#a0aec0' }}>共 <strong style={{ color: '#5b8c5a' }}>{filteredProducts.length}</strong> 款</div>

        <div ref={gRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.map((product, i) => (
            <div key={product.id}
              className={`group cursor-pointer bg-white rounded-xl overflow-hidden transition-all duration-400 anim anim-d${(i % 4) + 1} ${gV ? 'anim-visible' : ''}`}
              style={{ boxShadow: hoveredId === product.id ? '0 12px 32px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.04)', transform: hoveredId === product.id ? 'translateY(-5px)' : 'translateY(0)' }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onProductClick?.(product.id)}>
              <div className="relative aspect-square overflow-hidden bg-[#f7fafc]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hoveredId === product.id ? 'scale(1.06)' : 'scale(1)' }} loading="lazy" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(45,55,72,0.8) 0%, transparent 60%)', opacity: hoveredId === product.id ? 1 : 0 }}>
                  <p className="text-white/80 text-[11px] leading-relaxed mb-1 font-sans">{product.description}</p>
                  <span className="text-[10px] font-sans" style={{ color: '#8fbc8f' }}>{product.origin}</span>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-wider rounded-full font-sans"
                  style={{ background: 'rgba(255,255,255,0.92)', color: '#5b8c5a', border: '1px solid rgba(91,140,90,0.12)' }}>{product.categoryLabel}</div>
              </div>
              <div className="p-3">
                <span className="text-[10px] tracking-wider uppercase block mb-0.5 font-sans" style={{ color: '#a0aec0' }}>{product.nameEn}</span>
                <h3 className="text-sm font-normal mb-1 truncate" style={{ fontFamily: "'Noto Serif SC', serif", color: '#2d3748' }}>{product.name}</h3>
                <div className="flex items-center justify-between font-sans">
                  <span className="text-[11px]" style={{ color: '#cbd5e0' }}>{product.capacity}</span>
                  <span className="text-sm font-semibold" style={{ color: '#5b8c5a' }}>{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {paginatedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm mb-4 font-sans" style={{ color: '#a0aec0' }}>没有找到匹配的产品</p>
            <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }} className="px-5 py-2 text-[11px] tracking-wide rounded-full font-sans transition-all hover:bg-[#5b8c5a] hover:text-white" style={{ color: '#5b8c5a', border: '1px solid #5b8c5a' }}>查看全部</button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <PgBtn onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={14} /></PgBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<PgBtn key={p} onClick={() => handlePageChange(p)} active={currentPage === p}>{p}</PgBtn>))}
            <PgBtn onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight size={14} /></PgBtn>
          </div>
        )}
      </div>
    </section>
  );
}

function PgBtn({ children, onClick, active, disabled }: { children: React.ReactNode; onClick?: () => void; active?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-8 h-8 flex items-center justify-center text-[12px] rounded-full font-sans transition-all"
      style={{ background: active ? '#5b8c5a' : '#fff', color: active ? '#fff' : '#718096', boxShadow: active ? '0 2px 8px rgba(91,140,90,0.2)' : '0 1px 3px rgba(0,0,0,0.04)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.3 : 1 }}>{children}</button>
  );
}
