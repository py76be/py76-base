/**
 * Switch the UI language for content in a regional language variant.
 *
 * Volto's api middleware only switches the UI language when the language of
 * the content (for example `en-gb`) is literally in
 * `config.settings.supportedLanguages`.  For a regional variant that is not
 * supported itself, we fall back to the base language (`en`) when that one
 * is supported.
 *
 * This is only needed on the client: during server side rendering Volto
 * already falls back to the base language.
 */
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { changeLanguage } from '@plone/volto/actions/language/language';
import {
  toGettextLang,
  toReactIntlLang,
} from '@plone/volto/helpers/Utils/Utils';
import config from '@plone/volto/registry';

/**
 * Get the base language of a regional variant that Volto does not support.
 * @param {string} lang Language code, like `en-gb`.
 * @returns {string|null} Base language, like `en`, or null if not applicable.
 */
export const getFallbackLanguage = (lang) => {
  const { supportedLanguages } = config.settings;
  if (!lang || supportedLanguages.includes(lang)) {
    // Not set, or Volto handles this itself.
    return null;
  }
  const base = lang.split(/[-_]/)[0];
  if (base === lang || !supportedLanguages.includes(base)) {
    return null;
  }
  return base;
};

const regionalLanguageMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    if (
      __CLIENT__ &&
      action.type === `${GET_CONTENT}_SUCCESS` &&
      !action.subrequest
    ) {
      const lang = getFallbackLanguage(action.result?.language?.token);
      if (lang && getState().intl.locale !== toReactIntlLang(lang)) {
        import(
          /* @vite-ignore */ '@root/../locales/' + toGettextLang(lang) + '.json'
        ).then((locale) => {
          dispatch(changeLanguage(lang, locale.default));
        });
      }
    }
    return result;
  };

export default regionalLanguageMiddleware;
