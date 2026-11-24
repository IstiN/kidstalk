const ARASAAC_API = 'https://api.arasaac.org/v1/pictograms';
const ARASAAC_STATIC = 'https://static.arasaac.org/pictograms';

const WORD_DICTIONARY = [
  { terms: ['папа', 'dad', 'daddy', 'papa', 'тата'], arasaacId: 31146, emoji: '👨', action: 'hello' },
  { terms: ['мама', 'mom', 'mommy', 'mama'], arasaacId: 2458, emoji: '👩', action: 'hello' },
  { terms: ['бабушка', 'grandma', 'бабуля'], arasaacId: 23710, emoji: '👵', action: 'hello' },
  { terms: ['дедушка', 'grandpa', 'дзядуля'], arasaacId: 23718, emoji: '👴', action: 'hello' },
  { terms: ['включи', 'включить', 'turn on', 'switch on', 'уключы', 'уключыць'], arasaacId: 21818, emoji: '🔘', action: 'hello' },
  { terms: ['выключи', 'выключить', 'turn off', 'выключы'], arasaacId: 11739, emoji: '⏻', action: 'hello' },
  { terms: ['телевизор', 'телевезор', 'тв', 'мультики', 'мультик', 'tv', 'television', 'cartoon', 'тэлевізар'], arasaacId: 25498, emoji: '📺', action: 'dance' },
  { terms: ['телефон', 'phone', 'смартфон', 'тэлефон'], arasaacId: 25269, emoji: '📱', action: 'hello' },
  { terms: ['планшет', 'tablet', 'ipad'], arasaacId: 28099, emoji: '📲', action: 'hello' },
  { terms: ['дай', 'дайте', 'give', 'want', 'хочу', 'хачу'], arasaacId: 28431, emoji: '🤲', action: 'hello' },
  { terms: ['помоги', 'помощь', 'help', 'дапамажы'], arasaacId: 32648, emoji: '🤝', action: 'hello' },
  { terms: ['пойдем', 'пойдём', 'идём', 'идем', 'иди', 'гулять', 'walk', 'go', 'ідзі', 'гуляць'], arasaacId: 29951, emoji: '🚶', action: 'walk' },
  { terms: ['беги', 'бежать', 'бегать', 'run', 'бяжы'], arasaacId: 6465, emoji: '🏃', action: 'run' },
  { terms: ['прыгай', 'прыгать', 'jump', 'скачы'], arasaacId: 39052, emoji: '🤸', action: 'jump' },
  { terms: ['привет', 'пока', 'hello', 'hi', 'bye', 'прывітанне'], arasaacId: 6522, emoji: '👋', action: 'hello' },
  { terms: ['смех', 'смейся', 'смеяться', 'весело', 'laugh', 'happy', 'смяяцца'], arasaacId: 13354, emoji: '😄', action: 'laugh' },
  { terms: ['танцуй', 'танцевать', 'музыка', 'dance', 'music', 'танцаваць'], arasaacId: 35747, emoji: '💃', action: 'dance' },
  { terms: ['зубы', 'чистить', 'щётка', 'щетка', 'brush', 'teeth', 'чысціць'], arasaacId: 2326, emoji: '🪥', action: 'brush-teeth' },
  { terms: ['мыть', 'умываться', 'купаться', 'ванна', 'душ', 'wash', 'bath', 'мыцца'], arasaacId: 34826, emoji: '🚿', action: 'wash' },
  { terms: ['кушать', 'есть', 'еда', 'ням', 'eat', 'food', 'есці'], arasaacId: 6456, emoji: '🍽️', action: 'eat' },
  { terms: ['пить', 'вода', 'сок', 'молоко', 'чай', 'drink', 'water', 'juice', 'milk', 'піць', 'вада'], arasaacId: 6061, emoji: '🥤', action: 'eat' },
  { terms: ['спать', 'сон', 'кровать', 'бай', 'sleep', 'bed', 'спаць'], arasaacId: 6479, emoji: '😴', action: 'sleep' },
  { terms: ['мяч', 'мячик', 'играть', 'игра', 'игрушка', 'ball', 'play', 'toy', 'гуляць'], arasaacId: 3241, emoji: '⚽', action: 'ball' },
  { terms: ['петь', 'песня', 'пой', 'sing', 'song', 'спяваць'], arasaacId: 6960, emoji: '🎤', action: 'sing' },
  { terms: ['открой', 'открыть', 'open', 'адчыні'], arasaacId: 24825, emoji: '🚪', action: 'hello' },
  { terms: ['закрой', 'закрыть', 'close', 'зачыні'], arasaacId: 30383, emoji: '🔒', action: 'hello' },
  { terms: ['книга', 'книжку', 'читать', 'сказка', 'book', 'read', 'кніга'], arasaacId: 25191, emoji: '📖', action: 'hello' },
  { terms: ['машина', 'машинка', 'ехать', 'car', 'машына'], arasaacId: 2339, emoji: '🚗', action: 'run' },
  { terms: ['кот', 'котик', 'киса', 'cat', 'kitty'], arasaacId: 7114, emoji: '🐱', action: 'hello' },
  { terms: ['собака', 'собачка', 'гав', 'dog', 'сабака'], arasaacId: 7202, emoji: '🐶', action: 'jump' },
  { terms: ['зайка', 'заяц', 'bunny', 'rabbit'], arasaacId: 2351, emoji: '🐰', action: 'jump' },
  { terms: ['улица', 'парк', 'качели', 'outside', 'park', 'вуліца'], arasaacId: 5379, emoji: '🌳', action: 'walk' },
  { terms: ['туалет', 'горшок', 'toilet', 'potty'], arasaacId: 5921, emoji: '🚽', action: 'walk' },
  { terms: ['яблоко', 'банан', 'фрукт', 'печенье', 'конфета', 'apple', 'banana', 'cookie', 'яблык'], arasaacId: 2462, emoji: '🍎', action: 'eat' },
  { terms: ['обними', 'обнять', 'на ручки', 'hug', 'абдымі'], arasaacId: 4550, emoji: '🤗', action: 'hello' },
  { terms: ['ещё', 'еще', 'more', 'again', 'яшчэ'], arasaacId: 5508, emoji: '➕', action: 'jump' },
  { terms: ['да', 'yes', 'так'], arasaacId: 5584, emoji: '👍', action: 'laugh' },
  { terms: ['нет', 'не', 'no', 'не'], arasaacId: 5526, emoji: '🙅', action: 'hello' },
  { terms: ['свет', 'лампа', 'light', 'святло'], arasaacId: 8619, emoji: '💡', action: 'hello' },
];

