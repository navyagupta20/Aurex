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