export class Search {
  static linear (list: any[], target: any): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) { return i; }
    }
    return -1;
  }
  static binary (list: any[], target: any): number {
    const search = (lo: number, hi: number): number => {
      let i = Math.floor((hi + lo) / 2);
      switch (true) {
        case (hi === lo && lo === 0) || i >= list.length:
        default: return -1;
        case list[i] > target: return search(lo, i);
        case list[i] < target: return search(i, hi + 1);
        case list[i] === target: return i;
      }
    };
    return search(0, list.length);
  }
  static depth (nodes: any[], target: any): any[] {
    const container = [...nodes];
    while (container.length) {
      let node = container.shift();
      node.children().forEach((n) => container.unshift(n));
      if (node.value === target) {
        return [];
      }
    }
    return [];
  }
  static breadth (nodes: any[], trarget: any): any[] {
    return [];
  }
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
