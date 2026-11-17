import config from '@plone/volto/registry';
import { getFallbackLanguage } from './regionalLanguage';

beforeEach(() => {
  config.settings.supportedLanguages = ['en', 'nl', 'de', 'fr', 'pt-br'];
});

describe('getFallbackLanguage', () => {
  it('returns the base language of an unsupported regional variant', () => {
    expect(getFallbackLanguage('en-gb')).toBe('en');
    expect(getFallbackLanguage('nl-be')).toBe('nl');
    expect(getFallbackLanguage('de_AT')).toBe('de');
  });

  it('returns null when Volto supports the language itself', () => {
    expect(getFallbackLanguage('en')).toBeNull();
    expect(getFallbackLanguage('pt-br')).toBeNull();
  });

  it('returns null when the base language is not supported', () => {
    expect(getFallbackLanguage('es-mx')).toBeNull();
    expect(getFallbackLanguage('es')).toBeNull();
  });

  it('returns null for an empty language', () => {
    expect(getFallbackLanguage(undefined)).toBeNull();
    expect(getFallbackLanguage('')).toBeNull();
  });
});
