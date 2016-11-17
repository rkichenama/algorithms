export class Animation {
  private startTime: number;

  constructor (private fns: Function[], private stepDuration: number) {}

  /**
   * function queue handler
   * @param  {number} time - time-ish value provided by requestAnimationFrame
   */
  animate (time: number): void {
    if (!this.fns.length) { return; }

    if (!this.startTime) { this.startTime = time; }
    const delta = Math.min(1, (time - this.startTime) / this.stepDuration);

    this.fns.shift()();

    if (delta < 1) {
      requestAnimationFrame(this.animate);
    } else {
      this.startTime = null;
      //TODO:
    }
  }
}
