import Reveal from './Reveal';

const steps = [
  {
    num: '(01)',
    title: 'Pick a template and preview it live',
  },
  {
    num: '(02)',
    title: 'Pay via Flutterwave, Paystack, or Mobile Money / WhatsApp',
  },
  {
    num: '(03)',
    title: 'Get the full source files by email within minutes',
  },
  {
    num: '(04)',
    title: 'Customize the text, images and colors yourself, or pay a small fee to have it done for you',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-40 px-6 md:px-20">
      <div className="max-w-5xl">
        <Reveal y={30}>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-16">
            How it works
          </h2>
        </Reveal>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i}>
              <Reveal x={-50} y={0} delay={i * 0.1}>
                <div className="flex items-start gap-6 md:gap-12 py-8 md:py-12">
                  <span className="font-mono text-lg md:text-2xl text-[#C6FF3D] tabular-nums whitespace-nowrap pt-1">
                    {step.num}
                  </span>
                  <p className="font-grotesk text-xl md:text-3xl text-[#F2F2F0]/80 leading-snug max-w-3xl">
                    {step.title}
                  </p>
                </div>
              </Reveal>
              {i < steps.length - 1 && (
                <div className="h-px w-full bg-[#F2F2F0]/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
