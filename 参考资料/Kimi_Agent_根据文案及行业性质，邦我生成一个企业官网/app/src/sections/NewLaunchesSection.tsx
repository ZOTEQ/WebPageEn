import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';
import CategoryPill from '@/components/CategoryPill';

const launches = [
  {
    name: 'Geranyl Acetate 60',
    code: 'C013',
    category: 'Biobased' as const,
    description: 'A premium biobased ingredient with exceptional floral-fruity profile.',
    id: 29,
  },
  {
    name: 'Limonene',
    code: 'C005',
    category: 'Biobased' as const,
    description: 'Natural citrus terpene with versatile applications.',
    id: 2,
  },
  {
    name: 'Geraniol',
    code: 'C003',
    category: 'EU Natural' as const,
    description: 'Naturally occurring monoterpene alcohol with sweet rose scent.',
    id: 3,
  },
  {
    name: 'Gamma-Decalactone',
    code: 'C004',
    category: 'Biobased' as const,
    description: 'Rich peach-like lactone for flavor formulations.',
    id: 12,
  },
];

export default function NewLaunchesSection() {
  return (
    <section className="py-24 md:py-32 bg-zoteq-bg border-t border-black/5">
      <div className="content-max-width section-padding">
        <AnimatedSection>
          <SectionLabel text="New Launches" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
            Latest Ingredients
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.12}>
          {launches.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
            >
              <CategoryPill category={product.category} />
              <h3 className="mt-4 font-display text-xl font-medium text-zoteq-text">
                {product.name}
              </h3>
              <span className="mt-1 block text-xs text-zoteq-text-secondary uppercase tracking-wide">
                Code: {product.code}
              </span>
              <p className="mt-3 text-sm text-zoteq-text-secondary leading-relaxed">
                {product.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-zoteq-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                View Details
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
