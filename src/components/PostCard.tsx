import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-sm"
    >
      <div className="mb-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-accent">
          {post.category}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent md:text-2xl">
        {post.title}
      </h3>
      {post.subtitle && <p className="mt-2 text-sm text-muted-foreground">{post.subtitle}</p>}
      <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-foreground/75">
        {post.excerpt}
      </p>

      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-all group-hover:gap-2.5 group-hover:text-accent">
        Đọc tiếp
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

// Variant compact - dùng trên trang blog index dạng list ngang
export function PostListItem({ post }: { post: Post }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block border-b border-border py-10 transition-all hover:bg-muted/30 hover:px-6 hover:-mx-6 hover:rounded-xl"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] text-accent">
          {post.category}
        </span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>
      <div className="flex justify-between items-start gap-4">
        <h3 className="font-serif text-3xl font-bold leading-[1.2] text-foreground transition-colors group-hover:text-accent md:text-4xl text-pretty">
          {post.title}
        </h3>
        <svg
          viewBox="0 0 24 24"
          className="mt-2 h-6 w-6 shrink-0 -translate-x-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 hidden sm:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {post.subtitle && <p className="mt-3 font-serif text-lg italic text-muted-foreground">{post.subtitle}</p>}
      <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-foreground/80">
        {post.excerpt}
      </p>
    </Link>
  );
}
