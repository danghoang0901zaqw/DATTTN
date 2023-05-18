import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import APP_EN from "~/language/en/app.json";

import APP_VI from "~/language/vi/app.json";

const resources = {
  en: {
    app: APP_EN,
  },
  vi: {
    app: APP_VI,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: JSON.parse(localStorage.getItem("language")),
  ns: ["app"],
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
