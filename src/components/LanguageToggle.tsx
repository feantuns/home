import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const switchTo = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div
      className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg"
      role="navigation"
      aria-label="Language switcher"
    >
      {(["pt", "en"] as const).map(lng => (
        <button
          key={lng}
          onClick={() => switchTo(lng)}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
            i18n.language === lng
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-pressed={i18n.language === lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
