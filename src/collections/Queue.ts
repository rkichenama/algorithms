import { JsArrayBase } from './JsArrayBase';

export class Queue extends JsArrayBase {
  // add to end
  push (...objs: any[]) { [].push.apply(this.items, objs); }
  // remove from front
  pop () { return this.items.shift(); }
  //
  get isEmpty () { return 0 === this.items.length; }
};
