import * as React from 'react';
import { List, Action } from '../collections/List';
import { Loading } from './Loading';
import { Observable, Subscriber } from 'rxjs/Rx';

import './ListCanvas.scss';

interface BarColor {
  bg: string;
  fg: string;
}

const BarColorNormal: BarColor  = {bg: '--clr-important', fg: '--clr-highlight'};
const BarColorSwap: BarColor    = {bg: '--clr-important', fg: '--clr-accent'};
const BarColorInsert: BarColor  = {bg: '--clr-highlight', fg: '--clr-important'};
const BarColorCompare: BarColor = {bg: '--clr-black', fg: '--clr-white'};

@Loading('list')
export class ListCanvas extends React.Component< { list: List }, {} > {
  static steps: number;

  private canvas: any;
  private list: any[];
  private colors: BarColor[];
  private subscriptions: Subscriber<any>[];
  private isUnmounting: boolean;

  constructor (props: any, context: any) {
    super(props, context);
    if (!ListCanvas.steps) { ListCanvas.steps = 8; }
  }

  componentDidMount () {
    this.isUnmounting = false;
    this._initAnimation();
    this.subscriptions = [].concat(
      this.subscriptions,
      Observable.merge(
        Observable.fromEvent(window, 'resize'),
        Observable.fromEvent(document, 'visibilitychange')
      )
        .subscribe(() => { this.setCanvas(); this.renderBars(); }),
      Observable.fromEvent(document, 'cssthemechange')
        .subscribe(() => this.renderBars()),
    );
  }
  componentWillUnmount () {
    this.isUnmounting = true;
    this.subscriptions.forEach((s: Subscriber<any>) => s.unsubscribe());
  }
  componentDidUpdate (prevProps: any, prevState: any) { this._initAnimation(); }
  private _initAnimation ({ list } = this.props) {
    this.list = list.asArray();
    this.colors = this.list.map(() => BarColorNormal);
    this.setCanvas();
    this.renderBars();
    this.subscriptions = [].concat(
      list
        .filter((action) => /swap|insert|compare/.test(action.type))
        .reduce((p: Promise<any>, action: Action) => p.then(() => this[`_${action.type}`](action.src, action.dest)), Promise.resolve())
        .subscribe(() => {}),
      list
        .finally(() => this.renderBars()),
    );
  }

  render () {
    return (
      <div className='list-canvas'>
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
    const list = this.list, colors = this.colors;
    const ths = list.slice(j, i + 1);
    const steps = 15;
    const deltas = ths
      .map((v, k) => ths[k === 0 ? (ths.length - 1) : k - 1] - v);

    return this.loop(
      (mult) => {
        for (let k = 0; k < ths.length; k++) {
          list[k + j] = Math.floor(ths[k] + mult * deltas[k]);
          colors[k + j] = BarColorInsert;
        }
      },
      () => [
          ...list.slice(0, j),
          ths[ths.length - 1],
          ...ths.slice(0, ths.length - 1),
          ...list.slice(i + 1)
        ].forEach((v, k) => {
          list[k] = v;
          colors[k] = BarColorNormal;
        })
    );
  }
  private _swap (i: number, j: number): Promise<any> {
    const list = this.list, colors = this.colors;
    const [ith, jth] = [list[i], list[j]];
    const steps = 7;
    const [di, dj] = [jth - list[i], ith - list[j]];

    return this.loop(
      (mult) => {
        [list[i], list[j]] = [ith + mult * di, jth + mult * dj].map(Math.floor);
        [colors[i], colors[j]] = [BarColorSwap, BarColorSwap];
      },
      () => {
        [list[i], list[j]] = [jth, ith];
        [colors[i], colors[j]] = [BarColorNormal, BarColorNormal];
      }
    );
  }
  private _compare (i: number, j: number): Promise<any> {
    const list = this.list, colors = this.colors;
    return this.loop(
      (mult) => [colors[i], colors[j]] = [BarColorCompare, BarColorCompare],
      () => [colors[i], colors[j]] = [BarColorNormal, BarColorNormal]
    );
  }

  private setCanvas () {
    let { canvas } = this,
      { width } = canvas.getBoundingClientRect();
    canvas.setAttribute('width', Math.max(width, (this.list.length || 10) * (2 + 2 + 4)));
    canvas.setAttribute('height', 240);
  }
  private renderBars (list = this.list) {
    if (!(document.hidden || this.isUnmounting)) {
      let { canvas } = this,
        width = parseInt(canvas.getAttribute('width'), 10),
        height = parseInt(canvas.getAttribute('height'), 10);
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      list.forEach(this._renderBars(context, width, height, 10000));
    }
  }
  private _renderBars (context: any, width: number, height: number, max: number) {
    const colors = this.colors;
    return (a, i, {length: cnt}) => {
      let w = width / cnt;
      let h = (a / max) * (height - 10);
      context.fillStyle = getComputedStyle(document.body).getPropertyValue(colors[i].bg);
      context.fillRect(i * w + 1, 0, w - 2, h + 2);
      context.fillStyle = getComputedStyle(document.body).getPropertyValue(colors[i].fg);
      context.fillRect(i * w + 2, 1, w - 4, h);
    };
  }
}
