create table "public"."credits" (
    "id" bigint generated always as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "image_generation_count" numeric default '0'::numeric,
    "model_training_count" numeric default '0'::numeric,
    "max_image_generation_count" numeric default '0'::numeric,
    "max_model_training_count" numeric default '0'::numeric
);


alter table "public"."credits" enable row level security;

CREATE UNIQUE INDEX credits_pkey ON public.credits USING btree (id);

alter table "public"."credits" add constraint "credits_pkey" PRIMARY KEY using index "credits_pkey";

alter table "public"."credits" add constraint "credits_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."credits" validate constraint "credits_user_id_fkey";

grant delete on table "public"."credits" to "anon";

grant insert on table "public"."credits" to "anon";

grant references on table "public"."credits" to "anon";

grant select on table "public"."credits" to "anon";

grant trigger on table "public"."credits" to "anon";

grant truncate on table "public"."credits" to "anon";

grant update on table "public"."credits" to "anon";

grant delete on table "public"."credits" to "authenticated";

grant insert on table "public"."credits" to "authenticated";

grant references on table "public"."credits" to "authenticated";

grant select on table "public"."credits" to "authenticated";

grant trigger on table "public"."credits" to "authenticated";

grant truncate on table "public"."credits" to "authenticated";

grant update on table "public"."credits" to "authenticated";

grant delete on table "public"."credits" to "service_role";

grant insert on table "public"."credits" to "service_role";

grant references on table "public"."credits" to "service_role";

grant select on table "public"."credits" to "service_role";

grant trigger on table "public"."credits" to "service_role";

grant truncate on table "public"."credits" to "service_role";

grant update on table "public"."credits" to "service_role";

create policy "Enable users to view their own data only"
on "public"."credits"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



