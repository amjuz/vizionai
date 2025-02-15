ALTER TABLE "public"."credits" 
RENAME COLUMN "id" TO "old_id";

ALTER TABLE "public"."credits"
DROP CONSTRAINT IF EXISTS credits_pkey;

-- Create new UUID column as primary key with auto-generation
ALTER TABLE "public"."credits"
ADD COLUMN "id" UUID DEFAULT gen_random_uuid() NOT NULL;

ALTER TABLE "public"."credits"
ADD PRIMARY KEY ("id");

-- Finally drop the old_id column
ALTER TABLE "public"."credits"
DROP COLUMN "old_id";