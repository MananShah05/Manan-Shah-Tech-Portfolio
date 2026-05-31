import { ImageResponse } from "next/og";
import { resumeData } from "@/lib/resume-data";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#F5F2EC",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1A3C34",
            color: "#F5F2EC",
            padding: "12px 24px",
            borderRadius: "999px",
            fontSize: 24,
            fontWeight: 600,
            marginBottom: "40px",
          }}
        >
          {resumeData.personal.status}
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#1A1A18",
            marginBottom: "20px",
            lineHeight: 1.1,
          }}
        >
          {resumeData.personal.name}
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#6B6860",
            marginBottom: "60px",
            maxWidth: "800px",
          }}
        >
          Building at the edge of NLP × Finance × AI
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", color: "#1A3C34", fontSize: 32, fontWeight: 600 }}>
            {resumeData.personal.title}
          </div>
          <div style={{ display: "flex", color: "#C8B8A2", fontSize: 32 }}>·</div>
          <div style={{ display: "flex", color: "#6B6860", fontSize: 32 }}>
            {resumeData.personal.college}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
