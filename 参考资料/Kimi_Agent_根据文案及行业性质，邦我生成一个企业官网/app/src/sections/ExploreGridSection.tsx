import { Link } from 'react-router-dom';
import { Factory, FlaskConical, Shield, Users } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const cards = [
  {
    title: 'Global Manufacturing',
    description: 'Discover our state-of-the-art production facilities across Asia \u2014 from Chongqing to Malaysia.',
    icon: Factory,
    link: '/facilities',
    linkText: 'Explore',
  },
  {
    title: 'Product Portfolio',
    description: 'Browse our comprehensive range of 200+ aroma chemicals, natural isolates, and specialty ingredients.',
    icon: FlaskConical,
    link: '/products',
    linkText: 'Browse',
  },
  {
    title: 'Quality & Certifications',
    description: 'ISO, FSSC, KOSHER, HALAL, REACH \u2014 our commitment to the highest standards.',
    icon: Shield,
    link: '/facilities',
    linkText: 'Learn More',
  },
  {
    title: 'Contact Our Team',
    description: 'Reach out for samples, technical data, or custom sourcing solutions.',
    icon: Users,
    link: '/contact',
    linkText: 'Get in Touch',
  },
];

export default function ExploreGridSection() {
  return (
    <section className="py-24 md:py-32 bg-zoteq-bg">
      <div className="content-max-width section-padding">
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.15}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
              >
                <Icon size={40} className="text-zoteq-accent" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-xl font-medium text-zoteq-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-zoteq-text-secondary leading-relaxed">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-zoteq-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                  {card.linkText}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
