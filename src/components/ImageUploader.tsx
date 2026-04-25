import { useState, useRef } from "react";
import { uploadCoverImage } from "@/lib/blog-service";

interface ImageUploaderProps {
  userId: string;
  value: string;
  onChange: (url: string) => void;
}

/**
 * Component upload ảnh bìa — hỗ trợ kéo thả, chọn file, hoặc nhập URL.
 * Upload lên Supabase Storage bucket "blog-images".
 */
export function ImageUploader({ userId, value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Chỉ chấp nhận file ảnh.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh không được vượt quá 5MB.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const url = await uploadCoverImage(file, userId);
      onChange(url);
    } catch (err: any) {
      setError("Lỗi upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-foreground">Ảnh bìa</label>

      {/* Preview */}
      {value && (
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img
            src={value}
            alt="Ảnh bìa"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-full bg-background/80 p-1.5 text-foreground backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Xóa ảnh"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Dropzone */}
      {!value && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 transition-colors ${
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/40 hover:bg-accent/5"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-muted-foreground">
            {uploading ? "Đang tải lên..." : "Kéo thả hoặc bấm để chọn ảnh"}
          </p>
          <p className="text-xs text-muted-foreground/60">PNG, JPG, WebP — tối đa 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />

      {/* Hoặc nhập URL */}
      <input
        type="text"
        className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Hoặc dán link ảnh từ internet..."
      />

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
