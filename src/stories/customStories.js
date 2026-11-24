import { defaultSymbolForWord, mapActionForCharacter } from '../symbols/symbolLookup.js';

export const CUSTOM_STORIES_KEY = 'kidstalk-custom-stories-v1';

const DEFAULT_CUSTOM_STORIES = [
  {
    id: 'custom-tv',
    title: 'Папа, включи телевизор',
    emoji: '📺',
    character: 'tom',
    words: [
      { word: 'Папа', ...defaultSymbolForWord('Папа') },
      { word: 'Включи', ...defaultSymbolForWord('Включи') },
      { word: 'Телевизор', ...defaultSymbolForWord('Телевизор') },
    ],
  },
];

function getStorage(storage) {
  if (storage) return storage;
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

export function parseWordsInput(input) {
  return String(input || '')
    .split(/[\n,;]+|\s{2,}|\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function isValidStoryRecord(item) {
  return Boolean(item && typeof item.id === 'string' && Array.isArray(item.words) && item.words.length);
}

export function loadCustomStoryRecords(storage) {
  const store = getStorage(storage);
  if (!store) return [...DEFAULT_CUSTOM_STORIES];
  try {
    const raw = store.getItem(CUSTOM_STORIES_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter(isValidStoryRecord) : [...DEFAULT_CUSTOM_STORIES];
  } catch {
    return [...DEFAULT_CUSTOM_STORIES];
  }
}

export function saveCustomStoryRecords(records, storage) {
  const store = getStorage(storage);
  if (!store) return false;
  try {
    store.setItem(CUSTOM_STORIES_KEY, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

function normalizeCustomWord(item) {
  const text = String(item.word).trim();
  const fallback = defaultSymbolForWord(text);
  return {
    word: text,
    symbol: item.symbol || fallback.symbol,
    action: item.action || fallback.action,
    emoji: item.emoji || fallback.emoji,
  };
}

function resolveCustomId(rawId) {
  const candidate = String(rawId || '');
  return candidate.startsWith('custom-') ? candidate : `custom-${Date.now().toString(36)}`;
}

function resolveCharacter(character) {
  return ['tom', 'cat', 'bunny', 'cards'].includes(character) ? character : 'tom';
}

function normalizeCustomRecord(record, cleanWords) {
  const title = String(record.title || '').trim();
  const emoji = String(record.emoji || '').trim();
  return {
    id: resolveCustomId(record.id),
    title: title || cleanWords.map((item) => item.word).join(' '),
    emoji: emoji || cleanWords[0].emoji || '✨',
    character: resolveCharacter(record.character),
    words: cleanWords,
  };
}

export function saveCustomStoryRecord(record, storage) {
  const cleanWords = (record.words || [])
    .filter((item) => item && String(item.word || '').trim())
    .slice(0, 12)
    .map(normalizeCustomWord);
  if (!cleanWords.length) return null;

  const records = loadCustomStoryRecords(storage);
  const saved = normalizeCustomRecord(record, cleanWords);
  const index = records.findIndex((item) => item.id === saved.id);
  if (index >= 0) records[index] = saved;
  else records.unshift(saved);
  saveCustomStoryRecords(records, storage);
  return saved;
}

export function deleteCustomStoryRecord(id, storage) {
  const records = loadCustomStoryRecords(storage).filter((item) => item.id !== id);
  saveCustomStoryRecords(records, storage);
  return records;
}

export function buildCustomStoryDefinition(record) {
  const character = record.character || 'tom';
  const words = record.words.map((item, index) => ({
    id: `w-${index + 1}`,
    word: item.word,
    action: mapActionForCharacter(item.action || 'hello', character),
    caption: item.word,
    symbol: item.symbol,
    minDuration: 1100,
    pauseAfter: 240,
  }));

  const lines = [];
  for (let i = 0; i < words.length; i += 4) {
    lines.push({
      id: `line-${Math.floor(i / 4) + 1}`,
      initialState: {},
      words: words.slice(i, i + 4),
    });
  }

  return {
    id: record.id,
    custom: true,
    character,
    scene: character === 'cards' ? 'cards' : character,
    title: record.title,
    subtitle: words.map((item) => item.word).join(' · '),
    shortDescription: words.map((item) => item.word).join(' '),
    author: 'Моя история',
    format: `${words.length} сл.`,
    emoji: record.emoji || '✨',
    preview: character === 'cards' ? '/previews/tom.svg' : `/previews/${character}.svg`,
    tags: ['Моя история', 'Карточки'],
    initialState: {},
    initialCaption: record.title,
    storyCompleteCaption: words.map((item) => item.word).join(' '),
    description: words.map((item) => item.word).join(' '),
    lines,
    extraWords: [],
  };
}

export function getCustomStories(storage) {
  return loadCustomStoryRecords(storage).map(buildCustomStoryDefinition);
}

export function getCustomStory(id, storage) {
  const record = loadCustomStoryRecords(storage).find((item) => item.id === id);
  return record ? buildCustomStoryDefinition(record) : null;
}
