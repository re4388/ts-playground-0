CREATE TABLE IF NOT EXISTS "petV0" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userV3" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "petV0" ADD CONSTRAINT "petV0_ownerId_userV3_id_fk" FOREIGN KEY ("ownerId") REFERENCES "userV3"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
