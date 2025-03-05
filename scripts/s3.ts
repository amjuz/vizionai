import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const imageFolder = path.join(__dirname, "./images");

function seedImage({
  bucketFilePath,
  imageBuffer,
  type,
}: {
  bucketFilePath: string;
  imageBuffer: Buffer;
  type: string;
}) {
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
    .storage.from("generated_images_bucket")
    .upload(bucketFilePath, imageBuffer, {
      contentType: `image/${type}`,
      cacheControl: "3600",
      upsert: false,
    })
    .then((res) => {
      if (res.error) {
        //@TODO handle upload failure condition here
        console.log("error occurred while uploading");
        console.log(res.error.message);
      }
      console.log("upload complete", res.data);
    });
}

async function processImages() {
  try {
    const user_id = "33d72b9f-7af4-4d54-960c-f54ed194ef31";
    // reading images from folder
    const files = fs.readdirSync(imageFolder);

    const images = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
    // // looping through files
    for (const image of images) {
      const filePath = path.join(imageFolder, image);

      const imageBuffer = fs.readFileSync(filePath);
      const type = path.extname(image);
      const bucketFilePath = `${user_id}/${image}`;

      console.log({ filePath: filePath, imageBuffer: imageBuffer });
      await seedImage({ bucketFilePath, imageBuffer, type });
      console.log(`${filePath} upload to s3 completed`);
    }
    console.log("Upload complete!!!");
  } catch (error) {
    console.error("Error processing images:", error);
  }
}

processImages();
