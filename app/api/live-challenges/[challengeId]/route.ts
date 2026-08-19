import { db } from "@/lib/db";
import { liveChallenges, topics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      challengeId: string;
    }>;
  }
) {
  try {
    const { challengeId } = await params;

    const result = await db
      .select({
        challengeId: liveChallenges.id,
        topicId: liveChallenges.topicId,
        topicTitle: topics.title,
        topicDescription: topics.description,
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
      )
      .where(eq(liveChallenges.id, challengeId))
      .limit(1);

    const challenge = result[0];

    if (!challenge) {
      return Response.json(
        {
          error: "Challenge not found",
        },
        { status: 404 }
      );
    }

    return Response.json(challenge);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch challenge",
      },
      { status: 500 }
    );
  }
}