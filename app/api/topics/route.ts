import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");

    if (level) {
      const result = await db
        .select()
        .from(topics)
        .where(eq(topics.level, level));

      return NextResponse.json(result);
    }

    const result = await db.select().from(topics);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching topics:", error);

    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description, level } = body;

    if (!title || !level) {
      return NextResponse.json(
        { error: "Title and level are required" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(topics)
      .values({
        title,
        description: description || null,
        level,
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);

    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}