import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

 passwordHash: varchar("password_hash", {
  length: 255,
}),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* ================= GD TOPICS ================= */

export const topics = pgTable("topics", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 200 }).notNull(),

  description: text("description"),

  level: varchar("level", { length: 30 }).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* ================= GD SESSIONS ================= */

export const gdSessions = pgTable("gd_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  topicId: uuid("topic_id").notNull(),

  duration: integer("duration")
    .default(15)
    .notNull(),

  status: varchar("status", { length: 30 })
    .default("waiting")
    .notNull(),

  // When the topic becomes visible to participants
  topicRevealedAt: timestamp("topic_revealed_at"),

  // When the 2-minute thinking period ends
  thinkingEndsAt: timestamp("thinking_ends_at"),

  // When the 15-minute GD starts
  gdStartsAt: timestamp("gd_starts_at"),

  // When the 15-minute GD ends
  gdEndsAt: timestamp("gd_ends_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

/* ================= LIVE CHALLENGES ================= */

export const liveChallenges = pgTable(
  "live_challenges",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    topicId: uuid("topic_id").notNull(),

    level: varchar("level", {
      length: 30,
    }).notNull(),

    maxParticipants: integer(
      "max_participants"
    )
      .default(8)
      .notNull(),

    status: varchar("status", {
      length: 30,
    })
      .default("waiting")
      .notNull(),

    scheduledAt: timestamp("scheduled_at"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);

/* ================= LIVE CHALLENGE PARTICIPANTS ================= */

export const liveChallengeParticipants =
  pgTable(
    "live_challenge_participants",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      challengeId: uuid(
        "challenge_id"
      ).notNull(),

      userId: uuid(
        "user_id"
      ).notNull(),

      joinedAt: timestamp(
        "joined_at"
      )
        .defaultNow()
        .notNull(),
    }
  );

/* ================= LIVE CHALLENGE MESSAGES ================= */

export const liveChallengeMessages =
  pgTable(
    "live_challenge_messages",
    {
      id: uuid("id")
        .defaultRandom()
        .primaryKey(),

      challengeId: uuid(
        "challenge_id"
      ).notNull(),

      userId: uuid(
        "user_id"
      ).notNull(),

      name: varchar("name", {
        length: 100,
      }).notNull(),

      message: text("message").notNull(),

      createdAt: timestamp(
        "created_at"
      )
        .defaultNow()
        .notNull(),
    }
  );
  /* ================= GD RESULTS ================= */

export const gdResults = pgTable(
  "gd_results",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    sessionId: uuid("session_id")
      .notNull(),

    userId: uuid("user_id")
      .notNull(),

    overallScore: integer(
      "overall_score"
    ).default(0).notNull(),

    communicationScore: integer(
      "communication_score"
    ).default(0).notNull(),

    contentScore: integer(
      "content_score"
    ).default(0).notNull(),

    confidenceScore: integer(
      "confidence_score"
    ).default(0).notNull(),

    relevanceScore: integer(
      "relevance_score"
    ).default(0).notNull(),

    participationScore: integer(
      "participation_score"
    ).default(0).notNull(),

    leadershipScore: integer(
      "leadership_score"
    ).default(0).notNull(),

    strengths: text(
      "strengths"
    ),

    improvements: text(
      "improvements"
    ),

    analysis: text(
      "analysis"
    ),

    createdAt: timestamp(
      "created_at"
    )
      .defaultNow()
      .notNull(),
  }
  );