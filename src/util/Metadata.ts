export const Metadata = new (class {
  private _wiki: any;
  private _srcs: any;

  constructor () {
    this._wiki = {
      insertion: 15205,
      selection: 29352,
      shell: 77355,
      shell_swap: 77355,
      bubble: 25977485,
      quick: 3268249,
      merge: 20039,
    };
    this._srcs = {
      insertion: `insertion_sort (list: any[]): any[] {
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
}`,
      selection: `selection (list: any[]): any[] {
  let clone = list.slice(0);
  for (let i = 0; i < clone.length; i++) {
    let j = i;
    for (let k = (i + 1); k < clone.length; k++)
      if (clone[k] < clone[j])
        j = k;
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}`,
      shell: `shell (list: any[]): any[] {
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
}`,
      shell_swap: `shell (list: any[]): any[] {
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
}`,
      bubble: ``,
      quick: ``,
      merge: ``,
    };
  }

  wiki (algorithm: string): number {
    return this._wiki[algorithm];
  }
  source (algorithm: string): string {
    return this._srcs[algorithm];
  }
});
