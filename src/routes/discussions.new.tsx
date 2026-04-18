import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/discussions/new")({
  component: NewDiscussion,
});

function NewDiscussion() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          user_id: user.id,
          title: title.trim(),
          content: content.trim(),
        },
      ])
      .select();

    setLoading(false);

    if (error) {
      alert("Lỗi khi đăng bài: " + error.message);
    } else if (data && data.length > 0) {
      navigate({ to: `/discussions/${data[0].id}` });
    }
  };

  if (!user) return null;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <h1 className="mb-10 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-center">
          Đăng bàn luận
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Tiêu đề
            </label>
            <input
              id="title"
              type="text"
              required
              className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Ý tưởng mới về Đa vũ trụ..."
              maxLength={200}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-sm font-medium text-foreground">
              Nội dung chi tiết
            </label>
            <textarea
              id="content"
              required
              className="min-h-[250px] resize-y rounded-lg border border-border bg-background px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Hãy chia sẻ hết suy nghĩ của bạn..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/discussions" })}
              className="rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-border/50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : "Đăng bài"}
            </button>
          </div>
        </form>
      </div>
    </SiteLayout>
  );
}
