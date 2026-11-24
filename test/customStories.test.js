import test from 'node:test';
import assert from 'node:assert/strict';
import {
  arasaacUrl,
  defaultSymbolForWord,
  findLocalWordMatch,
  mapActionForCharacter,
  resolveSymbolForWord,
  searchArasaacSymbols,
} from '../src/symbols/symbolLookup.js';
import {
  buildCustomStoryDefinition,
  deleteCustomStoryRecord,
  getCustomStories,
  getCustomStory,
  loadCustomStoryRecords,
  parseWordsInput,
  saveCustomStoryRecord,
} from '../src/stories/customStories.js';

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
}

test('local dictionary matches everyday child request words including TV typo', () => {
  const dad = findLocalWordMatch('Папа');
  const turnOn = findLocalWordMatch('Включи');
  const tv = findLocalWordMatch('Телевезор');
  assert.equal(dad.arasaacId, 31146);
  assert.equal(turnOn.arasaacId, 21818);
  assert.equal(tv.arasaacId, 25498);
  assert.equal(arasaacUrl(25498), 'https://static.arasaac.org/pictograms/25498/25498_500.png');
  assert.equal(findLocalWordMatch(''), null);
});

test('defaultSymbolForWord and resolveSymbolForWord combine local and ARASAAC search results', async () => {
  const fallback = defaultSymbolForWord('НеизвестноеСлово');
  assert.equal(fallback.symbol.set, 'emoji');

  const mockFetch = async () => ({
    ok: true,
    json: async () => ([
      { _id: 25498, keywords: [{ keyword: 'телевизор' }] },
      { _id: 9999, keywords: [{ keyword: 'экран' }] },
    ]),
  });

  const remote = await searchArasaacSymbols('Телевизор', 'ru', { fetchImpl: mockFetch });
  assert.equal(remote.length, 2);
  assert.equal(remote[0].id, 25498);

  const combined = await resolveSymbolForWord('Телевизор', 'ru', { fetchImpl: mockFetch });
  assert.equal(combined.symbol.id, 25498);
  assert.equal(combined.alternatives.length, 2);

  const failed = await resolveSymbolForWord('УникальноеСлово', 'en', {
    fetchImpl: async () => ({ ok: false }),
  });
  assert.equal(failed.symbol.set, 'emoji');

  const thrown = await searchArasaacSymbols('test', 'en', {
    fetchImpl: async () => { throw new Error('offline'); },
  });
  assert.deepEqual(thrown, []);
});

test('mapActionForCharacter adapts actions for tom, cat, bunny, and cards', () => {
  assert.equal(mapActionForCharacter('dance', 'tom'), 'dance');
  assert.equal(mapActionForCharacter('unknown', 'tom'), 'hello');
  assert.equal(mapActionForCharacter('ball', 'cat'), 'roll-ball');
  assert.equal(mapActionForCharacter('jump', 'cat'), 'celebrate-cat');
  assert.equal(mapActionForCharacter('walk', 'cat'), 'find-ball');
  assert.equal(mapActionForCharacter('hello', 'cat'), 'focus-cat');
  assert.equal(mapActionForCharacter('wash', 'bunny'), 'start-rain');
  assert.equal(mapActionForCharacter('sleep', 'bunny'), 'stay-alone');
  assert.equal(mapActionForCharacter('hello', 'bunny'), 'focus-bunny');
  assert.equal(mapActionForCharacter('dance', 'cards'), 'show-card');
  assert.equal(mapActionForCharacter('dance', 'other'), 'hello');
});

test('custom stories parse words, persist to storage, build definitions, and delete cleanly', () => {
  assert.deepEqual(parseWordsInput('Папа, Включи Телевизор; '), ['Папа', 'Включи', 'Телевизор']);

  const storage = createMemoryStorage();
  const initial = loadCustomStoryRecords(storage);
  assert.equal(initial.length, 1);
  assert.equal(initial[0].id, 'custom-tv');

  const saved = saveCustomStoryRecord({
    title: 'Мама дай воду',
    character: 'cat',
    words: [{ word: 'Мама' }, { word: 'Дай' }, { word: 'Вода' }],
  }, storage);
  assert.ok(saved.id.startsWith('custom-'));

  const fetched = getCustomStory(saved.id, storage);
  assert.equal(fetched.custom, true);
  assert.equal(fetched.scene, 'cat');
  assert.equal(fetched.lines[0].words.length, 3);

  const updated = saveCustomStoryRecord({
    id: saved.id,
    title: 'Мама дай сок',
    character: 'cards',
    words: [{ word: 'Мама' }, { word: 'Сок' }],
  }, storage);
  assert.equal(updated.id, saved.id);
  assert.equal(buildCustomStoryDefinition(updated).scene, 'cards');

  assert.equal(saveCustomStoryRecord({ words: [] }, storage), null);
  assert.ok(getCustomStories(storage).length >= 2);

  deleteCustomStoryRecord(saved.id, storage);
  assert.equal(getCustomStory(saved.id, storage), null);
});
