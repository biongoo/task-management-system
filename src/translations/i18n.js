import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_src from './en.json';
import pl_src from './pl.json';

const resources = {
  en: {
    id: 'en',
    name: 'English',
    url: '/assets/en.svg',
    translation: en_src,
  },
  pl: {
    id: 'pl',
    name: 'Polski',
    url: '/assets/pl.svg',
    translation: pl_src,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
