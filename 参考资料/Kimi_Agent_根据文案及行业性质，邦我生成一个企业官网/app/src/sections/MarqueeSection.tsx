export default function MarqueeSection() {
  const text = 'Fragrance \u2022 Flavor \u2022 Innovation \u2022 Quality \u2022 Nature \u2022 Science \u2022 ';

  return (
    <section className="py-6 bg-zoteq-accent-dark overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl font-medium text-white/90 mx-2"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="animate-marquee whitespace-nowrap flex group-hover:[animation-play-state:paused]" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl font-medium text-white/90 mx-2"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
