import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ripples in the Infinite Stream — Blog triết học" },
      {
        name: "description",
        content:
          "Một blog cá nhân về Bất tử lượng tử, Ý thức, Cái tôi và Tỉnh thức. Những gợn sóng trong dòng chảy vô tận.",
      },
      { property: "og:title", content: "Ripples in the Infinite Stream" },
      {
        property: "og:description",
        content: "Suy tư về Bất tử lượng tử, Ý thức và Tỉnh thức.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = posts.slice(0, 4);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Subtle ripple background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6 py-24 md:py-36">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Ripples in the Infinite Stream
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Chính bởi vì tồn tại mà tôi biết{" "}
            <span className="text-muted-foreground">tôi tồn tại,</span> cho nên ta{" "}
            <span className="text-accent">luôn tồn tại</span>.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Một blog cá nhân ghi lại những suy tư về Bất tử lượng tử, ý thức và sự tỉnh thức. Không
            phải để thuyết phục — chỉ để lắng nghe dòng chảy.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Đọc blog
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/stream"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
            >
              Vào dòng chảy
            </Link>
          </div>
        </div>
      </section>

      {/* AUTHOR INTRO */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-12 md:flex-row md:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-foreground text-lg font-semibold text-background">
            R
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Về tác giả
            </p>
            <p className="mt-2 text-lg leading-relaxed text-foreground">
              Tôi không phải nhà vật lý, cũng không phải thiền sư. Chỉ là một người tình cờ rơi vào
              ý niệm Bất tử lượng tử và kể từ đó không thể nhìn thế giới như cũ. Trang này là nơi
              tôi ghi lại những gợn sóng — trước khi chúng tan biến.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Bài viết nổi bật
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Những suy tư gần đây
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
