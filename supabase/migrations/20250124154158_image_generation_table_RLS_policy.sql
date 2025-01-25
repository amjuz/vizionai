create table "public"."generated_images" (
    "id" bigint generated always as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid default auth.uid(),
    "model" text default ''::text,
    "image_name" text,
    "prompt" text,
    "guidance" numeric,
    "num_inference_steps" numeric,
    "output_format" text,
    "width" numeric,
    "height" numeric,
    "aspect_ratio" text
);


alter table "public"."generated_images" enable row level security;

CREATE UNIQUE INDEX generated_images_pkey ON public.generated_images USING btree (id);

alter table "public"."generated_images" add constraint "generated_images_pkey" PRIMARY KEY using index "generated_images_pkey";

alter table "public"."generated_images" add constraint "generated_images_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."generated_images" validate constraint "generated_images_user_id_fkey";

grant delete on table "public"."generated_images" to "anon";

grant insert on table "public"."generated_images" to "anon";

grant references on table "public"."generated_images" to "anon";

grant select on table "public"."generated_images" to "anon";

grant trigger on table "public"."generated_images" to "anon";

grant truncate on table "public"."generated_images" to "anon";

grant update on table "public"."generated_images" to "anon";

grant delete on table "public"."generated_images" to "authenticated";

grant insert on table "public"."generated_images" to "authenticated";

grant references on table "public"."generated_images" to "authenticated";

grant select on table "public"."generated_images" to "authenticated";

grant trigger on table "public"."generated_images" to "authenticated";

grant truncate on table "public"."generated_images" to "authenticated";

grant update on table "public"."generated_images" to "authenticated";

grant delete on table "public"."generated_images" to "service_role";

grant insert on table "public"."generated_images" to "service_role";

grant references on table "public"."generated_images" to "service_role";

grant select on table "public"."generated_images" to "service_role";

grant trigger on table "public"."generated_images" to "service_role";

grant truncate on table "public"."generated_images" to "service_role";

grant update on table "public"."generated_images" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."generated_images"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."generated_images"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."generated_images"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



