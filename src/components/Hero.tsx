import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { getLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const floatingImages = [
  {
    src: 'https://ssisaethan-hash.github.io/sitewright/preview-kitchen.png',
    top: '8%',
    left: '60%',
    width: 280,
    height: 180,
    depth: 0.3,
    floatDur: 4,
    floatOffset: 0,
  },
  {
    src: 'https://ssisaethan-hash.github.io/sitewright/preview-glow.png',
    top: '55%',
    left: '8%',
    width: 240,
    height: 160,
    depth: 0.5,
    floatDur: 5,
    floatOffset: 1,
  },
  {
    src: 'https://images.pexels.com/photos/1400162/pexels-photo-1400162.jpeg?auto=compress&cs=tinysrgb&w=600',
    top: '15%',
    left: '15%',
    width: 200,
    height: 130,
    depth: 0.2,
    floatDur: 6,
    floatOffset: 2,
  },
  {
    src: 'https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&w=600',
    top: '60%',
    left: '72%',
    width: 220,
    height: 150,
    depth: 0.4,
    floatDur: 4.5,
    floatOffset: 0.5,
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<HTMLDivElement[]>([]);
  const floatRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const ctx = gsap.context(() => {
      floatRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: '+=30',
          duration: floatingImages[i].floatDur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: floatingImages[i].floatOffset,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;

      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = floatingImages[i].depth;
        gsap.to(el, {
          x: xPercent * 40 * depth,
          y: yPercent * 40 * depth,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTemplates = () => {
    const el = document.getElementById('templates');
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.5 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden"
    >
      {/* Floating images */}
      {!isMobile &&
        floatingImages.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) parallaxRefs.current[i] = el;
            }}
            className="absolute rounded-lg overflow-hidden border border-white/10 shadow-2xl"
            style={{
              top: img.top,
              left: img.left,
              width: img.width,
              height: img.height,
            }}
          >
            <div
              ref={(el) => {
                if (el) floatRefs.current[i] = el;
              }}
              style={{ width: '100%', height: '100%' }}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        ))}

      {/* Headline */}
      <div className="relative z-10 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[15vw] md:text-[9vw] leading-[0.9] tracking-tight uppercase"
        >
          Websites that
          <br />
          are already{' '}
          <span className="text-[#C6FF3D]">done</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-grotesk text-lg md:text-xl text-[#F2F2F0]/60 mt-8 max-w-xl"
        >
          Real, working websites for real businesses — buy one, customize it, launch it today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <MagneticButton
            onClick={scrollToTemplates}
            className="inline-flex items-center gap-2 bg-[#C6FF3D] text-black font-grotesk font-semibold px-8 py-4 rounded-full text-base hover:scale-105 transition-transform"
          >
            Browse Templates
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-xs text-[#F2F2F0]/40 tracking-widest">SCROLL</span>
        <div className="relative h-12 w-px bg-white/10 overflow-hidden">
          <div className="absolute inset-0 scroll-pulse-line bg-[#C6FF3D]" style={{ height: '100%' }} />
        </div>
      </div>
    </section>
  );
}
