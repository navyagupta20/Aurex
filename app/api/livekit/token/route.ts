import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function POST() {
  try {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "LiveKit API key or secret is missing." },
        { status: 500 }
      );
    }

    const roomName = "aurex-test-room";
    const participantName = "Test Student";

    const token = new AccessToken(
      apiKey,
      apiSecret,
      {
        identity: participantName,
        name: participantName,
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();

    return NextResponse.json({
      token: jwt,
    });

  } catch (error) {
    console.error("LIVEKIT TOKEN ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create LiveKit token." },
      { status: 500 }
    );
  }
}