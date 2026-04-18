import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

// Layout chung. `bare` để Focus Mode ẩn header/footer.
export function SiteLayout({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  if (bare) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
