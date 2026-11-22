const originalSources = new WeakMap();
const outlineSources = new WeakMap();

function sourceImage(image) {
  return new Promise((resolve, reject) => {
    const source = new Image();
    source.addEventListener('load', () => resolve(source), { once: true });
    source.addEventListener('error', reject, { once: true });
    source.src = originalSources.get(image);
  });
}

function drawOutline(source) {
  const scale = Math.min(1, 240 / source.naturalWidth);
  const width = Math.max(1, Math.round(source.naturalWidth * scale));
  const height = Math.max(1, Math.round(source.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(source, 0, 0, width, height);
  const input = context.getImageData(0, 0, width, height);
  const output = context.createImageData(width, height);
  const tones = new Float32Array(width * height);

  for (let index = 0; index < tones.length; index += 1) {
    const offset = index * 4;
    const alpha = input.data[offset + 3];
    tones[index] = alpha < 20 ? 255 : (
      input.data[offset] * 0.299 + input.data[offset + 1] * 0.587 + input.data[offset + 2] * 0.114
    );
  }

  const smooth = new Float32Array(tones.length);
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      let sum = 0;
      for (let row = -1; row <= 1; row += 1) {
        for (let column = -1; column <= 1; column += 1) {
          sum += tones[index + row * width + column];
        }
      }
      smooth[index] = sum / 9;
    }
  }

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      const offset = index * 4;
      const alpha = input.data[offset + 3];
      if (alpha < 20) continue;
      const topLeft = smooth[index - width - 1];
      const top = smooth[index - width];
      const topRight = smooth[index - width + 1];
      const left = smooth[index - 1];
      const right = smooth[index + 1];
      const bottomLeft = smooth[index + width - 1];
      const bottom = smooth[index + width];
      const bottomRight = smooth[index + width + 1];
      const horizontal = -topLeft - 2 * left - bottomLeft + topRight + 2 * right + bottomRight;
      const vertical = -topLeft - 2 * top - topRight + bottomLeft + 2 * bottom + bottomRight;
      const edge = Math.abs(horizontal) + Math.abs(vertical);
      if (edge < 85) continue;
      output.data[offset] = 39;
      output.data[offset + 1] = 52;
      output.data[offset + 2] = 48;
      output.data[offset + 3] = Math.min(alpha, edge * 1.9);
    }
  }

  context.putImageData(output, 0, 0);
  return canvas.toDataURL('image/png');
}

async function prepareOutline(image) {
  if (!originalSources.has(image)) originalSources.set(image, image.src);
  if (!outlineSources.has(image)) {
    const source = await sourceImage(image);
    outlineSources.set(image, drawOutline(source));
  }
  return outlineSources.get(image);
}

export function initializePrintMode() {
  const params = new URLSearchParams(window.location.search);
  const buttons = [...document.querySelectorAll('[data-print-mode]')];
  const images = [...document.querySelectorAll('.print-word-symbol img')];
  let selectedMode = params.get('coloring') === '1' ? 'coloring' : 'color';
  let pending = Promise.resolve();

  const applyMode = (mode) => {
    selectedMode = mode;
    document.body.classList.toggle('print-coloring', mode === 'coloring');
    document.documentElement.dataset.printMode = mode;
    document.documentElement.dataset.coloringReady = mode === 'color' ? 'true' : 'pending';
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.printMode === mode)));
    const url = new URL(window.location.href);
    if (mode === 'coloring') url.searchParams.set('coloring', '1');
    else url.searchParams.delete('coloring');
    window.history.replaceState(null, '', url);

    if (mode === 'color') {
      images.forEach((image) => {
        if (originalSources.has(image)) image.src = originalSources.get(image);
      });
      pending = Promise.resolve();
      return;
    }

    pending = Promise.all(images.map(async (image) => {
      try {
        const outline = await prepareOutline(image);
        if (selectedMode === 'coloring') image.src = outline;
      } catch {
        // The CSS grayscale filter remains as a fallback for an unreadable image.
      }
    })).then(() => {
      document.documentElement.dataset.coloringReady = 'true';
    });
  };

  buttons.forEach((button) => button.addEventListener('click', () => applyMode(button.dataset.printMode)));
  applyMode(selectedMode);
  return { whenReady: () => pending };
}
