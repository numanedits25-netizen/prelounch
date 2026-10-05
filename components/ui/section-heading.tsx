import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SplitWords } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  copy,
  align = "center",
  className,
  as: Tag = "h2"
}: {
  as?: "h1" | "h2";
  eyebrow: string;
  title: string;
  accent?: string;
  copy?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "", className)}>
      <Reveal>
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          {eyebrow}
        </span>
      </Reveal>
      <Tag className="mt-5 font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]">
        <SplitWords text={title} />
        {accent ? (
          <>
            {" "}
            <SplitWords text={accent} className="text-gradient" delay={0.15} />
          </>
        ) : null}
      </Tag>
      {copy ? (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-mute sm:text-lg">{copy}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
