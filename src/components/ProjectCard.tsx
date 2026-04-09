import type { Project } from "../types";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article
      className="group h-full flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-within:shadow-md"
      aria-labelledby={`p-${project.id}`}
    >
      <div className="overflow-hidden bg-gray-100">
        <img
          src={project.cover}
          alt={`${project.title}`}
          className="w-full h-40 object-cover object-left group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 id={`p-${project.id}`} className="font-semibold text-gray-900">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center gap-2 border-t border-gray-50">
          <a
            href={project.liveUrl}
            className="flex-1 text-center text-xs font-medium py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
          <a
            href={project.repoUrl}
            className="flex-1 text-center text-xs font-medium py-1.5 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
            target="_blank"
            rel="noreferrer"
          >
            Repo
          </a>
        </div>
      </div>
    </article>
  );
}
