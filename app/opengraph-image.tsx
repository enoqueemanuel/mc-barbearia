import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A09",
          color: "#F5F3EE",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#B08D57",
          }}
        >
          {siteConfig.address.city} · {siteConfig.address.state}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>
          MC Barbearia
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 20, color: "#A8A29A" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
