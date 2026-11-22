export const tomStory = {
  id: 'tom',
  title: 'Том',
  author: 'Оригинальный персонаж KidsTalk',
  format: 'Действия и игра',
  emoji: '🐱',
  subtitle: 'Движение, радость и забота',
  description: 'Выбирай карточки слева и смотри на Тома справа. Называй движения, чувства и полезные действия.',
  shortDescription: 'Серый котёнок Том любит двигаться, смеяться, заботиться о себе и играть. Выбери действие и повтори его вместе с ним.',
  preview: '/previews/tom.svg',
  previewLine: 1,
  tags: ['Движение', 'Эмоции', 'Привычки'],
  scene: 'tom',
  initialState: { tom: 'idle' },
  initialCaption: 'Знакомься: это Том, серый котёнок с зелёными глазами и в красной футболке. Выбери действие!',
  finalCaption: 'Том показал все действия: движение, радость, заботу, отдых и игру. Можно начать ещё раз!',
  elements: {
    tom: 'hello',
    ball: 'ball',
  },
  lines: [
    {
      id: 'line-1',
      words: [
        {
          id: 'walk', word: 'Идти', action: 'walk', minDuration: 2000, element: 'tom',
          caption: 'Том идёт вперёд, спокойно переставляя лапки. Иди вместе с ним!',
          symbol: { set: 'openmoji', id: '1F6B6' },
        },
        {
          id: 'run', word: 'Бежать', action: 'run', minDuration: 1900, element: 'tom',
          caption: 'Том бежит быстро и весело. Его лапки движутся, а хвост помогает держать равновесие.',
          symbol: { set: 'openmoji', id: '1F3C3' },
        },
        {
          id: 'jump', word: 'Прыгать', action: 'jump', minDuration: 2100, element: 'tom',
          caption: 'Том приседает, отталкивается лапками и радостно подпрыгивает вверх!',
          symbol: { set: 'openmoji', id: '1F938' },
        },
      ],
    },
    {
      id: 'line-2',
      words: [
        {
          id: 'hello', word: 'Привет', action: 'hello', minDuration: 1700, element: 'tom',
          caption: 'Том улыбается и машет поднятой лапкой. Помаши ему и скажи: «Привет!»',
          symbol: { set: 'openmoji', id: '1F44B' },
        },
        {
          id: 'laugh', word: 'Смеяться', action: 'laugh', minDuration: 2100, element: 'tom',
          caption: 'Том весело смеётся: глаза сияют, а усы подпрыгивают. Посмейся вместе с ним!',
          symbol: { set: 'openmoji', id: '1F603' },
        },
        {
          id: 'dance', word: 'Танцевать', action: 'dance', minDuration: 2500, element: 'tom',
          caption: 'Том танцует: покачивается, поднимает лапки и топает в такт музыке.',
          symbol: { set: 'openmoji', id: '1F483' },
        },
      ],
    },
    {
      id: 'line-3',
      words: [
        {
          id: 'brush-teeth', word: 'Чистить зубы', action: 'brush-teeth', minDuration: 2500, element: 'tom',
          caption: 'Том берёт зубную щётку и тщательно чистит зубы. Чистим зубы утром и вечером!',
          symbol: { set: 'openmoji', id: '1FAA5' },
        },
        {
          id: 'wash', word: 'Умываться', action: 'wash', minDuration: 2300, element: 'tom',
          caption: 'Том умывается чистой водой, а потом вытирает мордочку мягким полотенцем.',
          symbol: { set: 'openmoji', id: '1F6BF' },
        },
        {
          id: 'eat', word: 'Кушать', action: 'eat', minDuration: 2200, element: 'tom',
          caption: 'Том сидит за столом и спокойно кушает. Приятного аппетита, Том!',
          symbol: { set: 'openmoji', id: '1F374' },
        },
      ],
    },
    {
      id: 'line-4',
      words: [
        {
          id: 'sleep', word: 'Спать', action: 'sleep', minDuration: 2500, element: 'tom',
          caption: 'Том уютно устраивается на подушке, закрывает глаза и спокойно засыпает.',
          symbol: { set: 'openmoji', id: '1F634' },
        },
        {
          id: 'ball', word: 'Мяч', action: 'ball', minDuration: 1900, element: 'ball',
          caption: 'Том подбрасывает яркий мяч, ловит его лапками и радостно играет.',
          symbol: { set: 'openmoji', id: '26BD' },
        },
        {
          id: 'sing', word: 'Петь', action: 'sing', minDuration: 2400, element: 'tom',
          caption: 'Том поёт свою любимую песенку. Вокруг него танцуют весёлые ноты!',
          symbol: { set: 'openmoji', id: '1F3A4' },
        },
      ],
    },
  ],
};
