import I18n from 'react-native-i18n';
import vi from './vi.json';
import en from './en.json';

const TRANSLATIONS = {
  en,
  vi,
};

const configI18n = () => {
  I18n.fallbacks = true;
  I18n.translations = TRANSLATIONS;
};

export default configI18n;
