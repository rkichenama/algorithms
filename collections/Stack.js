class Stack {
  constructor () { this.items = []; }
  // add to front
  push (...obj) { [].unshift.apply(this.items, objs); }
  // remove from front
  pop () { this.items.shift(); }
};

(module && module.exports && (module.exports = Stack));
