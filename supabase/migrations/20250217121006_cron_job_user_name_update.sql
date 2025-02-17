
create extension if not exists pg_cron;

SELECT cron.schedule(
    'sync_user_names',     -- job name
    '0 0 * * *',       -- schedule (every 30 minutes)
    $SQL$
    BEGIN;
    UPDATE auth.users
    SET
      raw_user_meta_data = CASE
        WHEN raw_user_meta_data IS NULL THEN JSONB_BUILD_OBJECT('full_name', u.full_name)
        ELSE raw_user_meta_data || JSONB_BUILD_OBJECT('full_name', u.full_name)
      END
    FROM
      public.users u
    WHERE
      auth.users.id = u.id
      AND u.full_name IS NOT NULL
      AND (
        raw_user_meta_data->>'full_name' IS NULL 
        OR raw_user_meta_data->>'full_name' <> u.full_name
      );
    COMMIT;
    $SQL$
);

