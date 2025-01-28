create type "public"."gender" as enum ('MALE', 'FEMALE');

create type "public"."training_status" as enum ('STARTING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELED');

create table "public"."models" (
    "id" bigint generated always as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "model_id" text default ''::text,
    "model_name" text default ''::text,
    "trigger_word" text default ''::text,
    "version" text default ''::text,
    "training_status" training_status,
    "training_steps" numeric default '0'::numeric,
    "training_time" text,
    "gender" gender default 'MALE'::gender,
    "training_id" text
);


alter table "public"."models" enable row level security;

CREATE UNIQUE INDEX models_pkey ON public.models USING btree (id);

alter table "public"."models" add constraint "models_pkey" PRIMARY KEY using index "models_pkey";

alter table "public"."models" add constraint "models_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."models" validate constraint "models_user_id_fkey";

grant delete on table "public"."models" to "anon";

grant insert on table "public"."models" to "anon";

grant references on table "public"."models" to "anon";

grant select on table "public"."models" to "anon";

grant trigger on table "public"."models" to "anon";

grant truncate on table "public"."models" to "anon";

grant update on table "public"."models" to "anon";

grant delete on table "public"."models" to "authenticated";

grant insert on table "public"."models" to "authenticated";

grant references on table "public"."models" to "authenticated";

grant select on table "public"."models" to "authenticated";

grant trigger on table "public"."models" to "authenticated";

grant truncate on table "public"."models" to "authenticated";

grant update on table "public"."models" to "authenticated";

grant delete on table "public"."models" to "service_role";

grant insert on table "public"."models" to "service_role";

grant references on table "public"."models" to "service_role";

grant select on table "public"."models" to "service_role";

grant trigger on table "public"."models" to "service_role";

grant truncate on table "public"."models" to "service_role";

grant update on table "public"."models" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."models"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."models"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



