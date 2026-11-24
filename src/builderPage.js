import {
  applyLanguage,
  bindLanguagePicker,
  getLanguage,
  homeUrl,
  languagePicker,
  storyUrl,
  t,
} from './i18n.js';
import {
  CHARACTER_OPTIONS,
  defaultSymbolForWord,
  resolveSymbolForWord,
} from './symbols/symbolLookup.js';
import {
  deleteCustomStoryRecord,
  loadCustomStoryRecords,
  parseWordsInput,
  saveCustomStoryRecord,
} from './stories/customStories.js';
import { renderSymbol } from './symbols/renderSymbol.js';

const PRESETS = {
  ru: [
    { label: '📺 Папа, включи телевизор', words: 'Папа, Включи, Телевизор', character: 'tom', emoji: '📺' },
    { label: '🥤 Мама, дай пить', words: 'Мама, Дай, Пить', character: 'tom', emoji: '🥤' },
    { label: '⚽ Пойдём играть в мяч', words: 'Пойдём, Играть, Мяч', character: 'cat', emoji: '⚽' },
    { label: '🪥 Чистить зубы и спать', words: 'Чистить, Зубы, Спать', character: 'tom', emoji: '🪥' },
  ],
  en: [
    { label: '📺 Dad, turn on TV', words: 'Dad, Turn on, TV', character: 'tom', emoji: '📺' },
    { label: '🥤 Mom, give water', words: 'Mom, Give, Water', character: 'tom', emoji: '🥤' },
    { label: '⚽ Go play ball', words: 'Go, Play, Ball', character: 'cat', emoji: '⚽' },
    { label: '🪥 Brush teeth and sleep', words: 'Brush, Teeth, Sleep', character: 'tom', emoji: '🪥' },
  ],
  be: [
    { label: '📺 Тата, уключы тэлевізар', words: 'Тата, Уключы, Тэлевізар', character: 'tom', emoji: '📺' },
    { label: '🥤 Мама, дай піць', words: 'Мама, Дай, Піць', character: 'tom', emoji: '🥤' },
    { label: '⚽ Ідзі гуляць у мяч', words: 'Ідзі, Гуляць, Мяч', character: 'cat', emoji: '⚽' },
    { label: '🪥 Чысціць зубы і спаць', words: 'Чысціць, Зубы, Спаць', character: 'tom', emoji: '🪥' },
  ],
};

function characterLabel(id, language) {
  const labels = {
    ru: { tom: 'Кот Том (3D)', cat: 'Рыжий котик (3D)', bunny: 'Зайка (3D)', cards: 'Крупные карточки' },
    en: { tom: 'Tom Cat (3D)', cat: 'Ginger Cat (3D)', bunny: 'Bunny (3D)', cards: 'Big Cards' },
    be: { tom: 'Кот Том (3D)', cat: 'Руды коцік (3D)', bunny: 'Зайка (3D)', cards: 'Вялікія карткі' },
  };
  return (labels[language] || labels.ru)[id] || id;
}

