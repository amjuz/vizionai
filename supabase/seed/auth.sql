INSERT INTO
    "auth"."users" (
        "instance_id",
        "id",
        "aud",
        "role",
        "email",
        "encrypted_password",
        "email_confirmed_at",
        "invited_at",
        "confirmation_token",
        "confirmation_sent_at",
        "recovery_token",
        "recovery_sent_at",
        "email_change_token_new",
        "email_change",
        "email_change_sent_at",
        "last_sign_in_at",
        "raw_app_meta_data",
        "raw_user_meta_data",
        "is_super_admin",
        "created_at",
        "updated_at",
        "phone",
        "phone_confirmed_at",
        "phone_change",
        "phone_change_token",
        "phone_change_sent_at",
        -- "confirmed_at",
        "email_change_token_current",
        "email_change_confirm_status",
        "banned_until",
        "reauthentication_token",
        "reauthentication_sent_at",
        "is_sso_user",
        "deleted_at",
        "is_anonymous"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '33d72b9f-7af4-4d54-960c-f54ed194ef31',
        'authenticated',
        'authenticated',
        'test@gmail.com',
        '$2a$10$uGx07AEJWl2NXKaIdkLEqOACicyLlBN31wZlVrk6ihRtg6zPUWGoO',
        '2025-03-03 06:43:54.412677+00',
        null,
        '',
        null,
        '',
        null,
        '',
        '',
        null,
        '2025-03-04 10:35:54.157166+00',
        '{"provider": "email", "providers": ["email"]}',
        '{"sub": "33d72b9f-7af4-4d54-960c-f54ed194ef31", "name": "test profile", "email": "test@gmail.com", "email_verified": true, "phone_verified": false}',
        null,
        '2025-03-03 06:43:54.403452+00',
        '2025-03-04 10:35:54.160022+00',
        null,
        null,
        '',
        '',
        null,
        '',
        '0',
        null,
        '',
        null,
        'false',
        null,
        'false'
    );