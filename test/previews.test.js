import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stories } from '../src/stories/index.js';
import { renderPrintScene } from '../src/printScenes.js';

test('generated story previews are current scalable vector artwork', async () => {
  for (const story of stories) {
    assert.match(story.preview, /^\/previews\/[a-z-]+\.svg$/);
    const preview = await readFile(new URL(`../public${story.preview}`, import.meta.url), 'utf8');
    assert.equal(preview, renderPrintScene(story.previewScene || story.scene, story.previewLine || 0));
    assert.match(preview, /width="640" height="460"/);
    assert.match(preview, /viewBox="0 0 640 460"/);
  }
});
