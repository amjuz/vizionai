drop policy "Can update own user data." on "public"."users";

create policy "Can update own user data."
on "public"."users"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = id));



