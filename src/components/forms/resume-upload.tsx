"use client";

import { useState } from "react";
import { getPresignedUrl } from "@/actions/upload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileCheck, UploadCloud, X } from "lucide-react";

interface ResumeUploadProps {
  onUploadComplete: (url: string) => void;
  variant?: "light" | "dark";
}

export function ResumeUpload({ onUploadComplete, variant = "light" }: ResumeUploadProps) {
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

  const isDark = variant === "dark";

  return (
    <div className="space-y-4 w-full">
      {!uploadedUrl ? (
        <div 
          className={`border-2 border-dashed rounded-[1.5rem] p-6 flex flex-col items-center justify-center transition-all duration-300 ${
            isDark 
              ? "border-white/10 bg-white/5 hover:bg-white/10" 
              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFile(e.dataTransfer.files[0]);
          }}
        >
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${
            isDark ? "bg-white/10 text-blue-400" : "bg-blue-50 text-blue-600"
          }`}>
            <UploadCloud className="h-6 w-6" />
          </div>
          
          <p className={`text-[13px] font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
            {file ? "Arquivo selecionado!" : "Enviar Currículo"}
          </p>
          <p className={`text-[10px] mb-4 font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            PDF ou DOCX (Max 5MB)
          </p>
          
          <input 
            type="file" 
            className="hidden" 
            id="resume-input"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          
          {!file ? (
            <Button 
              variant={isDark ? "secondary" : "outline"}
              className={`rounded-xl h-10 px-6 font-bold text-[11px] uppercase tracking-wider ${
                isDark ? "bg-white/10 hover:bg-white/20 text-white border-none" : "border-slate-200"
              }`}
              nativeButton={false}
              render={<label htmlFor="resume-input" className="cursor-pointer" />}
            >
              Selecionar Arquivo
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full">
              <span className={`text-[11px] font-black truncate max-w-full px-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                {file.name}
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleUpload}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase h-8"
                >
                  Confirmar
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setFile(null)}
                  className={`rounded-lg font-bold text-[10px] uppercase h-8 ${isDark ? "text-white/40 hover:text-white" : "text-slate-400"}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`flex items-center justify-between p-4 border rounded-xl animate-in fade-in slide-in-from-top-2 duration-500 ${
          isDark 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-emerald-50 border-emerald-100 text-emerald-700"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isDark ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
              <FileCheck className="h-4 w-4" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider">Upload Concluído!</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => {
            setUploadedUrl(null);
            setFile(null);
          }} className={isDark ? "hover:bg-emerald-500/10" : ""}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {uploading && (
        <div className="space-y-2 px-2">
          <Progress value={progress} className={`h-1.5 ${isDark ? "bg-white/10" : "bg-slate-100"}`} />
          <p className={`text-[10px] text-center font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            {progress}% concluído
          </p>
        </div>
      )}
    </div>
  );
}
