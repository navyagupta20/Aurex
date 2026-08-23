CREATE TABLE "gd_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"overall_score" integer DEFAULT 0 NOT NULL,
	"communication_score" integer DEFAULT 0 NOT NULL,
	"content_score" integer DEFAULT 0 NOT NULL,
	"confidence_score" integer DEFAULT 0 NOT NULL,
	"relevance_score" integer DEFAULT 0 NOT NULL,
	"participation_score" integer DEFAULT 0 NOT NULL,
	"leadership_score" integer DEFAULT 0 NOT NULL,
	"strengths" text,
	"improvements" text,
	"analysis" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "live_challenges" CASCADE;--> statement-breakpoint
ALTER TABLE "gd_sessions" ADD COLUMN "topic_revealed_at" timestamp;--> statement-breakpoint
ALTER TABLE "gd_sessions" ADD COLUMN "thinking_ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "gd_sessions" ADD COLUMN "gd_starts_at" timestamp;--> statement-breakpoint
ALTER TABLE "gd_sessions" ADD COLUMN "gd_ends_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" varchar(255);