import { useState, useCallback } from "react";
import { SlugInput } from "./SlugInput";
import { ImageUploader } from "./ImageUploader";
import { categories } from "@/lib/mock-data";
import { estimateReadingTime } from "@/lib/slug-utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image_url: string;
}

interface BlogEditorProps {
  userId: string;
  initial?: Partial<BlogFormData>;
  loading?: boolean;
  onSaveDraft: (data: BlogFormData) => void;
  onPublish: (data: BlogFormData) => void;
  onCancel: () => void;
}

/**
 * Form viết / chỉnh sửa bài blog.
 * Có 2 tab: Viết (Markdown textarea) và Xem trước (render Markdown).
 */
export function BlogEditor({
  userId,
  initial,
  loading,
  onSaveDraft,
  onPublish,
  onCancel,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Khác");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_image_url ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");

  const formData: BlogFormData = {
    title,
    slug,
    excerpt,
    content,
    category,
    cover_image_url: coverUrl,
  };

  const isValid = title.trim().length > 0 && slug.trim().length > 0 && content.trim().length > 0;

  const handleSlugChange = useCallback((s: string) => setSlug(s), []);

  // Danh mục (bỏ "Tất cả")
  const categoryOptions = categories.filter((c) => c !== "Tất cả");

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
      {/* Tiêu đề */}
      <div className="flex flex-col gap-2">
        <label htmlFor="blog-title" className="text-sm font-medium text-foreground">
          Tiêu đề
        </label>
        <input
          id="blog-title"
          type="text"
          required
          className="rounded-lg border border-border bg-background px-4 py-3 text-lg font-semibold outline-none transition-colors focus:border-accent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề bài viết..."
          maxLength={200}
        />
      </div>

      {/* Slug */}
      <SlugInput title={title} value={slug} onChange={handleSlugChange} />

      {/* Danh mục & Thời gian đọc */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="blog-category" className="text-sm font-medium text-foreground">
            Danh mục
          </label>
          <select
            id="blog-category"
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Thời gian đọc</label>
          <div className="rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm text-muted-foreground">
            {content.trim() ? estimateReadingTime(content) : "—"}
          </div>
        </div>
      </div>

      {/* Ảnh bìa */}
      <ImageUploader userId={userId} value={coverUrl} onChange={setCoverUrl} />

      {/* Mô tả ngắn */}
      <div className="flex flex-col gap-2">
        <label htmlFor="blog-excerpt" className="text-sm font-medium text-foreground">
          Mô tả ngắn
        </label>
        <textarea
          id="blog-excerpt"
          rows={2}
          className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent leading-relaxed"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Tóm tắt 1-2 câu về bài viết..."
          maxLength={300}
        />
      </div>

      {/* Nội dung — Tabs: Viết / Xem trước */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Nội dung (Markdown)</label>
          <div className="flex rounded-lg border border-border overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                tab === "write"
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              ✏️ Viết
            </button>
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`px-3 py-1.5 font-medium transition-colors ${
                tab === "preview"
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              👁️ Xem trước
            </button>
          </div>
        </div>

        {tab === "write" ? (
          <textarea
            className="min-h-[400px] resize-y rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm outline-none transition-colors focus:border-accent leading-relaxed"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Viết bài bằng Markdown...\n\n## Tiêu đề phần\n\nĐoạn văn bình thường.\n\n> Trích dẫn nổi bật\n\n**In đậm**, *in nghiêng*`}
          />
        ) : (
          <div className="min-h-[400px] rounded-lg border border-border bg-background px-6 py-4 prose prose-invert prose-sm max-w-none">
            {content.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">Chưa có nội dung để xem trước...</p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-border/50 disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={() => onSaveDraft(formData)}
          disabled={loading || !isValid}
          className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "💾 Lưu nháp"}
        </button>
        <button
          type="button"
          onClick={() => onPublish(formData)}
          disabled={loading || !isValid}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "🚀 Xuất bản"}
        </button>
      </div>
    </div>
  );
}
