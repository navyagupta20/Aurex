import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gdResults } from "@/lib/db/schema";

export async function GET() {
  try {
    // Get currently logged-in user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    // Real logged-in user's ID
    const userId = session.user.id;

    // Get only this user's GD results
    const results = await db
      .select()
      .from(gdResults)
      .where(eq(gdResults.userId, userId));

    const sessionsCompleted = results.length;

    let averageScore = 0;
    let communication = 0;
    let confidence = 0;
    let participation = 0;
    let leadership = 0;

    if (results.length > 0) {
      averageScore = Math.round(
        results.reduce(
          (sum, result) =>
            sum + result.overallScore,
          0
        ) / results.length
      );

      communication = Math.round(
        results.reduce(
          (sum, result) =>
            sum + result.communicationScore,
          0
        ) / results.length
      );

      confidence = Math.round(
        results.reduce(
          (sum, result) =>
            sum + result.confidenceScore,
          0
        ) / results.length
      );

      participation = Math.round(
        results.reduce(
          (sum, result) =>
            sum + result.participationScore,
          0
        ) / results.length
      );

      leadership = Math.round(
        results.reduce(
          (sum, result) =>
            sum + result.leadershipScore,
          0
        ) / results.length
      );
    }

    return NextResponse.json({
      sessionsCompleted,
      averageScore,
      communication,
      confidence,
      participation,
      leadership,
    });
  } catch (error) {
    console.error(
      "DASHBOARD STATS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch dashboard stats",
      },
      {
        status: 500,
      }
    );
  }
}