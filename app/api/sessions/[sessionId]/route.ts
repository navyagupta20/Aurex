import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { gdSessions, topics } from "@/lib/db/schema";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { sessionId } = await params;

    console.log("GET SESSION ID:", sessionId);

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        sessionId: gdSessions.id,
        topicId: topics.id,
        topicTitle: topics.title,
        topicDescription: topics.description,
        level: topics.level,

        duration: gdSessions.duration,
        status: gdSessions.status,

        topicRevealedAt:
          gdSessions.topicRevealedAt,

        thinkingEndsAt:
          gdSessions.thinkingEndsAt,

        gdStartsAt:
          gdSessions.gdStartsAt,

        gdEndsAt:
          gdSessions.gdEndsAt,

        createdAt:
          gdSessions.createdAt,
      })
      .from(gdSessions)
      .innerJoin(
        topics,
        eq(gdSessions.topicId, topics.id)
      )
      .where(eq(gdSessions.id, sessionId))
      .limit(1);

    console.log(
      "SESSION + TOPIC:",
      result[0]
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "GD session not found",
          sessionId,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(
      "Error fetching GD session:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch GD session",
      },
      { status: 500 }
    );
  }
}