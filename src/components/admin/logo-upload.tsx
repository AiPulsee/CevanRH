"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
interface LogoUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload-logo", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao fazer upload.");
      onChange(data.url);
    } catch (e: any) {
      setError(e.message ?? "Erro ao fazer upload.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {value ? (
        <div className="relative w-24 h-24 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden group">
          <Image src={value} alt="Logo" fill className="object-contain p-2" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 flex flex-col items-center justify-center gap-1.5 transition-all disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <ImagePlus className="h-5 w-5 text-slate-400" />
          )}
          <span className="text-[9px] font-black uppercase tracking-wide text-slate-400">
            {uploading ? "Enviando..." : "Logo"}
          </span>
        </button>
      )}

      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      <p className="text-[10px] text-slate-400 font-medium">PNG, JPG, WEBP ou SVG — máx. 2 MB</p>
    </div>
  );
}
