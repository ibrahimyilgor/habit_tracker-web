import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "src/locales/en.json";
import tr from "src/locales/tr.json";

const options = {
  defaultLanguage: "tr",
  otherLanguages: ["en"],
  debug: false,
  resources: {
    tr: {
      translation: tr,
    },
    en: {
      translation: en,
    },
  },
  lng: "en", 
  fallbackLng: ["en"],
  order: ['cookie', 'localtorage'],
  cache: ['cookie'],
  // ns: ["common"],

  // defaultNS: "common",
  // interpolation: {
  // 	escapeValue: false
  // },
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
};

i18n.use(initReactI18next).init(options);
export default i18n;
