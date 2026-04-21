import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_ENDPOINT) {
  // We allow the build to proceed even without these, but runtime will fail if used
  console.warn("Storage credentials not fully configured in .env");
}

export const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || "https://placeholder-endpoint.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "placeholder",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "placeholder",
  },
});
