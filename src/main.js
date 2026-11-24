import './style.css';

const app = document.querySelector('#app');
const params = new URLSearchParams(window.location.search);
const storyId = params.get('story');

if (params.get('builder') === '1') {
  const { renderBuilderPage } = await import('./builderPage.js');
  renderBuilderPage(app, params.get('edit'));
} else if (storyId && params.get('print') === '1') {
  const { renderPrintPage } = await import('./printPage.js');
  renderPrintPage(app, storyId);
} else if (storyId) {
  const { renderStoryPage } = await import('./storyPage.js');
  await renderStoryPage(app, storyId);
} else {
  const { renderCatalog } = await import('./catalog.js');
  renderCatalog(app);
}
