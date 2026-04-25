import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

// Header tối giản, sticky, bg blur. Replace links khi thêm route mới.
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, profile } = useAuth();

  const navItems = [
    { to: "/blog", label: "Blog" },
    { to: "/stream", label: "Stream" },
    { to: "/about", label: "About" },
    { to: "/discussions", label: "Cộng đồng" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            {/* Tiny ripple icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" strokeLinecap="round" />
              <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" strokeLinecap="round" opacity=".5" />
            </svg>
          </span>
          <span className="text-base">Ripples</span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            in the Infinite Stream
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}

          {/* User Section */}
          <div className="ml-4 pl-4 border-l border-border h-6 flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/my-blog/new"
                  className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  ✏️ Viết bài
                </Link>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover border border-border" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex justify-center items-center">
                      {(profile?.username || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/auth" className="text-sm font-medium text-accent hover:underline">
                Đăng nhập
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="mx-auto max-w-6xl border-t border-border/60 px-6 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/my-blog"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                📝 Bài viết của tôi
              </Link>
              <Link
                to="/my-blog/new"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-secondary"
              >
                ✏️ Viết bài mới
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Tài khoản của tôi
              </Link>
            </>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-secondary"
            >
              Đăng nhập / Đăng ký
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
