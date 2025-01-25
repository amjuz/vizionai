
insert into storage.buckets
  (id, name, file_size_limit)
values
  ('generated_images_bucket', 'generated_images_bucket', 50);

create policy "Give users access to own folder n1g4dk_0"  
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'generated_images_bucket'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder n1g4dk_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'generated_images_bucket'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



