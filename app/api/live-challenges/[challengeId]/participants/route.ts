import { db } from "@/lib/db";
import {
  liveChallengeParticipants,
  users,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ challengeId: string }> }
) {
  try {
    const { challengeId } = await params;

    const participants = await db
      .select({
        id: liveChallengeParticipants.id,
        userId: users.id,
        name: users.name,
        joinedAt: liveChallengeParticipants.joinedAt,
      })
      .from(liveChallengeParticipants)
      .innerJoin(
        users,
        eq(liveChallengeParticipants.userId, users.id)
      )
      .where(
        eq(
          liveChallengeParticipants.challengeId,
          challengeId
        )
      );

    return Response.json(participants);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Failed to fetch participants",
      },
      { status: 500 }
    );
  }
}