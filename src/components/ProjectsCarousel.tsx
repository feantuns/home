import { useRef, useState } from "react";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
  label: string;
}

export default function ProjectsCarousel({ projects, label }: Props) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Duplicate cards to create seamless loop
  const items = [...projects, ...projects];

  function onPointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = containerRef.current?.scrollLeft ?? 0;
    containerRef.current?.setPointerCapture(e.pointerId);
    setPaused(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft.current - dx;
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    isDragging.current = false;
    containerRef.current?.releasePointerCapture(e.pointerId);
    setPaused(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { if (!isDragging.current) setPaused(false); }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-label={label}
      role="region"
    >
      <div
        ref={trackRef}
        className={`flex gap-5 py-2 px-6 carousel-track ${paused ? "paused" : ""}`}
        style={{ width: "max-content" }}
      >
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="w-72 flex-shrink-0">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
