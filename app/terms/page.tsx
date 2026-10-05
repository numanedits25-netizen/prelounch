import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { COMPANY, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" }, description: "Terms for using the Larzo website and private-beta waitlist." };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="5 October 2026">
      <p>
        These terms cover your use of this website and the Larzo private-beta waitlist, operated by <strong>{COMPANY}</strong>. Using the product itself will be covered by separate terms that you&rsquo;ll see before you start.
      </p>
      <LegalSection h="The waitlist">
        <ul>
          <li>Joining is free and doesn&rsquo;t commit you to buying anything.</li>
          <li>We send invites in waves, earliest signups first, and may prioritise people who are a good fit for the beta.</li>
          <li>Referrals get you invited sooner. Signups that are fake, automated or self-referred don&rsquo;t count, and we may remove them.</li>
          <li>Everyone who joins the waitlist before public launch gets free months of Larzo at launch. We&rsquo;ll confirm the exact length and details before launch, and before you&rsquo;re asked to pay anything.</li>
        </ul>
      </LegalSection>
      <LegalSection h="What&rsquo;s on this site">
        <p>
          Screens, numbers and example businesses on this site are illustrative and show how the product works. Benchmark figures come from our own internal testing. Comparisons with other tools describe typical tool categories and are made in good faith. They may not reflect every plan or the latest feature of every product.
        </p>
        <p>Larzo is in development. Features may change before launch.</p>
      </LegalSection>
      <LegalSection h="Acceptable use">
        <p>Please don&rsquo;t try to break, scrape or overload the site or the waitlist, or sign up other people without their permission.</p>
      </LegalSection>
      <LegalSection h="Liability">
        <p>The site is provided &ldquo;as is&rdquo;. To the extent the law allows, we aren&rsquo;t liable for any loss that comes from using it or relying on its content.</p>
      </LegalSection>
      <LegalSection h="Contact">
        <p>
          Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
