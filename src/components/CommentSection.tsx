import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

interface CommentSectionProps {
  blogSlug?: string;
  postId?: string;
}

export function CommentSection({ blogSlug, postId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchComments();

    // Subscribe to new comments
    const channel = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          // If the comment belongs to this post/blog, we should probably fetch it
          // A simple approach is just refetching all comments or appending
          const newRow = payload.new as any;
          if ((blogSlug && newRow.blog_slug === blogSlug) || (postId && newRow.post_id === postId)) {
            fetchComments();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [blogSlug, postId]);

  const fetchComments = async () => {
    setFetching(true);
    let query = supabase
      .from("comments")
      .select("*, profiles(username, full_name, avatar_url)")
      .order("created_at", { ascending: false });

    if (blogSlug) {
      query = query.eq("blog_slug", blogSlug);
    } else if (postId) {
      query = query.eq("post_id", postId);
    }

    const { data, error } = await query;
    if (!error && data) {
      setComments(data as any);
    }
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert([
      {
        user_id: user.id,
        blog_slug: blogSlug || null,
        post_id: postId || null,
        content: newComment.trim(),
      },
    ]);

    if (!error) {
      setNewComment("");
      // Realtime subscription will fetch, but we can also manually fetch for immediate update
      await fetchComments();
    } else {
      console.error(error);
      alert("Lỗi khi đăng bình luận");
    }
    setLoading(false);
  };

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto border-t border-border pt-10">
      <h3 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Bình luận ({comments.length})</h3>

      {!user ? (
        <div className="mb-8 rounded-xl border border-border bg-card/50 p-6 text-center">
          <p className="mb-4 text-muted-foreground">Vui lòng đăng nhập để tham gia thảo luận cùng mọi người.</p>
          <Link
            to="/auth"
            className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Đăng nhập / Đăng ký
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-3">
          <textarea
            className="w-full min-h-[100px] resize-y rounded-xl border border-border bg-background p-4 text-[15px] outline-none transition-colors focus:border-accent"
            placeholder="Chia sẻ góc nhìn của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-6">
        {fetching && comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center animate-pulse">Đang tải bình luận...</p>
        )}
        {!fetching && comments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
        )}

        {comments.map((comment) => {
          const profile = comment.profiles;
          const displayName = profile?.full_name || profile?.username || "Người dùng ẩn danh";
          
          return (
            <div key={comment.id} className="flex gap-4 rounded-xl p-4 bg-card/30 border border-border/50">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={displayName} className="w-10 h-10 rounded-full object-cover bg-accent/20 border border-border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent/20 flex shrink-0 border border-border items-center justify-center text-accent font-bold">
                  {displayName[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-[15px] text-foreground truncate">{displayName}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: vi })}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/85 whitespace-pre-wrap word-break">
                  {comment.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
