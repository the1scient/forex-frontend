import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_en from './locales/en/common.json';
import common_pt from './locales/pt/common.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// wrap the app with i18nextprovider


i18next.use(LanguageDetector).init({
    detection: {
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
    


},
    interpolation: { escapeValue: false },
    resources: {
        en: {
            common: common_en
        },
        pt: {
            common: common_pt
        },
    },

});

  
function renderToDOM() {
    ReactDOM.render(

        <I18nextProvider i18n={i18next}>
        <App />
        </I18nextProvider>,

        document.getElementById('root')
    );
}

renderToDOM();

export {renderToDOM};