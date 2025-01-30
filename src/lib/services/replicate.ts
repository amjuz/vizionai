import { NextRequest } from "next/server";
import Replicate from "replicate";
import crypto from "crypto";

export async function validateWebhookSignature({ request }: { request: NextRequest }) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const webhook_id = request.headers.get("webhook-id") ?? "";
  const webhook_timestamp = request.headers.get("webhook-timestamp") ?? "";
  const webhook_signature = request.headers.get("webhook-signature") ?? "";

  const signedContent = `${webhook_id}.${webhook_timestamp}.${JSON.stringify(
    request.body
  )}`;

  const secret = await replicate.webhooks.default.secret.get();

  const secretBytes = Buffer.from(secret.key.split("_")[1], "base64");
  const computedSignature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  console.log(computedSignature);

  const expectedSignatures = webhook_signature
    .split(" ")
    .map((sig) => sig.split(",")[1]);

  const isValid = expectedSignatures.some(
    (expectedSignature) => expectedSignature === computedSignature
  );

  return isValid
}
