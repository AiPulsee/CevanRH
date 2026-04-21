"use client";

import { useState } from "react";
import { getPresignedUrl } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileCheck, UploadCloud, X } from "lucide-react";

interface ResumeUploadProps {
  onUploadComplete: (url: string) => void;
}

export function ResumeUpload({ onUploadComplete }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const { uploadUrl, fileUrl } = await getPresignedUrl(file.name, file.type);

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadedUrl(fileUrl);
          onUploadComplete(fileUrl);
        }
        setUploading(false);
      };

      xhr.send(file);
    } catch (error) {
      console.error("Upload failed", error);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {!uploadedUrl ? (
        <div 
          className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/30 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-1">Arraste seu currículo ou clique para selecionar</p>
          <p className="text-xs text-muted-foreground mb-4">PDF ou DOCX (Max 5MB)</p>
          
          <input 
            type="file" 
            className="hidden" 
            id="resume-input"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          
          <Button variant="outline" asChild>
            <label htmlFor="resume-input" className="cursor-pointer">Selecionar Arquivo</label>
          </Button>

          {file && !uploading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
              <span>{file.name}</span>
              <Button size="sm" onClick={handleUpload}>Confirmar Upload</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-xl bg-green-500/5 border-green-200">
          <div className="flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-green-700">Currículo enviado com sucesso!</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setUploadedUrl(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">Enviando: {progress}%</p>
        </div>
      )}
    </div>
  );
}