export function renderBuilderPage(app, editId = null) {
  const language = applyLanguage();
  const savedRecords = loadCustomStoryRecords();
  const editing = editId ? savedRecords.find((item) => item.id === editId) : null;

  document.title = `${t('builder.title')} — ${t('brand.name')}`;
  document.body.classList.add('builder-page');

  const state = {
    id: editing?.id || null,
    title: editing?.title || '',
    character: editing?.character || 'tom',
    emoji: editing?.emoji || '✨',
    cards: editing
      ? editing.words.map((item) => ({ ...item, alternatives: [item.symbol] }))
      : ['Папа', 'Включи', 'Телевизор'].map((word) => {
        const localized = language === 'en'
          ? { Папа: 'Dad', Включи: 'Turn on', Телевизор: 'TV' }[word]
          : language === 'be'
            ? { Папа: 'Тата', Включи: 'Уключы', Телевизор: 'Тэлевізар' }[word]
            : word;
        const resolved = defaultSymbolForWord(localized);
        return { word: localized, ...resolved, alternatives: [resolved.symbol] };
      }),
    searching: false,
  };

  app.innerHTML = `
    <div class="page-shell builder-shell">
      <header class="topbar">
        <a class="brand" href="${homeUrl(language)}" aria-label="${t('brand.homeAria')}">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48"><ellipse cx="17" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(-12 17 13)"/><ellipse cx="31" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(12 31 13)"/><circle cx="24" cy="29" r="13" fill="currentColor"/><circle cx="19" cy="28" r="1.5" fill="#27645e"/><circle cx="29" cy="28" r="1.5" fill="#27645e"/><path d="m21 33 3 3 3-3" fill="none" stroke="#27645e" stroke-width="1.6" stroke-linecap="round"/></svg>
          </span>
          <span><strong>${t('brand.name')}</strong><small>${t('brand.tagline')}</small></span>
        </a>
        <div class="header-actions">
          ${languagePicker()}
          <a class="soft-button builder-back-link" href="${homeUrl(language)}">${t('builder.back')}</a>
        </div>
      </header>

      <main class="builder-main">
        <section class="builder-card">
          <h1>${editing ? t('builder.editTitle') : t('builder.title')}</h1>
          <p class="builder-subtitle">${t('builder.subtitle')}</p>

          <div class="builder-presets" id="builder-presets">
            ${(PRESETS[language] || PRESETS.ru).map((preset, index) => `
              <button type="button" class="builder-preset-chip" data-preset="${index}">${preset.label}</button>
            `).join('')}
          </div>

          <label class="builder-field">
            <span>${t('builder.wordsLabel')}</span>
            <div class="builder-input-row">
              <input id="builder-words-input" type="text" value="${state.cards.map((c) => c.word).join(', ')}" placeholder="${t('builder.wordsPlaceholder')}" />
              <button type="button" class="builder-match-button" id="builder-match-button">${t('builder.findCards')}</button>
            </div>
          </label>

          <div class="builder-field">
            <span>${t('builder.characterLabel')}</span>
            <div class="builder-characters" id="builder-characters">
              ${CHARACTER_OPTIONS.map((option) => `
                <button type="button" class="builder-character-btn ${state.character === option.id ? 'is-active' : ''}" data-character="${option.id}">
                  <span aria-hidden="true">${option.emoji}</span>
                  <strong>${characterLabel(option.id, language)}</strong>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="builder-field">
            <div class="builder-cards-head">
              <span>${t('builder.cardsPreviewLabel')}</span>
              <small id="builder-status">${t('builder.tapCardHint')}</small>
            </div>
            <div class="builder-cards-grid" id="builder-cards-grid"></div>
          </div>

          <div class="builder-actions">
            <button type="button" class="builder-save-button" id="builder-save-button">${t('builder.saveAndOpen')}</button>
            ${editing ? `<button type="button" class="builder-delete-button" id="builder-delete-button">${t('builder.delete')}</button>` : ''}
          </div>
        </section>

        <section class="builder-saved" id="builder-saved-section">
          <h2>${t('builder.savedTitle')}</h2>
          <div class="builder-saved-list" id="builder-saved-list"></div>
        </section>
      </main>
    </div>
  `;

  bindLanguagePicker();

  const wordsInput = document.querySelector('#builder-words-input');
  const matchButton = document.querySelector('#builder-match-button');
  const cardsGrid = document.querySelector('#builder-cards-grid');
  const statusEl = document.querySelector('#builder-status');
  const saveButton = document.querySelector('#builder-save-button');
  const deleteButton = document.querySelector('#builder-delete-button');
  const savedList = document.querySelector('#builder-saved-list');

  function renderCards() {
    cardsGrid.innerHTML = state.cards.map((card, index) => `
      <div class="builder-word-card" data-index="${index}">
        <button type="button" class="builder-card-symbol" data-cycle="${index}" title="${t('builder.changePicture')}">
          ${renderSymbol(card.symbol)}
        </button>
        <input type="text" class="builder-card-word" data-edit-word="${index}" value="${card.word.replace(/"/g, '&quot;')}" aria-label="${card.word}" />
        ${card.alternatives?.length > 1 ? `<span class="builder-card-alt-badge">${(card.altIndex || 0) + 1}/${card.alternatives.length}</span>` : ''}
        <button type="button" class="builder-card-remove" data-remove="${index}" aria-label="${t('story.removeWord', { word: card.word })}">×</button>
      </div>
    `).join('');
  }

  function renderSavedList() {
    const records = loadCustomStoryRecords();
    if (!records.length) {
      savedList.innerHTML = `<p class="builder-empty">${t('builder.savedEmpty')}</p>`;
      return;
    }
    savedList.innerHTML = records.map((item) => `
      <div class="builder-saved-item">
        <a class="builder-saved-open" href="${storyUrl(item.id, language)}">
          <span class="builder-saved-emoji" aria-hidden="true">${item.emoji || '✨'}</span>
          <div>
            <strong>${item.title}</strong>
            <small>${item.words.map((w) => w.word).join(' · ')}</small>
          </div>
        </a>
        <div class="builder-saved-controls">
          <a class="builder-small-btn" href="?builder=1&edit=${encodeURIComponent(item.id)}${getLanguage() ? `&lang=${language}` : ''}">${t('builder.edit')}</a>
          <button type="button" class="builder-small-btn is-danger" data-delete-saved="${item.id}">×</button>
        </div>
      </div>
    `).join('');
  }

  async function matchWordsFromInput() {
    const words = parseWordsInput(wordsInput.value);
    if (!words.length) return;
    state.searching = true;
    statusEl.textContent = t('builder.searching');
    state.cards = words.map((word) => {
      const local = defaultSymbolForWord(word);
      return { word, ...local, alternatives: [local.symbol], altIndex: 0 };
    });
    renderCards();

    const resolved = await Promise.all(words.map((word) => resolveSymbolForWord(word, language)));
    state.cards = words.map((word, index) => ({
      word,
      symbol: resolved[index].symbol,
      alternatives: resolved[index].alternatives.length ? resolved[index].alternatives : [resolved[index].symbol],
      altIndex: 0,
      action: resolved[index].action,
      emoji: resolved[index].emoji,
    }));
    state.searching = false;
    statusEl.textContent = t('builder.tapCardHint');
    renderCards();
  }

  matchButton.addEventListener('click', () => { matchWordsFromInput(); });
  wordsInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      matchWordsFromInput();
    }
  });

  document.querySelector('#builder-presets').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-preset]');
    if (!btn) return;
    const preset = (PRESETS[language] || PRESETS.ru)[Number(btn.dataset.preset)];
    if (!preset) return;
    wordsInput.value = preset.words;
    state.character = preset.character;
    state.emoji = preset.emoji;
    document.querySelectorAll('.builder-character-btn').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.character === state.character);
    });
    matchWordsFromInput();
  });

  document.querySelector('#builder-characters').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-character]');
    if (!btn) return;
    state.character = btn.dataset.character;
    document.querySelectorAll('.builder-character-btn').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.character === state.character);
    });
  });

  cardsGrid.addEventListener('click', (event) => {
    const cycleBtn = event.target.closest('[data-cycle]');
    if (cycleBtn) {
      const index = Number(cycleBtn.dataset.cycle);
      const card = state.cards[index];
      if (card?.alternatives?.length > 1) {
        card.altIndex = ((card.altIndex || 0) + 1) % card.alternatives.length;
        card.symbol = card.alternatives[card.altIndex];
        renderCards();
      }
      return;
    }
    const removeBtn = event.target.closest('[data-remove]');
    if (removeBtn) {
      const index = Number(removeBtn.dataset.remove);
      state.cards.splice(index, 1);
      wordsInput.value = state.cards.map((c) => c.word).join(', ');
      renderCards();
    }
  });

  cardsGrid.addEventListener('change', (event) => {
    const input = event.target.closest('[data-edit-word]');
    if (!input) return;
    const index = Number(input.dataset.editWord);
    if (state.cards[index]) {
      state.cards[index].word = input.value.trim() || state.cards[index].word;
      wordsInput.value = state.cards.map((c) => c.word).join(', ');
    }
  });

  saveButton.addEventListener('click', () => {
    const cleanCards = state.cards.filter((item) => item.word.trim());
    if (!cleanCards.length) return;
    const saved = saveCustomStoryRecord({
      id: state.id,
      title: cleanCards.map((item) => item.word).join(', '),
      emoji: state.emoji || cleanCards[0].emoji || '✨',
      character: state.character,
      words: cleanCards,
    });
    if (saved) {
      window.location.assign(storyUrl(saved.id, language));
    }
  });

  deleteButton?.addEventListener('click', () => {
    if (state.id) {
      deleteCustomStoryRecord(state.id);
      window.location.assign(homeUrl(language));
    }
  });

  savedList.addEventListener('click', (event) => {
    const del = event.target.closest('[data-delete-saved]');
    if (!del) return;
    deleteCustomStoryRecord(del.dataset.deleteSaved);
    renderSavedList();
  });

  renderCards();
  renderSavedList();
}
