import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

i18n
  .use(LanguageDetector) // detecta idioma do navegador
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, pt: { translation: pt } },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // react já protege
      format: (value, format, lng) => {
        if (format === "date")
          return new Intl.DateTimeFormat(lng).format(new Date(value));
        return value;
      },
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
