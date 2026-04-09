import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, pt: { translation: pt } },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
      format: (value: unknown, format?: string, lng?: string) => {
        if (format === "date")
          return new Intl.DateTimeFormat(lng).format(new Date(value as string));
        return String(value);
      },
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
