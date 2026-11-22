import { mkdir, writeFile } from 'node:fs/promises';
import { stories } from '../src/stories/index.js';
import { renderPrintScene } from '../src/printScenes.js';

await mkdir(new URL('../public/previews/', import.meta.url), { recursive: true });

for (const story of stories) {
  if (!story.preview?.startsWith('/previews/') || !story.preview.endsWith('.svg')) continue;
  const artwork = renderPrintScene(story.previewScene || story.scene, story.previewLine || 0);
  await writeFile(new URL(`../public${story.preview}`, import.meta.url), artwork);
  console.log(`Generated ${story.preview}`);
}
