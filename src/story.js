// Backward-compatible entry point. Story manifests live in src/stories/.
import { defaultStory } from './stories/index.js';

export const story = defaultStory.lines;
export const allWords = story.flatMap((line) => line.words);
