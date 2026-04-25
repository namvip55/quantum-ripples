import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { UserBlogCard } from "@/components/UserBlogCard";
import { useAuth } from "@/hooks/use-auth";
import { getMyBlogs, deleteBlog, updateBlog, type UserBlog } from "@/lib/blog-service";
import { toast } from "sonner";

export const Route = createFileRoute("/my-blog/")({
  head: () => ({
    meta: [
      { title: "Bài viết của tôi — Ripples" },
      { name: "description", content: "Quản lý bài viết blog cá nhân." },
    ],
  }),
  component: MyBlogIndex,
});

type FilterTab = "all" | "draft" | "published";

function MyBlogIndex() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<UserBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<FilterTab>("all");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  // Fetch blogs
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getMyBlogs(user.id)
      .then(setBlogs)
      .catch((err) => toast.error("Lỗi tải bài viết: " + err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("Đã xóa bài viết.");
    } catch (err: any) {
      toast.error("Lỗi: " + err.message);
    }
  };

  const handleToggleStatus = async (id: string, status: "draft" | "published") => {
    try {
      await updateBlog(id, { status });
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status, updated_at: new Date().toISOString() } : b))
      );
      toast.success(status === "published" ? "Đã xuất bản!" : "Đã gỡ về nháp.");
    } catch (err: any) {
      toast.error("Lỗi: " + err.message);
    }
  };

  const filtered =
    tab === "all" ? blogs : blogs.filter((b) => b.status === tab);

  if (!user) return null;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-6 pt-16 pb-24 md:pt-24">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Quản lý
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Bài viết của tôi
            </h1>
          </div>
          <Link
            to="/my-blog/new"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Viết bài mới
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex gap-1 rounded-lg border border-border p-1 w-fit">
          {(
            [
              { key: "all", label: "Tất cả", count: blogs.length },
              { key: "draft", label: "Nháp", count: blogs.filter((b) => b.status === "draft").length },
              { key: "published", label: "Đã xuất bản", count: blogs.filter((b) => b.status === "published").length },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="mt-6 flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl border border-border bg-card" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <div className="text-5xl">📝</div>
              <p className="text-lg font-medium text-foreground">
                {tab === "all"
                  ? "Bạn chưa có bài viết nào"
                  : tab === "draft"
                    ? "Không có bài nháp"
                    : "Chưa có bài nào được xuất bản"}
              </p>
              <p className="text-sm text-muted-foreground">
                Hãy bắt đầu chia sẻ suy nghĩ của bạn với thế giới.
              </p>
              <Link
                to="/my-blog/new"
                className="mt-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
              >
                ✏️ Viết bài đầu tiên
              </Link>
            </div>
          ) : (
            filtered.map((blog) => (
              <UserBlogCard
                key={blog.id}
                blog={blog}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
