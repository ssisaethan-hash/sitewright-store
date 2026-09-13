import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingIntro({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    sessionStorage.setItem('sitewright_intro_played', 'true');
    setDone(true);
    onComplete();
  };

  useEffect(() => {
    if (sessionStorage.getItem('sitewright_intro_played')) {
      finish();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline();

    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val)}%`;
        }
      },
    });

    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: finish,
    });

    const skipHandler = () => {
      tl.progress(1);
    };
    window.addEventListener('click', skipHandler);

    return () => {
      window.removeEventListener('click', skipHandler);
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-[#0A0A0B] flex items-center justify-center"
    >
      <span
        ref={counterRef}
        className="font-mono text-5xl md:text-7xl text-[#F2F2F0] tabular-nums tracking-tight"
      >
        0%
      </span>
      <span className="absolute bottom-8 right-8 font-mono text-xs text-[#F2F2F0]/30 uppercase tracking-widest">
        Click to skip
      </span>
    </div>
  );
}
