import { pgTable, uuid, integer, varchar, timestamp, text, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const gdSessions = pgTable("gd_sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	topicId: uuid("topic_id").notNull(),
	duration: integer().default(15).notNull(),
	status: varchar({ length: 30 }).default('waiting').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const topics = pgTable("topics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 200 }).notNull(),
	description: text(),
	level: varchar({ length: 30 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	passwordHash: varchar("password_hash", { length: 255 }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const liveChallengeParticipants = pgTable("live_challenge_participants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	challengeId: uuid("challenge_id").notNull(),
	userId: uuid("user_id").notNull(),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow().notNull(),
});

export const liveChallenges = pgTable("live_challenges", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	topicId: uuid("topic_id").notNull(),
	level: varchar({ length: 30 }).notNull(),
	maxParticipants: integer("max_participants").default(8).notNull(),
	status: varchar({ length: 30 }).default('waiting').notNull(),
	scheduledAt: timestamp("scheduled_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const liveChallengeMessages = pgTable("live_challenge_messages", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	challengeId: uuid("challenge_id").notNull(),
	userId: uuid("user_id").notNull(),
	name: varchar({ length: 100 }).notNull(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const gdResults = pgTable("gd_results", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sessionId: uuid("session_id").notNull(),
	userId: uuid("user_id").notNull(),
	overallScore: integer("overall_score").default(0).notNull(),
	communicationScore: integer("communication_score").default(0).notNull(),
	contentScore: integer("content_score").default(0).notNull(),
	confidenceScore: integer("confidence_score").default(0).notNull(),
	relevanceScore: integer("relevance_score").default(0).notNull(),
	participationScore: integer("participation_score").default(0).notNull(),
	leadershipScore: integer("leadership_score").default(0).notNull(),
	strengths: text(),
	improvements: text(),
	analysis: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
