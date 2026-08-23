import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gdSessions } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { topicId } = body;

    console.log("CREATE SESSION - topicId:", topicId);

    if (!topicId) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    // ================= TIMING =================

    // Topic is revealed immediately when session is created
    const topicRevealedAt = new Date();

    // 2 minutes thinking time
    const thinkingEndsAt = new Date(
      topicRevealedAt.getTime() + 2 * 60 * 1000
    );

    // GD starts after thinking time
    const gdStartsAt = new Date(
      thinkingEndsAt.getTime()
    );

    // GD lasts 15 minutes
    const gdEndsAt = new Date(
      gdStartsAt.getTime() + 15 * 60 * 1000
    );

    // ================= CREATE SESSION =================

    const result = await db
      .insert(gdSessions)
      .values({
        topicId: topicId,

        duration: 15,

        status: "thinking",

        topicRevealedAt,

        thinkingEndsAt,

        gdStartsAt,

        gdEndsAt,
      })
      .returning();

    console.log("CREATED SESSION:", result[0]);

    return NextResponse.json(result[0], {
      status: 201,
    });
  } catch (error) {
    console.error(
      "Error creating session:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create session",
      },
      {
        status: 500,
      }
    );
  }
}