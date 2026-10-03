import { LinkedinIcon, XIcon, InstagramIcon } from "./ui/brand-icons";
import { Logo } from "./ui/logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16">
      <div className="container">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-mute">Evidence-backed local business intelligence for agencies. Find the gap, prove it, pitch it.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">Product</p>
              <ul className="mt-4 space-y-2.5 text-mute">
                <li><a className="hover:text-white" href="#how">How it works</a></li>
                <li><a className="hover:text-white" href="#engines">Engines</a></li>
                <li><a className="hover:text-white" href="#proof">Proof</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">Company</p>
              <ul className="mt-4 space-y-2.5 text-mute">
                <li><a className="hover:text-white" href="#faq">FAQ</a></li>
                <li><a className="hover:text-white" href="mailto:leadzoneai@gmail.com">Contact</a></li>
                <li><a className="hover:text-white" href="#join">Join waitlist</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute-3">Follow</p>
              <div className="mt-4 flex gap-2">
                {[XIcon, LinkedinIcon, InstagramIcon].map((I, i) => (
                  <a key={i} href="#" aria-label="Social link" className="flex size-9 items-center justify-center rounded-full border border-white/10 text-mute transition hover:border-white/25 hover:text-white">
                    <I className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-mute-3 sm:flex-row">
          <p>© {new Date().getFullYear()} LeadZone AI · by Buildream AI</p>
          <p>Demo data on this page is illustrative.</p>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="text-gradient -mb-[0.22em] text-center font-display text-[15.5vw] font-extrabold leading-none tracking-[-0.06em] opacity-[0.16]">LeadZone</p>
      </div>
    </footer>
  );
}
