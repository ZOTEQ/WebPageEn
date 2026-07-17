import { partners } from '@/data/offices';
import AnimatedSection from '@/components/AnimatedSection';

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-black/5">
      <div className="content-max-width section-padding">
        <AnimatedSection className="text-center">
          <span className="text-[13px] font-medium uppercase tracking-[0.8px] text-zoteq-text-secondary">
            Trusted by Leading Brands Worldwide
          </span>
        </AnimatedSection>

        <AnimatedSection className="mt-8 flex flex-wrap justify-center items-center gap-8 md:gap-12" stagger={0.08}>
          {partners.map((name) => (
            <span
              key={name}
              className="text-zoteq-text/40 hover:text-zoteq-text/80 transition-opacity duration-300 font-display text-base md:text-lg font-medium whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
