import { cn } from "@/lib/utils";

/** Brand mark: the Larzo orbit-arrow (transparent PNG cut from the supplied artwork). */
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
    <span className={cn("group flex items-center gap-2", className)} aria-label="Larzo">
      <LogoMark className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
      <span className="font-display text-[19px] font-bold uppercase leading-none tracking-[0.14em] text-white">
        L<span className="bg-[linear-gradient(160deg,#22d3ee,#3b82f6_55%,#a855f7)] bg-clip-text text-transparent">A</span>RZO
      </span>
    </span>
  );
}
