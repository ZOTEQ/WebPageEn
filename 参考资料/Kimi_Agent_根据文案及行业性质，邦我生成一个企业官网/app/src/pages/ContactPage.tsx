import { useState, useEffect, useCallback } from 'react';
import { Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import { offices, contactInfo } from '@/data/offices';
import AnimatedSection from '@/components/AnimatedSection';
import SectionLabel from '@/components/SectionLabel';

const carouselImages = [
  { src: '/images/carousel-1.jpg', alt: 'Shanghai' },
  { src: '/images/carousel-2.jpg', alt: 'Guangzhou' },
  { src: '/images/carousel-3.jpg', alt: 'Chongqing' },
  { src: '/images/carousel-4.jpg', alt: 'Malaysia' },
];

const officeGallery = [
  { src: '/images/office-shanghai.jpg', title: 'Shanghai Office', desc: 'Our Shanghai Office in east China' },
  { src: '/images/office-chongqing.jpg', title: 'Chongqing Office', desc: 'West China operations center' },
  { src: '/images/office-guangzhou.jpg', title: 'Guangzhou Hub', desc: 'South China regional office' },
];

export default function ContactPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % carouselImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="pt-[72px] bg-zoteq-bg min-h-screen">
      {/* Hero with Carousel */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          </div>
        ))}
        <div className="relative z-10 text-center px-6">
          <AnimatedSection>
            <SectionLabel text="Contact" light />
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-medium text-white">
              Let's talk
            </h1>
            <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">
              We're here to answer your questions and discuss how we can support your needs across the Asia-Pacific region.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Office Gallery */}
      <section className="py-16 md:py-20">
        <div className="content-max-width section-padding">
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.1}>
            {officeGallery.map((office) => (
              <div key={office.title} className="group">
                <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src={office.src}
                    alt={office.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium text-zoteq-text">{office.title}</h3>
                <p className="text-sm text-zoteq-text-secondary">{office.desc}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Our Offices */}
      <section className="py-16 md:py-20 bg-white">
        <div className="content-max-width section-padding">
          <AnimatedSection>
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-zoteq-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-medium text-zoteq-text">Our offices</h2>
            </div>
            <p className="mt-4 text-zoteq-text-secondary max-w-xl">
              Visit us at any of our locations across Asia-Pacific.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Office Cards */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatedSection stagger={0.08}>
                {offices.map((office) => (
                  <div
                    key={office.id}
                    className="bg-zoteq-bg rounded-2xl p-6 border-l-4 hover:shadow-card transition-shadow duration-300"
                    style={{ borderLeftColor: office.color }}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-medium text-zoteq-text">{office.name}</h3>
                      <span className="text-xs text-zoteq-text-secondary font-medium">\u2014 {office.subtitle}</span>
                    </div>
                    <div className="mt-2 space-y-0.5">
                      {office.address.map((line, i) => (
                        <p key={i} className="text-sm text-zoteq-text-secondary">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <AnimatedSection direction="right" distance={20}>
              <div className="bg-zoteq-accent-dark rounded-2xl p-8 text-white">
                <h3 className="font-display text-xl font-medium">Prefer a call?</h3>
                <div className="mt-4 flex items-start gap-3">
                  <Clock size={20} className="mt-0.5 flex-shrink-0 text-white/70" />
                  <div>
                    <p className="text-white/70 text-sm">Our team is available</p>
                    <p className="text-white font-medium text-sm mt-1">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#f5efe8' }}>
        <div className="content-max-width section-padding">
          <AnimatedSection className="text-center">
            <SectionLabel text="Direct Contact" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-medium text-zoteq-text">
              Direct contact
            </h2>
            <p className="mt-4 text-zoteq-text-secondary">Choose the channel that works best for you.</p>
          </AnimatedSection>

          <AnimatedSection className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6" stagger={0.1}>
            <div className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-zoteq-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Phone size={20} className="text-zoteq-accent" />
              </div>
              <span className="mt-4 block text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium">Mobile</span>
              <a href={`tel:${contactInfo.mobile}`} className="mt-2 block text-zoteq-text font-medium hover:text-zoteq-accent transition-colors">
                {contactInfo.mobile}
              </a>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-zoteq-ocean/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle size={20} className="text-zoteq-ocean" />
              </div>
              <span className="mt-4 block text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium">WhatsApp</span>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`} className="mt-2 block text-zoteq-text font-medium hover:text-zoteq-ocean transition-colors">
                {contactInfo.whatsapp}
              </a>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-zoteq-sand/10 rounded-full flex items-center justify-center mx-auto">
                <Mail size={20} className="text-zoteq-sand" />
              </div>
              <span className="mt-4 block text-xs uppercase tracking-wider text-zoteq-text-secondary font-medium">Email</span>
              <a href={`mailto:${contactInfo.email}`} className="mt-2 block text-zoteq-text font-medium hover:text-zoteq-sand transition-colors">
                {contactInfo.email}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Response Promise */}
      <section className="py-16 md:py-20 bg-zoteq-accent-dark">
        <div className="content-max-width section-padding text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
              Respond within 24 hours.
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              For urgent inquiries, we recommend calling us directly for the fastest assistance.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
