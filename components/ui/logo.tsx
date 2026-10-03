import { cn } from "@/lib/utils";

/** Brand mark: the infinity-loop arrow (transparent PNG cut from the supplied artwork). */
export function LogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-128.png"
      alt=""
      aria-hidden="true"
      width={128}
      height={128}
      className={cn("size-9 select-none object-contain drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]", className)}
      draggable={false}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("group flex items-center gap-2", className)} aria-label="LeadZone AI">
      <LogoMark className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
      <span className="font-display text-[17px] font-bold tracking-tight text-white">
        LeadZone<span className="text-cyan-400"> AI</span>
      </span>
    </span>
  );
}
