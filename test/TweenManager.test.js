import test from 'node:test';
import assert from 'node:assert/strict';
import { TweenManager } from '../src/scenes/core/TweenManager.js';

test('zero-duration tween completes immediately', async () => {
  const manager = new TweenManager();
  const updates = [];

  assert.equal(await manager.tween({ duration: 0, update: (...args) => updates.push(args) }), true);
  assert.deepEqual(updates, [[1, 1]]);
  assert.equal(manager.items.size, 0);
});

test('tick advances a tween to completion', async () => {
  const manager = new TweenManager();
  const progress = [];
  const pending = manager.tween({ duration: 1000, ease: (value) => value, update: (_, value) => progress.push(value) });

  manager.tick(0.25);
  manager.tick(0.75);
  assert.equal(await pending, true);
  assert.deepEqual(progress, [0.25, 1]);
  assert.equal(manager.items.size, 0);
});

test('cancel settles active tweens without completing them', async () => {
  const manager = new TweenManager();
  const pending = manager.tween({ duration: 1000 });

  manager.cancel();
  assert.equal(await pending, false);
  assert.equal(manager.items.size, 0);
});

test('reduced motion bounds durations and wait uses the same timeline', async () => {
  const manager = new TweenManager({ reducedMotion: true });
  const pending = manager.wait(1000);
  const [item] = manager.items;

  assert.equal(item.duration, 0.35);
  manager.tick(0.35);
  assert.equal(await pending, true);
});
