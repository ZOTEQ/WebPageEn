import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

const slides = [
  {
    title: 'Manufacturer',
    description: 'Dual production bases with 120,000 sqm site, 5,000+ tons annual capacity, and 100+ product varieties.',
    tags: ['Chongqing Base', 'Malaysia Base', 'Gamma-Lactone', 'Scale Production', 'Quality Control', 'REACH Registered'],
    image: '/images/hub-manufacturer.jpg',
  },
  {
    title: 'Trader & Distributor',
    description: 'Extensive global sourcing network with long-term partnerships across Asia, Europe, and the Americas.',
    tags: ['Global Sourcing', 'Supply Chain', 'Multi-region', 'Competitive Pricing', 'Logistics', 'Market Intelligence'],
    image: '/images/office-shanghai.jpg',
  },
  {
    title: 'R&D & Innovation',
    description: 'Four specialized research laboratories driving innovation in chemical synthesis, biosynthesis, and natural extraction.',
    tags: ['Chemical Synthesis', 'Biosynthesis', 'Odor Optimization', 'Plant Extraction', 'Application Lab', 'Custom Development'],
    image: '/images/hub-rnd.jpg',
  },
  {
    title: 'Sampling & QC',
    description: 'Fast sampling and rigorous quality control across all locations, ensuring every batch meets specification.',
    tags: ['Rapid Sampling', 'QC Testing', 'Sensory Panel', 'Stability Test', 'Certificate of Analysis', 'Batch Traceability'],
    image: '/images/hub-qc.jpg',
  },
];

export default function FnfHubCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-zoteq-bg to-[#f5efe8]">
      <div className="content-max-width section-padding">
        <AnimatedSection>
          <SectionLabel text="F&F Hub" />
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
            F&F Hub
          </h2>
          <p className="mt-3 font-accent text-lg text-zoteq-text-secondary italic">
            Your one-stop partner for flavor and fragrance ingredients sourcing
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-12" delay={0.2}>
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Text Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-zoteq-text">
                    {slides[active].title}
                  </h3>
                  <p className="mt-4 text-zoteq-text-secondary leading-relaxed">
                    {slides[active].description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {slides[active].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-zoteq-accent/10 text-zoteq-accent text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-64 lg:h-auto min-h-[300px]">
                  {slides.map((slide, index) => (
                    <img
                      key={index}
                      src={slide.image}
                      alt={slide.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        index === active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
              >
                <ChevronLeft size={20} className="text-zoteq-text" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
              >
                <ChevronRight size={20} className="text-zoteq-text" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === active
                      ? 'bg-zoteq-accent w-8'
                      : 'bg-zoteq-accent/30 hover:bg-zoteq-accent/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
