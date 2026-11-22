export const LANGUAGES = [
  { id: 'ru', label: 'Русский', speech: 'ru-RU' },
  { id: 'en', label: 'English', speech: 'en-US' },
  { id: 'be', label: 'Беларуская', speech: 'be-BY' },
];

const LANGUAGE_KEY = 'kidstalk-language';
const LANGUAGE_IDS = new Set(LANGUAGES.map(({ id }) => id));

const translations = {
  ru: {
    'brand.name': 'Скажи со мной',
    'brand.tagline': 'слова оживают',
    'brand.homeAria': 'Скажи со мной — на главную',
    'catalog.documentTitle': 'Скажи со мной — интерактивные истории',
    'catalog.storiesLink': 'Истории',
    'catalog.eyebrow': 'ИНТЕРАКТИВНЫЕ AAC-ИСТОРИИ',
    'catalog.heroTitle': 'Маленькие истории.',
    'catalog.heroTitleAccent': 'Большие слова.',
    'catalog.heroText': 'Слушай, трогай и рассказывай. Каждое слово можно услышать, а каждый предмет — потрогать.',
    'catalog.chooseStory': 'Выбрать историю',
    'catalog.heroNote': 'Для детей, родителей и специалистов',
    'catalog.bunny': 'Зайка',
    'catalog.cat': 'Котик',
    'catalog.listenWord': 'слушай',
    'catalog.touchWord': 'трогай',
    'catalog.featuresAria': 'Возможности приложения',
    'catalog.listenTitle': 'Слушай',
    'catalog.listenText': 'Слова произносит русский голос устройства',
    'catalog.touchTitle': 'Трогай',
    'catalog.touchText': 'Герои и предметы отвечают на нажатие',
    'catalog.composeTitle': 'Составляй',
    'catalog.composeText': 'Собирай и озвучивай собственные фразы',
    'catalog.library': 'БИБЛИОТЕКА',
    'catalog.storiesTitle': 'Что послушаем сегодня?',
    'catalog.storyCount': '{count} истории',
    'catalog.openStoryAria': 'Открыть историю «{title}»',
    'catalog.previewAlt': 'Превью истории «{title}»',
    'catalog.openStory': 'Открыть историю',
    'catalog.interactionTitle': 'Здесь можно нажимать не только на карточки',
    'catalog.interactionText': 'Потрогай зайку, скамейку, тучу, котика или мячик прямо в 3D-сцене — предмет ответит словом и движением.',
    'common.words': '{count} слов',
    'footer.message': 'Каждое слово важно',
    'footer.symbols': 'Пиктограммы: Sergio Palao / ARASAAC · CC BY-NC-SA 4.0',
    'language.label': 'Язык',
    'language.auto': 'Авто: {language}',
    'print.view': 'Версия для печати',
    'print.title': 'Скажи со мной — книга для чтения',
    'print.action': 'Печать',
    'print.mode': 'Вариант',
    'print.color': 'Цветная',
    'print.coloring': 'Раскраска',
    'print.back': 'Назад к истории',
    'print.coverEyebrow': 'КНИГА ДЛЯ ЧТЕНИЯ И РАЗГОВОРА',
    'print.line': 'Страница {current} из {total}',
    'print.page': 'Страница {current} / {total}',
    'print.hint': 'Называй картинки, читай слова и рассказывай историю своими словами.',
    'print.dialogHint': 'Формат A4, альбомная ориентация. Для цветной версии включи фоновую графику.',
    'story.defaultDescription': 'Нажимай на карточки, слушай слова и рассказывай свою историю.',
    'story.switcherAria': 'Выбор истории',
    'story.switcherLabel': 'Выбери историю',
    'story.eyebrow': 'ИНТЕРАКТИВНАЯ ИСТОРИЯ',
    'story.soundOn': 'Звук включён',
    'story.soundOff': 'Звук выключен',
    'story.voiceSettingsAria': 'Настройки речи',
    'story.voiceButton': 'Речь',
    'story.voiceTitle': 'Системный русский голос',
    'story.voiceSubtitle': 'Можно изменить скорость произношения',
    'story.speechRate': 'Скорость речи',
    'story.slower': 'медленнее',
    'story.faster': 'быстрее',
    'story.testVoice': 'Проверить голос',
    'story.testVoiceText': 'Привет! Давай расскажем историю «{title}» вместе.',
    'story.speechUnsupported': 'В этом браузере нет синтеза речи. Карточки и анимация работают, а для озвучивания открой страницу в Chrome, Edge или Safari.',
    'story.phraseTitle': 'Моя фраза',
    'story.phraseHelp': 'Нажми на слово в фразе, чтобы услышать его ещё раз',
    'story.phraseAria': 'Собранная фраза',
    'story.backspace': 'Удалить последнее слово',
    'story.clear': 'Очистить фразу',
    'story.speak': 'Произнести',
    'story.stop': 'Остановить',
    'story.phrasePlaceholder': 'Здесь появятся твои слова…',
    'story.speakWord': 'Произнести {word}',
    'story.removeWord': 'Удалить слово {word}',
    'story.wordAdded': '{word} — добавлено в фразу',
    'story.wordRemoved': 'Слово {word} удалено',
    'story.cardsTitle': 'Собери историю',
    'story.cardsHelp': 'Одно касание — одно слово',
    'story.lineAria': 'Строка {number}',
    'story.playLineAria': 'Озвучить строку {number}: {words}',
    'story.playLineTitle': 'Озвучить строку',
    'story.stopLineAria': 'Остановить строку {number}',
    'story.wordCardAria': '{word}. Произнести и добавить в фразу',
    'story.boardTip': 'Можно нажимать слова в любом порядке и придумать свою фразу',
    'story.visualAria': 'Трёхмерная иллюстрация: {title}',
    'story.sceneTouch': 'Трогай предметы в сцене',
    'story.indoors': 'В комнате',
    'story.touchHint': 'Нажимай на предметы',
    'story.playStory': 'Послушать всю историю',
    'story.stopStory': 'Остановить историю',
    'story.stopShort': 'стоп',
    'story.stepsAria': 'Как пользоваться страницей',
    'story.step1Title': 'Выбери слово',
    'story.step1Text': 'Нажми на любую карточку',
    'story.step2Title': 'Послушай',
    'story.step2Text': 'Слово прозвучит вслух',
    'story.step3Title': 'Собери фразу',
    'story.step3Text': 'Произнеси её целиком',
    'story.lineEndedCaption': 'Строка закончилась. Можно послушать её ещё раз.',
    'story.lineEndedAnnouncement': 'Строка закончилась',
    'story.storyEndedAnnouncement': 'История закончилась',
    'story.rainPaused': 'Дождь на паузе',
    'story.rainOn': 'Дождь идёт',
    'story.rainStartedCaption': 'Кап-кап… Дождь пошёл по твоему выбору.',
    'story.rainStoppedCaption': 'Дождь остановлен. Небо становится светлее.',
    'story.phraseClearedCaption': 'Фраза очищена. Можно начать новую!',
    'story.phraseClearedAnnouncement': 'Фраза очищена',
  },
  en: {
    'brand.name': 'Say It With Me',
    'brand.tagline': 'words come to life',
    'brand.homeAria': 'Say It With Me — home',
    'catalog.documentTitle': 'Say It With Me — interactive stories',
    'catalog.storiesLink': 'Stories',
    'catalog.eyebrow': 'INTERACTIVE AAC STORIES',
    'catalog.heroTitle': 'Little stories.',
    'catalog.heroTitleAccent': 'Big words.',
    'catalog.heroText': 'Listen, touch and tell a story. You can hear every word and touch every object.',
    'catalog.chooseStory': 'Choose a story',
    'catalog.heroNote': 'For children, parents and specialists',
    'catalog.bunny': 'Bunny',
    'catalog.cat': 'Kitty',
    'catalog.listenWord': 'listen',
    'catalog.touchWord': 'touch',
    'catalog.featuresAria': 'App features',
    'catalog.listenTitle': 'Listen',
    'catalog.listenText': 'Your device speaks the words in English',
    'catalog.touchTitle': 'Touch',
    'catalog.touchText': 'Characters and objects respond when tapped',
    'catalog.composeTitle': 'Build',
    'catalog.composeText': 'Put together and speak your own phrases',
    'catalog.library': 'LIBRARY',
    'catalog.storiesTitle': 'What shall we listen to today?',
    'catalog.storyCount': '{count} stories',
    'catalog.openStoryAria': 'Open the story “{title}”',
    'catalog.previewAlt': 'Preview of the story “{title}”',
    'catalog.openStory': 'Open story',
    'catalog.interactionTitle': 'You can tap more than just the cards',
    'catalog.interactionText': 'Touch the bunny, bench, cloud, kitty or ball right in the 3D scene — the object responds with a word and movement.',
    'common.words': '{count} words',
    'footer.message': 'Every word matters',
    'footer.symbols': 'Symbols: Sergio Palao / ARASAAC · CC BY-NC-SA 4.0',
    'language.label': 'Language',
    'language.auto': 'Auto: {language}',
    'print.view': 'Print view',
    'print.title': 'Say It With Me — a book to read',
    'print.action': 'Print',
    'print.mode': 'Version',
    'print.color': 'In color',
    'print.coloring': 'Coloring',
    'print.back': 'Back to story',
    'print.coverEyebrow': 'A BOOK TO READ AND TALK ABOUT',
    'print.line': 'Page {current} of {total}',
    'print.page': 'Page {current} / {total}',
    'print.hint': 'Name the pictures, read the words and tell the story in your own words.',
    'print.dialogHint': 'A4 landscape. For the color version, enable background graphics.',
    'story.defaultDescription': 'Tap the cards, listen to the words and tell your own story.',
    'story.switcherAria': 'Choose a story',
    'story.switcherLabel': 'Choose a story',
    'story.eyebrow': 'INTERACTIVE STORY',
    'story.soundOn': 'Sound on',
    'story.soundOff': 'Sound off',
    'story.voiceSettingsAria': 'Speech settings',
    'story.voiceButton': 'Speech',
    'story.voiceTitle': 'System English voice',
    'story.voiceSubtitle': 'You can change the speaking rate',
    'story.speechRate': 'Speech rate',
    'story.slower': 'slower',
    'story.faster': 'faster',
    'story.testVoice': 'Test voice',
    'story.testVoiceText': 'Hello! Let’s tell the story “{title}” together.',
    'story.speechUnsupported': 'This browser does not support speech synthesis. Cards and animations still work; open this page in Chrome, Edge or Safari to hear the words.',
    'story.phraseTitle': 'My phrase',
    'story.phraseHelp': 'Tap a word in the phrase to hear it again',
    'story.phraseAria': 'Built phrase',
    'story.backspace': 'Delete the last word',
    'story.clear': 'Clear phrase',
    'story.speak': 'Speak',
    'story.stop': 'Stop',
    'story.phrasePlaceholder': 'Your words will appear here…',
    'story.speakWord': 'Say {word}',
    'story.removeWord': 'Remove the word {word}',
    'story.wordAdded': '{word} — added to the phrase',
    'story.wordRemoved': 'The word {word} was removed',
    'story.cardsTitle': 'Build the story',
    'story.cardsHelp': 'One touch — one word',
    'story.lineAria': 'Line {number}',
    'story.playLineAria': 'Speak line {number}: {words}',
    'story.playLineTitle': 'Speak line',
    'story.stopLineAria': 'Stop line {number}',
    'story.wordCardAria': '{word}. Say it and add it to the phrase',
    'story.boardTip': 'You can tap the words in any order and make up your own phrase',
    'story.visualAria': '3D illustration: {title}',
    'story.sceneTouch': 'Touch objects in the scene',
    'story.indoors': 'In the room',
    'story.touchHint': 'Tap the objects',
    'story.playStory': 'Listen to the whole story',
    'story.stopStory': 'Stop the story',
    'story.stopShort': 'stop',
    'story.stepsAria': 'How to use this page',
    'story.step1Title': 'Choose a word',
    'story.step1Text': 'Tap any card',
    'story.step2Title': 'Listen',
    'story.step2Text': 'The word will sound out loud',
    'story.step3Title': 'Build a phrase',
    'story.step3Text': 'Say it all together',
    'story.lineEndedCaption': 'The line has ended. You can listen to it again.',
    'story.lineEndedAnnouncement': 'Line ended',
    'story.storyEndedAnnouncement': 'The story has ended',
    'story.rainPaused': 'Rain paused',
    'story.rainOn': 'It is raining',
    'story.rainStartedCaption': 'Pitter-patter… You chose to start the rain.',
    'story.rainStoppedCaption': 'The rain has stopped. The sky is getting brighter.',
    'story.phraseClearedCaption': 'Phrase cleared. You can start a new one!',
    'story.phraseClearedAnnouncement': 'Phrase cleared',
  },
  be: {
    'brand.name': 'Скажы са мной',
    'brand.tagline': 'словы ажываюць',
    'brand.homeAria': 'Скажы са мной — на галоўную',
    'catalog.documentTitle': 'Скажы са мной — інтэрактыўныя гісторыі',
    'catalog.storiesLink': 'Гісторыі',
    'catalog.eyebrow': 'ІНТЭРАКТЫЎНЫЯ AAC-ГІСТОРЫІ',
    'catalog.heroTitle': 'Маленькія гісторыі.',
    'catalog.heroTitleAccent': 'Вялікія словы.',
    'catalog.heroText': 'Слухай, кранай і расказвай. Кожнае слова можна пачуць, а кожны прадмет — патрымаць.',
    'catalog.chooseStory': 'Выбраць гісторыю',
    'catalog.heroNote': 'Для дзяцей, бацькоў і спецыялістаў',
    'catalog.bunny': 'Зайка',
    'catalog.cat': 'Коцік',
    'catalog.listenWord': 'слухай',
    'catalog.touchWord': 'кранай',
    'catalog.featuresAria': 'Магчымасці праграмы',
    'catalog.listenTitle': 'Слухай',
    'catalog.listenText': 'Словы агучвае беларускі голас прылады',
    'catalog.touchTitle': 'Кранай',
    'catalog.touchText': 'Героі і прадметы адказваюць на націск',
    'catalog.composeTitle': 'Складай',
    'catalog.composeText': 'Складай і агучвай уласныя фразы',
    'catalog.library': 'БІБЛІЯТЭКА',
    'catalog.storiesTitle': 'Што паслухаем сёння?',
    'catalog.storyCount': '{count} гісторыі',
    'catalog.openStoryAria': 'Адкрыць гісторыю «{title}»',
    'catalog.previewAlt': 'Прэв’ю гісторыі «{title}»',
    'catalog.openStory': 'Адкрыць гісторыю',
    'catalog.interactionTitle': 'Тут можна націскаць не толькі на карткі',
    'catalog.interactionText': 'Патрымай зайку, лаўку, хмару, коціка або мячык проста ў 3D-сцэне — прадмет адкажа словам і рухам.',
    'common.words': '{count} слоў',
    'footer.message': 'Кожнае слова важна',
    'footer.symbols': 'Піктаграмы: Sergio Palao / ARASAAC · CC BY-NC-SA 4.0',
    'language.label': 'Мова',
    'language.auto': 'Аўто: {language}',
    'print.view': 'Версія для друку',
    'print.title': 'Скажы са мной — кніга для чытання',
    'print.action': 'Друкаваць',
    'print.mode': 'Варыянт',
    'print.color': 'Каляровая',
    'print.coloring': 'Расфарбоўка',
    'print.back': 'Назад да гісторыі',
    'print.coverEyebrow': 'КНІГА ДЛЯ ЧЫТАННЯ І РАЗМОВЫ',
    'print.line': 'Старонка {current} з {total}',
    'print.page': 'Старонка {current} / {total}',
    'print.hint': 'Называй карцінкі, чытай словы і расказвай гісторыю сваімі словамі.',
    'print.dialogHint': 'Фармат A4, альбомная арыентацыя. Для каляровай версіі ўключы фонавую графіку.',
    'story.defaultDescription': 'Націскай на карткі, слухай словы і расказвай сваю гісторыю.',
    'story.switcherAria': 'Выбар гісторыі',
    'story.switcherLabel': 'Выбяры гісторыю',
    'story.eyebrow': 'ІНТЭРАКТЫЎНАЯ ГІСТОРЫЯ',
    'story.soundOn': 'Гук уключаны',
    'story.soundOff': 'Гук выключаны',
    'story.voiceSettingsAria': 'Налады маўлення',
    'story.voiceButton': 'Маўленне',
    'story.voiceTitle': 'Сістэмны беларускі голас',
    'story.voiceSubtitle': 'Можна змяніць хуткасць маўлення',
    'story.speechRate': 'Хуткасць маўлення',
    'story.slower': 'павольней',
    'story.faster': 'хутчэй',
    'story.testVoice': 'Праверыць голас',
    'story.testVoiceText': 'Прывітанне! Давай разам раскажам гісторыю «{title}».',
    'story.speechUnsupported': 'У гэтым браўзеры няма сінтэзу маўлення. Карткі і анімацыя працуюць, а для агучвання адкрый старонку ў Chrome, Edge або Safari.',
    'story.phraseTitle': 'Мая фраза',
    'story.phraseHelp': 'Націсні на слова ў фразе, каб пачуць яго яшчэ раз',
    'story.phraseAria': 'Складзеная фраза',
    'story.backspace': 'Выдаліць апошняе слова',
    'story.clear': 'Ачысціць фразу',
    'story.speak': 'Вымаўіць',
    'story.stop': 'Спыніць',
    'story.phrasePlaceholder': 'Тут з’явяцца твае словы…',
    'story.speakWord': 'Вымаўіць {word}',
    'story.removeWord': 'Выдаліць слова {word}',
    'story.wordAdded': '{word} — дададзена ў фразу',
    'story.wordRemoved': 'Слова {word} выдалена',
    'story.cardsTitle': 'Складзі гісторыю',
    'story.cardsHelp': 'Адзін дотык — адно слова',
    'story.lineAria': 'Радок {number}',
    'story.playLineAria': 'Агучыць радок {number}: {words}',
    'story.playLineTitle': 'Агучыць радок',
    'story.stopLineAria': 'Спыніць радок {number}',
    'story.wordCardAria': '{word}. Вымаўіць і дадаць у фразу',
    'story.boardTip': 'Словы можна націскаць у любым парадку і прыдумляць сваю фразу',
    'story.visualAria': 'Трохмерная ілюстрацыя: {title}',
    'story.sceneTouch': 'Кранай прадметы ў сцэне',
    'story.indoors': 'У пакоі',
    'story.touchHint': 'Націскай на прадметы',
    'story.playStory': 'Паслухаць усю гісторыю',
    'story.stopStory': 'Спыніць гісторыю',
    'story.stopShort': 'стоп',
    'story.stepsAria': 'Як карыстацца старонкай',
    'story.step1Title': 'Выбяры слова',
    'story.step1Text': 'Націсні на любую картку',
    'story.step2Title': 'Паслухай',
    'story.step2Text': 'Слова прагучыць услых',
    'story.step3Title': 'Складзі фразу',
    'story.step3Text': 'Вымаў яе цалкам',
    'story.lineEndedCaption': 'Радок скончыўся. Можна паслухаць яго яшчэ раз.',
    'story.lineEndedAnnouncement': 'Радок скончыўся',
    'story.storyEndedAnnouncement': 'Гісторыя скончылася',
    'story.rainPaused': 'Дождж на паўзе',
    'story.rainOn': 'Дождж ідзе',
    'story.rainStartedCaption': 'Кап-кап… Дождж пачаўся па тваім выбары.',
    'story.rainStoppedCaption': 'Дождж спынены. Неба становіцца святлейшым.',
    'story.phraseClearedCaption': 'Фраза ачышчана. Можна пачаць новую!',
    'story.phraseClearedAnnouncement': 'Фраза ачышчана',
  },
};

