const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en', 'nl', 'de', 'fr'],
    defaultLanguage: 'en',
  };
  return config;
};

export default applyConfig;
