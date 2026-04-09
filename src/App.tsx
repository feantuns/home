import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./components/LanguageToggle";
import ProjectsCarousel from "./components/ProjectsCarousel";
import type { Project } from "./types";

function ProjectSkeleton() {
  return (
    <div className="flex-shrink-0 w-72 h-80 rounded-xl border border-gray-100 bg-gray-50 animate-pulse" />
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) i18n.changeLanguage(stored);

    fetch("/home/projects.json")
      .then(res => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            {t("name")}
          </span>
          <LanguageToggle />
        </div>
      </header>

      <main className="py-16 space-y-20">
        {/* Hero — constrained width */}
        <div className="max-w-4xl mx-auto px-6">
          <section className="space-y-5">
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-indigo-100 scale-110" aria-hidden="true" />
                {/* Easter egg: hover to flip */}
                <div
                  className="relative w-20 h-20"
                  style={{ perspective: "600px" }}
                  title="😎"
                >
                  <div
                    className="w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "rotateY(180deg)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "rotateY(0deg)")}
                  >
                    {/* Front: avatar */}
                    <img
                      src="/home/images/avatar.jpg"
                      alt={t("name")}
                      className="absolute inset-0 w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-white"
                      style={{ backfaceVisibility: "hidden" }}
                      loading="eager"
                    />
                    {/* Back: cool emoji */}
                    <div
                      className="absolute inset-0 w-20 h-20 rounded-full bg-indigo-600 ring-4 ring-white shadow-md flex items-center justify-center text-4xl select-none"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      aria-hidden="true"
                    >
                      😎
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  {t("name")}
                </h1>
                <p className="mt-1 text-lg text-indigo-600 font-medium">
                  {t("headline")}
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{t("bio")}</p>

            <ul className="flex flex-wrap gap-2" aria-label="skills list">
              {(t("skills", { returnObjects: true }) as string[]).map(s => (
                <li
                  key={s}
                  className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {t("see_projects")}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://feantuns.github.io/contact/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                {t("contact")}
              </a>
            </div>
          </section>
        </div>

        {/* Projects — full width */}
        <section id="projects" className="space-y-6">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {t("projects")}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{t("projects_description")}</p>
          </div>

          {loading ? (
            <div className="flex gap-5 px-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ProjectsCarousel projects={projects} label={t("projects")} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-gray-400">
          <span>© {new Date().getFullYear()} {t("name")}</span>
          <a
            href="https://feantuns.github.io/contact/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-600 transition-colors underline underline-offset-2"
          >
            {t("contact")}
          </a>
        </div>
      </footer>
    </div>
  );
}
