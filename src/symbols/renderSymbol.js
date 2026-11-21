import { wordIcon } from '../icons.js';

export function renderSymbol(symbol) {
  if (symbol?.set === 'arasaac') {
    return `<img class="aac-symbol" src="${import.meta.env.BASE_URL}symbols/arasaac/${symbol.id}.png" alt="" draggable="false" loading="lazy" />`;
  }
  return wordIcon(symbol?.id || 'bunny');
}
