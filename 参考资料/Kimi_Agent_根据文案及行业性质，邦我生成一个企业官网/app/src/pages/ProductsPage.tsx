import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, categoryColors, type ProductCategory } from '@/data/products';
import AnimatedSection from '@/components/AnimatedSection';

const ITEMS_PER_PAGE = 20;

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.cas.toLowerCase().includes(q) ||
        p.fema.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="pt-[72px] bg-zoteq-bg min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-zoteq-bg to-[#f0ebe5]">
        <div className="content-max-width section-padding">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-medium text-zoteq-text">
              Exploring Our Own In-House Products
            </h1>
            <p className="mt-4 text-zoteq-text-secondary max-w-2xl">
              50+ premium ingredients across biobased, synthetic, and natural categories
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zoteq-text-secondary" />
                <input
                  type="text"
                  placeholder="Search by ingredient name, CAS, FEMA..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  className="w-full pl-12 pr-4 py-4 rounded-pill bg-white border border-black/8 text-zoteq-text placeholder:text-zoteq-text-secondary/60 focus:outline-none focus:border-zoteq-accent focus:ring-2 focus:ring-zoteq-accent/20 transition-all"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Table */}
      <section className="py-12 md:py-16">
        <div className="content-max-width section-padding">
          {/* Category Legend */}
          <AnimatedSection className="mb-6 flex flex-wrap gap-4">
            {(['Biobased', 'Synthetic', 'EU Natural', 'US Natural'] as ProductCategory[]).map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${categoryColors[cat].split(' ')[0].replace('/10', '')}`} />
                <span className="text-sm text-zoteq-text-secondary">{cat}</span>
              </div>
            ))}
          </AnimatedSection>

          {/* Table */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">Ingredient</th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">CAS</th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">FEMA</th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">REACH</th>
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`border-b border-black/5 hover:bg-zoteq-accent/[0.03] transition-colors duration-150 ${
                        index % 2 === 1 ? 'bg-zoteq-bg/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-zoteq-text">{product.name}</span>
                          <span className="text-xs text-zoteq-text-secondary">{product.code}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-zoteq-text">{product.cas}</td>
                      <td className="px-6 py-4 font-mono text-sm text-zoteq-text">{product.fema}</td>
                      <td className="px-6 py-4">
                        {product.reach === 'Yes' ? (
                          <span className="inline-flex items-center gap-1 text-zoteq-biobased text-sm">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Yes
                          </span>
                        ) : (
                          <span className="text-zoteq-text-secondary/60 text-sm">\u2014</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/products/${product.id}`}
                          className="inline-flex items-center gap-1 text-zoteq-accent text-sm font-medium hover:gap-2 transition-all duration-300"
                        >
                          View <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 disabled:opacity-30 hover:bg-black/5 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    p === page ? 'bg-zoteq-accent text-white' : 'hover:bg-black/5 text-zoteq-text'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 disabled:opacity-30 hover:bg-black/5 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Results count */}
          <p className="mt-4 text-center text-sm text-zoteq-text-secondary">
            Showing {currentItems.length} of {filtered.length} products
          </p>
        </div>
      </section>
    </div>
  );
}
