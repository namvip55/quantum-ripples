import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { BlogEditor, type BlogFormData } from "@/components/BlogEditor";
import { useAuth } from "@/hooks/use-auth";
import { getBlogById, updateBlog, type UserBlog } from "@/lib/blog-service";
import { estimateReadingTime } from "@/lib/slug-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/my-blog/edit/$id")({
  head: () => ({
    meta: [
      { title: "Chỉnh sửa bài viết — Ripples" },
    ],
  }),
  component: EditBlog,
});

function EditBlog() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const [blog, setBlog] = useState<UserBlog | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Guard auth
  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  // Fetch blog
  useEffect(() => {
    if (!user) return;
    setFetching(true);
    getBlogById(id)
      .then((data) => {
        if (!data || data.user_id !== user.id) {
          toast.error("Bài viết không tồn tại hoặc bạn không có quyền chỉnh sửa.");
          navigate({ to: "/my-blog" });
          return;
        }
        setBlog(data);
      })
      .catch(() => {
        toast.error("Không thể tải bài viết.");
        navigate({ to: "/my-blog" });
      })
      .finally(() => setFetching(false));
  }, [user, id, navigate]);

  const handleSave = async (data: BlogFormData, status: "draft" | "published") => {
    if (!user || !blog) return;
    setLoading(true);

    try {
      await updateBlog(blog.id, {
        title: data.title.trim(),
        slug: data.slug.trim(),
        excerpt: data.excerpt.trim() || undefined,
        content: data.content.trim(),
        category: data.category,
        cover_image_url: data.cover_image_url || undefined,
        status,
        reading_time: estimateReadingTime(data.content),
      });

      toast.success(
        status === "published" ? "Bài viết đã được cập nhật và xuất bản! 🎉" : "Đã lưu nháp."
      );
      navigate({ to: "/my-blog" });
    } catch (err: any) {
      if (err.message?.includes("duplicate")) {
        toast.error("Slug này đã tồn tại. Hãy chọn slug khác.");
      } else {
        toast.error("Lỗi: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (fetching) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <div className="flex flex-col gap-4">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-muted mx-auto" />
            <div className="h-[600px] animate-pulse rounded-2xl border border-border bg-card" />
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!blog) return null;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-center">
          Chỉnh sửa bài viết
        </h1>

        <BlogEditor
          userId={user.id}
          initial={{
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt ?? "",
            content: blog.content,
            category: blog.category,
            cover_image_url: blog.cover_image_url ?? "",
          }}
          loading={loading}
          onSaveDraft={(data) => handleSave(data, "draft")}
          onPublish={(data) => handleSave(data, "published")}
          onCancel={() => navigate({ to: "/my-blog" })}
        />
      </div>
    </SiteLayout>
  );
}
