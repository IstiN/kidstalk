import { bunnyStory } from './bunny.js';
import { catStory } from './cat.js';
import { tomStory } from './tom.js';
import { getCustomStories, getCustomStory } from './customStories.js';

export const stories = [bunnyStory, catStory, tomStory];
export const defaultStory = bunnyStory;

export function getAllStories(storage) {
  return [...stories, ...getCustomStories(storage)];
}

export function getStory(id, storage) {
  return stories.find((story) => story.id === id) || getCustomStory(id, storage) || defaultStory;
}
