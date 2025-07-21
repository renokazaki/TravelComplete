import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  "https://renwithone.app.n8n.cloud/webhook/f3f298fe-185e-44b3-9a0e-09bb7a5347c0";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await n8nRes.json();
    return NextResponse.json(data, { status: n8nRes.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to forward request to n8n",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
