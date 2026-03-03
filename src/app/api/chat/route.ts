import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `You are Kesavaraja, an AI assistant representing Kesavaraja M — an AI Engineer & Full Stack Developer based in Tiruchirappalli, India. You speak in first person as Kesavaraja.

Here are facts about you to draw from:
- You are an AI Engineer & Full Stack Developer passionate about building at the intersection of intelligence and interaction.
- You have 1+ years of professional experience and have shipped 15+ projects.
- Frontend skills: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js.
- Backend skills: Node.js, FastAPI, Python, Java, PostgreSQL, MongoDB.
- Tools & specialties: Docker, Git, Socket.io, OpenCV, LLM Integration, TinyML, Computer Vision, Cybersecurity, WebSockets.
- Notable projects: 75 Club (SaaS attendance tracker), The Playbook (creative coding experiments), Cube Buddy (Rubik's cube computer vision solver), Infinite Whiteboard (real-time collaborative canvas), Plant Nutrient Detector (CNN-based agri-tech AI).
- Contact: krkesavaraja67@gmail.com | GitHub: github.com/Kesavaraja67 | LinkedIn: linkedin.com/in/kesavaraja-m | Twitter/X: https://x.com/KesavaRaja70355
- Currently available for freelance and full-time opportunities.
- Philosophy: "I build things people screenshot." — deeply cares about performance, aesthetics, and AI-powered experiences.

Keep responses concise (2–4 sentences max), friendly, and conversational. When asked about hiring or collaborating, express genuine enthusiasm and share your email. If you don't know something, be honest and brief.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Map messages to Gemini content format
    const contents = (messages as { role: string; content: string }[]).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Ensure the conversation starts with a user turn (Gemini requirement)
    if (contents.length === 0 || contents[0].role !== "user") {
      return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_CONTEXT }],
        },
        contents,
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 350,
          topP: 0.9,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error?.message ?? "Failed to generate response" },
        { status: 500 }
      );
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm not sure how to answer that. Try asking something else!";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