const storyTranslations = {
  en: {
    bunny: {
      title: 'Bunny',
      author: 'Agniya Barto',
      format: 'Based on the poem',
      subtitle: 'Rain and a bench',
      description: 'Tap the words, the bunny and the objects around him.',
      shortDescription: 'The bunny is left on a bench in the rain. Watch, name objects and talk about feelings.',
      tags: ['Rain', 'Bench', 'Feelings'],
      initialCaption: 'The owner is standing next to the bunny. Shall we begin the story?',
      finalCaption: 'That is the whole story. You can listen again or build your own phrase.',
      extraWords: {
        tucha: {
          word: 'cloud',
          caption: 'This is a cloud. It is above the bunny and brings rain.',
        },
      },
      lines: {
        'line-1': {
          words: {
            zayku: {
              word: 'Bunny',
              caption: 'Look at the bunny: he is sitting on the bench next to his owner.',
            },
            brosila: {
              word: 'was left by',
              caption: 'His owner turns and slowly walks away, leaving the bunny alone.',
            },
            hozyayka: {
              word: 'his owner',
              caption: 'This is his owner. She walks farther away while the bunny stays on the bench.',
            },
          },
        },
        'line-2': {
          words: {
            pod: {
              word: 'Under',
              caption: 'The cloud is right above the bunny: the bunny is under the cloud.',
            },
            dozhdem: {
              word: 'the rain',
              caption: 'Only now does the rain begin. The first drops fall on the bunny.',
            },
            ostalsya: {
              word: 'stayed',
              caption: 'His owner is gone. The bunny is all alone.',
            },
            zayka: {
              word: 'the bunny',
              caption: 'The bunny raises his head and looks around: there is no one nearby.',
            },
          },
        },
        'line-3': {
          words: {
            so: {
              word: 'From',
              caption: 'The bunny moves to the edge: he needs to get down from the bench.',
            },
            skameyki: {
              word: 'the bench',
              caption: 'Here is the bench. Its seat is quite high above the ground.',
            },
            slezt: {
              word: 'get down',
              caption: 'The bunny leans forward and carefully reaches one paw down.',
            },
            'ne-smog': {
              word: 'he couldn’t',
              caption: 'It is too high! The bunny pulls his paw back, shakes his head and returns.',
            },
          },
        },
        'line-4': {
          words: {
            ves: {
              word: 'All over',
              caption: 'Drops are already on his ears, head, back and paws — all over the bunny.',
            },
            do: {
              word: 'down to',
              caption: 'Watch a drop travel from the tips of his ears down to the threads.',
            },
            nitochki: {
              word: 'the threads',
              caption: 'Here are the seams and threads on the toy. They are getting wet too.',
            },
            promok: {
              word: 'he was soaked',
              caption: 'Now you can see: the bunny is soaked through — his ears droop and his fur is dark.',
            },
          },
        },
      },
    },
    cat: {
      title: 'Kitty and the Ball',
      author: 'An original KidsTalk story',
      format: 'A gentle story',
      subtitle: 'A ball and Mom’s help',
      description: 'Tap the words and objects in the room. You can touch everything here.',
      shortDescription: 'The ball has rolled under the chair. Kitty will try to reach it with his paw, and Mom will come to help.',
      tags: ['Play', 'Home', 'Help'],
      initialCaption: 'Kitty is playing in the room. A red ball is lying nearby. Shall we begin?',
      finalCaption: 'Kitty has the ball again! You can play again or touch the objects in the room.',
      extraWords: {
        okno: {
          word: 'window',
          caption: 'This is the window. Warm sunshine is shining through it.',
        },
      },
      lines: {
        'line-1': {
          words: {
            kotik: {
              word: 'Kitty',
              caption: 'Meet Kitty. He is waving his paw and is happy to see you.',
            },
            nashyol: {
              word: 'found',
              caption: 'Kitty looks to the side and notices a ball: there it is!',
            },
            myachik: {
              word: 'a ball',
              caption: 'The red ball bounces in place. You can play with it.',
            },
          },
        },
        'line-2': {
          words: {
            pokatil: {
              word: 'Rolled',
              caption: 'Kitty pushes the ball with his paw. The ball rolls towards the chair.',
            },
            ego: {
              word: 'it',
              caption: '“It” means the ball. Watch it roll.',
            },
            'pod-stul': {
              word: 'under the chair',
              caption: 'The ball rolls right under the chair seat, and Kitty follows it.',
            },
          },
        },
        'line-3': {
          words: {
            lapkoy: {
              word: 'With his paw',
              caption: 'Kitty shows his soft paw: he will try to reach the ball with it.',
            },
            dostat: {
              word: 'to reach it',
              caption: 'Kitty comes closer and lifts his paw, but the ball is still too far under the chair.',
            },
            'ne-smog': {
              word: 'he couldn’t',
              caption: 'The ball is too far away. Kitty pulls back his paw and sadly shakes his head.',
            },
          },
        },
        'line-4': {
          words: {
            mama: {
              word: 'Mom',
              caption: 'Mom comes in and walks up to Kitty. She wants to help.',
            },
            pomogla: {
              word: 'helped',
              caption: 'Mom lowers her tail under the chair and uses it to push the ball back to Kitty.',
            },
            kotiku: {
              word: 'the kitty',
              caption: 'Kitty is happy again! The ball is nearby, and Mom is next to him.',
            },
          },
        },
      },
    },
  },
  be: {
    bunny: {
      title: 'Зайка',
      author: 'Агнія Барто',
      format: 'Па вершы',
      subtitle: 'Дождж і лаўка',
      description: 'Націскай на словы, зайку і прадметы вакол яго.',
      shortDescription: 'Зайка застаўся на лаўцы пад дажджом. Назірай, называй прадметы і гавары пра пачуцці.',
      tags: ['Дождж', 'Лаўка', 'Пачуцці'],
      initialCaption: 'Гаспадыня стаіць побач з зайкам. Пачнём гісторыю?',
      finalCaption: 'Вось і ўся гісторыя. Можна паслухаць яе яшчэ раз або скласці сваю фразу.',
      extraWords: {
        tucha: {
          word: 'хмара',
          caption: 'Гэта хмара. Яна знаходзіцца над зайкам і прыносіць дождж.',
        },
      },
      lines: {
        'line-1': {
          words: {
            zayku: {
              word: 'Зайку',
              caption: 'Паглядзі на зайку: ён сядзіць на лаўцы побач з гаспадынёй.',
            },
            brosila: {
              word: 'кінула',
              caption: 'Гаспадыня паварочваецца і павольна сыходзіць, пакідаючы зайку аднаго.',
            },
            hozyayka: {
              word: 'гаспадыня',
              caption: 'Гэта гаспадыня. Яна сыходзіць усё далей, а зайка застаецца на лаўцы.',
            },
          },
        },
        'line-2': {
          words: {
            pod: {
              word: 'пад',
              caption: 'Хмара апыняецца проста над зайкам: зайка — пад хмарай.',
            },
            dozhdem: {
              word: 'дажджом',
              caption: 'Толькі цяпер пачынаецца дождж. Першыя кроплі падаюць на зайку.',
            },
            ostalsya: {
              word: 'застаўся',
              caption: 'Гаспадыні больш няма. Зайка застаўся зусім адзін.',
            },
            zayka: {
              word: 'зайка',
              caption: 'Зайка падымае галаву і азіраецца: побач нікога няма.',
            },
          },
        },
        'line-3': {
          words: {
            so: {
              word: 'з',
              caption: 'Зайка набліжаецца да краю: яму трэба спусціцца з лаўкі.',
            },
            skameyki: {
              word: 'лаўкі',
              caption: 'Вось лаўка. Ад яе сядзення да зямлі даволі высока.',
            },
            slezt: {
              word: 'спусціцца',
              caption: 'Зайка нахіляецца наперад і асцярожна цягне лапку ўніз.',
            },
            'ne-smog': {
              word: 'не змог',
              caption: 'Занадта высока! Зайка прыбірае лапку, ківае галавой і вяртаецца.',
            },
          },
        },
        'line-4': {
          words: {
            ves: {
              word: 'увесь',
              caption: 'Кроплі ўжо на вушах, галаве, спінцы і лапках — па ўсім зайцы.',
            },
            do: {
              word: 'да',
              caption: 'Сачым за кропляй: яна праходзіць ад самых вушаў да самых нітак.',
            },
            nitochki: {
              word: 'нітачкі',
              caption: 'Вось швы і ніткі на цаццы. Яны таксама становяцца мокрымі.',
            },
            promok: {
              word: 'прамок',
              caption: 'Цяпер відаць: зайка ўвесь прамок — вушы апусціліся, а футра стала цёмным.',
            },
          },
        },
      },
    },
    cat: {
      title: 'Коцік і мячык',
      author: 'Аўтарская гісторыя KidsTalk',
      format: 'Добрая гісторыя',
      subtitle: 'Мячык і дапамога мамы',
      description: 'Націскай на словы і прадметы ў пакоі. Тут усё можна патрымаць.',
      shortDescription: 'Мячык закаціўся пад стул. Коцік паспрабуе дастаць яго лапкай, а мама прыйдзе на дапамогу.',
      tags: ['Гульня', 'Дом', 'Дапамога'],
      initialCaption: 'Коцік гуляе ў пакоі. Побач ляжыць чырвоны мячык. Пачнём?',
      finalCaption: 'Мячык зноў у коціка! Можна пагуляць яшчэ раз або патрымаць прадметы ў пакоі.',
      extraWords: {
        okno: {
          word: 'акно',
          caption: 'Гэта акно. У ім свеціць цёплае сонейка.',
        },
      },
      lines: {
        'line-1': {
          words: {
            kotik: {
              word: 'Коцік',
              caption: 'Знаёмся: гэта коцік. Ён махае лапкай і рады цябе бачыць.',
            },
            nashyol: {
              word: 'знайшоў',
              caption: 'Коцік глядзіць у бок і заўважае мячык: вось ён!',
            },
            myachik: {
              word: 'мячык',
              caption: 'Чырвоны мячык падскоквае на месцы. З ім можна гуляць.',
            },
          },
        },
        'line-2': {
          words: {
            pokatil: {
              word: 'Пакаціў',
              caption: 'Коцік штурхае мячык лапкай. Мячык каціцца да стула.',
            },
            ego: {
              word: 'яго',
              caption: '«Яго» — гэта мячык. Сачым, як ён каціцца.',
            },
            'pod-stul': {
              word: 'пад стул',
              caption: 'Мячык закочваецца проста пад сядзенне стула, а коцік ідзе за ім.',
            },
          },
        },
        'line-3': {
          words: {
            lapkoy: {
              word: 'Лапкай',
              caption: 'Коцік паказвае сваю мяккую лапку: ёю ён паспрабуе дастаць мячык.',
            },
            dostat: {
              word: 'дастаць',
              caption: 'Коцік падыходзіць бліжэй і прыўдымае лапку, але мячык усё яшчэ далёка пад стулам.',
            },
            'ne-smog': {
              word: 'не змог',
              caption: 'Мячык занадта далёка. Коцік прыбірае лапку і сумна ківае галавой.',
            },
          },
        },
        'line-4': {
          words: {
            mama: {
              word: 'Мама',
              caption: 'Мама прыходзіць і падыходзіць да коціка. Яна хоча дапамагчы.',
            },
            pomogla: {
              word: 'дапамагла',
              caption: 'Мама апускае хвост пад стул і выштурхвае ім мячык назад коціку.',
            },
            kotiku: {
              word: 'коціку',
              caption: 'Коцік зноў рады! Мячык побач, а мама — побач з коцікам.',
            },
          },
        },
      },
    },
  },
};

