import { TreeNode } from './TreeNode';

export class Tree {
  private _root: TreeNode;

  constructor () {}

  add (value: any) {
    if (undefined === this._root) {
      this._root = new TreeNode(value);
    } else {
      this._root.value = value;
    }
  }

  remove (value: any) {
    // TODO
  }

  inorder (): string { return this._stringify(this._inorder(this._root)); }

  postorder (): string { return this._stringify(this._postorder(this._root)); }

  preorder (): string { return this._stringify(this._preorder(this._root)); }

  _valOrUndefined (_: TreeNode): string { return ((_ && _.toString()) || undefined); }

  _stringify (nodelist: TreeNode[]): string {
    return nodelist
    .reduce((t: string[], c: TreeNode) => t.concat(this._valOrUndefined(c)), [])
    .filter((v: string) => undefined !== v)
    .join(',');
  }

  _inorder (node: TreeNode): TreeNode[] {
    if (undefined === node || node.value === undefined) { return [undefined]; }
    return this._inorder(node.left).concat(node, this._inorder(node.right));
  }

  _postorder (node: TreeNode): TreeNode[] {
    if (undefined === node || node.value === undefined) { return [undefined]; }
    return this._postorder(node.left).concat(this._postorder(node.right), node);
  }

  _preorder (node: TreeNode): TreeNode[] {
    if (undefined === node || node.value === undefined) { return [undefined]; }
    return [node].concat(this._preorder(node.left), this._preorder(node.right));
  }
};
