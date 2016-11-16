import { Subject } from 'rxjs/Rx';
import { List } from '../collections/List';

export class ObservableSort {

  constructor (private list: List) { }

  shell (): void {
    let clone = this.list;
    let h = 1, n = clone.length;
    while (h < n) { h = 3 * h + 1; }
    while (h > 0) {
      h = Math.floor(h / 3);
      for (let k = h; k < n; k++)
        this._insertion(clone, k);
    }
    this.list.complete();
  }

  insertion (): void {
    let clone = this.list;
    this._insertion(clone);
    this.list.complete();
  }


  _insertion (list: List, s = 1): void {
    let n = list.length;
    for (let i = s; i < n; i++) {
      let k = i;
      for (; k > 0 && list.gt(k - 1, i); k--) {}
      (i !== k) && list.insert(i, k);
    }
  }
};
