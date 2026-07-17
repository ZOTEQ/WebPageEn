import { useParams, Link, useNavigate } from 'react-router-dom';
import { Check, FlaskConical, Package, Thermometer } from 'lucide-react';
import { products, categoryColors } from '@/data/products';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-zoteq-bg">
        <div className="text-center">
          <h1 className="font-display text-3xl text-zoteq-text">Product not found</h1>
          <Link to="/products" className="mt-4 inline-block text-zoteq-accent hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = product.relatedProducts
    ? products.filter((p) => product.relatedProducts?.includes(p.id))
    : products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-[72px] bg-zoteq-bg min-h-screen">
      {/* Breadcrumb & Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-zoteq-bg to-[#f0ebe5]">
        <div className="content-max-width section-padding">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-zoteq-text-secondary">
              <Link to="/" className="hover:text-zoteq-accent transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-zoteq-accent transition-colors">Products</Link>
              <span>/</span>
              <span className="text-zoteq-text">{product.name}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-zoteq-sand/10 text-zoteq-sand">
                Code: {product.code}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl md:text-5xl font-medium text-zoteq-text">
              {product.name}
            </h1>
            {product.synonym && (
              <p className="mt-2 text-zoteq-text-secondary">{product.synonym}</p>
            )}

            {/* Key Specs */}
            <div className="mt-6 flex flex-wrap gap-3">
              {product.reach && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zoteq-biobased/10 text-zoteq-biobased">
                  <Check size={12} /> REACH: {product.reach}
                </span>
              )}
              {product.einces && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 text-zoteq-text-secondary">
                  EINECS: {product.einces}
                </span>
              )}
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 text-zoteq-text-secondary">
                CAS: {product.cas}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 text-zoteq-text-secondary">
                FEMA: {product.fema}
              </span>
              {product.molecularFormula && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 text-zoteq-text-secondary">
                  {product.molecularFormula}
                </span>
              )}
              {product.molecularWeight && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 text-zoteq-text-secondary">
                  {product.molecularWeight}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Essential Information */}
      <section className="py-16 md:py-20">
        <div className="content-max-width section-padding">
          <AnimatedSection>
            <SectionLabel text="Essential Information" />
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium text-zoteq-text">
              Product Details
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
            {/* Odor & Application */}
            <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-zoteq-accent">
              <FlaskConical size={28} className="text-zoteq-accent" />
              <h3 className="mt-4 font-display text-lg font-medium text-zoteq-text">Odor & Application</h3>
              {product.odorDescription && (
                <div className="mt-3">
                  <span className="text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium">Odor</span>
                  <p className="mt-1 text-sm text-zoteq-text leading-relaxed">{product.odorDescription}</p>
                </div>
              )}
              {product.application && (
                <div className="mt-3">
                  <span className="text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium">Application</span>
                  <p className="mt-1 text-sm text-zoteq-text leading-relaxed">{product.application}</p>
                </div>
              )}
            </div>

            {/* Packing & Storage */}
            <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-zoteq-ocean">
              <Package size={28} className="text-zoteq-ocean" />
              <h3 className="mt-4 font-display text-lg font-medium text-zoteq-text">Packing & Storage</h3>
              <div className="mt-3 space-y-2">
                {product.appearance && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Appearance</span>
                    <span className="text-zoteq-text font-medium">{product.appearance}</span>
                  </div>
                )}
                {product.shelfLife && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Shelf Life</span>
                    <span className="text-zoteq-text font-medium">{product.shelfLife}</span>
                  </div>
                )}
                {product.storage && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Storage</span>
                    <span className="text-zoteq-text font-medium text-right">{product.storage}</span>
                  </div>
                )}
                {product.package && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Package</span>
                    <span className="text-zoteq-text font-medium">{product.package}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-zoteq-sand">
              <Thermometer size={28} className="text-zoteq-sand" />
              <h3 className="mt-4 font-display text-lg font-medium text-zoteq-text">Properties</h3>
              <div className="mt-3 space-y-2">
                {product.flashPoint && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Flash Point</span>
                    <span className="text-zoteq-text font-medium">{product.flashPoint}</span>
                  </div>
                )}
                {product.boilingPoint && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zoteq-text-secondary">Boiling Point</span>
                    <span className="text-zoteq-text font-medium">{product.boilingPoint}</span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Specifications */}
      {(product.purity || product.solubility || product.specificGravity || product.refractiveIndex || product.acidValue) && (
        <section className="py-12 md:py-16 bg-white">
          <div className="content-max-width section-padding">
            <AnimatedSection>
              <SectionLabel text="Quality Standards" />
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-medium text-zoteq-text">
                Technical Specifications
              </h2>
            </AnimatedSection>

            <AnimatedSection className="mt-8" delay={0.1}>
              <div className="bg-zoteq-bg rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {[
                      { label: 'Purity by GC', value: product.purity },
                      { label: 'Appearance', value: product.appearance },
                      { label: 'Solubility (25\u00b0C)', value: product.solubility },
                      { label: 'Specific Gravity', value: product.specificGravity },
                      { label: 'Refractive Index', value: product.refractiveIndex },
                      { label: 'Acid Value', value: product.acidValue },
                    ].filter((item) => item.value).map((item, index) => (
                      <tr key={item.label} className={`border-b border-black/5 ${index % 2 === 0 ? '' : 'bg-white/50'}`}>
                        <td className="px-6 py-4 text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium w-1/3">
                          {item.label}
                        </td>
                        <td className="px-6 py-4 text-sm text-zoteq-text">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="py-16 md:py-20">
        <div className="content-max-width section-padding">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-medium text-zoteq-text">
              Related Products
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.08}>
            {relatedProducts.map((rp) => (
              <button
                key={rp.id}
                onClick={() => { navigate(`/products/${rp.id}`); window.scrollTo(0, 0); }}
                className="text-left bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[rp.category]}`}>
                  {rp.category}
                </span>
                <h4 className="mt-3 font-display text-base font-medium text-zoteq-text">{rp.name}</h4>
                <span className="text-xs text-zoteq-text-secondary font-mono">CAS: {rp.cas} \u00b7 FEMA: {rp.fema}</span>
                {rp.description && (
                  <p className="mt-2 text-sm text-zoteq-text-secondary line-clamp-2">{rp.description}</p>
                )}
              </button>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-zoteq-accent-dark">
        <div className="content-max-width section-padding text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
              Ready to explore more ingredients?
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Contact our team for samples, technical specifications, or custom formulation support. We're here to help create exceptional products together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="px-8 py-3.5 bg-white text-zoteq-text rounded-pill font-medium hover:bg-white/90 transition-colors"
              >
                Browse All Products
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 border border-white/30 text-white rounded-pill font-medium hover:bg-white/10 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
