import * as React from 'react';
import { List } from '../collections/List';
import { Loading } from './Loading';

@Loading('actions')
export class ListCanvas extends React.Component< { list: any[], actions: any[] }, {} > {
  static steps: number;

  private canvas: any;
  private list: any[];

  constructor (props: any, context: any) {
    super(props, context);
    if (!ListCanvas.steps) { ListCanvas.steps = 15; }
  }

  componentDidMount () {}
  componentWillMount () {}
  componentDidUpdate (prevProps: any, prevState: any) {}
  render () {
    return (
      <div className="list-canvas">
        <canvas ref={d => this.canvas = d}></canvas>
      </div>
    );
  }

  private loop (stepFn: Function, completeFn: Function): Promise<any> {
    return new Promise((res) => {
      const fn = (step = 1) => {
        if (step > ListCanvas.steps) {
          completeFn();
          this.renderBars();
          res();
          return;
        } else {
          if (document.hidden) {
            requestAnimationFrame(() => fn(ListCanvas.steps + 1));
          } else {
            stepFn(step / ListCanvas.steps);
            this.renderBars();
            requestAnimationFrame(() => fn(step + 1));
          }
        }
      };
      fn();
    });
  }

  private _insert (i, j) {
    // moving i into the j place, shifting the rest over to the right
    const list = this.list;
    const ths = list.slice(j, i + 1)
    const steps = 15;
    const deltas = ths
      .map((v, k) => ths[k === 0 ? (ths.length - 1): k - 1] - v);

    return this.loop(
      (mult) => {
        for(let k = 0; k < ths.length; k++) {
          list[k + j] = Math.floor(ths[k] + mult * deltas[k]);
        }
      },
      () => [
          ...list.slice(0, j),
          ths[ths.length - 1],
          ...ths.slice(0, ths.length - 1),
          ...list.slice(i + 1)
        ].forEach((v, k) => list[k] = v)
    );
  }
  private _swap (i, j) {
    const list = this.list;
    const [ith, jth] = [list[i], list[j]];
    const steps = 7;
    const [di, dj] = [jth - list[i], ith - list[j]];

    return this.loop(
      (mult) => [list[i], list[j]] = [ith + mult * di, jth + mult * dj].map(Math.floor),
      () => [list[i], list[j]] = [jth, ith]
    );
  }

  private setCanvas () {
    let { canvas } = this, {height, width} = canvas.getBoundingClientRect();
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
  }
  private renderBars (list = this.list) {
    let { canvas } = this, {height, width} = canvas.getBoundingClientRect();
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    list.forEach(this._renderBars(context, width, height, Math.max.apply(null, list)));
  }
  private _renderBars (context, width, height, max) {
    return (a, i, {length: cnt}) => {
      let w = width / cnt;
      let tall = (height - 4)
      let h = (a / max) * tall;
      context.fillStyle = 'white';
      context.fillRect(i * w + 1, (tall + 1) - h - 1, w - 2, h + 2)
      context.fillStyle = 'blue';
      context.fillRect(i * w + 2, (tall + 1) - h, w - 4, h);
    }
  }
}
