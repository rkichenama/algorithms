export class Animation {
  private startTime: number;
  private stages: Stage[];

  constructor (private fns: Function[], private stepDuration: number) {
    this.stages = [];
  }

  /**
   * function queue handler
   * @param  {number} time - time-ish value provided by requestAnimationFrame
   */
  animate (time: number): void {
    if (!this.stages.length) { return; }

    if (!this.startTime) { this.startTime = time; }

    const stage = this.stages.shift();
    stage.setup();

    const delta = Math.min(1, (time - this.startTime) / this.stepDuration);
    if (delta < 1) {
      requestAnimationFrame(this.animate);
    } else {
      this.startTime = null;
      //TODO:
    }
  }

  addStep ([setup = () => {}, delay = () => {}, breakdown = () => {}]): void {
    this.stages.push({setup, delay, breakdown});
  }
}

export interface Stage {
  setup: Function;
  delay: Function;
  breakdown: Function;
}
