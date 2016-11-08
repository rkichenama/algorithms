export class TreeNode {
  private _value: any;
  private _left: TreeNode;
  private _right: TreeNode;
  constructor (obj) {
    this._value = obj;
    this._left = undefined;
    this._right = undefined;
  }

  get value() { return this._value; }

  set value(newValue) { this._value = newValue; }

  get left() { return this._left; }

  set left(newValue) { this._left = this._testNode(this._left, newValue); }

  get right() { return this._right; }

  set right(newValue) { this._right = this._testNode(this._right, newValue); }

  _testNode (current, nextNode) {
    if (/undefined/i.test(typeof(nextNode))) {
      return current;
    } else {
      if (/undefined/i.test(typeof(current))) {
        return nextNode;
      } else {
        current.addChild(nextNode);
        return current;
      }
    }
  }

  addChild (node) { // should use a comparitor
    switch (true) {
      default: break;
      case node.value === this.value: break;
      case node.value > this.value: this.right = node; break;
      case node.value < this.value: this.left = node;  break;
    }
  }
};
