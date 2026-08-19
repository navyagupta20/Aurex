import { db } from "@/lib/db";
import { liveChallenges, topics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/* ================= GET LIVE CHALLENGES ================= */

export async function GET() {
  try {
    const challenges = await db
      .select({
        id: liveChallenges.id,
        topicId: liveChallenges.topicId,
        topicTitle: topics.title,
        level: liveChallenges.level,
        maxParticipants: liveChallenges.maxParticipants,
        status: liveChallenges.status,
        scheduledAt: liveChallenges.scheduledAt,
        createdAt: liveChallenges.createdAt,
      })
      .from(liveChallenges)
      .innerJoin(
        topics,
        eq(liveChallenges.topicId, topics.id)
      );

    return Response.json(challenges);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch live challenges" },
      { status: 500 }
    );
  }
}

/* ================= CREATE LIVE CHALLENGE ================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      topicId,
      level,
      maxParticipants = 8,
      scheduledAt,
    } = body;

    if (!topicId || !level) {
      return Response.json(
        {
          error: "topicId and level are required",
        },
        { status: 400 }
      );
    }

    const topic = await db
      .select()
      .from(topics)
      .where(eq(topics.id, topicId))
      .limit(1);

    if (!topic[0]) {
      return Response.json(
        {
          error: "Topic not found",
        },
        { status: 404 }
      );
    }

    const result = await db
      .insert(liveChallenges)
      .values({
        topicId,
        level,
        maxParticipants,
        status: "waiting",
        scheduledAt: scheduledAt
          ? new Date(scheduledAt)
          : null,
      })
      .returning();

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to create live challenge",
      },
      { status: 500 }
    );
  }
}