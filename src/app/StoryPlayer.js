const wait = (milliseconds) => new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));

/**
 * Coordinates words, speech and scene actions without knowing story details.
 * A following word starts only after both its speech and meaningful action end.
 */
export class StoryPlayer {
  constructor({ scene, speech, onEvent = () => {} }) {
    this.scene = scene;
    this.speech = speech;
    this.onEvent = onEvent;
    this.runId = 0;
  }

  emit(type, detail = {}) {
    this.onEvent({ type, ...detail });
  }

  stop() {
    this.runId += 1;
    this.speech.stop();
    this.scene.cancel?.();
    this.emit('stop');
  }

  async playWord(word) {
    this.stop();
    const runId = this.runId;
    this.emit('wordStart', { word, source: 'single' });

    await Promise.all([
      this.speech.muted ? wait(word.minDuration || 800) : this.speech.speak(word.word),
      this.scene.perform(word.action, { word, storyMode: false }),
    ]);

    if (runId !== this.runId) return false;
    this.emit('wordEnd', { word, source: 'single' });
    return true;
  }

  async playSequence(words, source, initialState = {}) {
    this.stop();
    const runId = this.runId;
    this.scene.reset(initialState);
    this.emit('sequenceStart', { source });

    for (let index = 0; index < words.length; index += 1) {
      if (runId !== this.runId) return false;
      const word = words[index];
      this.emit('wordStart', { word, source, index });

      await Promise.all([
        this.speech.muted ? wait(word.minDuration || 800) : this.speech.speak(word.word),
        this.scene.perform(word.action, { word, storyMode: true, index }),
      ]);

      if (runId !== this.runId) return false;
      this.emit('wordEnd', { word, source, index });
      await wait(word.pauseAfter ?? 180);
    }

    if (runId !== this.runId) return false;
    this.emit('sequenceEnd', { source });
    return true;
  }

  async speakPhrase(text) {
    this.stop();
    const runId = this.runId;
    this.emit('phraseStart', { text });
    if (this.speech.muted) await wait(Math.max(900, text.length * 55));
    else await this.speech.speak(text);
    if (runId !== this.runId) return false;
    this.emit('phraseEnd', { text });
    return true;
  }
}
