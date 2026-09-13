import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 24, suffix: 'H', label: 'Average delivery time' },
  { value: 100, suffix: '%', label: 'Yours to keep and edit' },
  { value: 0, suffix: '', label: 'Coding knowledge required' },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<number[]>(stats.map(() => 0));
  const animatedRef = useRef(false);

  const runCountUp = () => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    stats.forEach((stat, i) => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          setValues((prev) => {
            const next = [...prev];
            next[i] = Math.round(obj.val);
            return next;
          });
        },
      });
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Primary: ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: runCountUp,
    });

    // Safety net: if ScrollTrigger hasn't fired after 3s, run anyway
    const fallback = setTimeout(() => {
      if (!animatedRef.current) runCountUp();
    }, 3000);

    // Safety net: IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runCountUp();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      st.kill();
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-20 border-y border-[#F2F2F0]/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, i) => (
          <Reveal key={i} y={30} delay={i * 0.1}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-7xl md:text-8xl tabular-nums text-[#F2F2F0]">
                  {values[i]}
                </span>
                <span className="font-display text-5xl md:text-6xl text-[#C6FF3D]">
                  {stat.suffix}
                </span>
              </div>
              <span className="font-grotesk text-base text-[#F2F2F0]/50 mt-3 max-w-[200px]">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
