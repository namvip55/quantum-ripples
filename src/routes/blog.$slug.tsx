import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ReadingProgress } from "@/components/ReadingProgress";
import { posts, type ContentBlock } from "@/lib/mock-data";
import { CommentSection } from "@/components/CommentSection";
import { getBlogBySlug, type UserBlogWithAuthor } from "@/lib/blog-service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (post) return { type: "static" as const, data: post };
    // Nếu không tìm thấy trong mock-data, trả về slug để fetch từ Supabase
    return { type: "dynamic" as const, slug: params.slug };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.type === "static"
      ? [
          { title: `${loaderData.data.title} — Ripples` },
          { name: "description", content: loaderData.data.excerpt },
          { property: "og:title", content: loaderData.data.title },
          { property: "og:description", content: loaderData.data.excerpt },
        ]
      : [{ title: "Bài viết — Ripples" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold">Không tìm thấy bài viết</h1>
        <Link to="/blog" className="mt-6 inline-block text-sm text-accent hover:underline">
          ← Quay về Blog
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-muted-foreground">Có lỗi: {error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: PostPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function renderBlock(b: ContentBlock, i: number) {
  switch (b.type) {
    case "h":
      return (
        <h2
          key={i}
          className="mt-14 mb-4 font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          {b.text}
        </h2>
      );
    case "q":
      return (
        <div
          key={i}
          className="my-10 flex flex-col gap-3 rounded-2xl border border-accent/10 bg-gradient-to-br from-accent/5 to-transparent p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center gap-3">
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-serif text-sm font-bold text-accent-foreground shadow-sm">
                Q
             </div>
             <span className="text-xs font-semibold uppercase tracking-wider text-accent/80">Question</span>
          </div>
          <p className="font-serif text-[18px] font-medium leading-relaxed text-foreground md:text-xl text-pretty">
            {b.text}
          </p>
        </div>
      );
    case "a":
      return (
        <div key={i} className="my-8 flex gap-4 md:ml-4 border-l-2 border-border/60 pl-6">
          <p className="text-[17px] leading-[1.8] text-foreground/85 md:text-lg">{b.text}</p>
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-12 border-l-4 border-accent bg-accent/5 py-5 pl-6 pr-5 font-serif text-xl italic leading-relaxed text-foreground md:text-2xl"
        >
          "{b.text}"
        </blockquote>
      );
    case "p":
    default:
      return (
        <p key={i} className={`my-6 text-[17px] leading-[1.8] text-foreground/85 md:text-lg ${i === 0 ? "first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.7] first-letter:text-foreground" : ""}`}>
          {b.text}
        </p>
      );
  }
}

function PostPage() {
  const loaderData = Route.useLoaderData();

  if (loaderData.type === "static") {
    return <StaticPostPage post={loaderData.data} />;
  }

  return <DynamicPostPage slug={loaderData.slug} />;
}

// ─── Bài viết tĩnh (mock-data) ──────────────────────────────

function StaticPostPage({ post }: { post: (typeof posts)[0] }) {
  const [focus, setFocus] = useState(false);
  const related = posts.find((p) => p.id !== post.id);

  return (
    <SiteLayout bare={focus}>
      {!focus && <ReadingProgress />}

      {/* Focus mode toggle */}
      <button
        onClick={() => setFocus((f) => !f)}
        className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent md:right-6 md:top-20"
        aria-label="Chế độ tĩnh lặng"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {focus ? (
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
          ) : (
            <circle cx="12" cy="12" r="9" />
          )}
        </svg>
        {focus ? "Thoát" : "Tĩnh lặng"}
      </button>

      <article
        className={`mx-auto max-w-2xl px-6 ${focus ? "pt-24 pb-32" : "pt-12 pb-24 md:pt-16"}`}
      >
        {!focus && (
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tất cả bài viết
          </Link>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground p-1">
          <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] text-accent">
            {post.category}
          </span>
          <time>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} đọc</span>
        </div>

        <h1 className="font-serif text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl text-pretty">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-6 font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
            {post.subtitle}
          </p>
        )}

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div>{post.content.map(renderBlock)}</div>

        {/* "Suy ngẫm thêm" */}
        {!focus && (
          <section className="mt-20 rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Suy ngẫm thêm
            </p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              Bạn muốn câu chuyện vô tận này trở thành một thiên anh hùng ca, hay một tấn bi kịch?
            </p>
            {related && (
              <Link
                to="/blog/$slug"
                params={{ slug: related.slug }}
                className="group mt-8 flex items-center justify-between gap-4 border-t border-border pt-6"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Bài tiếp theo
                  </p>
                  <p className="mt-1 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {related.title}
                  </p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </section>
        )}

        {!focus && <CommentSection blogSlug={post.slug} />}
      </article>
    </SiteLayout>
  );
}

// ─── Bài viết động (user blog từ Supabase) ──────────────────

function DynamicPostPage({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<UserBlogWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    getBlogBySlug(slug)
      .then((data) => {
        if (!data) {
          setNotFoundState(true);
        } else {
          setBlog(data);
        }
      })
      .catch(() => setNotFoundState(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-24">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="h-12 w-3/4 rounded bg-muted" />
            <div className="h-px w-full bg-border my-8" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/6 rounded bg-muted" />
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (notFoundState || !blog) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="text-3xl font-bold">Không tìm thấy bài viết</h1>
          <Link to="/blog" className="mt-6 inline-block text-sm text-accent hover:underline">
            ← Quay về Blog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <ReadingProgress />
      <article className="mx-auto max-w-2xl px-6 pt-12 pb-24 md:pt-16">
        <Link
          to="/blog"
          className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tất cả bài viết
        </Link>

        {/* Meta */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground p-1">
          <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] text-accent">
            {blog.category}
          </span>
          <time>{formatDate(blog.created_at)}</time>
          <span aria-hidden>·</span>
          <span>{blog.reading_time ?? "3 phút"} đọc</span>
        </div>

        {/* Cover image */}
        {blog.cover_image_url && (
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="mb-8 w-full rounded-2xl object-cover max-h-80"
          />
        )}

        <h1 className="font-serif text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl text-pretty">
          {blog.title}
        </h1>

        {/* Author info */}
        {blog.profiles && (
          <div className="mt-6 flex items-center gap-3">
            {blog.profiles.avatar_url ? (
              <img
                src={blog.profiles.avatar_url}
                alt=""
                className="h-10 w-10 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                {(blog.profiles.username ?? blog.profiles.full_name ?? "U")[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {blog.profiles.full_name ?? blog.profiles.username ?? "Ẩn danh"}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(blog.created_at)}</p>
            </div>
          </div>
        )}

        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Markdown content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:font-serif prose-blockquote:italic prose-a:text-accent">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>

        <CommentSection blogSlug={blog.slug} />
      </article>
    </SiteLayout>
  );
}
