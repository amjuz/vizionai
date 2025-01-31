import { NextRequest } from "next/server";
import Replicate from "replicate";
import crypto from "crypto";

export async function validateWebhookSignature({
  request,
  body
}: {
  request: NextRequest;
  body:unknown
}) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  // const body = await request.json();
  console.log("validating webhook signature...");

  const webhook_id = request.headers.get("webhook-id") ?? "";
  const webhook_timestamp = request.headers.get("webhook-timestamp") ?? "";
  const webhook_signature = request.headers.get("webhook-signature") ?? "";

  console.log("received webhook_id : ", webhook_id);
  console.log("received webhook_timestamp : ", webhook_timestamp);
  console.log("received webhook_signature : ", webhook_signature);

  const signedContent = `${webhook_id}.${webhook_timestamp}.${JSON.stringify(body)}`;

  console.log("signed content : ", signedContent);

  const secret = await replicate.webhooks.default.secret.get();

  if (!secret.key || !secret) console.log("Failed to get webhook secret");

  console.log("replicate webhook secret received : ", secret.key);

  console.log("converting secret into byte using crypto modules...");

  const secretBytes = Buffer.from(secret.key.split("_")[1], "base64");
  const computedSignature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  console.log("conversion complete!");

  console.log("Computed signature received :", computedSignature);

  const expectedSignatures = webhook_signature
    .split(" ")
    .map((sig) => sig.split(",")[1]);

  console.log("Comparing signatures...");
  const isValid = expectedSignatures.some(
    (expectedSignature) => expectedSignature === computedSignature
  );

  console.log("Comparison completed! res:", isValid);

  isValid
    ? console.log("Signature validated successfully")
    : console.log("Signature validation failed!");

  return isValid;
}
