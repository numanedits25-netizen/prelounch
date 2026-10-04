import { CountUp } from "./ui/count-up";
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

const stats = [
  { v: 5, s: "", l: "Intelligence engines", n: "website · tech · social · business · opportunity" },
  { v: 1, s: "", l: "Search to a ranked list", n: "every business found, audited & scored in one pass" },
  { v: 5, s: "", l: "AI outreach assets", n: "email · call script · proposal · audit · DM" },
  { v: 0, s: "", l: "Invented numbers", n: "unknown is shown as unknown" }
];

export function Marquee() {
  return (
    <section className="relative pb-6 pt-20 sm:pb-10 sm:pt-28">
      <div className="container mb-20 sm:mb-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
          {stats.map((x) => (
            <div key={x.l} className="bg-ink px-5 py-7 sm:px-7 sm:py-9">
              <p className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                <CountUp to={x.v} suffix={x.s} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-200">{x.l}</p>
              <p className="mt-1 text-xs leading-relaxed text-mute-2">{x.n}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-mute-2">Built for agencies that sell to</p>
      <div className="mt-8 space-y-3">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
