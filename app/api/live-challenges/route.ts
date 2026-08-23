import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  liveChallenges,
  topics,
} from "@/lib/db/schema";

/* ================= GET LIVE CHALLENGES ================= */

export async function GET(
  request: Request
) {
  try {
    const { searchParams } =
      new URL(request.url);

    const requestedLevel =
      searchParams.get("level");

    /* ================= FIND WAITING CHALLENGE ================= */

    if (requestedLevel) {
      const level =
        requestedLevel.toLowerCase();

      const existingChallenge =
        await db
          .select({
            id: liveChallenges.id,
            topicId:
              liveChallenges.topicId,
            topicTitle: topics.title,
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
            and(
              eq(
                liveChallenges.level,
                level
              ),
              eq(
                liveChallenges.status,
                "waiting"
              )
            )
          )
          .limit(1);

      /* ================= RETURN EXISTING ================= */

      if (existingChallenge.length > 0) {
        return NextResponse.json(
          existingChallenge
        );
      }

      /* ================= FIND TOPIC ================= */

      const availableTopics =
        await db
          .select()
          .from(topics)
          .where(
            eq(
              topics.level,
              level
            )
          );

      if (availableTopics.length === 0) {
        return NextResponse.json(
          {
            error:
              `No ${level} topic is available.`,
          },
          {
            status: 404,
          }
        );
      }

      /* ================= CREATE SESSION ================= */

      const topic =
        availableTopics[0];

      const created =
        await db
          .insert(liveChallenges)
          .values({
            topicId: topic.id,
            level,
            maxParticipants: 8,
            status: "waiting",
            scheduledAt: null,
          })
          .returning({
            id: liveChallenges.id,
            topicId:
              liveChallenges.topicId,
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
          });

      return NextResponse.json([
        {
          ...created[0],
          topicTitle: topic.title,
        },
      ]);
    }

    /* ================= RETURN ALL ================= */

    const challenges =
      await db
        .select({
          id: liveChallenges.id,
          topicId:
            liveChallenges.topicId,
          topicTitle: topics.title,
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
        );

    return NextResponse.json(
      challenges
    );
  } catch (error) {
    console.error(
      "GET LIVE CHALLENGES ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch live challenges",
      },
      {
        status: 500,
      }
    );
  }
}

/* ================= CREATE LIVE CHALLENGE ================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      topicId,
      level,
      maxParticipants = 8,
      scheduledAt,
    } = body;

    if (!topicId || !level) {
      return NextResponse.json(
        {
          error:
            "topicId and level are required",
        },
        {
          status: 400,
        }
      );
    }

    const topic =
      await db
        .select()
        .from(topics)
        .where(
          eq(
            topics.id,
            topicId
          )
        )
        .limit(1);

    if (!topic[0]) {
      return NextResponse.json(
        {
          error:
            "Topic not found",
        },
        {
          status: 404,
        }
      );
    }

    const result =
      await db
        .insert(liveChallenges)
        .values({
          topicId,
          level:
            level.toLowerCase(),
          maxParticipants,
          status: "waiting",
          scheduledAt:
            scheduledAt
              ? new Date(
                  scheduledAt
                )
              : null,
        })
        .returning();

    return NextResponse.json(
      result[0],
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE LIVE CHALLENGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create live challenge",
      },
      {
        status: 500,
      }
    );
  }
}