export const CHARACTER_OPTIONS = [
  { id: 'tom', emoji: '🐱', scene: 'tom' },
  { id: 'cat', emoji: '🐈', scene: 'cat' },
  { id: 'bunny', emoji: '🐰', scene: 'bunny' },
  { id: 'cards', emoji: '🖼️', scene: 'cards' },
];

export const ACTION_FOR_SCENE = {
  tom: ['hello', 'walk', 'run', 'jump', 'laugh', 'dance', 'brush-teeth', 'wash', 'eat', 'sleep', 'ball', 'sing'],
  cat: ['focus-cat', 'find-ball', 'roll-ball', 'show-paw', 'enter-mom', 'celebrate-cat'],
  bunny: ['focus-bunny', 'focus-owner', 'start-rain', 'stay-alone', 'attempt-down', 'get-wet'],
};

export function arasaacUrl(id) {
  return `${ARASAAC_STATIC}/${id}/${id}_500.png`;
}

function normalizeTerm(word) {
  return String(word || '')
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-яіў0-9\s-]/gi, '')
    .replace(/\s+/g, ' ');
}

function matchesExactTerm(entry, normalized) {
  return entry.terms.some((term) => normalizeTerm(term) === normalized);
}

function matchesPartialTerm(entry, normalized) {
  return entry.terms.some((term) => {
    const clean = normalizeTerm(term);
    return clean.length >= 4 && (normalized.includes(clean) || clean.includes(normalized));
  });
}

export function findLocalWordMatch(word) {
  const normalized = normalizeTerm(word);
  if (!normalized) return null;
  return WORD_DICTIONARY.find((entry) => matchesExactTerm(entry, normalized))
    || WORD_DICTIONARY.find((entry) => matchesPartialTerm(entry, normalized))
    || null;
}

const CHARACTER_ACTION_MAPPERS = {
  cards: () => 'show-card',
  tom: (action) => (ACTION_FOR_SCENE.tom.includes(action) ? action : 'hello'),
  cat: (action) => ({
    ball: 'roll-ball',
    jump: 'celebrate-cat',
    dance: 'celebrate-cat',
    laugh: 'celebrate-cat',
    walk: 'find-ball',
    run: 'find-ball',
  }[action] || 'focus-cat'),
  bunny: (action) => ({ wash: 'start-rain', sleep: 'stay-alone' }[action] || 'focus-bunny'),
};

export function mapActionForCharacter(action, character = 'tom') {
  const mapper = CHARACTER_ACTION_MAPPERS[character];
  return mapper ? mapper(action) : 'hello';
}

export function defaultSymbolForWord(word) {
  const local = findLocalWordMatch(word);
  if (local) {
    return {
      symbol: { set: 'arasaac-remote', id: local.arasaacId, url: arasaacUrl(local.arasaacId), emoji: local.emoji },
      action: local.action,
      emoji: local.emoji,
    };
  }
  return {
    symbol: { set: 'emoji', id: '💬', emoji: '💬' },
    action: 'hello',
    emoji: '💬',
  };
}

function toRemoteSymbol(item, fallbackWord) {
  return {
    set: 'arasaac-remote',
    id: item._id,
    url: arasaacUrl(item._id),
    label: item.keywords?.[0]?.keyword || fallbackWord,
  };
}

export async function searchArasaacSymbols(word, language = 'ru', { fetchImpl = globalThis.fetch, limit = 6 } = {}) {
  const query = normalizeTerm(word);
  if (!query || typeof fetchImpl !== 'function') return [];
  const locale = language === 'en' ? 'en' : 'ru';
  try {
    const response = await fetchImpl(`${ARASAAC_API}/${locale}/search/${encodeURIComponent(query)}`);
    const items = response.ok ? await response.json() : [];
    return Array.isArray(items) ? items.slice(0, limit).map((item) => toRemoteSymbol(item, word)) : [];
  } catch {
    return [];
  }
}

export async function resolveSymbolForWord(word, language = 'ru', options = {}) {
  const local = findLocalWordMatch(word);
  const remote = await searchArasaacSymbols(word, language, options);
  const alternatives = [];
  if (local) {
    alternatives.push({
      set: 'arasaac-remote',
      id: local.arasaacId,
      url: arasaacUrl(local.arasaacId),
      emoji: local.emoji,
    });
  }
  for (const item of remote) {
    if (!alternatives.some((existing) => existing.id === item.id)) {
      alternatives.push(item);
    }
  }
  if (alternatives.length) {
    return {
      symbol: alternatives[0],
      alternatives: alternatives.slice(0, 6),
      action: local?.action || 'hello',
      emoji: local?.emoji || '⭐',
    };
  }
  return {
    symbol: { set: 'emoji', id: '⭐', emoji: '⭐' },
    alternatives: [],
    action: 'hello',
    emoji: '⭐',
  };
}
