import * as React from 'react';
import { List, Action } from '../collections/List';
import { Loading } from './Loading';
import { Observable } from 'rxjs/Rx';

import './ListCanvas.scss';

@Loading('list')
export class ListCanvas extends React.Component< { list: List }, {} > {
  static steps: number;

  private canvas: any;
  private list: any[];

  constructor (props: any, context: any) {
    super(props, context);
    if (!ListCanvas.steps) { ListCanvas.steps = 8; }
  }

  componentDidMount () {
    this._initAnimation();
    Observable.fromEvent(window, 'resize')
      .subscribe(() => this.setCanvas());
  }
  componentWillMount () {}
  componentDidUpdate (prevProps: any, prevState: any) { this._initAnimation(); }
  private _initAnimation ({ list } = this.props) {
    this.list = list.asArray();
    this.setCanvas();
    this.renderBars();
    list
      .filter((action) => /swap|insert/.test(action.type))
      .reduce((p, action: Action) => p.then(() => this[`_${action.type}`](action.src, action.dest)), Promise.resolve())
      .subscribe(() => {});
  }

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
        if (document.hidden || step > ListCanvas.steps) {
          completeFn();
          this.renderBars();
          res();
          return;
        } else {
          stepFn(step / ListCanvas.steps);
          this.renderBars();
          requestAnimationFrame(() => fn(step + 1));
        }
      };
      fn();
    });
  }

  private _insert (i: number, j: number): Promise<any> {
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
  private _swap (i: number, j: number): Promise<any> {
    const list = this.list;
    const [ith, jth] = [list[i], list[j]];
    const steps = 7;
    const [di, dj] = [jth - list[i], ith - list[j]];

    return this.loop(
      (mult) => [list[i], list[j]] = [ith + mult * di, jth + mult * dj].map(Math.floor),
      () => [list[i], list[j]] = [jth, ith]
    );
  }
  private _compare (i: number, j: number): Promise<any> {
    return Promise.resolve();
  }

  private setCanvas () {
    let { canvas } = this,
      { width } = canvas.getBoundingClientRect();
    canvas.setAttribute('width', Math.max(width, (this.list.length || 10) * (2 + 2 + 4)));
    canvas.setAttribute('height', 240);
  }
  private renderBars (list = this.list) {
    if (!document.hidden) {
      let { canvas } = this,
        width = parseInt(canvas.getAttribute('width'), 10),
        height = parseInt(canvas.getAttribute('height'), 10);
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      list.forEach(this._renderBars(context, width, height, Math.max.apply(null, list)));
    }
  }
  private _renderBars (context: any, width: number, height: number, max: number) {
    return (a, i, {length: cnt}) => {
      let w = width / cnt;
      let h = (a / 10000) * (height - 10);
      context.fillStyle = getComputedStyle(document.body).getPropertyValue('--clr-important');
      context.fillRect(i * w + 1, 0, w - 2, h + 2)
      context.fillStyle = getComputedStyle(document.body).getPropertyValue('--clr-highlight');
      context.fillRect(i * w + 2, 1, w - 4, h);
    }
  }
}
