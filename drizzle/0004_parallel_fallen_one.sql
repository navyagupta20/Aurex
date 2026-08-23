CREATE TABLE "live_challenges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic_id" uuid NOT NULL,
	"level" varchar(30) NOT NULL,
	"max_participants" integer DEFAULT 8 NOT NULL,
	"status" varchar(30) DEFAULT 'waiting' NOT NULL,
	"scheduled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
