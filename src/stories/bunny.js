export const bunnyStory = {
  id: 'bunny',
  title: 'Зайка',
  author: 'Агния Барто',
  format: 'По стихотворению',
  emoji: '🐰',
  subtitle: 'Дождь и скамейка',
  description: 'Нажимай на слова, зайку и предметы вокруг него.',
  shortDescription: 'Зайка остался на скамейке под дождём. Наблюдай, называй предметы и говори о чувствах.',
  preview: '/previews/bunny.webp',
  tags: ['Дождь', 'Скамейка', 'Чувства'],
  scene: 'bunny',
  initialState: { owner: 'near', rain: false, wet: 0 },
  initialCaption: 'Хозяйка стоит рядом с зайкой. Начнём историю?',
  elements: {
    bunny: 'zayka',
    bench: 'skameyki',
    owner: 'hozyayka',
    cloud: 'tucha',
    rain: 'dozhdem',
  },
  extraWords: [
    {
      id: 'tucha', word: 'туча', action: 'focusCloud', minDuration: 1300,
      caption: 'Это туча. Она находится над зайкой и приносит дождь.',
      symbol: { set: 'local', id: 'cloud' },
    },
  ],
  finalCaption: 'Вот и вся история. Можно послушать её ещё раз или собрать свою фразу.',
  lines: [
    {
      id: 'line-1',
      initialState: { owner: 'near', rain: false, wet: 0 },
      words: [
        {
          id: 'zayku', word: 'Зайку', action: 'focusBunny', minDuration: 1200,
          caption: 'Посмотри на зайку: он сидит на скамейке рядом с хозяйкой.',
          symbol: { set: 'arasaac', id: 17265, sourceWord: 'заяц' },
        },
        {
          id: 'brosila', word: 'бросила', action: 'abandon', minDuration: 3000,
          caption: 'Хозяйка поворачивается и медленно уходит, оставляя зайку одного.',
          symbol: { set: 'arasaac', id: 5447, sourceWord: 'бросать, оставлять' },
        },
        {
          id: 'hozyayka', word: 'хозяйка', action: 'focusOwner', minDuration: 1800,
          caption: 'Это хозяйка. Она уходит всё дальше, а зайка остаётся на скамейке.',
          symbol: { set: 'arasaac', id: 2484, sourceWord: 'девочка' },
        },
      ],
    },
    {
      id: 'line-2',
      initialState: { owner: 'away', rain: false, wet: 0 },
      words: [
        {
          id: 'pod', word: 'под', action: 'showUnder', minDuration: 1400,
          caption: 'Туча оказывается прямо над зайкой: зайка — под тучей.',
          symbol: { set: 'arasaac', id: 7047, sourceWord: 'под' },
        },
        {
          id: 'dozhdem', word: 'дождём', action: 'startRain', minDuration: 1700,
          caption: 'Только теперь начинается дождь. Первые капли падают на зайку.',
          symbol: { set: 'arasaac', id: 3123, sourceWord: 'дождь' },
        },
        {
          id: 'ostalsya', word: 'остался', action: 'stayAlone', minDuration: 1500,
          caption: 'Хозяйки больше нет. Зайка остался совсем один.',
          symbol: { set: 'local', id: 'stay' },
        },
        {
          id: 'zayka', word: 'зайка', action: 'focusBunny', minDuration: 1200,
          caption: 'Зайка поднимает голову и смотрит вокруг: рядом никого.',
          symbol: { set: 'arasaac', id: 17265, sourceWord: 'заяц' },
        },
      ],
    },
    {
      id: 'line-3',
      initialState: { owner: 'away', rain: true, wet: 0.12 },
      words: [
        {
          id: 'so', word: 'со', action: 'showFromBench', minDuration: 1200,
          caption: 'Зайка сдвигается к краю: ему нужно слезть со скамейки.',
          symbol: { set: 'arasaac', id: 7064, sourceWord: 'с, со' },
        },
        {
          id: 'skameyki', word: 'скамейки', action: 'focusBench', minDuration: 1400,
          caption: 'Вот скамейка. До земли от её сиденья довольно высоко.',
          symbol: { set: 'arasaac', id: 3255, sourceWord: 'скамейка' },
        },
        {
          id: 'slezt', word: 'слезть', action: 'attemptDown', minDuration: 2100,
          caption: 'Зайка наклоняется вперёд и осторожно тянет лапку вниз.',
          symbol: { set: 'arasaac', id: 8035, sourceWord: 'спускаться' },
        },
        {
          id: 'ne-smog', word: 'не смог', action: 'cannotDown', minDuration: 2300,
          caption: 'Слишком высоко! Зайка убирает лапку, качает головой и возвращается.',
          symbol: { set: 'local', id: 'cannot' },
        },
      ],
    },
    {
      id: 'line-4',
      initialState: { owner: 'away', rain: true, wet: 0.25 },
      words: [
        {
          id: 'ves', word: 'весь', action: 'showWhole', minDuration: 1400,
          caption: 'Капли уже на ушах, на голове, на спинке и на лапках — на всём зайке.',
          symbol: { set: 'local', id: 'whole' },
        },
        {
          id: 'do', word: 'до', action: 'showUntil', minDuration: 1600,
          caption: 'Следим за каплей: она проходит от самых ушей до самых ниточек.',
          symbol: { set: 'arasaac', id: 7771, sourceWord: 'до' },
        },
        {
          id: 'nitochki', word: 'ниточки', action: 'showThreads', minDuration: 1700,
          caption: 'Вот швы и ниточки на игрушке. Они тоже становятся мокрыми.',
          symbol: { set: 'arasaac', id: 2978, sourceWord: 'нить' },
        },
        {
          id: 'promok', word: 'промок', action: 'getWet', minDuration: 2600,
          caption: 'Теперь видно: зайка весь промок — уши опустились, а мех стал тёмным.',
          symbol: { set: 'local', id: 'wet' },
        },
      ],
    },
  ],
};