function normalizeLanguage(language) {
  return LANGUAGE_IDS.has(language) ? language : 'ru';
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clone(item)]));
  }
  return value;
}

function translate(language, key, variables = {}) {
  const selected = normalizeLanguage(language);
  const template = translations[selected][key] ?? translations.ru[key] ?? key;
  return template.replace(/\{([^{}]+)\}/g, (match, name) => (
    Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : match
  ));
}

function validLanguage(language) {
  return LANGUAGE_IDS.has(language) ? language : null;
}

function languageFromQuery() {
  if (typeof window === 'undefined') return null;
  return validLanguage(new URLSearchParams(window.location.search).get('lang'));
}

function languageFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    return validLanguage(window.localStorage.getItem(LANGUAGE_KEY));
  } catch {
    // Storage may be unavailable in private or embedded browsing contexts.
    return null;
  }
}

function languageFromBrowser() {
  if (typeof navigator === 'undefined') return null;
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const language = String(browserLanguage || '').toLowerCase().split(/[-_]/)[0];
    if (LANGUAGE_IDS.has(language)) return language;
  }
  return null;
}

function explicitLanguage() {
  return languageFromQuery() || languageFromStorage();
}

export function getLanguage() {
  return explicitLanguage() || languageFromBrowser() || 'ru';
}

