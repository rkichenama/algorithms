import { Subject } from 'rxjs/Rx';

export class Action {
  constructor (public type: string, public src: number, public dest: number) {}
}

export class Finished extends Action {
  constructor (public list: any[]) {
    super('complete', 0, 0);
  }
}

export class Assignment extends Action {
  constructor (src: number, public value: any) {
    super('assignment', src, 0);
  }
}

export class Partition extends Action {
  constructor (public targets: number[], public values: any[]) {
    super('partition', 0, 0);
  }
}

export class List extends Subject<any> {
  private list: any[];
  private actions: Action[];
  private comparitor: Function;

  static defaultComparitor (a: any, b: any): number {
    switch (true) {
      default: return 0;
      case b > a: return -1;
      case a > b: return +1;
    }
  }

  constructor (list: any[]) {
    super();
    this.list = [...list];
    this.actions = [];
    this.setComparitor();
  }

  add (...args): void {
    this.list = [...this.list, ...args];
  }

  complete (): void {
    this.mark(new Finished(this.asArray()));
    super.complete();
  }

  get length (): number { return this.list.length; }
  item (i: number): any { return this.list[Math.abs(i % this.length)]; }

  history (): Action[] {
    return [...this.actions];
  }
  private mark (action: Action): void {
    this.actions[this.actions.length] = action;
    this.next(action);
  }
  asArray () { return [...this.list]; }
  setComparitor (fn: Function = List.defaultComparitor): void {
    this.comparitor = fn;
  }

  /**
   * move all < to left og, > to right of, specified index value
   */
  cut (lo: number = 0, hi: number = (this.list.length - 1), i: number = lo): any {
    this.mark(new Action('compare', i, i));
    let list = [...this.list];
    let newI = i;
    let left = list.filter((y, j) => ((j >= lo && j <= hi) && (y < list[i]))),
      mid  = list.filter((y, j) => ((j >= lo && j <= hi) && (y === list[i]))),
      right = list.filter((y, j ) => ((j >= lo && j <= hi) && (y > list[i])));
    let changed = [
      ...left,
      ...mid,
      ...right,
    ];
    this.list = [
      ...list.slice(0, lo),
      ...changed,
      ...list.slice(hi + 1),
    ];
    let [lLo, lHi, mLo, mHi, rLo, rHi] = [
      lo, lo + (left.length - 1),
      (lo + left.length), (lo + left.length + mid.length - 1),
      (lo + left.length + mid.length), (lo + left.length + mid.length + right.length - 1),
    ];

    this.mark(new Partition(changed.map((v, j) => lLo + j), changed));

    return {
      left: {lo, hi: (lo + left.length - 1)},
      right: {lo: (lo + left.length + mid.length), hi: (lo + left.length + mid.length + right.length - 1)},
    };
  }

  /**
   *
   */
  swap (i: number, j: number): void {
    [this.list[i], this.list[j]] = [this.list[j], this.list[i]];
    this.mark(new Action('swap', i, j));
  }

  /**
   * insert value at i into place j, shifting all between
   * assumes j < i
   * @param i - target value to be inserted into the jth place
   * @param j - destination for the ith value
   */
  insert (i: number, j: number): void {
    if (j >= i) { throw new Error('j value must be less than i value'); }
    this.list = [
      ...this.list.slice(0, j),
      this.list[i],
      ...this.list.slice(j, i),
      ...this.list.slice(i + 1)
    ];
    this.mark(new Action('insert', i, j));
  }

  /**
   *
   */
  put (i: number, v: any): void {
    this.list[i] = v;
    this.mark(new Assignment(i, v));
  }

  compare (i: number, j: number): number {
    this.mark(new Action('compare', i, j));
    return this.comparitor(this.list[i], this.list[j]);
  }
  gt (i: number, j: number): boolean { return this.compare(i, j) === +1; }
  lt (i: number, j: number): boolean { return this.compare(i, j) === -1; }
  eq (i: number, j: number): boolean { return this.compare(i, j) === 0; }
  gte (i: number, j: number): boolean { return this.gt(i, j) || this.eq(i, j); }
  lte (i: number, j: number): boolean { return this.lt(i, j) || this.eq(i, j); }

  get largest () {
    return this.list
      .reduce((t, c) => (this.comparitor(t, c) === +1 ? t : c), this.list[0]);
  }
}
