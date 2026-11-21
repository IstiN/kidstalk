const easeInOut = (value) => value * value * (3 - 2 * value);

/**
 * Small cancellable timeline for semantic scene actions.
 * Continuous weather and idle motion stay in the scene renderer.
 */
export class TweenManager {
  constructor({ reducedMotion = false } = {}) {
    this.reducedMotion = reducedMotion;
    this.items = new Set();
  }

  tween({ duration = 500, update = () => {}, ease = easeInOut } = {}) {
    const adjustedDuration = this.reducedMotion ? Math.min(duration, 350) : duration;

    return new Promise((resolve) => {
      const item = {
        elapsed: 0,
        duration: Math.max(adjustedDuration, 1) / 1000,
        update,
        ease,
        resolve,
      };
      this.items.add(item);
      if (adjustedDuration <= 1) {
        this.items.delete(item);
        update(1, 1);
        resolve(true);
      }
    });
  }

  wait(duration) {
    return this.tween({ duration });
  }

  tick(delta) {
    [...this.items].forEach((item) => {
      item.elapsed += delta;
      const progress = Math.min(item.elapsed / item.duration, 1);
      item.update(item.ease(progress), progress);
      if (progress >= 1) {
        this.items.delete(item);
        item.resolve(true);
      }
    });
  }

  cancel() {
    this.items.forEach((item) => item.resolve(false));
    this.items.clear();
  }
}
