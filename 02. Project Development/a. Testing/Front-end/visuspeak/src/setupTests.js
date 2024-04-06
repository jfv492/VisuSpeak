import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import '@testing-library/jest-dom/extend-expect';
import { TextDecoder, TextEncoder } from 'util';
// setupTest.js

import 'jest-environment-jsdom-global';


if (typeof TextDecoder === 'undefined') {
 global.TextDecoder = require('util').TextDecoder;
}


i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en', // Set default language here
  interpolation: {
    escapeValue: false,
  },
});

