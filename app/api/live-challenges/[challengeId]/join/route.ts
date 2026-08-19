import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  liveChallenges,
  liveChallengeParticipants,
  users,
} from "@/lib/db/schema";
import { eq, and, count } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const { challengeId } = await params;

    const body = await request.json();

    const { userId } = body;

    /* ================= VALIDATE USER ================= */

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    /* ================= CHECK CHALLENGE ================= */

    const challenge = await db
      .select()
      .from(liveChallenges)
      .where(eq(liveChallenges.id, challengeId))
      .limit(1);

    if (challenge.length === 0) {
      return NextResponse.json(
        { error: "Live challenge not found" },
        { status: 404 }
      );
    }

    const currentChallenge = challenge[0];

    /* ================= CHECK USER ================= */

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    /* ================= CHECK EXISTING PARTICIPANT ================= */

    const existingParticipant = await db
      .select()
      .from(liveChallengeParticipants)
      .where(
        and(
          eq(
            liveChallengeParticipants.challengeId,
            challengeId
          ),
          eq(
            liveChallengeParticipants.userId,
            userId
          )
        )
      )
      .limit(1);

    /*
      If the user already joined this challenge,
      don't throw an error.

      Simply allow them to continue into
      the existing session.
    */

    if (existingParticipant.length > 0) {
      return NextResponse.json(
        {
          message: "You are already in this challenge",
          participant: existingParticipant[0],
          alreadyJoined: true,
        },
        { status: 200 }
      );
    }

    /* ================= COUNT PARTICIPANTS ================= */

    const participantCount = await db
      .select({
        count: count(),
      })
      .from(liveChallengeParticipants)
      .where(
        eq(
          liveChallengeParticipants.challengeId,
          challengeId
        )
      );

    const currentCount = Number(
      participantCount[0].count
    );

    /* ================= CHECK CAPACITY ================= */

    if (
      currentCount >= currentChallenge.maxParticipants
    ) {
      return NextResponse.json(
        {
          error: "Challenge is full",
        },
        { status: 409 }
      );
    }

    /* ================= ADD PARTICIPANT ================= */

    const participant = await db
      .insert(liveChallengeParticipants)
      .values({
        challengeId,
        userId,
      })
      .returning();

    /* ================= SUCCESS ================= */

    return NextResponse.json(
      {
        message: "Successfully joined challenge",
        participant: participant[0],
        participants: currentCount + 1,
        maxParticipants:
          currentChallenge.maxParticipants,
        alreadyJoined: false,
      },
      { status: 201 }
    );

  } catch (error) {

    console.error(
      "Error joining live challenge:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to join challenge",
      },
      { status: 500 }
    );
  }
}