import * as React from 'react';
import { List, Action } from '../collections/List';
import { Loading } from './Loading';
import { Observable, Subscriber } from 'rxjs/Rx';
import { ObservableSort } from '../algorithms/ObservableSort';

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
export class ListCanvas extends React.Component< { algorithm: string, list: List }, {} > {
  static steps: number;

  private canvas: any;
  private list: any[];
  private colors: BarColor[];
  private subscriptions: Subscriber<any>[];
  private isUnmounting: boolean;

  private counts: any;
  private _swap: any;
  private _insert: any;
  private _compare: any;
  private _moves: any;
  private _desc: any;
  private _code: any;
  public _startTime: any;
  public _elapsed: any;


  constructor (props: any, context: any) {
    super(props, context);
    if (!ListCanvas.steps) { ListCanvas.steps = 8; }
  }

  componentDidMount () {
    this.isUnmounting = false;
    this.subscriptions = [].concat(
      Observable.merge(
        Observable.fromEvent(window, 'resize'),
        Observable.fromEvent(document, 'visibilitychange')
      )
        .subscribe(() => { this.setCanvas(); this.renderBars(); }),
      Observable.fromEvent(document, 'cssthemechange')
        .subscribe(() => this.renderBars()),
    );
    this._initAnimation();
  }
  componentWillUnmount () {
    this.isUnmounting = true;
    this.subscriptions.forEach((s: Subscriber<any>) => s.unsubscribe());
  }
  componentDidUpdate (prevProps: any, prevState: any) { this._initAnimation(); }
  private _initAnimation ({ list, algorithm } = this.props) {
    this.list = list.asArray();
    this.colors = this.list.map(() => BarColorNormal);
    this.counts = {
      s: 0, i: 0, c: 0, m: 0
    };
    this.setCanvas();
    this.renderBars();
    this.subscriptions = [].concat(
      this.subscriptions,
      list
        .filter((action) => /swap|insert|compare/.test(action.type))
        .reduce((p: Promise<any>, action: Action) => p.then(() => {
          this[action.type](action.src, action.dest);
          this._calculate(action);
        }), Promise.resolve())
        .subscribe(() => {}),
      list
        .filter(({type}) => /complete/.test(type))
        .subscribe(() => {
          let now: any = new Date(), stupid = (now - this._startTime);
          this._elapsed.innerText = stupid;
        }),
      list
        .finally(() => this.renderBars()),
    );

    let sort = new ObservableSort(list);
    this._startTime = new Date();
    sort[algorithm]();
  }

  private _calculate (action: Action) {
    const key = `${/assignment/.test(action.type) ? 'i' : action.type[0]}`;
    ++this.counts[key];
    // this[`_${/assignment/.test(action.type) ? 'insert' : action.type}`].innerText = ++this.counts[key];
    if (/insert/.test(action.type)) {
      this.counts.m += (action.src - action.dest);
      // this._moves.innerText = Math.ceil(this.counts.m  / this.counts.i);
    }
  }

  render () {
    return (
      <div className='flexRow list-visualization'>
        <dl className='no-grow col-xs-4'>
          <dt>Time (ms)</dt>
          <dd ref={d => this._elapsed = d}></dd>

          <dt>Swaps</dt>
          <dd ref={d => this._swap = d}>-</dd>

          <dt>Inserts</dt>
          <dd ref={d => this._insert = d}>-</dd>

          <dt>Shifts</dt>
          <dd ref={d => this._moves = d}>-</dd>

          <dt>Compares</dt>
          <dd ref={d => this._compare = d}>-</dd>
        </dl>
        <div className='list-canvas'>
          <canvas ref={d => this.canvas = d}></canvas>
        </div>
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

  private insert (i: number, j: number): Promise<any> {
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
  private swap (i: number, j: number): Promise<any> {
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
  private compare (i: number, j: number): Promise<any> {
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
