import { Subject } from 'rxjs/Rx';
import { List } from '../collections/List';

export class ObservableSort {

  constructor (private list: List) { }

  quick (): void {
    const sort = ({lo, hi}) => {
      if (hi <= 0 || hi === lo || hi - lo <= 0) { return; }
      let moved = this.list.cut(lo, hi);
      sort(moved.left);
      sort(moved.right);
    };
    sort({lo: 0, hi: this.list.length - 1});
    this.list.complete();
  }

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

  bubble (): void {
    let clone = this.list;
    for (let i = 0; i < clone.length; i++) {
      for (let k = (clone.length - 1); k > i; k--)
        if (clone.lt(k, k - 1))
          clone.swap(k, k - 1);
    }
    this.list.complete();
  }

  merge (): void {
    const
      meld = (list, clone, lo, mid, hi) => {
        for (let k = lo; k <= hi; k++)
          clone.put(k, list.item(k));

        for (let k = lo, i = lo, j = mid + 1; k <= hi; k++)
          switch (true) {
            case (i > mid): list.put(k, clone.item(j++)); break;
            case (j > hi): list.put(k, clone.item(i++)); break;
            case (clone.lt(j, i)): list.lt(j, i); list.put(k, clone.item(j++)); break;
            default: list.lt(j, i); list.put(k, clone.item(i++)); break;
          }
      },
      order = (list, clone, lo, hi) => {
        if (hi <= lo) { return; }
        let mid = Math.floor(lo + (hi - lo) / 2);

        order(list, clone, lo, mid);
        order(list, clone, mid + 1, hi);

        meld(list, clone, lo, mid, hi);
      }
    ;

    let clone = new List(this.list.asArray());
    order(this.list, clone, 0, this.list.length - 1);
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
