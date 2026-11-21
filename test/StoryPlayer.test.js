import test from 'node:test';
import assert from 'node:assert/strict';
import { StoryPlayer } from '../src/app/StoryPlayer.js';

function createHarness({ muted = false } = {}) {
  const events = [];
  const calls = { resets: [], actions: [], spoken: [] };
  const scene = {
    reset: (state) => calls.resets.push(state),
    perform: async (action) => { calls.actions.push(action); return true; },
    cancel: () => { calls.cancelled = true; },
  };
  const speech = {
    muted,
    speak: async (text) => { calls.spoken.push(text); return true; },
    stop: () => { calls.speechStopped = true; },
  };
  const player = new StoryPlayer({ scene, speech, onEvent: (event) => events.push(event) });
  return { player, events, calls };
}

test('playWord coordinates speech, animation and events', async () => {
  const { player, events, calls } = createHarness();
  const word = { id: 'cat', word: 'Cat', action: 'focusCat', minDuration: 10 };

  assert.equal(await player.playWord(word), true);
  assert.deepEqual(calls.actions, ['focusCat']);
  assert.deepEqual(calls.spoken, ['Cat']);
  assert.deepEqual(events.map(({ type }) => type), ['stop', 'wordStart', 'wordEnd']);
});

test('playSequence resets the scene and preserves word order', async () => {
  const { player, events, calls } = createHarness();
  const words = [
    { id: 'one', word: 'One', action: 'first', pauseAfter: 0 },
    { id: 'two', word: 'Two', action: 'second', pauseAfter: 0 },
  ];
  const initialState = { ready: true };

  assert.equal(await player.playSequence(words, 'story', initialState), true);
  assert.deepEqual(calls.resets, [initialState]);
  assert.deepEqual(calls.actions, ['first', 'second']);
  assert.deepEqual(calls.spoken, ['One', 'Two']);
  assert.equal(events.filter(({ type }) => type === 'wordStart').length, 2);
  assert.equal(events.at(-1).type, 'sequenceEnd');
  assert.equal(events.at(-1).source, 'story');
});

test('speakPhrase emits the complete phrase lifecycle', async () => {
  const { player, events, calls } = createHarness();

  assert.equal(await player.speakPhrase('A short phrase'), true);
  assert.deepEqual(calls.spoken, ['A short phrase']);
  assert.deepEqual(events.map(({ type }) => type), ['stop', 'phraseStart', 'phraseEnd']);
});

test('muted playback still follows meaningful animation timing', async () => {
  const { player, calls } = createHarness({ muted: true });

  await player.speakPhrase('Mute');
  assert.deepEqual(calls.spoken, []);
  assert.equal(calls.speechStopped, true);
});
