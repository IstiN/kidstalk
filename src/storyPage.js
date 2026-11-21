import { StoryPlayer } from './app/StoryPlayer.js';
import { createScene } from './scenes/index.js';
import { SpeechController } from './speech.js';
import { getStory, stories } from './stories/index.js';
import { renderSymbol } from './symbols/renderSymbol.js';
import { uiIcons } from './icons.js';
import {
  applyLanguage,
  bindLanguagePicker,
  homeUrl,
  languagePicker,
  localizeStory,
  printUrl,
  storyUrl,
  t,
} from './i18n.js';

export async function renderStoryPage(app, requestedStory) {
  const language = applyLanguage();
  const speech = new SpeechController(language);
  const storyDefinition = localizeStory(getStory(requestedStory), language);
  const localizedStories = stories.map((item) => localizeStory(item, language));
  const story = storyDefinition.lines;
  const allWords = story.flatMap((line) => line.words);
  const interactiveWords = [...allWords, ...(storyDefinition.extraWords || [])];
  const printIcon = uiIcons.print || '<span aria-hidden="true">⎙</span>';
  const formatRate = (rate) => `${rate.toFixed(2).replace('.', language === 'en' ? '.' : ',').replace(/0$/, '')}×`;
  document.title = `${storyDefinition.title} — ${t('brand.name')}`;

  app.innerHTML = `
    <div class="page-shell">
      <header class="topbar">
        <a class="brand" href="${homeUrl(language)}" aria-label="${t('brand.homeAria')}">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48"><ellipse cx="17" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(-12 17 13)"/><ellipse cx="31" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(12 31 13)"/><circle cx="24" cy="29" r="13" fill="currentColor"/><circle cx="19" cy="28" r="1.5" fill="#27645e"/><circle cx="29" cy="28" r="1.5" fill="#27645e"/><path d="m21 33 3 3 3-3" fill="none" stroke="#27645e" stroke-width="1.6" stroke-linecap="round"/></svg>
          </span>
          <span><strong>${t('brand.name')}</strong><small>${t('brand.tagline')}</small></span>
        </a>
        <div class="header-actions">
          ${languagePicker()}
          <a class="soft-button print-view-link" id="print-view-link" href="${printUrl(storyDefinition.id, language)}">${printIcon}<span>${t('print.view')}</span></a>
          <button class="soft-button sound-button" id="mute-button" type="button" aria-pressed="false">
            ${uiIcons.speaker}<span>${t('story.soundOn')}</span>
          </button>
          <details class="voice-settings" id="voice-settings">
            <summary class="soft-button" aria-label="${t('story.voiceSettingsAria')}">${uiIcons.settings}<span>${t('story.voiceButton')}</span></summary>
            <div class="settings-popover">
              <div class="settings-title"><strong>${t('story.voiceTitle')}</strong><span>${t('story.voiceSubtitle')}</span></div>
              <div class="rate-label"><label for="speech-rate">${t('story.speechRate')}</label><output id="rate-output" for="speech-rate">${formatRate(speech.rate)}</output></div>
              <input id="speech-rate" type="range" min="0.5" max="1.2" step="0.02" value="0.82" />
              <div class="range-labels"><span>${t('story.slower')}</span><span>${t('story.faster')}</span></div>
              <button class="test-voice" id="test-voice" type="button">${uiIcons.play} ${t('story.testVoice')}</button>
            </div>
          </details>
        </div>
      </header>

      <main>
        <nav class="story-switcher" aria-label="${t('story.switcherAria')}">
          <span class="story-switcher-label">${t('story.switcherLabel')}</span>
          <div class="story-choices">
            ${localizedStories.map((item) => `
              <a class="story-choice ${item.id === storyDefinition.id ? 'is-active' : ''}" href="${storyUrl(item.id, language)}" ${item.id === storyDefinition.id ? 'aria-current="page"' : ''}>
                <span class="story-choice-icon" aria-hidden="true">${item.emoji}</span>
                <span><strong>${item.title}</strong><small>${item.subtitle}</small></span>
              </a>`).join('')}
          </div>
        </nav>

        <section class="intro" aria-labelledby="page-title">
          <div>
            <div class="eyebrow"><span></span> ${t('story.eyebrow')}</div>
            <h1 id="page-title">${storyDefinition.title}<span class="title-spark" aria-hidden="true">✦</span></h1>
            <p>${storyDefinition.description || t('story.defaultDescription')}</p>
          </div>
          <div class="story-note"><span class="note-line"></span><span>${storyDefinition.format}<br /><strong>${storyDefinition.author}</strong></span></div>
        </section>

        <section class="phrase-panel" aria-labelledby="phrase-title">
          <div class="phrase-heading">
            <span class="phrase-icon">${uiIcons.chat}</span>
            <div><h2 id="phrase-title">${t('story.phraseTitle')}</h2><p>${t('story.phraseHelp')}</p></div>
          </div>
          <div class="phrase-content" id="phrase-content" aria-label="${t('story.phraseAria')}"></div>
          <div class="phrase-actions">
            <button class="icon-button" id="backspace-button" type="button" aria-label="${t('story.backspace')}" title="${t('story.backspace')}" disabled>${uiIcons.backspace}</button>
            <button class="icon-button" id="clear-button" type="button" aria-label="${t('story.clear')}" title="${t('story.clear')}" disabled>${uiIcons.trash}</button>
            <button class="speak-phrase-button" id="speak-phrase-button" type="button" disabled>${uiIcons.speaker}<span>${t('story.speak')}</span></button>
          </div>
        </section>
        ${speech.supported ? '' : `<p class="speech-notice">${t('story.speechUnsupported')}</p>`}

        <div class="content-grid">
          <section class="cards-panel" aria-labelledby="cards-title">
            <div class="panel-heading">
              <div><h2 id="cards-title">${t('story.cardsTitle')}</h2><p>${t('story.cardsHelp')}</p></div>
              <span class="word-count">${t('common.words', { count: allWords.length })}</span>
            </div>
            <div class="story-lines" id="story-lines">
              ${story.map((line, lineIndex) => `
                <section class="story-line" aria-label="${t('story.lineAria', { number: lineIndex + 1 })}">
                  <div class="line-control">
                    <span class="line-index">${lineIndex + 1}</span>
                    <button class="line-play" type="button" data-line-id="${line.id}" aria-label="${t('story.playLineAria', { number: lineIndex + 1, words: line.words.map(({ word }) => word).join(' ') })}" title="${t('story.playLineTitle')}">${uiIcons.play}</button>
                  </div>
                  <div class="line-words" style="--word-count: ${line.words.length}">
                    ${line.words.map((word) => `
                      <button class="word-card" type="button" data-word-id="${word.id}" aria-label="${t('story.wordCardAria', { word: word.word })}">
                        <span class="card-sound" aria-hidden="true">${uiIcons.speaker}</span>
                        <span class="word-icon" aria-hidden="true">${renderSymbol(word.symbol)}</span>
                        <span class="word-label">${word.word}</span>
                      </button>`).join('')}
                  </div>
                </section>`).join('')}
            </div>
            <div class="board-tip"><span aria-hidden="true">☝</span> ${t('story.boardTip')}</div>
          </section>

          <aside class="visual-panel" aria-label="${t('story.visualAria', { title: storyDefinition.title })}">
            <div class="scene-toolbar">
              <div class="scene-label"><span class="scene-badge">3D</span><span>${t('story.sceneTouch')}</span></div>
              ${storyDefinition.scene === 'bunny'
                ? `<button class="rain-button" id="rain-toggle" type="button" aria-pressed="false">${uiIcons.rain}<span>${t('story.rainPaused')}</span></button>`
                : `<span class="scene-weather" aria-hidden="true">☀️ ${t('story.indoors')}</span>`}
            </div>
            <div class="scene-wrap">
              <div id="story-scene" class="bunny-scene"></div>
              <div class="scene-vignette" aria-hidden="true"></div>
              <div class="touch-hint">${uiIcons.hand}<span>${t('story.touchHint')}</span></div>
            </div>
            <div class="scene-caption-wrap">
              <span class="caption-dot" aria-hidden="true"></span>
              <p class="scene-caption" id="scene-caption">${storyDefinition.initialCaption}</p>
            </div>
            <button class="primary-story-button" id="play-story" type="button">${uiIcons.play}<span>${t('story.playStory')}</span><small>${t('common.words', { count: allWords.length })}</small></button>
          </aside>
        </div>

        <section class="steps" aria-label="${t('story.stepsAria')}">
          <div class="step"><span class="step-number">1</span><div><strong>${t('story.step1Title')}</strong><p>${t('story.step1Text')}</p></div></div>
          <span class="step-arrow" aria-hidden="true">→</span>
          <div class="step"><span class="step-number">2</span><div><strong>${t('story.step2Title')}</strong><p>${t('story.step2Text')}</p></div></div>
          <span class="step-arrow" aria-hidden="true">→</span>
          <div class="step"><span class="step-number">3</span><div><strong>${t('story.step3Title')}</strong><p>${t('story.step3Text')}</p></div></div>
        </section>
      </main>

      <footer>
        <div class="footer-message"><span>${t('brand.name')}</span><span class="footer-heart" aria-hidden="true">♥</span><span>${t('footer.message')}</span></div>
        <a class="symbol-credit" href="https://arasaac.org/" target="_blank" rel="noreferrer">${t('footer.symbols')}</a>
      </footer>
    </div>
    <div class="sr-only" id="live-region" aria-live="polite" aria-atomic="true"></div>
  `;
  bindLanguagePicker();

  const phraseContent = document.querySelector('#phrase-content');
  const backspaceButton = document.querySelector('#backspace-button');
  const clearButton = document.querySelector('#clear-button');
  const speakPhraseButton = document.querySelector('#speak-phrase-button');
  const playStoryButton = document.querySelector('#play-story');
  const sceneCaption = document.querySelector('#scene-caption');
  const liveRegion = document.querySelector('#live-region');
  const rainButton = document.querySelector('#rain-toggle');
  const muteButton = document.querySelector('#mute-button');
  const rateInput = document.querySelector('#speech-rate');
  const rateOutput = document.querySelector('#rate-output');
  const settings = document.querySelector('#voice-settings');
  const cardElements = new Map([...document.querySelectorAll('.word-card')].map((card) => [card.dataset.wordId, card]));
  const wordById = new Map(interactiveWords.map((word) => [word.id, word]));

  let phrase = [];
  let playing = false;
  let playingSource = null;
  let phraseSpeaking = false;
  let activeCardId = null;
  let rainOn = false;

  const scene = await createScene(storyDefinition.scene, document.querySelector('#story-scene'), {
    onElementClick: (elementId) => {
      const wordId = storyDefinition.elements?.[elementId];
      const word = wordById.get(wordId);
      if (word) speakWord(word, { addToPhrase: false });
    },
    onRainChange: updateRainButton,
  });
  const player = new StoryPlayer({ scene, speech, onEvent: handlePlayerEvent });

  function announce(message) {
    liveRegion.textContent = '';
    window.setTimeout(() => { liveRegion.textContent = message; }, 30);
  }

  function setCaption(message) {
    sceneCaption.textContent = message;
  }

  function clearActiveCard() {
    if (activeCardId) cardElements.get(activeCardId)?.classList.remove('is-speaking');
    activeCardId = null;
  }

  function highlightCard(id) {
    clearActiveCard();
    activeCardId = id;
    cardElements.get(id)?.classList.add('is-speaking');
  }

  function renderPhrase() {
    phraseContent.replaceChildren();
    if (!phrase.length) {
      const placeholder = document.createElement('p');
      placeholder.className = 'phrase-placeholder';
      placeholder.textContent = t('story.phrasePlaceholder');
      phraseContent.appendChild(placeholder);
    } else {
      phrase.forEach((word, index) => {
        const chip = document.createElement('span');
        chip.className = 'phrase-chip';

        const sayButton = document.createElement('button');
        sayButton.className = 'chip-word';
        sayButton.type = 'button';
        sayButton.textContent = word.word;
        sayButton.setAttribute('aria-label', t('story.speakWord', { word: word.word }));
        sayButton.addEventListener('click', () => player.playWord(word));

        const removeButton = document.createElement('button');
        removeButton.className = 'chip-remove';
        removeButton.type = 'button';
        removeButton.innerHTML = uiIcons.close;
        removeButton.setAttribute('aria-label', t('story.removeWord', { word: word.word }));
        removeButton.addEventListener('click', () => {
          stopPlayback();
          phrase.splice(index, 1);
          renderPhrase();
          announce(t('story.wordRemoved', { word: word.word }));
        });

        chip.append(sayButton, removeButton);
        phraseContent.appendChild(chip);
      });
    }
    backspaceButton.disabled = !phrase.length;
    clearButton.disabled = !phrase.length;
    speakPhraseButton.disabled = !phrase.length;
    requestAnimationFrame(() => { phraseContent.scrollLeft = phraseContent.scrollWidth; });
  }

  function updatePlaybackButtons() {
    playStoryButton.classList.toggle('is-playing', playing && playingSource === 'story');
    playStoryButton.innerHTML = playing && playingSource === 'story'
      ? `${uiIcons.stop}<span>${t('story.stopStory')}</span><small>${t('story.stopShort')}</small>`
      : `${uiIcons.play}<span>${t('story.playStory')}</span><small>${t('common.words', { count: allWords.length })}</small>`;

    document.querySelectorAll('.line-play').forEach((button) => {
      const isCurrent = playing && playingSource === button.dataset.lineId;
      const lineIndex = story.findIndex(({ id }) => id === button.dataset.lineId);
      button.innerHTML = isCurrent ? uiIcons.stop : uiIcons.play;
      button.classList.toggle('is-playing', isCurrent);
      button.setAttribute('aria-label', isCurrent
        ? t('story.stopLineAria', { number: lineIndex + 1 })
        : t('story.playLineAria', { number: lineIndex + 1, words: story[lineIndex]?.words.map(({ word }) => word).join(' ') || '' }));
      button.title = isCurrent ? t('story.stop') : t('story.playLineTitle');
    });
  }

  function handlePlayerEvent({ type, word, source, text }) {
    switch (type) {
      case 'stop':
        playing = false;
        playingSource = null;
        phraseSpeaking = false;
        clearActiveCard();
        speakPhraseButton.classList.remove('is-speaking');
        speakPhraseButton.innerHTML = `${uiIcons.speaker}<span>${t('story.speak')}</span>`;
        updatePlaybackButtons();
        break;
      case 'sequenceStart':
        playing = true;
        playingSource = source;
        updatePlaybackButtons();
        break;
      case 'wordStart':
        highlightCard(word.id);
        setCaption(word.caption);
        announce(word.word);
        break;
      case 'wordEnd':
        clearActiveCard();
        break;
      case 'sequenceEnd':
        playing = false;
        playingSource = null;
        clearActiveCard();
        updatePlaybackButtons();
        setCaption(source === 'story' ? storyDefinition.finalCaption : t('story.lineEndedCaption'));
        announce(source === 'story' ? t('story.storyEndedAnnouncement') : t('story.lineEndedAnnouncement'));
        break;
      case 'phraseStart':
        phraseSpeaking = true;
        speakPhraseButton.classList.add('is-speaking');
        speakPhraseButton.innerHTML = `${uiIcons.stop}<span>${t('story.stop')}</span>`;
        announce(text);
        break;
      case 'phraseEnd':
        phraseSpeaking = false;
        speakPhraseButton.classList.remove('is-speaking');
        speakPhraseButton.innerHTML = `${uiIcons.speaker}<span>${t('story.speak')}</span>`;
        break;
    }
  }

  function stopPlayback() {
    player.stop();
  }

  function updateRainButton(enabled) {
    if (!rainButton) return;
    rainOn = enabled;
    rainButton.setAttribute('aria-pressed', String(enabled));
    rainButton.innerHTML = `${uiIcons.rain}<span>${enabled ? t('story.rainOn') : t('story.rainPaused')}</span>`;
  }

  function speakWord(word, { addToPhrase = true } = {}) {
    if (addToPhrase) {
      phrase.push(word);
      renderPhrase();
    }
    player.playWord(word);
    if (addToPhrase) announce(t('story.wordAdded', { word: word.word }));
  }

  function startSequence(words, source, initialState) {
    phrase = [...words];
    renderPhrase();
    player.playSequence(words, source, initialState);
  }

  document.querySelector('#story-lines').addEventListener('click', (event) => {
    const card = event.target.closest('.word-card');
    if (card) {
      speakWord(wordById.get(card.dataset.wordId));
      return;
    }
    const lineButton = event.target.closest('.line-play');
    if (lineButton) {
      const line = story.find(({ id }) => id === lineButton.dataset.lineId);
      if (playing && playingSource === line.id) stopPlayback();
      else startSequence(line.words, line.id, line.initialState);
    }
  });

  playStoryButton.addEventListener('click', () => {
    if (playing && playingSource === 'story') stopPlayback();
    else startSequence(allWords, 'story', storyDefinition.initialState);
  });

  rainButton?.addEventListener('click', () => {
    stopPlayback();
    scene.setRain(!rainOn);
    setCaption(rainOn ? t('story.rainStartedCaption') : t('story.rainStoppedCaption'));
  });

  backspaceButton.addEventListener('click', () => {
    stopPlayback();
    const removed = phrase.pop();
    renderPhrase();
    if (removed) announce(t('story.wordRemoved', { word: removed.word }));
  });

  clearButton.addEventListener('click', () => {
    stopPlayback();
    phrase = [];
    renderPhrase();
    setCaption(t('story.phraseClearedCaption'));
    announce(t('story.phraseClearedAnnouncement'));
  });

  speakPhraseButton.addEventListener('click', () => {
    if (!phrase.length) return;
    if (phraseSpeaking) {
      stopPlayback();
      return;
    }
    player.speakPhrase(phrase.map(({ word }) => word).join(' '));
  });

  muteButton.addEventListener('click', () => {
    speech.muted = !speech.muted;
    stopPlayback();
    localStorage.setItem('kidstalk-muted', String(speech.muted));
    muteButton.setAttribute('aria-pressed', String(speech.muted));
    muteButton.innerHTML = speech.muted
      ? `${uiIcons.muted}<span>${t('story.soundOff')}</span>`
      : `${uiIcons.speaker}<span>${t('story.soundOn')}</span>`;
    announce(speech.muted ? t('story.soundOff') : t('story.soundOn'));
  });

  rateInput.value = String(speech.rate);
  rateOutput.value = formatRate(speech.rate);
  rateInput.addEventListener('input', () => {
    speech.setRate(Number(rateInput.value));
    rateOutput.value = formatRate(speech.rate);
  });

  document.querySelector('#test-voice').addEventListener('click', () => {
    stopPlayback();
    speech.speak(t('story.testVoiceText', { title: storyDefinition.title }));
  });

  document.addEventListener('click', (event) => {
    if (settings.open && !settings.contains(event.target)) settings.open = false;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      settings.open = false;
      stopPlayback();
    }
  });

  speech.muted = localStorage.getItem('kidstalk-muted') === 'true';
  if (speech.muted) {
    muteButton.setAttribute('aria-pressed', 'true');
    muteButton.innerHTML = `${uiIcons.muted}<span>${t('story.soundOff')}</span>`;
  }

  renderPhrase();
  updateRainButton(rainOn);
}
