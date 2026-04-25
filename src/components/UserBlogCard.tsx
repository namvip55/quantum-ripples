import { Link } from "@tanstack/react-router";
import { StatusBadge } from "./StatusBadge";
import type { UserBlog } from "@/lib/blog-service";

interface UserBlogCardProps {
  blog: UserBlog;
  onDelete?: (id: string) => void;
  onToggleStatus?: (id: string, status: "draft" | "published") => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Card hiển thị bài viết trong trang quản lý /my-blog */
export function UserBlogCard({ blog, onDelete, onToggleStatus }: UserBlogCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-start md:gap-6">
      {/* Cover image */}
      {blog.cover_image_url && (
        <img
          src={blog.cover_image_url}
          alt=""
          className="h-32 w-full shrink-0 rounded-xl object-cover md:h-24 md:w-36"
        />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={blog.status} />
          <span className="text-xs text-muted-foreground">{formatDate(blog.updated_at)}</span>
          {blog.category && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {blog.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug text-foreground line-clamp-1">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-end">
        <Link
          to="/my-blog/edit/$id"
          params={{ id: blog.id }}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          ✏️ Sửa
        </Link>

        <button
          type="button"
          onClick={() =>
            onToggleStatus?.(blog.id, blog.status === "draft" ? "published" : "draft")
          }
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            blog.status === "draft"
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "border border-border bg-background text-muted-foreground hover:bg-secondary"
          }`}
        >
          {blog.status === "draft" ? "📤 Xuất bản" : "📥 Gỡ"}
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(blog.id)}
          className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          🗑️ Xóa
        </button>
      </div>
    </div>
  );
}
