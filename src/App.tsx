import { useEffect, useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/CustomCursor';
import LoadingIntro from '@/components/LoadingIntro';
import Hero from '@/components/Hero';
import TemplateShowcase from '@/components/TemplateShowcase';
import Marquee from '@/components/Marquee';
import HowItWorks from '@/components/HowItWorks';
import StatsBar from '@/components/StatsBar';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

const sectionLabels: { id: string; index: string; label: string }[] = [
  { id: 'hero', index: '00', label: 'INTRO' },
  { id: 'templates', index: '01', label: 'WORK' },
  { id: 'marquee', index: '—', label: 'SCOPE' },
  { id: 'how-it-works', index: '02', label: 'HOW IT WORKS' },
  { id: 'stats', index: '03', label: 'STATS' },
  { id: 'contact', index: '04', label: 'CONTACT' },
];

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionLabels.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionLabels.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [introDone]);

  const current = sectionLabels[activeSection];

  return (
    <>
      <div className="grain-overlay" />

      {!introDone && <LoadingIntro onComplete={() => setIntroDone(true)} />}

      <CustomCursor />

      {/* Section index label */}
      <div className="fixed top-6 left-6 z-50 font-mono text-sm pointer-events-none hidden md:block">
        <span className="text-[#C6FF3D] font-medium">{current?.index}</span>
        <span className="text-[#F2F2F0]/40"> — {current?.label}</span>
      </div>

      <main>
        <section id="hero">
          <Hero />
        </section>
        <TemplateShowcase />
        <section id="marquee">
          <Marquee />
        </section>
        <HowItWorks />
        <section id="stats">
          <StatsBar />
        </section>
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

export default App;
