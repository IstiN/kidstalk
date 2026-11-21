import './print.css';
import { getStory } from './stories/index.js';
import {
  applyLanguage,
  bindLanguagePicker,
  homeUrl,
  languagePicker,
  localizeStory,
  storyUrl,
  t,
} from './i18n.js';
import { renderSymbol } from './symbols/renderSymbol.js';

const baseUrl = import.meta.env.BASE_URL;

function assetUrl(path) {
  return `${baseUrl}${path.replace(/^\//, '')}`;
}

export function renderPrintPage(app, requestedStory) {
  applyLanguage();
  const story = localizeStory(getStory(requestedStory));
  const pageTotal = story.lines.length + 1;
  document.title = `${story.title} — ${t('print.title')}`;

  app.innerHTML = `
    <div class="print-shell">
      <header class="print-toolbar no-print">
        <a class="print-brand" href="${homeUrl()}">
          <strong>${t('brand.name')}</strong>
          <span>${t('print.title')}</span>
        </a>
        <div class="print-toolbar-actions">
          ${languagePicker()}
          <a class="soft-button" href="${storyUrl(story.id)}">← ${t('print.back')}</a>
          <button class="print-action" id="print-book" type="button">🖨 ${t('print.action')}</button>
        </div>
      </header>
      <p class="print-dialog-hint no-print">${t('print.dialogHint')}</p>

      <main class="print-book">
        <section class="print-page print-cover" aria-labelledby="print-cover-title">
          <div class="print-cover-kicker">${t('print.coverEyebrow')}</div>
          <div class="print-cover-image">
            <img src="${assetUrl(story.preview)}" alt="${story.title}" />
          </div>
          <div class="print-cover-copy">
            <span class="print-cover-emoji" aria-hidden="true">${story.emoji}</span>
            <h1 id="print-cover-title">${story.title}</h1>
            <p>${story.shortDescription}</p>
            <div class="print-cover-tags">${story.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
            <strong class="print-cover-author">${story.author}</strong>
            <small class="print-license">Пиктограммы / Symbols: Sergio Palao / ARASAAC · CC BY-NC-SA 4.0</small>
          </div>
          <footer class="print-page-footer"><span>${t('brand.name')}</span><span>${t('print.page', { current: 1, total: pageTotal })}</span></footer>
        </section>

        ${story.lines.map((line, lineIndex) => {
          const sentence = line.words.map(({ word }) => word).join(' ');
          return `
            <section class="print-page print-story-page" aria-label="${t('print.line', { current: lineIndex + 1, total: story.lines.length })}">
              <header class="print-story-header">
                <div><span>${story.emoji} ${story.title}</span><h2>${sentence}</h2></div>
                <strong>${String(lineIndex + 1).padStart(2, '0')}</strong>
              </header>
              <div class="print-word-grid print-word-grid--${line.words.length}">
                ${line.words.map((word) => `
                  <article class="print-word-card">
                    <div class="print-word-symbol">${renderSymbol(word.symbol)}</div>
                    <h3>${word.word}</h3>
                    <p>${word.caption}</p>
                  </article>`).join('')}
              </div>
              <p class="print-story-hint"><span aria-hidden="true">♡</span> ${t('print.hint')}</p>
              <footer class="print-page-footer"><span>${t('brand.name')} · ${story.title}</span><span>${t('print.page', { current: lineIndex + 2, total: pageTotal })}</span></footer>
            </section>`;
        }).join('')}
      </main>
    </div>`;

  bindLanguagePicker();
  document.querySelectorAll('.print-book img').forEach((image) => { image.loading = 'eager'; });
  document.querySelector('#print-book').addEventListener('click', async () => {
    const pendingImages = [...document.querySelectorAll('.print-book img')]
      .filter((image) => !image.complete)
      .map((image) => new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      }));
    await Promise.all(pendingImages);
    window.print();
  });
}
