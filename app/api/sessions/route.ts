import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { gdSessions } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { topicId } = body;

    if (!topicId) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(gdSessions)
      .values({
        topicId,
        duration: 15,
        status: "waiting",
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);

    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}