export function applyLanguage(language = getLanguage()) {
  const selected = normalizeLanguage(language);
  if (typeof document !== 'undefined') {
    document.documentElement.lang = selected;
    document.title = translate(selected, 'catalog.documentTitle');
  }
  return selected;
}

export function t(key, variables = {}) {
  return translate(getLanguage(), key, variables);
}

function localizeWord(word, overlay = {}) {
  const { sourceWord, ...text } = overlay;
  const localized = Object.assign(clone(word), text);
  if (sourceWord && localized.symbol) localized.symbol.sourceWord = sourceWord;
  return localized;
}

export function localizeStory(story, language = getLanguage()) {
  const selected = normalizeLanguage(language);
  const overlay = storyTranslations[selected]?.[story.id] || {};
  const { lines: lineOverlays = {}, extraWords: extraOverlays = {}, ...metadata } = overlay;
  const localized = Object.assign(clone(story), metadata);

  if (metadata.tags) localized.tags = [...metadata.tags];
  localized.lines = story.lines.map((line) => {
    const { words: wordOverlays = {}, ...lineText } = lineOverlays[line.id] || {};
    const localizedLine = Object.assign(clone(line), lineText);
    localizedLine.words = line.words.map((word) => localizeWord(word, wordOverlays[word.id]));
    return localizedLine;
  });
  if (story.extraWords) {
    localized.extraWords = story.extraWords.map((word) => localizeWord(word, extraOverlays[word.id]));
  }
  return localized;
}

