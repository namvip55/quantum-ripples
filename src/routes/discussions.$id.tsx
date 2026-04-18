import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SiteLayout } from "@/components/SiteLayout";
import { CommentSection } from "@/components/CommentSection";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const Route = createFileRoute("/discussions/$id")({
  component: DiscussionDetail,
});

function DiscussionDetail() {
  const { id } = Route.useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(username, full_name, avatar_url)")
        .eq("id", id)
        .single();

      if (!error && data) setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="text-muted-foreground animate-pulse">Đang tải...</p>
        </div>
      </SiteLayout>
    );
  }

  if (!post) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="text-3xl font-bold">Không tìm thấy bài viết</h1>
          <Link to="/discussions" className="mt-6 inline-block text-sm text-accent hover:underline">
            ← Quay về Cộng đồng
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="mx-auto max-w-2xl px-6 pt-12 pb-24 md:pt-16">
        <Link
          to="/discussions"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Danh sách thảo luận
        </Link>

        <h1 className="text-3xl font-bold leading-[1.2] tracking-tight text-foreground md:text-5xl mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-border">
          {post.profiles?.avatar_url ? (
            <img src={post.profiles.avatar_url} alt="" className="h-12 w-12 rounded-full border border-border object-cover" />
          ) : (
            <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
              {(post.profiles?.full_name || post.profiles?.username || "U")[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-foreground text-lg">
              {post.profiles?.full_name || post.profiles?.username || "Ẩn danh"}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: vi })}
            </p>
          </div>
        </div>

        <div className="text-[17px] leading-[1.8] text-foreground/85 md:text-lg whitespace-pre-wrap word-break">
          {post.content}
        </div>

        <CommentSection postId={post.id} />
      </article>
    </SiteLayout>
  );
}
