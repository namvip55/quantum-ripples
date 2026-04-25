import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { BlogEditor, type BlogFormData } from "@/components/BlogEditor";
import { useAuth } from "@/hooks/use-auth";
import { createBlog } from "@/lib/blog-service";
import { estimateReadingTime } from "@/lib/slug-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/my-blog/new")({
  head: () => ({
    meta: [
      { title: "Viết bài mới — Ripples" },
      { name: "description", content: "Viết và chia sẻ bài blog cá nhân." },
    ],
  }),
  component: NewBlog,
});

function NewBlog() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  const handleSave = async (data: BlogFormData, status: "draft" | "published") => {
    if (!user) return;
    setLoading(true);

    try {
      await createBlog({
        user_id: user.id,
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
        status === "published" ? "Bài viết đã được xuất bản! 🎉" : "Đã lưu nháp."
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

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-center">
          Viết bài mới
        </h1>

        <BlogEditor
          userId={user.id}
          loading={loading}
          onSaveDraft={(data) => handleSave(data, "draft")}
          onPublish={(data) => handleSave(data, "published")}
          onCancel={() => navigate({ to: "/my-blog" })}
        />
      </div>
    </SiteLayout>
  );
}
