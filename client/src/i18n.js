import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "src/locales/en.json";
import tr from "src/locales/tr.json";
import LanguageDetector from 'i18next-browser-languagedetector'

const options = {
  defaultLanguage: 'en',
	otherLanguages: ['tr'],
	debug: false,
  resources: {
    tr: {
      translation: tr,
    },
    en: {
      translation: en,
    },
  },
  fallbackLng: ["en"],
  order: ['localStorage', 'cookie'],
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

i18n.use(initReactI18next).use(LanguageDetector).init(options)
export default i18n;
