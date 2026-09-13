import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

type Template = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  previewUrl: string;
  tint: string;
};

const templates: Template[] = [
  {
    id: '01',
    name: "Mama Aisha's Kitchen",
    category: 'RESTAURANT',
    description: 'A warm restaurant template with menu display, hours, location, and WhatsApp ordering built in.',
    price: '450,000 UGX',
    image: 'https://ssisaethan-hash.github.io/sitewright/preview-kitchen.png',
    previewUrl: 'https://ssisaethan-hash.github.io/sitewright/demo-kitchen.html',
    tint: '#1a1410',
  },
  {
    id: '02',
    name: 'Glow Beauty Bar',
    category: 'SALON',
    description: 'An elegant salon template with services, pricing, and WhatsApp booking built in.',
    price: '450,000 UGX',
    image: 'https://ssisaethan-hash.github.io/sitewright/preview-glow.png',
    previewUrl: 'https://ssisaethan-hash.github.io/sitewright/demo-glow.html',
    tint: '#101814',
  },
];

export default function TemplateShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        ScrollTrigger.create({
          trigger: slide,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="templates" className="relative scroll-snap-section">
      {/* Persistent counter */}
      <div className="fixed bottom-6 right-6 z-40 font-mono text-sm">
        <span key={activeIndex}>
          <span className="text-[#C6FF3D]">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-[#F2F2F0]/30"> / {String(templates.length).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Background tint crossfade */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: templates[activeIndex].tint, opacity: 0.4 }}
      />

      {templates.map((template, i) => (
        <div
          key={template.id}
          ref={(el) => {
            if (el) slideRefs.current[i] = el;
          }}
          className="snap-slide relative min-h-screen flex items-center overflow-hidden"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-0 w-full">
            {/* Image side */}
            <div className="md:col-span-7 relative h-[40vh] md:h-screen order-1 md:order-1 overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover ken-burns"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0B]/60 md:to-[#0A0A0B]" />
            </div>

            {/* Info side */}
            <div className="md:col-span-5 flex flex-col justify-center px-6 md:px-12 py-8 md:py-0 order-2 md:order-2 relative z-10">
              <Reveal x={40} y={0}>
                <span className="font-mono text-sm text-[#C6FF3D]">
                  {template.id} — {template.category}
                </span>
                <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] mt-3">
                  {template.name}
                </h2>
                <p className="font-grotesk text-base text-[#F2F2F0]/60 mt-6 max-w-md leading-relaxed">
                  {template.description}
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#F2F2F0]/40">PRICE</span>
                  <span className="font-display text-3xl text-[#F2F2F0]">{template.price}</span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <MagneticButton
                    href={template.previewUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-[#F2F2F0]/20 text-[#F2F2F0] font-grotesk font-medium px-6 py-3 rounded-full text-sm hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors"
                  >
                    <ExternalLink size={16} /> Live Preview
                  </MagneticButton>
                  <MagneticButton
                    href="#"
                    className="inline-flex items-center gap-2 bg-[#C6FF3D] text-black font-grotesk font-semibold px-6 py-3 rounded-full text-sm"
                  >
                    <ShoppingBag size={16} /> Buy This Template
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
