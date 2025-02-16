set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."decrease user credit"()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    -- Decrease the image_generation_count by 1 for the user_id in credits table
    UPDATE public.credits
    SET image_generation_count = image_generation_count - 1
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;$function$
;

CREATE TRIGGER descrease_credit AFTER INSERT ON public.generated_images FOR EACH ROW EXECUTE FUNCTION "decrease user credit"();


