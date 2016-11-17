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
    while (h < n) { h = 3 * h + 1; }
    while (h > 0) {
      h = Math.floor(2 * h / 3);
      for (let k = h; k < n; k++) {
        let j = k, tmp = clone[k];
        for (; j > (h - 1) && (clone[j - h] > clone[k]); j -= h) {
          [clone[j - h], clone[k]] = [clone[k], clone[j - h]];
        }
        (j !== k) && (clone[j] = tmp);
      }
    }
    return clone;
  }

  static insertion (list: any[]): any[] {
    let clone = list.slice(0);
    Sort._insertion(clone);
    return clone;
  }

  static bubble (list: any[]): any[] {
    let clone = list.slice(0);
    Sort._bubble(clone);
    return clone;
  }

  static selection (list: any[]): any[] {
    let clone = list.slice(0);
    Sort._selection(clone);
    return clone;
  }

  /*
    # split in half
    m = n / 2

    # recursive sorts
    sort a[1..m]
    sort a[m+1..n]

    # merge sorted sub-arrays using temp array
    b = copy of a[1..m]
    i = 1, j = m+1, k = 1
    while i <= m and j <= n,
        a[k++] = (a[j] < b[i]) ? a[j++] : b[i++]
        → invariant: a[1..k] in final position
    while i <= m,
        a[k++] = b[i++]
        → invariant: a[1..k] in final position
  */
  static merge (list: any[]): any[] {
    return [];
  }

  /*
    # heapify
    for i = n/2:1, sink(a,i,n)
    → invariant: a[1,n] in heap order

    # sortdown
    for i = 1:n,
        swap a[1,n-i+1]
        sink(a,1,n-i)
        → invariant: a[n-i+1,n] in final position
    end

    # sink from i in a[1..n]
    function sink(a,i,n):
        # {lc,rc,mc} = {left,right,max} child index
        lc = 2*i
        if lc > n, return # no children
        rc = lc + 1
        mc = (rc > n) ? lc : (a[lc] > a[rc]) ? lc : rc
        if a[i] >= a[mc], return # heap ordered
        swap a[i,mc]
        sink(a,mc,n)
  */
  static heap (list: any[]): any[] {
    return [];
  }

  // [...list.slice(0,2), list[8], ...list.slice(2,8)] as an insert
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