export function languagePicker() {
  const current = getLanguage();
  const explicit = explicitLanguage();
  const currentLabel = LANGUAGES.find(({ id }) => id === current)?.label || current;
  return `<select class="soft-button language-picker" id="language-picker" data-language-picker aria-label="${translate(current, 'language.label')}">
    <option value="auto" ${explicit ? '' : 'selected'}>${translate(current, 'language.auto', { language: currentLabel })}</option>
    ${LANGUAGES.map(({ id, label }) => `<option value="${id}" ${id === current && explicit ? 'selected' : ''}>${label}</option>`).join('')}
  </select>`;
}

export function bindLanguagePicker() {
  document.querySelectorAll('[data-language-picker]').forEach((select) => {
    if (select.dataset.languageBound === 'true') return;
    select.dataset.languageBound = 'true';
    select.addEventListener('change', () => {
      if (select.value !== 'auto' && !LANGUAGE_IDS.has(select.value)) return;
      const url = new URL(window.location.href);
      try {
        if (select.value === 'auto') window.localStorage.removeItem(LANGUAGE_KEY);
        else window.localStorage.setItem(LANGUAGE_KEY, select.value);
      } catch {
        // The URL still preserves the choice when storage is unavailable.
      }
      if (select.value === 'auto') url.searchParams.delete('lang');
      else url.searchParams.set('lang', select.value);
      window.location.assign(`${url.pathname}${url.search}${url.hash}`);
    });
  });
}

function withLanguage(params, language) {
  const selected = normalizeLanguage(language);
  if (explicitLanguage() || typeof window === 'undefined' || selected !== getLanguage()) {
    params.set('lang', selected);
  }
  return params;
}

export function storyUrl(id, language = getLanguage()) {
  return `?${withLanguage(new URLSearchParams({ story: id }), language).toString()}`;
}

export function homeUrl(language = getLanguage()) {
  const params = withLanguage(new URLSearchParams(), language).toString();
  return params ? `./?${params}` : './';
}

export function printUrl(id, language = getLanguage()) {
  const params = withLanguage(new URLSearchParams({ story: id, print: '1' }), language);
  return `?${params.toString()}`;
}
