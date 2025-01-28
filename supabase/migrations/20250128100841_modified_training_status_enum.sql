alter type "public"."training_status" rename to "training_status__old_version_to_be_dropped";

create type "public"."training_status" as enum ('starting', 'processing', 'succeeded', 'failed', 'canceled');

alter table "public"."models" alter column training_status type "public"."training_status" using training_status::text::"public"."training_status";

drop type "public"."training_status__old_version_to_be_dropped";


