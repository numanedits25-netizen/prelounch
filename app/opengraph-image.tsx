import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Larzo — Every local business has a gap. Larzo finds it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-mark.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;
  const pins = [
    [880, 150], [985, 240], [1060, 130], [930, 360], [1090, 330], [1010, 460], [860, 480]
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden",
          background: "#050507", color: "white", fontFamily: "sans-serif"
        }}
      >
        <div style={{ position: "absolute", left: -180, top: -260, width: 760, height: 620, borderRadius: 9999, background: "radial-gradient(circle, rgba(124,58,237,.45), rgba(124,58,237,0) 70%)" }} />
        <div style={{ position: "absolute", right: -160, bottom: -260, width: 760, height: 640, borderRadius: 9999, background: "radial-gradient(circle, rgba(6,182,212,.35), rgba(6,182,212,0) 70%)" }} />
        {pins.map(([x, y], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: 18, height: 18, borderRadius: 9999, background: i % 2 ? "#a78bfa" : "#22d3ee", boxShadow: `0 0 30px ${i % 2 ? "#7c3aed" : "#06b6d4"}`, display: "flex" }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} width={64} height={64} alt="" />
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: 8 }}>LARZO</div>
            <div style={{ marginLeft: 18, display: "flex", fontSize: 18, letterSpacing: 4, padding: "8px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.18)", color: "#a5f3fc" }}>PRIVATE BETA</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>Every local business</div>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>has a gap.</div>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, backgroundImage: "linear-gradient(90deg,#22d3ee,#818cf8,#a855f7)", backgroundClip: "text", color: "transparent" }}>
              Larzo finds it.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#94a3b8" }}>Discover · audit · score · pitch, with evidence. Join the waitlist.</div>
        </div>
      </div>
    ),
    size
  );
}
