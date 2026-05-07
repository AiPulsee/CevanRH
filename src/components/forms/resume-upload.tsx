"use client";

import { useState } from "react";
import { getPresignedUrl } from "@/actions/upload";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileCheck, UploadCloud, X, Loader2, AlertCircle } from "lucide-react";

interface ResumeUploadProps {
  onUploadComplete: (url: string) => void;
  variant?: "light" | "dark";
}

export function ResumeUpload({ onUploadComplete, variant = "light" }: ResumeUploadProps) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === "dark";

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setFileName(file.name);
    setError(null);

    try {
      setUploading(true);
      setProgress(0);

      const { uploadUrl, fileUrl } = await getPresignedUrl(file.name, file.type, file.size);

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve();
          } else {
            reject(new Error(`Upload falhou: status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Erro de rede ao enviar arquivo."));
        xhr.send(file);
      });

      setUploadedUrl(fileUrl);
      onUploadComplete(fileUrl);
    } catch (err: any) {
      setError(err.message || "Erro ao enviar o arquivo. Tente novamente.");
      setFileName(null);
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setUploadedUrl(null);
    setFileName(null);
    setError(null);
    setProgress(0);
  };

  if (uploadedUrl) {
    return (
      <div className={`flex items-center justify-between p-4 border rounded-xl animate-in fade-in slide-in-from-top-2 duration-500 ${
        isDark
          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          : "bg-emerald-50 border-emerald-100 text-emerald-700"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isDark ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
            <FileCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider">Upload Concluído!</p>
            <p className={`text-[10px] font-medium truncate max-w-[160px] ${isDark ? "text-emerald-500/70" : "text-emerald-600/70"}`}>{fileName}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className={isDark ? "hover:bg-emerald-500/10" : ""}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full">
      <label
        htmlFor="resume-input"
        className={`border-2 border-dashed rounded-[1.5rem] p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
          uploading ? "pointer-events-none opacity-70" : ""
        } ${
          isDark
            ? "border-white/10 bg-white/5 hover:bg-white/10"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileChange(e.dataTransfer.files[0] ?? null);
        }}
      >
        <input
          type="file"
          className="hidden"
          id="resume-input"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          disabled={uploading}
        />

        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${
          isDark ? "bg-white/10 text-blue-400" : "bg-blue-50 text-blue-600"
        }`}>
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <UploadCloud className="h-6 w-6" />}
        </div>

        <p className={`text-[13px] font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
          {uploading ? `Enviando... ${progress}%` : "Enviar Currículo"}
        </p>
        <p className={`text-[10px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          {uploading ? "" : "Clique ou arraste o arquivo — PDF ou DOCX (Max 10MB)"}
        </p>

        {uploading && (
          <div className="w-full mt-4 px-2">
            <Progress value={progress} className={`h-1.5 ${isDark ? "bg-white/10" : "bg-slate-100"}`} />
          </div>
        )}
      </label>

      {error && (
        <div className={`flex items-center gap-2 text-[11px] font-bold px-3 py-2 rounded-xl ${
          isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600"
        }`}>
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
