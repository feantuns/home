export default function ProjectCard({ project }) {
  return (
    <article
      className="h-full border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 focus-within:shadow-lg"
      tabIndex={0}
      aria-labelledby={`p-${project.id}`}
    >
      <img
        src={project.cover}
        alt={`Capa do projeto ${project.title}`}
        className="w-full h-40 object-cover object-left rounded-md mb-3"
        loading="lazy"
      />
      <h3 id={`p-${project.id}`} className="text-lg font-semibold">
        {project.title}
      </h3>
      <p className="text-sm mt-1">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <a
          href={project.liveUrl}
          className="text-sm underline"
          target="_blank"
          rel="noreferrer"
        >
          Live
        </a>
        <a
          href={project.repoUrl}
          className="text-sm underline"
          target="_blank"
          rel="noreferrer"
        >
          Repo
        </a>
      </div>
    </article>
  );
}
