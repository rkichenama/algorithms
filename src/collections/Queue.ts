import { JsArrayBase } from './JsArrayBase';

export class Queue extends JsArrayBase {
  // add to end
  push (...objs) { [].push.apply(this.items, objs); }
  // remove from front
  pop () { return this.items.shift(); }
};
