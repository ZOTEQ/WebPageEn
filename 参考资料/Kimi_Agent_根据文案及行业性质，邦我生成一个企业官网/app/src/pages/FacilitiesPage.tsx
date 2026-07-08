import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import { productionBases, rndLabs, distributionLocations } from '@/data/facilities';
import { partners } from '@/data/offices';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

export default function FacilitiesPage() {
  return (
    <div className="pt-[72px] bg-zoteq-bg min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/facility-hero.jpg" alt="Manufacturing facility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-6">
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-6xl font-medium text-white leading-tight">
              Global <span className="text-zoteq-accent">Manufacturing</span> & Distribution
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
              State-of-the-art production facilities, advanced R&D laboratories, and a global distribution network dedicated to delivering excellence in flavor & fragrance ingredients.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="#bases" className="px-8 py-3.5 bg-zoteq-accent text-white rounded-pill font-medium hover:bg-zoteq-accent-light transition-colors">
                View Introduction
              </Link>
              <Link to="/products" className="px-8 py-3.5 border border-white/30 text-white rounded-pill font-medium hover:bg-white/10 transition-colors">
                Products List
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Dual Production Bases */}
      <section id="bases" className="py-24 md:py-32">
        <div className="content-max-width section-padding">
          <AnimatedSection className="text-center">
            <SectionLabel text="Production" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
              Dual Production Bases
            </h2>
            <p className="mt-4 text-zoteq-text-secondary max-w-2xl mx-auto">
              Two world-class manufacturing facilities ensuring consistent quality and reliable supply
            </p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {productionBases.map((base, index) => (
              <AnimatedSection key={base.id} direction={index === 0 ? 'left' : 'right'} distance={30}>
                <div className="bg-white rounded-2xl p-8 shadow-card h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium text-zoteq-text">{base.name}</h3>
                    <span className="px-3 py-1 bg-zoteq-accent/10 text-zoteq-accent text-xs font-medium rounded-full">
                      {base.established}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zoteq-text-secondary flex items-center gap-1">
                    <MapPin size={14} /> {base.location}
                  </p>
                  <p className="mt-4 text-zoteq-text-secondary leading-relaxed">{base.description}</p>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {base.stats.map((stat) => (
                      <div key={stat.label} className="text-center p-3 bg-zoteq-bg rounded-xl">
                        <span className="block font-display text-xl font-medium text-zoteq-accent">{stat.value}</span>
                        <span className="block mt-1 text-xs text-zoteq-text-secondary uppercase tracking-wider">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  {base.certifications && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {base.certifications.map((cert) => (
                        <span key={cert} className="px-3 py-1.5 bg-zoteq-ocean/10 text-zoteq-ocean text-xs font-medium rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}

                  {base.cta && (
                    <Link to="/products" className="mt-6 inline-flex items-center gap-1 text-zoteq-accent text-sm font-medium hover:gap-2 transition-all">
                      {base.cta} <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Labs */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-zoteq-bg to-[#f5efe8]">
        <div className="content-max-width section-padding">
          <AnimatedSection className="text-center">
            <SectionLabel text="Research" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
              R&D Laboratories
            </h2>
            <p className="mt-4 text-zoteq-text-secondary max-w-2xl mx-auto">
              Four specialized research facilities driving innovation in fragrance and flavor science
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.15}>
            {rndLabs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    lab.type === 'flagship' ? 'bg-zoteq-accent text-white' : 'bg-zoteq-ocean/10 text-zoteq-ocean'
                  }`}>
                    {lab.subtitle}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-medium text-zoteq-text">{lab.name}</h3>
                <p className="mt-1 text-xs text-zoteq-text-secondary flex items-center gap-1">
                  <MapPin size={12} /> {lab.location}
                </p>
                <p className="mt-3 text-sm text-zoteq-text-secondary leading-relaxed">{lab.description}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Distribution Network */}
      <section className="py-24 md:py-32">
        <div className="content-max-width section-padding">
          <AnimatedSection className="text-center">
            <SectionLabel text="Logistics" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
              Distribution Network
            </h2>
            <p className="mt-4 text-zoteq-text-secondary max-w-2xl mx-auto">
              Four strategic locations ensuring efficient service and delivery across Asia
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-12" delay={0.1}>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-black/5 bg-zoteq-bg/50">
                    <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">Location</th>
                    {['HQ', 'Sales', 'Procurement', 'Production', 'Warehouse', 'I.T.', 'Sampling', 'Q.C.'].map((h) => (
                      <th key={h} className="text-center px-3 py-4 text-xs font-medium uppercase tracking-wider text-zoteq-text-secondary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {distributionLocations.map((loc, i) => (
                    <tr key={loc.name} className={`border-b border-black/5 ${i % 2 === 1 ? 'bg-zoteq-bg/30' : ''}`}>
                      <td className="px-6 py-4">
                        <span className="font-medium text-zoteq-text text-sm">{loc.name}</span>
                        <span className="block text-xs text-zoteq-text-secondary">{loc.subtitle}</span>
                      </td>
                      {['hq', 'sales', 'procurement', 'production', 'warehouse', 'it', 'sampling', 'qc'].map((key) => (
                        <td key={key} className="text-center px-3 py-4">
                          {loc[key as keyof typeof loc] === true ? (
                            <Check size={16} className="text-zoteq-ocean mx-auto" />
                          ) : (
                            <span className="text-zoteq-text-secondary/20">\u2014</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-white border-t border-black/5">
        <div className="content-max-width section-padding">
          <AnimatedSection className="text-center">
            <span className="text-[13px] font-medium uppercase tracking-[0.8px] text-zoteq-text-secondary">
              Trusted by Leading Brands Worldwide
            </span>
          </AnimatedSection>
          <AnimatedSection className="mt-8 flex flex-wrap justify-center items-center gap-8 md:gap-12" stagger={0.08}>
            {partners.map((name) => (
              <span key={name} className="text-zoteq-text/40 hover:text-zoteq-text/80 transition-opacity duration-300 font-display text-base md:text-lg font-medium whitespace-nowrap">
                {name}
              </span>
            ))}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
