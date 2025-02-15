alter table "public"."credits" alter column "id" set default gen_random_uuid();

alter table "public"."credits" alter column "id" drop identity;

alter table "public"."credits" alter column "id" set data type uuid using "id"::uuid;


