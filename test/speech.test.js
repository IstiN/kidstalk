import test from 'node:test';
import assert from 'node:assert/strict';
import { SpeechController } from '../src/speech.js';

function installSpeech(context, { supported = true, rate = null } = {}) {
  const descriptors = ['window', 'localStorage', 'SpeechSynthesisUtterance'].map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  const storage = new Map(rate ? [['kidstalk-speech-rate', rate]] : []);
  const synth = {
    utterances: [],
    cancelled: 0,
    speak(utterance) { this.utterances.push(utterance); },
    cancel() { this.cancelled += 1; },
  };
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  globalThis.SpeechSynthesisUtterance = class {
    constructor(text) { this.text = text; }
  };
  globalThis.window = supported
    ? { speechSynthesis: synth, SpeechSynthesisUtterance: globalThis.SpeechSynthesisUtterance }
    : { setTimeout: (callback) => { callback(); return 1; } };
  context.after(() => {
    for (const [name, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  });
  return { synth, storage };
}

test('speech controller selects the requested system locale and saved rate', (context) => {
  installSpeech(context, { rate: '0.7' });
  const speech = new SpeechController('be');

  assert.equal(speech.language, 'be');
  assert.equal(speech.speechLocale, 'be-BY');
  assert.equal(speech.rate, 0.7);
  speech.setRate(0.9);
  assert.equal(speech.rate, 0.9);
});

test('speak leaves voice unset and completes with the utterance', async (context) => {
  const { synth } = installSpeech(context);
  const speech = new SpeechController('en');
  const pending = speech.speak('Hello');

  assert.equal(synth.utterances.length, 1);
  assert.equal(synth.utterances[0].lang, 'en-US');
  assert.equal(synth.utterances[0].voice, undefined);
  synth.utterances[0].onend();
  assert.equal(await pending, true);
  assert.equal(speech.active, null);
});

test('stop resolves active speech and cancellation is safe when idle', async (context) => {
  const { synth } = installSpeech(context);
  const speech = new SpeechController('ru');
  const pending = speech.speak('Привет');

  speech.stop();
  assert.equal(await pending, false);
  assert.equal(synth.cancelled, 2);
  speech.stop();
  assert.equal(synth.cancelled, 3);
});

test('speech reports utterance errors and can avoid interrupting', async (context) => {
  const { synth } = installSpeech(context);
  const speech = new SpeechController('en');
  const pending = speech.speak('Hello', { interrupt: false });

  assert.equal(synth.cancelled, 0);
  synth.utterances[0].onerror();
  assert.equal(await pending, false);
});

test('muted and blank speech do not create utterances', async (context) => {
  const { synth } = installSpeech(context);
  const speech = new SpeechController('en');
  speech.muted = true;

  assert.equal(await speech.speak('Hello'), false);
  speech.muted = false;
  assert.equal(await speech.speak('   '), false);
  assert.equal(synth.utterances.length, 0);
});

test('unsupported browsers retain timed playback', async (context) => {
  installSpeech(context, { supported: false });
  const speech = new SpeechController('en');

  assert.equal(speech.supported, false);
  assert.equal(await speech.speak('Hello'), true);
});
