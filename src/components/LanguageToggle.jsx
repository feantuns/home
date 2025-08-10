import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const switchTo = lng => {
    i18n.changeLanguage(lng);
    // Otimização: armazenar preferência
    localStorage.setItem("lang", lng);
  };

  return (
    <div
      className="flex items-center gap-2"
      role="navigation"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchTo("pt")}
        className="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-pressed={i18n.language === "pt"}
      >
        PT
      </button>
      <button
        onClick={() => switchTo("en")}
        className="px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
        aria-pressed={i18n.language === "en"}
      >
        EN
      </button>
    </div>
  );
}
