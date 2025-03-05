INSERT INTO storage.objects (
    id, 
    bucket_id, 
    name, 
    owner, 
    created_at, 
    updated_at, 
    last_accessed_at, 
    metadata
) VALUES 
    (gen_random_uuid(), 'generated_images_bucket', '33d72b9f-7af4-4d54-960c-f54ed194ef31/image_1b6189e3-22f2-46ad-8b99-01fe4ba68346.jpg', '0cfa1965-823c-4bff-82ee-37271f11f01d', NOW(), NOW(), NOW(), '{}'),
    (gen_random_uuid(), 'generated_images_bucket', '33d72b9f-7af4-4d54-960c-f54ed194ef31/image_0d1c27ca-db97-4fd2-8236-f6d8843d2242.jpg', '0cfa1965-823c-4bff-82ee-37271f11f01d', NOW(), NOW(), NOW(), '{}');