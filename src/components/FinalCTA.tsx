import { MessageCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Reveal from './Reveal';

export default function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <Reveal y={60}>
        <h2 className="font-display text-6xl md:text-9xl uppercase leading-[0.9] text-center max-w-4xl">
          Stop waiting
          <br />
          on a developer.
        </h2>
      </Reveal>

      <Reveal y={30} delay={0.15} className="mt-12">
        <MagneticButton
          href="#templates"
          className="inline-flex items-center gap-2 bg-[#C6FF3D] text-black font-grotesk font-bold px-10 py-5 rounded-full text-lg"
        >
          Buy a template today
        </MagneticButton>
      </Reveal>

      <Reveal y={20} delay={0.3} className="mt-8">
        <p className="font-grotesk text-sm text-[#F2F2F0]/40 mb-3 text-center">
          Need something custom?
        </p>
        <MagneticButton
          href="https://wa.me/256709765499"
          target="_blank"
          className="inline-flex items-center gap-2 border border-[#F2F2F0]/20 text-[#F2F2F0]/80 font-grotesk font-medium px-6 py-3 rounded-full text-sm hover:border-[#C6FF3D] hover:text-[#C6FF3D] transition-colors"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </MagneticButton>
      </Reveal>
    </section>
  );
}
