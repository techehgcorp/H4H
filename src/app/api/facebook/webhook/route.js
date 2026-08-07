import { NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

// Verificação do webhook (Meta chama quando você clica em "Verify and Save")
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json(
    { error: "Verification failed" },
    { status: 403 }
  );
}

// Recebe os webhooks enviados pelo Facebook
export async function POST(request) {
  try {
    const body = await request.json();

    console.log("==================================");
    console.log("NEW WEBHOOK RECEIVED");
    console.log(JSON.stringify(body, null, 2));
    console.log("==================================");

    // Aqui depois vamos buscar os dados completos do lead
    // usando a Graph API.

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}