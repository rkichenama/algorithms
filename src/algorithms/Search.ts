export class Search {
  static linear (list: any[], target: any): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) { return i; }
    }
    return -1;
  }
  static binary (list: any[], target: any): number {
    const search = (lo: number, hi: number): number => {
      return -1;
    };
    return search(0, list.length);
  }
  static depth (): void {}
  static breadth (): void {}
}
/*
Store the root node in Container
While (there are nodes in Container)
   N = Get the "next" node from Container
   Store all the children of N in Container
   Do some work on N
 For depth first use a stack. (The recursive implementation uses the call-stack...)
 For breadth-first use a queue.
*/
