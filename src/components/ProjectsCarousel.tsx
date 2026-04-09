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

  // Duplicate cards to create seamless loop
  const items = [...projects, ...projects];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-label={label}
      role="region"
    >

      <div
        ref={trackRef}
        className={`flex gap-5 py-2 carousel-track ${paused ? "paused" : ""}`}
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
