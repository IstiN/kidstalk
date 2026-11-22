import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultStory, getStory, stories } from '../src/stories/index.js';

test('story catalog contains three complete stories', () => {
  assert.equal(stories.length, 3);
  for (const story of stories) {
    assert.ok(story.lines.length > 0);
    assert.ok(story.lines.every((line) => line.words.length >= 3));
    assert.ok(story.lines.flatMap((line) => line.words).every((word) => word.id && word.word && word.action));
  }
});

test('getStory finds a story and falls back safely', () => {
  assert.equal(getStory('cat').id, 'cat');
  assert.equal(getStory('bunny').id, 'bunny');
  assert.equal(getStory('tom').id, 'tom');
  assert.equal(getStory('missing'), defaultStory);
  assert.equal(getStory(), defaultStory);
});
