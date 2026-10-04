import type { Metadata } from "next";
import { FilmPlayer } from "@/components/film-player";

export const metadata: Metadata = {
  title: "Watch the Larzo film",
  description: "54 seconds: real local businesses, what to sell them, the tools running their site, and a full executive report — with Larzo."
};

export default function WatchPage() {
  return <FilmPlayer />;
}
