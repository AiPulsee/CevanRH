"use server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

export async function getPresignedUrl(fileName: string, fileType: string) {
  const session = await auth();
  
  if (!session) throw new Error("Não autorizado");

  const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowedTypes.includes(fileType)) {
    throw new Error("Tipo de arquivo não permitido.");
  }

  const fileKey = `resumes/${uuidv4()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
    ContentType: fileType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return {
    uploadUrl: signedUrl,
    fileUrl: `${process.env.R2_PUBLIC_DOMAIN}/${fileKey}`, 
  };
}
