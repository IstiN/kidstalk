export const catStory = {
  id: 'cat',
  title: 'Котик и мячик',
  author: 'Авторская история KidsTalk',
  format: 'Добрая история',
  emoji: '🐱',
  subtitle: 'Мячик и помощь мамы',
  description: 'Нажимай на слова и предметы в комнате. Здесь все можно потрогать.',
  shortDescription: 'Мячик закатился под стул. Котик попробует достать его лапкой, а мама придёт на помощь.',
  preview: '/previews/cat.webp',
  tags: ['Игра', 'Дом', 'Помощь'],
  scene: 'cat',
  initialState: { cat: 'near-ball', ball: 'floor', mom: 'away' },
  initialCaption: 'Котик играет в комнате. Рядом лежит красный мячик. Начнём?',
  finalCaption: 'Мячик снова у котика! Можно поиграть ещё раз или потрогать предметы в комнате.',
  elements: {
    cat: 'kotik',
    ball: 'myachik',
    chair: 'pod-stul',
    paw: 'lapkoy',
    mom: 'mama',
    window: 'okno',
  },
  extraWords: [
    {
      id: 'okno', word: 'окно', action: 'focusWindow', minDuration: 1200,
      caption: 'Это окно. В нём светит тёплое солнышко.',
      symbol: { set: 'local', id: 'window' },
    },
  ],
  lines: [
    {
      id: 'line-1',
      initialState: { cat: 'near-ball', ball: 'floor', mom: 'away' },
      words: [
        {
          id: 'kotik', word: 'Котик', action: 'focusCat', minDuration: 1200,
          caption: 'Знакомься: это котик. Он машет лапкой и рад тебя видеть.',
          symbol: { set: 'arasaac', id: 2406, sourceWord: 'кот' },
        },
        {
          id: 'nashyol', word: 'нашёл', action: 'findBall', minDuration: 1600,
          caption: 'Котик смотрит в сторону и замечает мячик: вот он!',
          symbol: { set: 'arasaac', id: 24741, sourceWord: 'находить' },
        },
        {
          id: 'myachik', word: 'мячик', action: 'focusBall', minDuration: 1400,
          caption: 'Красный мячик подпрыгивает на месте. С ним можно играть.',
          symbol: { set: 'arasaac', id: 2269, sourceWord: 'мяч' },
        },
      ],
    },
    {
      id: 'line-2',
      initialState: { cat: 'near-ball', ball: 'floor', mom: 'away' },
      words: [
        {
          id: 'pokatil', word: 'Покатил', action: 'rollBall', minDuration: 2100,
          caption: 'Котик толкает мячик лапкой. Мячик катится к стулу.',
          symbol: { set: 'local', id: 'roll' },
        },
        {
          id: 'ego', word: 'его', action: 'focusIt', minDuration: 1200,
          caption: '«Его» — это мячик. Следим, как он катится.',
          symbol: { set: 'arasaac', id: 2269, sourceWord: 'мяч' },
        },
        {
          id: 'pod-stul', word: 'под стул', action: 'ballUnderChair', minDuration: 2200,
          caption: 'Мячик закатывается прямо под сиденье стула, а котик идёт за ним.',
          symbol: { set: 'local', id: 'underChair' },
        },
      ],
    },
    {
      id: 'line-3',
      initialState: { cat: 'near-chair', ball: 'under-chair', mom: 'away' },
      words: [
        {
          id: 'lapkoy', word: 'Лапкой', action: 'showPaw', minDuration: 1400,
          caption: 'Котик показывает свою мягкую лапку: ей он попробует достать мячик.',
          symbol: { set: 'local', id: 'catPaw' },
        },
        {
          id: 'dostat', word: 'достать', action: 'reachBall', minDuration: 2200,
          caption: 'Котик подходит ближе и приподнимает лапку, но мячик всё ещё далеко под стулом.',
          symbol: { set: 'arasaac', id: 5568, sourceWord: 'доставать' },
        },
        {
          id: 'ne-smog', word: 'не смог', action: 'cannotReach', minDuration: 2200,
          caption: 'Мячик слишком далеко. Котик убирает лапку и грустно качает головой.',
          symbol: { set: 'local', id: 'cannot' },
        },
      ],
    },
    {
      id: 'line-4',
      initialState: { cat: 'near-chair', ball: 'under-chair', mom: 'away' },
      words: [
        {
          id: 'mama', word: 'Мама', action: 'enterMom', minDuration: 2600,
          caption: 'Мама приходит и подходит к котику. Она хочет помочь.',
          symbol: { set: 'arasaac', id: 2458, sourceWord: 'мама' },
        },
        {
          id: 'pomogla', word: 'помогла', action: 'helpCat', minDuration: 2500,
          caption: 'Мама опускает хвост под стул и выталкивает им мячик обратно котику.',
          symbol: { set: 'arasaac', id: 4570, sourceWord: 'помогать' },
        },
        {
          id: 'kotiku', word: 'котику', action: 'celebrateCat', minDuration: 1700,
          caption: 'Котик снова рад! Мячик рядом, а мама рядом с котиком.',
          symbol: { set: 'arasaac', id: 2406, sourceWord: 'кот' },
        },
      ],
    },
  ],
};
