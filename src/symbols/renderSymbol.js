import { wordIcon } from '../icons.js';

export function renderSymbol(symbol) {
  if (symbol?.set === 'arasaac') {
    return `<img class="aac-symbol" src="${import.meta.env.BASE_URL}symbols/arasaac/${symbol.id}.png" alt="" draggable="false" loading="lazy" />`;
  }
  const openmojiId = typeof symbol?.id === 'string' ? symbol.id.toUpperCase() : '';
  if (symbol?.set === 'openmoji' && /^[0-9A-F]+(?:-[0-9A-F]+)*$/.test(openmojiId)) {
    return `<img class="aac-symbol openmoji-symbol" src="${import.meta.env.BASE_URL}symbols/openmoji/${openmojiId}.svg" alt="" draggable="false" loading="lazy" />`;
  }
  return wordIcon(symbol?.id || 'bunny');
}
