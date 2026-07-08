import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function MissionSection() {
  return (
    <section className="py-24 md:py-32 bg-zoteq-bg">
      <div className="content-max-width section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <AnimatedSection className="lg:col-span-2" direction="left" distance={30}>
            <SectionLabel text="Our Mission" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text leading-tight">
              Bridging nature and innovation
            </h2>
          </AnimatedSection>

          {/* Right Column */}
          <AnimatedSection className="lg:col-span-3" direction="right" distance={30} delay={0.2}>
            <p className="text-zoteq-text-secondary leading-relaxed text-base md:text-lg">
              We are a dedicated F&F ingredients supplier committed to providing high-quality aroma chemicals, 
              natural isolates, and specialty ingredients to customers worldwide. With dual production bases 
              in China and Malaysia, a state-of-the-art R&D network, and a robust supply chain across 
              Asia-Pacific, we deliver consistency, compliance, and creativity in every shipment.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
