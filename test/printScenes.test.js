import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPrintScene } from '../src/printScenes.js';

test('print scenes are self-contained SVG illustrations for every story line', () => {
  for (const storyId of ['cat', 'bunny']) {
    const scenes = Array.from({ length: 4 }, (_, lineIndex) => renderPrintScene(storyId, lineIndex));
    assert.equal(new Set(scenes).size, 4);
    scenes.forEach((scene) => {
      assert.match(scene, /^<svg[^>]*class="print-scene-art"/);
      assert.match(scene, /viewBox="0 0 640 460"/);
      assert.match(scene, /aria-hidden="true"/);
      assert.match(scene, /class="[^"]*paint/);
      assert.match(scene, /<\/svg>$/);
      assert.doesNotMatch(scene, /<script|<image|(?:src|href)="https?:\/\//);
    });
  }
});

test('print scene line indexes are bounded and unknown stories use bunny art', () => {
  assert.equal(renderPrintScene('cat', -10), renderPrintScene('cat', 0));
  assert.equal(renderPrintScene('cat', 99), renderPrintScene('cat', 3));
  assert.equal(renderPrintScene('cat', 'invalid'), renderPrintScene('cat', 0));
  assert.equal(renderPrintScene('missing', 2), renderPrintScene('bunny', 2));
});
