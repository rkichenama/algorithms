import { JsArrayBase } from './JsArrayBase';

export class Stack extends JsArrayBase {
  // add to front
  push (...objs: any[]) { [].unshift.apply(this.items, objs); }
  // remove from front
  pop () { return this.items.shift(); }
};
