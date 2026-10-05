import type { Metadata } from "next";
import { FilmPlayer } from "@/components/film-player";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const title = "Watch the Larzo Product Film";
const description =
  "54 seconds: real local businesses, what to sell them, the tools running their site, and a full executive report — with Larzo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/watch" },
  openGraph: { title, description, url: "/watch", type: "video.other" }
};

const videoLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Larzo — product film",
  description,
  thumbnailUrl: [`${SITE_URL}/video/hero-poster.jpg`],
  uploadDate: "2026-10-04T08:00:00+05:30",
  duration: "PT54S",
  contentUrl: `${SITE_URL}/video/larzo-film.mp4`,
  embedUrl: `${SITE_URL}/watch`,
  publisher: { "@id": `${SITE_URL}/#organization` }
};

export default function WatchPage() {
  return (
    <>
      <JsonLd data={videoLd} />
      <h1 className="sr-only">Larzo product film — find, audit and pitch local businesses</h1>
      <FilmPlayer />
    </>
  );
}
