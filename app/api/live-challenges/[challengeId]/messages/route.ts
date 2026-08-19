import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import {
  liveChallenges,
  liveChallengeMessages,
} from "@/lib/db/schema";

import {
  eq,
  asc,
} from "drizzle-orm";

/* ================= GET MESSAGES ================= */

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

    if (!challengeId) {
      return NextResponse.json(
        {
          error: "Challenge ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const messages =
      await db
        .select()
        .from(liveChallengeMessages)
        .where(
          eq(
            liveChallengeMessages.challengeId,
            challengeId
          )
        )
        .orderBy(
          asc(
            liveChallengeMessages.createdAt
          )
        );

    return NextResponse.json(messages);
  } catch (error) {
    console.error(
      "GET CHAT MESSAGES ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load messages",
      },
      {
        status: 500,
      }
    );
  }
}

/* ================= SEND MESSAGE ================= */

export async function POST(
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

    if (!challengeId) {
      return NextResponse.json(
        {
          error: "Challenge ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const userId = body.userId;
    const name = body.name;
    const message = body.message;

    if (!userId) {
      return NextResponse.json(
        {
          error: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        {
          error: "Message cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    /* ================= CHECK CHALLENGE ================= */

    const challenge =
      await db
        .select()
        .from(liveChallenges)
        .where(
          eq(
            liveChallenges.id,
            challengeId
          )
        )
        .limit(1);

    if (challenge.length === 0) {
      return NextResponse.json(
        {
          error: "Challenge not found",
        },
        {
          status: 404,
        }
      );
    }

    /* ================= CREATE MESSAGE ================= */

    const newMessage =
      await db
        .insert(liveChallengeMessages)
        .values({
          challengeId,
          userId,
          name:
            name?.trim() ||
            "Participant",
          message: message.trim(),
        })
        .returning();

    return NextResponse.json(
      newMessage[0],
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST CHAT MESSAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to send message",
      },
      {
        status: 500,
      }
    );
  }
}