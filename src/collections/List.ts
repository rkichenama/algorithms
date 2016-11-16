import { Subject } from 'rxjs/Rx';

export class Action {
  constructor (public type: string, public src: number, public dest: number) {}
}

export class Finished extends Action {
  constructor (public list: any[]) {
    super('complete', 0, 0);
  }
}

export class List extends Subject<any> {
  private actions: Action[];
  private comparitor: Function;

  static defaultComparitor (a: any, b: any): number {
    switch (true) {
      default: return 0;
      case b > a: return +1;
      case a > b: return -1;
    }
  }

  constructor (private list: any[]) {
    super();
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
  swap (i: number, j: number): void {
    [this.list[i], this.list[j]] = [this.list[j], this.list[i]]
    this.mark(new Action('swap', i, j));
  }
  insert (i: number, j: number): void {
    this.list = [
      ...this.list.slice(0, j),
      this.list[i],
      ...this.list.slice(j, i),
      ...this.list.slice(i + 1)
    ];
    this.mark(new Action('insert', i, j));
  }
  compare (i: number, j: number): number {
    this.mark(new Action('compare', i, j));
    return this.comparitor(this.list[i], this.list[j]);
  }
  gt (i: number, j: number): boolean { return this.compare(i, j) === -1; }
  lt (i: number, j: number): boolean { return this.compare(i, j) === +1; }
  eq (i: number, j: number): boolean { return this.compare(i, j) === 0; }
}
