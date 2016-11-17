import { TreeNode } from '../../src/collections/TreeNode';

describe('TreeNode', () => {
  let treenode: TreeNode;

  beforeEach(() => {
    treenode = new TreeNode('node');
  });

  it('should have an expected value', () => {
    expect(treenode.value).toEqual('node');
    const tmp = new TreeNode();
    expect(tmp.value).toBeUndefined();
  });

  it('should have undefined left', () => {
    expect(treenode.left).toBeUndefined();
  });

  it('should have undefined right', () => {
    expect(treenode.right).toBeUndefined();
  });

  it('should add a node to the left', () => {
    const tmp: TreeNode = new TreeNode('mode');
    treenode.addChild(tmp);
    expect(treenode.right).toBeUndefined();
    expect(treenode.left).toEqual(tmp);
  });

  it('should add a node to the right', () => {
    const tmp: TreeNode = new TreeNode('oode');
    treenode.addChild(tmp);
    expect(treenode.left).toBeUndefined();
    expect(treenode.right).toEqual(tmp);
  });

  it('should add a node to the left, then again', () => {
    const tmp1: TreeNode = new TreeNode('gode');
    const tmp2: TreeNode = new TreeNode('bode');
    treenode.addChild(tmp1);
    treenode.addChild(tmp2);
    expect(treenode.right).toBeUndefined();
    expect(treenode.left).toEqual(tmp1);
    expect(treenode.left.left).toEqual(tmp2);
  });

  it('should add a node to the right, then again', () => {
    const tmp1: TreeNode = new TreeNode('pode');
    const tmp2: TreeNode = new TreeNode('rode');
    treenode.addChild(tmp1);
    treenode.addChild(tmp2);
    expect(treenode.left).toBeUndefined();
    expect(treenode.right).toEqual(tmp1);
    expect(treenode.right.right).toEqual(tmp2);
  });
});
