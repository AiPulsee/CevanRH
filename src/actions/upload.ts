"use server";

import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { auth } from "@/lib/auth";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export async function getPresignedUrl(fileName: string, fileType: string, fileSize: number) {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  // 20 uploads por IP por hora
  if (!checkRateLimit(`upload:${ip}`, 20, 60 * 60 * 1000)) {
    throw new Error("Limite de uploads atingido. Tente novamente em 1 hora.");
  }

  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new Error("Tipo de arquivo não permitido. Use PDF ou DOC.");
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    throw new Error("Arquivo muito grande. Tamanho máximo: 10 MB.");
  }

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

export async function getInvoicePresignedUrl(fileName: string, fileType: string, fileSize: number) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado.");
  }

  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new Error("Tipo de arquivo não permitido. Use PDF.");
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    throw new Error("Arquivo muito grande. Tamanho máximo: 10 MB.");
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  const fileKey = `invoices/${uuidv4()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 120 });

  return {
    uploadUrl: signedUrl,
    fileUrl: `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`,
  };
}

export async function getLogoPresignedUrl(fileName: string, fileType: string, fileSize: number) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado.");
  }

  if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
    throw new Error("Tipo de arquivo não permitido. Use PNG, JPG ou WEBP.");
  }

  if (fileSize > MAX_LOGO_SIZE_BYTES) {
    throw new Error("Imagem muito grande. Tamanho máximo: 2 MB.");
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  const fileKey = `logos/${uuidv4()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
    ContentLength: fileSize,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 120 });

  return {
    uploadUrl: signedUrl,
    fileUrl: `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`,
  };
}
