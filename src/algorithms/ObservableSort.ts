import { Subject } from 'rxjs/Rx';
import { List } from '../collections/List';

export class ObservableSort {

  constructor (private list: List) { }

  shell (): void {
    let clone = this.list;
    let h = 1, n = clone.length;
    while (h < n) { h = 3 * h + 1; }
    while (h > 0) {
      h = Math.floor(2 * h / 3);
      for (let k = h; k < n; k++) {
        let j = k;
        for (; j > (h - 1) && clone.gt(j - h, k); j -= h) {}
        (j !== k) && clone.insert(k, j);
      }
    }
    this.list.complete();
  }

  insertion (): void {
    let clone = this.list;
    this._insertion(clone);
    this.list.complete();
  }

  _insertion (list: List, s: number = 1, g: number = 1): void {
    let n = list.length;
    for (let i = s; i < n; i++) {
      let k = i;
      for (; k > (g - 1) && list.gt(k - g, i); k = k - g) {}
      (i !== k) && list.insert(i, k);
    }
  }

  selection (): void {
    let clone = this.list
    this._selection(clone);
    this.list.complete();
  }

  _selection (list: List): void {
    let n = list.length;
    for (let i = 0; i < n; i++) {
      let j = i;
      for (let k = (i + 1); k < n; k++)
        if (list.lt(k, j))
          j = k;
      list.swap(i, j);
    }
  }
};
