import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gdResults } from "@/lib/db/schema";

type Props = {
  params: Promise<{
    sessionId: string;
  }>;
};

/* ================= SAVE RESULT ================= */

export async function POST(
  request: Request,
  { params }: Props
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Session ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Get currently logged-in user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    // IMPORTANT:
    // We get the user ID from authentication.
    // We do NOT trust a userId sent by the browser.
    const userId = session.user.id;

    const body = await request.json();

    const {
      communicationScore = 0,
      contentScore = 0,
      confidenceScore = 0,
      relevanceScore = 0,
      participationScore = 0,
      leadershipScore = 0,
      strengths = "",
      improvements = "",
      analysis = "",
    } = body;

    const scores = [
      communicationScore,
      contentScore,
      confidenceScore,
      relevanceScore,
      participationScore,
      leadershipScore,
    ];

    const invalidScore = scores.some(
      (score) =>
        typeof score !== "number" ||
        score < 0 ||
        score > 100
    );

    if (invalidScore) {
      return NextResponse.json(
        {
          error:
            "Scores must be numbers between 0 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    const overallScore = Math.round(
      (
        communicationScore +
        contentScore +
        confidenceScore +
        relevanceScore +
        participationScore +
        leadershipScore
      ) / 6
    );

    const result = await db
      .insert(gdResults)
      .values({
        sessionId,
        userId,

        overallScore,

        communicationScore,
        contentScore,
        confidenceScore,
        relevanceScore,
        participationScore,
        leadershipScore,

        strengths,
        improvements,
        analysis,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        result: result[0],
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "GD RESULT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to save GD result.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ================= GET RESULT ================= */

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Session ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Get currently logged-in user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const userId = session.user.id;

    // Get result belonging to BOTH:
    // 1. this session
    // 2. this logged-in user
    const result = await db
      .select()
      .from(gdResults)
      .where(
        and(
          eq(
            gdResults.sessionId,
            sessionId
          ),
          eq(
            gdResults.userId,
            userId
          )
        )
      )
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: "GD result not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      result[0]
    );
  } catch (error) {
    console.error(
      "GET GD RESULT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch GD result.",
      },
      {
        status: 500,
      }
    );
  }
}