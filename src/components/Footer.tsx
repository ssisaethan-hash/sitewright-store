export default function Footer() {
  return (
    <footer className="relative border-t border-[#F2F2F0]/10 px-6 md:px-20 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="font-display text-3xl uppercase tracking-tight">
          Sitewright
        </div>

        <nav className="flex flex-wrap gap-6 md:gap-8">
          <a href="#templates" className="font-grotesk text-sm text-[#F2F2F0]/60 hover:text-[#C6FF3D] transition-colors">
            Templates
          </a>
          <a href="#how-it-works" className="font-grotesk text-sm text-[#F2F2F0]/60 hover:text-[#C6FF3D] transition-colors">
            How it works
          </a>
          <a href="#contact" className="font-grotesk text-sm text-[#F2F2F0]/60 hover:text-[#C6FF3D] transition-colors">
            Contact
          </a>
        </nav>

        <a
          href="https://wa.me/256709765499"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-[#F2F2F0]/40"
        >
          +256 709 765 499
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-[#F2F2F0]/5">
        <p className="font-mono text-xs text-[#F2F2F0]/30">
          © {new Date().getFullYear()} Sitewright Templates. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
