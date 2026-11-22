import { stories } from './stories/index.js';
import { uiIcons } from './icons.js';
import {
  applyLanguage,
  bindLanguagePicker,
  homeUrl,
  languagePicker,
  localizeStory,
  storyUrl,
  t,
} from './i18n.js';

const baseUrl = import.meta.env.BASE_URL;

function assetUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  return `${baseUrl}${path.replace(/^\//, '')}`;
}

function brandMarkup() {
  return `
    <a class="brand" href="${homeUrl()}" aria-label="${t('brand.homeAria')}">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48"><ellipse cx="17" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(-12 17 13)"/><ellipse cx="31" cy="13" rx="5" ry="11" fill="currentColor" transform="rotate(12 31 13)"/><circle cx="24" cy="29" r="13" fill="currentColor"/><circle cx="19" cy="28" r="1.5" fill="#27645e"/><circle cx="29" cy="28" r="1.5" fill="#27645e"/><path d="m21 33 3 3 3-3" fill="none" stroke="#27645e" stroke-width="1.6" stroke-linecap="round"/></svg>
      </span>
      <span><strong>${t('brand.name')}</strong><small>${t('brand.tagline')}</small></span>
    </a>`;
}

export function renderCatalog(app) {
  const language = applyLanguage();
  const localizedStories = stories.map((story) => localizeStory(story, language));
  document.title = t('catalog.documentTitle');
  document.body.classList.add('catalog-page');
  app.innerHTML = `
    <div class="page-shell catalog-shell">
      <header class="topbar catalog-topbar">
        ${brandMarkup()}
        <div class="header-actions">
          ${languagePicker()}
          <a class="soft-button catalog-header-link" href="#stories">${t('catalog.storiesLink')} <span>${stories.length}</span></a>
        </div>
      </header>

      <main class="catalog-main">
        <section class="catalog-hero" aria-labelledby="catalog-title">
          <div class="catalog-hero-copy">
            <div class="eyebrow"><span></span> ${t('catalog.eyebrow')}</div>
            <h1 id="catalog-title">${t('catalog.heroTitle')}<br /><span>${t('catalog.heroTitleAccent')}</span></h1>
            <p>${t('catalog.heroText')}</p>
            <a class="catalog-cta" href="#stories">${t('catalog.chooseStory')} <span aria-hidden="true">↓</span></a>
            <div class="catalog-hero-note"><span aria-hidden="true">♡</span> ${t('catalog.heroNote')}</div>
          </div>
          <div class="catalog-hero-art" aria-hidden="true">
            <span class="hero-orbit hero-orbit-one"></span>
            <span class="hero-orbit hero-orbit-two"></span>
            <div class="hero-character hero-character-bunny"><span>🐰</span><small>${t('catalog.bunny')}</small></div>
            <div class="hero-character hero-character-cat"><span>🐱</span><small>${t('catalog.cat')}</small></div>
            <span class="hero-word hero-word-listen">${t('catalog.listenWord')}</span>
            <span class="hero-word hero-word-touch">${t('catalog.touchWord')}</span>
            <span class="hero-spark">✦</span>
          </div>
        </section>

        <section class="catalog-features" aria-label="${t('catalog.featuresAria')}">
          <div class="catalog-feature"><span class="catalog-feature-icon">${uiIcons.speaker}</span><div><strong>${t('catalog.listenTitle')}</strong><p>${t('catalog.listenText')}</p></div></div>
          <div class="catalog-feature"><span class="catalog-feature-icon">${uiIcons.hand}</span><div><strong>${t('catalog.touchTitle')}</strong><p>${t('catalog.touchText')}</p></div></div>
          <div class="catalog-feature"><span class="catalog-feature-icon">${uiIcons.chat}</span><div><strong>${t('catalog.composeTitle')}</strong><p>${t('catalog.composeText')}</p></div></div>
        </section>

        <section class="catalog-stories" id="stories" aria-labelledby="stories-title">
          <div class="catalog-section-heading">
            <div><div class="eyebrow"><span></span> ${t('catalog.library')}</div><h2 id="stories-title">${t('catalog.storiesTitle')}</h2></div>
            <span class="catalog-count">${t('catalog.storyCount', { count: localizedStories.length })}</span>
          </div>
          <div class="story-catalog-grid" style="--story-count: ${localizedStories.length}">
            ${localizedStories.map((story) => {
              const wordCount = story.lines.flatMap((line) => line.words).length;
              return `
                <article class="story-preview-card story-preview-card--${story.id}">
                  <a href="${storyUrl(story.id, language)}" aria-label="${t('catalog.openStoryAria', { title: story.title })}">
                    <div class="story-preview-visual">
                      <img src="${assetUrl(story.preview)}" alt="${t('catalog.previewAlt', { title: story.title })}" width="640" height="460" />
                      <span class="story-count-badge">${t('common.words', { count: wordCount })}</span>
                      <span class="story-open-button" aria-hidden="true">${uiIcons.play}</span>
                    </div>
                    <div class="story-preview-body">
                      <div class="story-preview-kicker"><span aria-hidden="true">${story.emoji}</span> ${story.format}</div>
                      <h3>${story.title}</h3>
                      <p>${story.shortDescription}</p>
                      <div class="story-preview-tags">${story.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
                      <div class="story-preview-footer"><span>${story.author}</span><strong>${t('catalog.openStory')} <span aria-hidden="true">→</span></strong></div>
                    </div>
                  </a>
                </article>`;
            }).join('')}
          </div>
        </section>

        <aside class="catalog-interaction-note">
          <span class="catalog-note-hand" aria-hidden="true">☝</span>
          <div><strong>${t('catalog.interactionTitle')}</strong><p>${t('catalog.interactionText')}</p></div>
          <span class="catalog-note-arrow" aria-hidden="true">↗</span>
        </aside>
      </main>

      <footer class="catalog-footer">
        <div class="footer-message"><span>${t('brand.name')}</span><span class="footer-heart" aria-hidden="true">♥</span><span>${t('footer.message')}</span></div>
        <a class="symbol-credit" href="https://arasaac.org/" target="_blank" rel="noreferrer">${t('footer.symbols')}</a>
      </footer>
    </div>`;
  bindLanguagePicker();
}
