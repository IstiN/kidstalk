import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LANGUAGES,
  applyLanguage,
  bindLanguagePicker,
  getLanguage,
  homeUrl,
  languagePicker,
  localizeStory,
  printUrl,
  storyUrl,
  t,
} from '../src/i18n.js';
import { catStory } from '../src/stories/cat.js';
import { bunnyStory } from '../src/stories/bunny.js';

function installBrowser(context, { search = '', stored = null, languages = [], storageThrows = false } = {}) {
  const descriptors = ['window', 'document', 'navigator'].map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  const assigned = [];
  const select = {
    dataset: {},
    value: '',
    addEventListener(type, listener) { this.listener = listener; },
  };
  const storage = new Map(stored ? [['kidstalk-language', stored]] : []);

  globalThis.window = {
    location: {
      search,
      href: `https://example.test/kidstalk/${search}#book`,
      assign: (url) => assigned.push(url),
    },
    localStorage: {
      getItem: (key) => {
        if (storageThrows) throw new Error('Storage unavailable');
        return storage.get(key) ?? null;
      },
      setItem: (key, value) => {
        if (storageThrows) throw new Error('Storage unavailable');
        storage.set(key, value);
      },
    },
  };
  globalThis.document = {
    documentElement: { lang: '' },
    title: '',
    querySelectorAll: () => [select],
  };
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { languages, language: languages[0] },
  });

  context.after(() => {
    for (const [name, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  });
  return { assigned, select, storage };
}

test('supported languages include speech locales', () => {
  assert.deepEqual(LANGUAGES.map(({ id }) => id), ['ru', 'en', 'be']);
  assert.deepEqual(LANGUAGES.map(({ speech }) => speech), ['ru-RU', 'en-US', 'be-BY']);
});

test('query language has priority over storage and browser language', (context) => {
  installBrowser(context, { search: '?lang=en', stored: 'be', languages: ['ru-RU'] });
  assert.equal(getLanguage(), 'en');
});

test('stored language is validated and browser languages provide a fallback', (context) => {
  installBrowser(context, { stored: 'be', languages: ['en-US'] });
  assert.equal(getLanguage(), 'be');
});

test('browser language and unavailable storage fall back safely', (context) => {
  installBrowser(context, { stored: 'invalid', storageThrows: true, languages: ['fr-FR', 'be-BY'] });
  assert.equal(getLanguage(), 'be');
});

test('unsupported languages fall back to Russian', (context) => {
  installBrowser(context, { languages: ['fr-FR'] });
  assert.equal(getLanguage(), 'ru');
});

test('applyLanguage updates the document and interpolation uses the active locale', (context) => {
  installBrowser(context, { search: '?lang=en' });
  assert.equal(applyLanguage(), 'en');
  assert.equal(document.documentElement.lang, 'en');
  assert.match(document.title, /Say It With Me/);
  assert.equal(t('common.words', { count: 12 }), '12 words');
  assert.equal(t('missing.translation.key'), 'missing.translation.key');
});

test('English story localization preserves scene contracts and source data', () => {
  const original = structuredClone(catStory);
  const localized = localizeStory(catStory, 'en');

  assert.equal(localized.title, 'Kitty and the Ball');
  assert.equal(localized.lines[0].words[0].word, 'Kitty');
  assert.equal(localized.lines[0].words[0].action, catStory.lines[0].words[0].action);
  assert.deepEqual(localized.lines[0].words[0].symbol, catStory.lines[0].words[0].symbol);
  assert.equal(localized.extraWords[0].word, 'window');
  assert.deepEqual(catStory, original);
  assert.notEqual(localized, catStory);
});

test('Belarusian story localization covers every source word and caption', () => {
  const localized = localizeStory(bunnyStory, 'be');
  const sourceWords = bunnyStory.lines.flatMap((line) => line.words);
  const localizedWords = localized.lines.flatMap((line) => line.words);

  assert.equal(localized.title, 'Зайка');
  assert.deepEqual(localized.lines[0].words.map(({ word }) => word), ['Зайку', 'кінула', 'гаспадыня']);
  assert.equal(localizedWords.length, sourceWords.length);
  localizedWords.forEach((word, index) => {
    assert.ok(word.word.length > 0);
    assert.ok(word.caption.length > 0);
    assert.equal(word.id, sourceWords[index].id);
  });
});

test('language picker marks the current language and preserves print query parameters', (context) => {
  const { assigned, select, storage } = installBrowser(context, { search: '?story=cat&print=1&lang=ru' });
  assert.match(languagePicker(), /value="ru" selected/);
  bindLanguagePicker();
  bindLanguagePicker();
  select.value = 'be';
  select.listener();

  assert.equal(storage.get('kidstalk-language'), 'be');
  assert.equal(assigned.length, 1);
  assert.equal(assigned[0], '/kidstalk/?story=cat&print=1&lang=be#book');
});

test('language picker works without storage and ignores invalid values', (context) => {
  const { assigned, select } = installBrowser(context, { search: '?lang=ru', storageThrows: true });
  bindLanguagePicker();
  select.value = 'en';
  select.listener();
  select.value = 'invalid';
  select.listener();

  assert.equal(assigned.length, 1);
  assert.match(assigned[0], /lang=en/);
});

test('navigation URLs retain the requested language', () => {
  assert.equal(storyUrl('cat', 'en'), '?story=cat&lang=en');
  assert.equal(homeUrl('be'), './?lang=be');
  assert.equal(printUrl('bunny', 'en'), '?story=bunny&print=1&lang=en');
  assert.equal(storyUrl('cat', 'invalid'), '?story=cat&lang=ru');
});
