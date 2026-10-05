import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { COMPANY, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy — Larzo", description: "How Larzo handles your data on the private-beta waitlist." };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="5 October 2026">
      <p>
        This policy explains what we collect when you visit this site or join the Larzo private-beta waitlist, and what we do with it. Larzo is built by{" "}
        <strong>{COMPANY}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We keep it short because we collect very little.
      </p>
      <LegalSection h="What we collect">
        <ul>
          <li><strong>Your email address</strong>, when you join the waitlist.</li>
          <li><strong>What you sell</strong> (e.g. &ldquo;SEO&rdquo;), only if you choose to tell us.</li>
          <li><strong>Referral data</strong>: your referral code, who referred you and how many people joined through your link.</li>
          <li><strong>Basic technical data</strong>: where you came from (referring site or campaign tag), your browser&rsquo;s user-agent, and a one-way hash of your IP address used only to stop spam signups. We do not store your raw IP address.</li>
          <li><strong>Anonymous usage statistics</strong> (page views, device type, country) through Vercel Web Analytics, which does not use cookies.</li>
        </ul>
      </LegalSection>
      <LegalSection h="How we use it">
        <ul>
          <li>To hold your place in the queue and email you when your invite is ready.</li>
          <li>To send occasional product updates about Larzo&rsquo;s launch. Every email has an unsubscribe link.</li>
          <li>To prevent abuse of the waitlist and understand which channels bring people to the site.</li>
        </ul>
        <p>We never sell or rent your data, and we never use it to train AI models.</p>
      </LegalSection>
      <LegalSection h="Who processes it">
        <p>We use a small number of trusted providers to run this site:</p>
        <ul>
          <li><strong>Supabase</strong>: stores the waitlist database.</li>
          <li><strong>Vercel</strong>: hosts the website and provides privacy-friendly analytics.</li>
          <li>An email delivery provider, once we start sending invites.</li>
        </ul>
        <p>These providers may process data outside your country under their own standard data-protection terms.</p>
      </LegalSection>
      <LegalSection h="Cookies">
        <p>This site doesn&rsquo;t set advertising or tracking cookies. Your browser&rsquo;s local storage remembers that you&rsquo;ve joined, so we can show your referral link again.</p>
      </LegalSection>
      <LegalSection h="How long we keep it">
        <p>We keep waitlist data until Larzo launches publicly and you&rsquo;ve had the chance to accept your invite, or until you ask us to delete it, whichever comes first.</p>
      </LegalSection>
      <LegalSection h="Your rights">
        <p>
          You can ask to see, correct or delete your data, or to leave the waitlist, at any time. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the address you signed up with and we&rsquo;ll handle it within 30 days. If you&rsquo;re in the EU, UK or another region with data-protection law, you can also complain to your local regulator.
        </p>
      </LegalSection>
      <LegalSection h="Changes">
        <p>If we change this policy in a meaningful way, we&rsquo;ll update the date above and, where it matters, email people on the waitlist.</p>
      </LegalSection>
    </LegalPage>
  );
}
