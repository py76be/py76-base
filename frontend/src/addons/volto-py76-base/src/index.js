import regionalLanguageMiddleware from './middleware/regionalLanguage';

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en', 'nl', 'de', 'fr'],
    defaultLanguage: 'en',
    storeExtenders: [
      ...(config.settings.storeExtenders || []),
      (stack) => [...stack, regionalLanguageMiddleware],
    ],
  };
  return config;
};

export default applyConfig;
