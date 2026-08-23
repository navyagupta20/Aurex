import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  liveChallenges,
  topics,
} from "@/lib/db/schema";
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

    console.log(
      "API CHALLENGE ID:",
      challengeId
    );

    if (
      !challengeId ||
      challengeId === "[challengeId]" ||
      challengeId === "sessionId" ||
      challengeId === "[sessionId]"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid challenge ID received.",
          challengeId,
        },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        challengeId:
          liveChallenges.id,

        topicId:
          liveChallenges.topicId,

        topicTitle:
          topics.title,

        topicDescription:
          topics.description,

        level:
          liveChallenges.level,

        maxParticipants:
          liveChallenges.maxParticipants,

        status:
          liveChallenges.status,

        scheduledAt:
          liveChallenges.scheduledAt,

        createdAt:
          liveChallenges.createdAt,
      })
      .from(liveChallenges)
      .innerJoin(
        topics,
        eq(
          liveChallenges.topicId,
          topics.id
        )
      )
      .where(
        eq(
          liveChallenges.id,
          challengeId
        )
      )
      .limit(1);

    console.log(
      "DATABASE RESULT:",
      result
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          error:
            "Challenge not found.",
          challengeId,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      result[0]
    );
  } catch (error) {
    console.error(
      "GET CHALLENGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Database error while fetching challenge.",
      },
      { status: 500 }
    );
  }
}