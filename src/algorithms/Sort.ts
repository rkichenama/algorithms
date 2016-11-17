export class Sort {

  static quick ([x = [], ...xs]: any[]): any[] {
    if (x.length === 0) return [];
    return [
      ...Sort.quick(xs.filter((y) => (y <= x))),
      x,
      ...Sort.quick(xs.filter((y) => (y > x)))
    ];
  }

  static shell (list: any[]): any[] {
    let clone = [...list];
    let h = 1, n = clone.length;
    while (h < (n/3)) { h = 3 * h + 1; }
    while (h > 0) {
      h = Math.floor(2 * h / 3);
      for (let k = h; k < n; k++)
        for (let j = k; j > 0 && (clone[j - h] > clone[j]); j -= h)
          [clone[j - h], clone[j]] = [clone[j], clone[j - h]];
    }
    return clone;
  }

  static insertion (list: any[]): any[] {
    let clone = list.slice(0);
    for (let i = 1; i < clone.length; i++) {
      let k = i;
      for (; k > 0 && (clone[k - 1] > clone[i]); k--) {}
      [
        ...clone.slice(0, k),
        clone[i],
        ...clone.slice(k, i),
        ...clone.slice(i + 1)
      ].forEach((val, i) => ((clone[i] !== val) && (clone[i] = val)));
    }
    return clone;
  }

  static bubble (list: any[]): any[] {
    let clone = list.slice(0);
    for (let i = 0; i < clone.length; i++) {
      for (let k = (clone.length - 1); k > i; k--)
        if (clone[k] < clone[k - 1])
          [clone[k - 1], clone[k]] = [clone[k], clone[k - 1]];
    }
    return clone;
  }

  static selection (list: any[]): any[] {
    let clone = list.slice(0);
    for (let i = 0; i < clone.length; i++) {
      let j = i;
      for (let k = (i + 1); k < clone.length; k++)
        if (clone[k] < clone[j])
          j = k;
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }

  static merge (list: any[]): any[] {
    const
      meld = (list, clone, lo, mid, hi) => {
        for (let k = lo; k <= hi; k++)
          clone[k] = list[k];

        for (let k = lo, i = lo, j = mid + 1; k <= hi; k++)
          switch (true) {
            case (i > mid): list[k] = clone[j++]; break;
            case (j > hi): list[k] = clone[i++]; break;
            case (clone[j] < clone[i]): list[k] = clone[j++]; break;
            default: list[k] = clone[i++]; break;
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

    let clone = [...list];
    order(list, clone, 0, list.length - 1);
    return list;
  }

  static _insertion (list: any[], s = 1): void {
    let n = list.length;
    for (let i = s; i < n; i++) {
      for (let k = i; k > 0 && (list[k] < list[k - 1]); k--)
        [list[k - 1], list[k]] = [list[k], list[k - 1]];
    }
  }

  static _bubble (list: any[]): any[] {
    let n = list.length;
    for (let i = 0; i < n; i++) {
      for (let k = (n - 1); k > i; k--)
        if (list[k] < list[k - 1])
          [list[k - 1], list[k]] = [list[k], list[k - 1]];
    }
    return list;
  }

  static _selection (list: any[]): any[] {
    let n = list.length;
    for (let i = 0; i < n; i++) {
      let j = i;
      for (let k = (i + 1); k < n; k++)
        if (list[k] < list[j])
          j = k;
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }
};
/*
const list = [701, 301, 132, 57, 23, 10, 4, 1];
[
    Sort.quick(list),
    Sort.shell(list),
    Sort.insertion(list),
    Sort.bubble(list),
    Sort.selection(list)
]
    .forEach(arr => {
        arr.forEach(i => document.write(`${i}<br/>`));
        document.write('<hr />');
    });
*/
