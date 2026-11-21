import { getLanguage, LANGUAGES } from './i18n.js';

const RATE_KEY = 'kidstalk-speech-rate';

export class SpeechController {
  constructor(language = getLanguage()) {
    const selected = LANGUAGES.find(({ id, speech }) => id === language || speech === language) || LANGUAGES[0];
    this.language = selected.id;
    this.speechLocale = selected.speech;
    this.supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    this.synth = this.supported ? window.speechSynthesis : null;
    this.muted = false;
    this.active = null;
    this.rate = Number(localStorage.getItem(RATE_KEY)) || 0.82;
  }

  setRate(rate) {
    this.rate = rate;
    localStorage.setItem(RATE_KEY, String(rate));
  }

  stop() {
    if (this.active) {
      const active = this.active;
      this.active = null;
      active.resolve(false);
    }
    if (this.supported) this.synth.cancel();
  }

  speak(text, { rate, interrupt = true } = {}) {
    if (interrupt) this.stop();
    if (this.muted || !text.trim()) return Promise.resolve(false);

    if (!this.supported) {
      return new Promise((resolve) => window.setTimeout(() => resolve(true), 650));
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      // Leave utterance.voice unset so the OS chooses a voice for this locale.
      utterance.lang = this.speechLocale;
      utterance.rate = rate || this.rate;
      utterance.pitch = 1.06;
      utterance.volume = 1;

      const token = { resolve };
      this.active = token;
      utterance.onend = () => {
        if (this.active === token) {
          this.active = null;
          resolve(true);
        }
      };
      utterance.onerror = () => {
        if (this.active === token) {
          this.active = null;
          resolve(false);
        }
      };

      this.synth.speak(utterance);
    });
  }
}
