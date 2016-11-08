export class TreeNode {
  private _value: any;
  private _left: TreeNode;
  private _right: TreeNode;
  constructor (obj: any = undefined) {
    this._value = obj;
    this._left = undefined;
    this._right = undefined;
  }

  get value() { return this._value; }

  set value(newValue: any) {
    if (undefined === this._value) {
      this._value = newValue;
    } else {
      this.addChild(new TreeNode(newValue));
    }
  }

  get left() { return this._left; }

  get right() { return this._right; }

  _testNode (current: TreeNode, nextNode: TreeNode = undefined) {
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

  addChild (node: TreeNode) { // should use a comparitor
    switch (true) {
      default: break;
      case node.value === this._value: break;
      case node.value > this._value: this._right = this._testNode(this._right, node); break;
      case node.value < this._value: this._left = this._testNode(this._left, node);  break;
    }
  }

  toString (): string {
    // const valOrEmpty = (_: TreeNode) => ((_ && _.toString()) || null);
    // return [this._left, this._value, this._right]
    //   .reduce((t: string[], c: TreeNode) => {
    //     return t.concat(valOrEmpty(c));
    //   }, [])
    //   .filter((v: string) => null !== v)
    //   .join(',');
    return this._value.toString();
  }
};
