import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./components/LanguageToggle";
import ProjectCard from "./components/ProjectCard";

export default function App() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect language once on mount (i18next Browser language detector covers this)
    const stored = localStorage.getItem("lang");
    if (stored) i18n.changeLanguage(stored);

    // Fetch projects from public/projects.json (or proxy to headless CMS)
    fetch("/home/projects.json")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [i18n]);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <header className="max-w-4xl mx-auto p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("name")}</h1>
          <p className="text-sm text-gray-600">{t("headline")}</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">{t("headline")}</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">{t("bio")}</p>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="skills list">
              {t("skills", { returnObjects: true }).map(s => (
                <li key={s} className="text-sm px-2 py-1 bg-gray-100 rounded">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Ver projetos
              </a>
            </div>
          </div>

          <div className="mx-auto">
            <img
              src="/home/images/avatar.jpg"
              alt="Foto do desenvolvedor"
              className="w-40 h-40 rounded-full object-cover shadow-lg"
              loading="lazy"
            />
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h3 className="text-lg font-semibold">{t("projects")}</h3>
          <p className="text-sm text-gray-600">{t("projects_description")}</p>

          <div className="mt-4">
            {loading ? (
              <div role="status" aria-live="polite">
                Carregando projetos...
              </div>
            ) : (
              <div
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                role="list"
                aria-label={t("projects")}
              >
                {projects.map(p => (
                  <div
                    key={p.id}
                    className="flex-shrink-0 w-72" // largura fixa para cada card
                    role="listitem"
                  >
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t mt-8 text-sm text-gray-600 flex items-center justify-between">
          <div>
            <span>Code by myself</span>
          </div>
          <div>
            <a href="https://feantuns.github.io/contact/" className="underline">
              {t("contact")}
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
