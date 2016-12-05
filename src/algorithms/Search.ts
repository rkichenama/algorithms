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
