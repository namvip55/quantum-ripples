import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PostListItem } from "@/components/PostCard";
import { categories, posts, type Post } from "@/lib/mock-data";
import { getPublishedBlogs, type UserBlogWithAuthor } from "@/lib/blog-service";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Ripples in the Infinite Stream" },
      {
        name: "description",
        content: "Tất cả bài viết về Bất tử lượng tử, Ý thức, Cái tôi và Tỉnh thức.",
      },
      { property: "og:title", content: "Blog — Ripples" },
      { property: "og:description", content: "Tất cả bài viết suy tư." },
    ],
  }),
  component: BlogIndex,
});

/** Chuyển UserBlog → Post format để reuse PostListItem */
function mapUserBlogToPost(blog: UserBlogWithAuthor): Post {
  return {
    id: `ub-${blog.id}`,
    slug: blog.slug,
    title: blog.title,
    subtitle: undefined,
    excerpt: blog.excerpt ?? "",
    category: blog.category as Post["category"],
    date: blog.created_at,
    readingTime: blog.reading_time ?? "3 phút",
    content: [], // Không cần cho danh sách
    // Thêm metadata tác giả
    _author: blog.profiles,
    _isUserBlog: true,
  } as Post & { _author?: any; _isUserBlog?: boolean };
}

function BlogIndex() {
  const [active, setActive] = useState<string>("Tất cả");
  const [userBlogs, setUserBlogs] = useState<Post[]>([]);

  // Fetch published user blogs
  useEffect(() => {
    getPublishedBlogs()
      .then((blogs) => setUserBlogs(blogs.map(mapUserBlogToPost)))
      .catch(() => {
        /* Nếu lỗi, chỉ hiển thị mock-data */
      });
  }, []);

  // Gộp mock-data + user blogs, sắp xếp theo ngày mới nhất
  const allPosts = [...posts, ...userBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const visible =
    active === "Tất cả" ? allPosts : allPosts.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-8 md:pt-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">Nhật ký suy tư</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Mỗi bài viết là một gợn sóng — đôi khi rõ ràng, đôi khi mờ ảo, nhưng đều bắt nguồn từ cùng
          một dòng chảy.
        </p>

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            Chưa có bài viết nào trong chủ đề này.
          </p>
        ) : (
          <div className="border-t border-border">
            {visible.map((p) => (
              <PostListItem key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
