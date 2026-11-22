import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { tomStory } from '../src/stories/tom.js';
import { localizeStory } from '../src/i18n.js';

const expectedActions = ['walk', 'run', 'jump', 'hello', 'laugh', 'dance', 'brush-teeth', 'wash', 'eat', 'sleep', 'ball', 'sing'];

test('Tom exposes twelve direct actions with local open symbols', async () => {
  const words = tomStory.lines.flatMap((line) => line.words);
  assert.equal(tomStory.scene, 'tom');
  assert.equal(tomStory.previewLine, 1);
  assert.deepEqual(words.map((word) => word.id), expectedActions);
  for (const word of words) {
    assert.equal(word.action, word.id);
    assert.ok(word.caption && word.minDuration >= 1500 && word.element);
    assert.equal(word.symbol.set, 'openmoji');
    await access(new URL(`../public/symbols/openmoji/${word.symbol.id}.svg`, import.meta.url));
  }
  const license = await readFile(new URL('../public/symbols/openmoji/LICENSE.md', import.meta.url), 'utf8');
  assert.match(license, /CC BY-SA 4\.0/);
});

test('Tom English and Belarusian localizations preserve every action and caption', () => {
  for (const language of ['en', 'be']) {
    const localized = localizeStory(tomStory, language);
    const words = localized.lines.flatMap((line) => line.words);
    assert.ok(localized.title && localized.subtitle && localized.shortDescription);
    assert.equal(words.length, 12);
    words.forEach((word, index) => {
      assert.ok(word.word.length > 0 && word.caption.length > 0);
      assert.equal(word.id, expectedActions[index]);
      assert.equal(word.action, expectedActions[index]);
    });
  }
});
