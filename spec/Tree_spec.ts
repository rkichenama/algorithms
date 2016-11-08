import { Tree } from '../src/collections/Tree';

describe('Tree', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = new Tree();
    [
      'C', 'T', 'K', 'K', 'D', 'M', 'O', 'D', 'O', 'I', 'M', 'X', 'O', 'K', 'G', 'A', 'Y', 'E', 'U', 'R', 'H', 'B', 'V', 'J', 'E', 'U', 'Y', 'X', 'V', 'W', 'O', 'K'
    ].forEach((l: string) => tree.add(l));
    /*
            c
         /     \
        a       t
         \    /   \
          b  k     x
            / \   / \
           d   m u   y
            \   \ \
             i   o v
            / \   \ \
           g   j   r w
          / \
         e   h
    */
  });

  describe('ordering', () => {
    it('should show in order', () => {
      expect(tree.inorder()).toEqual('A,B,C,D,E,G,H,I,J,K,M,O,R,T,U,V,W,X,Y');
    });

    it('should show post order', () => {
      expect(tree.postorder()).toEqual('B,A,E,H,G,J,I,D,R,O,M,K,W,V,U,Y,X,T,C');
    });

    it('should show pre order', () => {
      expect(tree.preorder()).toEqual('C,A,B,T,K,D,I,G,E,H,J,M,O,R,X,U,V,W,Y');
    });
  });
});
