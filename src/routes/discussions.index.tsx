import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SiteLayout } from "@/components/SiteLayout";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const Route = createFileRoute("/discussions/")({
  component: DiscussionsList,
});

function DiscussionsList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(username, full_name, avatar_url), comments(count)")
        .order("created_at", { ascending: false });

      if (!error && data) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end border-b border-border pb-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Cộng đồng</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Thảo luận góc nhìn
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Chia sẻ những suy tư của bạn cùng những người khác.
            </p>
          </div>
          <Link
            to="/discussions/new"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90"
          >
            Đăng bài mới
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {loading ? (
            <p className="text-center text-muted-foreground animate-pulse">Đang tải...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">Chưa có bài thảo luận nào.</p>
              <Link to="/discussions/new" className="text-accent font-medium hover:underline">Hãy là người đầu tiên bóc tem!</Link>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                to="/discussions/$id"
                params={{ id: post.id }}
                className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h2 className="text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <span className="shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground bg-accent/10 px-2 py-1 rounded-md text-accent">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    {post.comments[0]?.count || 0}
                  </span>
                </div>
                
                <p className="text-[15px] sm:text-base text-muted-foreground line-clamp-2 mb-6">
                  {post.content}
                </p>
                
                <div className="flex items-center gap-3">
                  {post.profiles?.avatar_url ? (
                    <img src={post.profiles.avatar_url} alt="" className="h-8 w-8 rounded-full border border-border object-cover" />
                  ) : (
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {(post.profiles?.full_name || post.profiles?.username || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {post.profiles?.full_name || post.profiles?.username || "Ẩn danh"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: vi })}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
