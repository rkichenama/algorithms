class Queue {
  constructor () { this.items = []; }
  // add to end
  push (...objs) { [].push.apply(this.items, objs); }
  // remove from front
  pop () { this.items.pop(); }
};
