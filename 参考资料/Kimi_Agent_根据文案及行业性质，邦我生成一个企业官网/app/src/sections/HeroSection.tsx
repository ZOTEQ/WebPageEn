import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      statsRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, []);

  const stats = [
    { label: 'SPECIALIZING IN', value: '200+ Premium Ingredients' },
    { label: 'GLOBAL REACH', value: '5 Locations Across Asia' },
    { label: 'SINCE 2018', value: 'Dual Production Bases' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Abstract molecular essence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto pt-20">
        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-zoteq-accent rounded-pill text-white text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse-dot" />
            F&F Ingredients Specialist
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight tracking-tight"
        >
          ZOTEQ
          <span className="block mt-2">
            <span className="text-zoteq-accent">Flavor & Fragrance</span>
            <span className="text-white"> Specialist</span>
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="opacity-0 mt-6 font-accent text-xl sm:text-2xl text-white/70 italic"
        >
          "Nature meets science — creating the essence of tomorrow."
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block text-[11px] font-medium uppercase tracking-[1px] text-white/50">
                {stat.label}
              </span>
              <span className="block mt-1 text-sm font-medium text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-zoteq-accent text-white rounded-pill text-base font-medium hover:bg-zoteq-accent-light transition-all duration-300 hover:scale-[1.02]"
          >
            Explore our ingredients
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
