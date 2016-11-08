export class JsArrayBase {
  public items: any[];
  constructor () { this.items = []; }
  toString () { return `[${this.items.join(',')}]`; }
  toArray () { return this.items.slice(0); }
}
