import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";

type Props = {
  params: Promise<{
    topicId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { topicId } = await params;

    const result = await db
      .select()
      .from(topics)
      .where(eq(topics.id, topicId));

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching topic:", error);

    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}