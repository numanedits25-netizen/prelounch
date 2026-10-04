import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CompareTable, Legend } from "./compare-table";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Compare() {
  return (
    <section id="compare" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,.08),transparent_60%)]" />
      <div className="container">
        <SectionHeading
          eyebrow="Larzo vs the usual stack"
          title="Four tools and a spreadsheet,"
          accent="or one Larzo."
          copy="Most agencies stitch prospecting together from a scraper, a tech lookup, a contact database and ChatGPT. Here's how that stacks up."
        />
        <Reveal className="mt-14">
          <CompareTable />
        </Reveal>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Legend />
          <Link href="/compare" className="group inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white">
            Full comparison <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-mute-3 sm:text-left">
          Compared by tool category, based on each category&apos;s core, publicly documented features (Oct 2026). Individual products vary and some offer add-ons. Product names are trademarks of their owners.
        </p>
      </div>
    </section>
  );
}
