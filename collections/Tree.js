class TreeNode {
  constructor (obj) {
    this._value = obj;
    this._left = undefined;
    this._right = undefined;
  }
  value () { return this._value; }
  left  (node) {
    if (/undefined/i.test(typeof(node))) {
      return this._left;
    } else {
      if (/undefined/i.test(typeof(this._left))) {
        this._left = node;
      } else {
        this._left.addChild(node);
      }
    }
  }
  right (node) {
    if (/undefined/i.test(typeof(node))) {
      return this._right;
    } else {
      if (/undefined/i.test(typeof(this._right))) {
        this._right = node;
      } else {
        this._right.addChild(node);
      }
    }
  }
  addChild (node) { // should use a comparitor
    switch (true) {
      default: break;
      case node.value > this.value: this.right(node); break;
      case node.value < this.value: this.left(node);  break;
    }
  }
};

class Tree {
  constructor () {}
};

(module && module.exports && (module.exports = Tree));
