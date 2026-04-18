import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import timelineText from "./timeline.txt?raw";

export const Route = createFileRoute("/stream")({
  head: () => ({
    meta: [
      { title: "Stream — Ripples in the Infinite Stream" },
      {
        name: "description",
        content: "Hành trình từ Bất tử Lượng tử đến Nhất Nguyên: Nhật ký của một tâm hồn tỉnh thức.",
      },
      { property: "og:title", content: "Stream — Ripples" },
      {
        property: "og:description",
        content: "Hành trình từ Bất tử Lượng tử đến Nhất Nguyên.",
      },
    ],
  }),
  component: StreamPage,
});

const items = timelineText.split("\n").map(s => s.trim()).filter(Boolean);

function StreamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const scrolled = (windowHeight / 2) - rect.top; 
      
      let p = scrolled / totalHeight;
      p = Math.max(0, Math.min(1, p));
      setProgress(p * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // setTimeout to allow layout paint before first calculation
    const timer = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10 md:pt-24">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Tâm hồn tỉnh thức
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Hành trình & Chiêm nghiệm
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Từ một câu hỏi vật lý đến sự tĩnh lặng của Nhất Nguyên. Cuộn xuống để xem lại toàn bộ dòng thời gian của tâm thức.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-32 relative text-foreground/90 overflow-hidden">
        <div ref={containerRef} className="relative">
          
          {/* Base Timeline Line */}
          <div className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-gradient-to-b from-transparent via-border/60 to-transparent md:left-1/2 md:-translate-x-1/2" />
          
          {/* Active Progress Timeline Line */}
          <div 
            className="absolute top-0 left-[27px] w-[2px] bg-gradient-to-b from-accent/20 to-accent md:left-1/2 md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_10px_var(--color-accent)]" 
            style={{ height: `${progress}%` }} 
          />

          {items.map((text, i) => {
            const isEven = i % 2 === 0;
            const isQuote = text.startsWith('"');
            const isHeading = text.startsWith("Phần") || text.startsWith("Lời kết");
            const isTitle = i === 0;
            
            return (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group mb-16 sm:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both ease-out" style={{ animationDelay: `${Math.min((i%10)*100, 500)}ms` }}>
                
                {/* Timeline Dot */}
                <div className={`absolute left-5 md:left-1/2 w-4 h-4 rounded-full border-[3px] border-background ${isHeading || isTitle ? 'bg-primary scale-125' : 'bg-accent'} shadow-sm md:-translate-x-1/2 transition-transform duration-500 group-hover:scale-150 z-10`} />
                
                {/* Content Side */}
                <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'} text-left transition-all duration-300 group-hover:translate-x-0`}>
                  <p className={`
                    ${isTitle ? "font-serif text-[26px] font-bold leading-tight md:text-4xl text-foreground" :
                      isQuote ? "font-serif text-[22px] italic leading-[1.6] md:text-3xl text-foreground" : 
                      isHeading ? "font-serif text-xl font-bold leading-relaxed md:text-2xl text-foreground" : 
                      "text-[15.5px] leading-[1.8] md:text-lg"}
                    text-foreground/85 transition-colors group-hover:text-foreground
                  `}>
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="mt-24 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-accent">
          ⌇ Không còn nơi nào để đi ⌇
        </p>
      </section>
    </SiteLayout>
  );
}
