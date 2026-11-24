import { renderSymbol } from '../../symbols/renderSymbol.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createCardStageScene(container, { onElementClick = () => {} } = {}) {
  const stage = document.createElement('div');
  stage.className = 'card-stage-scene';
  stage.innerHTML = `
    <div class="card-stage-frame" role="button" tabindex="0" aria-label="Карточка">
      <div class="card-stage-icon" id="card-stage-icon">✨</div>
      <div class="card-stage-word" id="card-stage-word"></div>
    </div>
  `;
  container.appendChild(stage);

  const frame = stage.querySelector('.card-stage-frame');
  const iconEl = stage.querySelector('#card-stage-icon');
  const wordEl = stage.querySelector('#card-stage-word');
  let activeToken = 0;

  frame.addEventListener('click', () => onElementClick('stage'));
  frame.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onElementClick('stage');
    }
  });

  async function perform(_action, { word } = {}) {
    activeToken += 1;
    const token = activeToken;
    if (word) {
      iconEl.innerHTML = renderSymbol(word.symbol);
      wordEl.textContent = word.word || '';
      frame.classList.remove('is-popping');
      void frame.offsetWidth;
      frame.classList.add('is-popping');
    }
    await wait(word?.minDuration || 950);
    return token === activeToken;
  }

  function cancel() {
    activeToken += 1;
    frame.classList.remove('is-popping');
  }

  function reset() {
    cancel();
  }

  function destroy() {
    cancel();
    stage.remove();
  }

  return { perform, cancel, reset, destroy };
}
