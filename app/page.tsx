import { Compare } from "@/components/compare";
import { Audience } from "@/components/audience";
import { Engines } from "@/components/engines";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Founding } from "@/components/founding";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Marquee } from "@/components/marquee";
import { Nav } from "@/components/nav";
import { Pitch } from "@/components/pitch";
import { Problem } from "@/components/problem";
import { Proof } from "@/components/proof";
import { Workflow } from "@/components/workflow";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/faqs";
import { faqLd, softwareLd } from "@/lib/seo";

export default function Page() {
  return (
    <main className="relative">
      <JsonLd data={[softwareLd, faqLd(faqs)]} />
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <Engines />
      <Proof />
      <Pitch />
      <Workflow />
      <Compare />
      <Audience />
      <Founding />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
