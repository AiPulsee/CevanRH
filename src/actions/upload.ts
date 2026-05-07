"use server";

import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function getPresignedUrl(fileName: string, fileType: string, fileSize: number) {
  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new Error("Tipo de arquivo não permitido. Use PDF ou DOC.");
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    throw new Error("Arquivo muito grande. Tamanho máximo: 10 MB.");
  }

  // Sanitize filename: keep only safe characters
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  const fileKey = `resumes/${uuidv4()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return {
    uploadUrl: signedUrl,
    fileUrl: `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`,
  };
}
