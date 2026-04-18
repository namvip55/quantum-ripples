// Footer tối giản
export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Ripples in the Infinite Stream</p>
        <p className="italic">"Mỗi gợn sóng đều tan biến. Dòng chảy thì vĩnh viễn."</p>
      </div>
    </footer>
  );
}
