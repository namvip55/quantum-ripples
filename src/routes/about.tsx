import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Về tôi — Ripples in the Infinite Stream" },
      {
        name: "description",
        content:
          "Một vài dòng về tác giả và hành trình suy tư về Bất tử lượng tử, Ý thức và Tỉnh thức.",
      },
      { property: "og:title", content: "Về tôi — Ripples" },
      { property: "og:description", content: "Hành trình suy tư cá nhân." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">Về tôi</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          Một người đang lắng nghe{" "}
          <span className="text-muted-foreground">dòng chảy của chính mình.</span>
        </h1>

        {/* Avatar placeholder */}
        <div className="mt-12 flex items-center gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-foreground text-3xl font-bold text-background">
            R
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">Nguyễn Nam Thành</p>
            <p className="text-sm text-muted-foreground">Người ghi chép · Việt Nam</p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-lg leading-[1.8] text-foreground/85">
          <p>
            Tầm thường như gợn sóng nhưng lúc nào cũng suy nghĩ về thế giới, hay cười, chưa bao giờ nổi nóng hay tức giận với ai (mấy ae vào confirm cái=))).
          </p>
          <p>
            Trang web này là nơi tôi ghi lại những cuộc trò chuyện với chính mình — đôi khi với một
            AI, đôi khi với khoảng lặng — về cái tôi, cái chết, ý thức và sự tỉnh thức. Không có kết
            luận nào ở đây là cuối cùng. Chúng chỉ là những gợn sóng.
          </p>
          <p>
            Nếu bạn cũng đang đứng ở đâu đó trên dòng chảy này, tôi hy vọng những trang viết ở đây
            có thể là một người bạn đồng hành — không phải để bạn tin theo, mà để bạn biết mình
            không đơn độc.
          </p>
        </div>

        {/* Topics */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Các chủ đề tôi quan tâm
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Bất tử lượng tử",
              "Ý thức",
              "Cái tôi",
              "Tỉnh thức",
              "Triết học Tâm thức",
              "Đa thế giới",
            ].map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-sm text-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Liên hệ & Thông tin
          </p>
          <p className="mt-2 text-lg text-foreground">
            <span className="font-medium mr-2">Email:</span>
            <a
              href="mailto:nguyennamthanhk6@gmail.com"
              className="font-medium text-accent hover:underline"
            >
              nguyennamthanhk6@gmail.com
            </a>
          </p>
          <p className="text-lg text-foreground">
            <span className="font-medium mr-2">Github:</span>
            <a
              href="https://github.com/namvip55"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent hover:underline"
            >
              https://github.com/namvip55
            </a>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
