import { Subject } from 'rxjs/Rx';
import { List } from '../collections/List';

export class ObservableSort {

  constructor (private list: List) { }

  shell (): void {
    let clone = this.list;
    let h = 1, n = clone.length;
    while (h < n) { h = 3 * h + 1; }
    while (h > 0) {
      for (let k = h; k < n; k++) {
        let j = k;
        for (; j > (h - 1) && clone.gt(j - h, k); j -= h) {}
        (j !== k) && clone.insert(k, j);
      }
      h = Math.floor(--h / 3);
    }
    this.list.complete();
  }

  shell_swap (): void {
    let clone = this.list;
    let h = 1, n = clone.length;
    while (h < (n / 3)) { h = 3 * h + 1; }
    while (h > 0) {
      for (let k = h; k < n; k++)
        for (let j = k; j > 0 && (j - h) >= 0 && clone.gt(j - h, j); j -= h)
          clone.swap(j - h, j);
      h = Math.floor(--h / 3);
    }
    this.list.complete();
  }

  insertion (): void {
    let clone = this.list;
    for (let i = 1; i < clone.length; i++) {
      let k = i;
      for (; k > 0 && clone.gt(k - 1, i); k--) {}
      (i !== k) && clone.insert(i, k);
    }
    this.list.complete();
  }

  selection (): void {
    let clone = this.list;
    for (let i = 0; i < clone.length; i++) {
      let j = i;
      for (let k = (i + 1); k < clone.length; k++)
        if (clone.lt(k, j))
          j = k;
      (i !== j) && clone.insert(j, i);
    }
    this.list.complete();
  }
};
