import { wordIcon } from '../icons.js';

export function renderSymbol(symbol) {
  if (symbol?.set === 'arasaac') {
    return `<img class="aac-symbol" src="${import.meta.env.BASE_URL}symbols/arasaac/${symbol.id}.png" alt="" draggable="false" loading="lazy" />`;
  }
  if (symbol?.set === 'arasaac-remote' && /^https:\/\/static\.arasaac\.org\//.test(symbol.url || '')) {
    return `<img class="aac-symbol" src="${symbol.url}" alt="" draggable="false" loading="lazy" />`;
  }
  const openmojiId = typeof symbol?.id === 'string' ? symbol.id.toUpperCase() : '';
  if (symbol?.set === 'openmoji' && /^[0-9A-F]+(?:-[0-9A-F]+)*$/.test(openmojiId)) {
    return `<img class="aac-symbol openmoji-symbol" src="${import.meta.env.BASE_URL}symbols/openmoji/${openmojiId}.svg" alt="" draggable="false" loading="lazy" />`;
  }
  if (symbol?.set === 'emoji' && symbol.emoji) {
    return `<span class="aac-emoji" aria-hidden="true">${symbol.emoji}</span>`;
  }
  return wordIcon(symbol?.id || 'bunny');
}
