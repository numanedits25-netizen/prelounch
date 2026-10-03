import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("size-9", className)} aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="#0b0b12" />
      <rect x=".5" y=".5" width="63" height="63" rx="17.5" stroke="url(#lz-g)" strokeOpacity=".6" />
      <path d="M18 44V20h8v17h20v7H18Z" fill="#EEF2FF" />
      <path d="M30 20h16c0 10.493-8.507 19-19 19v-8c6.075 0 11-4.925 11-11h-8Z" fill="#22D3EE" />
      <circle cx="46" cy="19" r="5" fill="#7C3AED" />
      <defs>
        <linearGradient id="lz-g" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)} aria-label="LeadZone AI">
      <LogoMark />
      <span className="font-display text-[17px] font-bold tracking-tight text-white">
        LeadZone<span className="text-cyan-400"> AI</span>
      </span>
    </span>
  );
}
