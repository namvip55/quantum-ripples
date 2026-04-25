import { useState, useEffect, useRef } from "react";
import { vietnameseSlug } from "@/lib/slug-utils";

interface SlugInputProps {
  title: string;
  value: string;
  onChange: (slug: string) => void;
}

/**
 * Input slug thông minh — auto-generate từ tiêu đề tiếng Việt,
 * cho phép chỉnh tay, validate chỉ a-z, 0-9, dấu gạch nối.
 */
export function SlugInput({ title, value, onChange }: SlugInputProps) {
  const [manual, setManual] = useState(false);
  const prevTitle = useRef(title);

  // Tự sinh slug khi title thay đổi (nếu chưa chỉnh tay)
  useEffect(() => {
    if (!manual && title !== prevTitle.current) {
      onChange(vietnameseSlug(title));
    }
    prevTitle.current = title;
  }, [title, manual, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManual(true);
    // Chỉ cho phép a-z, 0-9, dấu gạch nối
    const cleaned = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    onChange(cleaned);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor="slug" className="text-sm font-medium text-foreground">
          Slug (URL)
        </label>
        {manual && (
          <button
            type="button"
            className="text-xs text-accent hover:underline"
            onClick={() => {
              setManual(false);
              onChange(vietnameseSlug(title));
            }}
          >
            Tự tạo lại
          </button>
        )}
      </div>
      <div className="flex items-center gap-0 rounded-lg border border-border overflow-hidden">
        <span className="bg-muted px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap border-r border-border">
          /blog/
        </span>
        <input
          id="slug"
          type="text"
          className="flex-1 bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:bg-accent/5"
          value={value}
          onChange={handleChange}
          placeholder="tieu-de-bai-viet"
        />
      </div>
    </div>
  );
}
