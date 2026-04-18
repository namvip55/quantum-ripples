import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function PostListItem({ post }: { post: Post }) {
  return (
    <article className="group border-b border-border/60 py-12 first:border-t">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block transition-opacity hover:opacity-70"
      >
        <div className="font-sans-ui mb-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <time>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="font-serif text-3xl font-light leading-tight text-foreground md:text-4xl">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="mt-3 font-serif italic text-lg text-muted-foreground">{post.subtitle}</p>
        )}
        <p className="mt-6 max-w-2xl font-serif text-[17px] leading-relaxed text-foreground/80">
          {post.excerpt}
        </p>
        <span className="font-sans-ui mt-6 inline-block text-[11px] uppercase tracking-[0.25em] text-foreground/60 transition-opacity group-hover:opacity-100">
          Đọc tiếp →
        </span>
      </Link>
    </article>
  );
}
