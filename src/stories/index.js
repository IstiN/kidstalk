import { bunnyStory } from './bunny.js';
import { catStory } from './cat.js';
import { tomStory } from './tom.js';

export const stories = [bunnyStory, catStory, tomStory];
export const defaultStory = bunnyStory;

export function getStory(id) {
  return stories.find((story) => story.id === id) || defaultStory;
}
