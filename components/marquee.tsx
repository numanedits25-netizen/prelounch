import { Building2, Car, Dumbbell, Hammer, HeartPulse, Home, Scale, Scissors, Sparkles, Stethoscope, UtensilsCrossed, Wrench, PawPrint, GraduationCap } from "lucide-react";

const rowA = [
  { icon: Stethoscope, label: "Dentists" },
  { icon: Hammer, label: "Roofers" },
  { icon: Sparkles, label: "Med spas" },
  { icon: Scale, label: "Law firms" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Dumbbell, label: "Gyms" },
  { icon: Home, label: "Real estate" }
];
const rowB = [
  { icon: Wrench, label: "HVAC & plumbing" },
  { icon: Car, label: "Auto repair" },
  { icon: Scissors, label: "Salons & barbers" },
  { icon: HeartPulse, label: "Clinics" },
  { icon: PawPrint, label: "Vets" },
  { icon: GraduationCap, label: "Tutoring" },
  { icon: Building2, label: "Contractors" }
];

function Row({ items, reverse }: { items: typeof rowA; reverse?: boolean }) {
  const all = [...items, ...items, ...items, ...items];
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div className="flex shrink-0 animate-marquee gap-3 pr-3 hover:[animation-play-state:paused]" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {all.map((it, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5 text-sm text-slate-300">
            <it.icon className="size-4 text-violet-400" />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="relative pb-6 pt-16 sm:pb-10 sm:pt-20">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-mute-2">Built for agencies that sell to</p>
      <div className="mt-8 space-y-3">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
