import { bunnyStory } from './bunny.js';
import { catStory } from './cat.js';

export const stories = [bunnyStory, catStory];
export const defaultStory = bunnyStory;

export function getStory(id) {
  return stories.find((story) => story.id === id) || defaultStory;
}
