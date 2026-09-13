const items = [
  'RESTAURANTS',
  'SALONS',
  'BOUTIQUES',
  'GYMS',
  'TAILORS',
  'PHARMACIES',
  'GARAGES',
  'BAKERIES',
];

export default function Marquee() {
  const content = [...items, ...items];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-[#F2F2F0]/10 marquee-container">
      <div className="marquee-track">
        {content.map((item, i) => (
          <span
            key={i}
            className="font-display text-6xl md:text-8xl uppercase text-outline whitespace-nowrap mx-6"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
