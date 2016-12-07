import * as React from 'react';
import { List, Action, Assignment, Partition } from '../collections/List';
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

export class ListCanvas extends React.Component< { algorithm: string, list: any[], max: number }, {} > {
  private steps: number;

  private canvas: any;
  private list: any[];
  private colors: BarColor[];
  private subscriptions: Subscriber<any>[];
  private isUnmounting: boolean;

  private counts: any;
  private __swap: any;
  private __insert: any;
  private __compare: any;
  private _moves: any;
  private _desc: any;
  private _code: any;
  public _startTime: any;
  public _elapsed: any;


  constructor (props: any, context: any) {
    super(props, context);
    this.subscriptions = [];
  }

  private killSubs () {
    this.isUnmounting = true;
    this.subscriptions.forEach((s: Subscriber<any>) => s.unsubscribe());
  }
  private resetSubscriptions (list: List) {
    this.killSubs();
    this.subscriptions = [].concat(
      Observable.merge(
        Observable.fromEvent(window, 'resize'),
        Observable.fromEvent(document, 'visibilitychange')
      )
        .subscribe(() => { this.setCanvas(); this.renderBars(); }),
      Observable.fromEvent(document, 'cssthemechange')
        .subscribe(() => this.renderBars()),
      list
        .filter((action) => /swap|insert|compare|assignment|partition/.test(action.type))
        .reduce((p: Promise<any>, action: Action) => p.then(() => {
            this._calculate(action); return this[`_${action.type}`](action);
          }).catch(() => {/* catch any rejections */}), Promise.resolve()
        )
        .subscribe(() => { /* since the events are converted to promises, I cant do nothing */ }),
      // list
      //   .filter((action) => /swap|insert|compare|assignment|partition/.test(action.type))
      //   .subscribe(this._calculate.bind(this)),
      list
        .filter(({type}) => /complete/.test(type))
        .subscribe(() => {
          let now: any = new Date(), stupid = (now - this._startTime);
          this._elapsed.innerText = stupid;
        }),
      list
        .finally(() => this.renderBars()),
    );
    this.isUnmounting = false;
  }

  componentDidMount () {
    this.isUnmounting = false;
    this._initAnimation();
  }
  componentWillUnmount () {
    this.killSubs();
  }
  componentWillReceiveProps () {
    this.killSubs();
  }
  componentDidUpdate (prevProps: any, prevState: any) { this._initAnimation(); }
  private _initAnimation ({ list: l, algorithm } = this.props) {
    const list = new List(l);
    this.list = [...l];
    this.steps = ((l.length >= 250) ? 2 : ((l.length >= 100) ? 6 : 18));
    this.colors = this.list.map(() => BarColorNormal);
    this.counts = {
      s: 0, i: 0, c: 0, m: 0
    };

    this.resetSubscriptions(list);

    this.setCanvas();
    this.renderBars();

    let sort = new ObservableSort(list);
    this._startTime = new Date();
    sort[algorithm]();
  }

  private _calculate (action: Action) {
    const key = `${/assignment|partition/.test(action.type) ? 'i' : action.type[0]}`;
    ++this.counts[key];
    if (/insert/.test(action.type)) {
      this.counts.m += (action.src - action.dest);
    }
    [
      this.__swap.innerText,
      this.__insert.innerText,
      this.__compare.innerText,
      this._moves.innerText,
    ] = [
      this.counts.s || '-',
      this.counts.i || '-',
      this.counts.c || '-',
      this.counts.m || '-',
    ];
  }

  render () {
    return (
      <div className='flexCol list-visualization'>
        <div className='list-canvas'>
          <canvas ref={d => this.canvas = d}></canvas>
        </div>
        <div className='flexRow'>
          <section className='flexRow'>
            <div className='no-shrink no-grow col-xs-7'>Time (ms)</div>
            <div ref={d => this._elapsed = d}>-</div>
          </section>
          <section className='flexRow'>
            <div className='no-shrink no-grow col-xs-7'>Swaps</div>
            <div ref={d => this.__swap = d}>-</div>
          </section>
          <section className='flexRow'>
            <div className='no-shrink no-grow col-xs-7'>Inserts</div>
            <div ref={d => this.__insert = d}>-</div>
          </section>
          <section className='flexRow'>
            <div className='no-shrink no-grow col-xs-7'>Shifts</div>
            <div ref={d => this._moves = d}>-</div>
          </section>
          <section className='flexRow'>
            <div className='no-shrink no-grow col-xs-7'>Compares</div>
            <div ref={d => this.__compare = d}>-</div>
          </section>
        </div>
      </div>
    );
  }

  private loop (stepFn: Function, completeFn: Function): Promise<any> {
    return new Promise((res, rej) => {
      if (this.isUnmounting) { rej(); }
      const fn = (step = 1) => {
        if (this.isUnmounting) { rej(); }
        if (document.hidden || step > this.steps) {
          completeFn();
          this.renderBars();
          res();
          return;
        } else {
          stepFn(step / this.steps);
          this.renderBars();
          requestAnimationFrame(() => fn(step + 1));
        }
      };
      fn();
    });
  }

  private _assignment ({src, value}: Assignment): Promise<any> {
    const list = this.list, colors = this.colors;
    const ith = list[src];
    const di = value - list[src];

    return this.loop(
      (mult) => {
        list[src] = easeOutBounce(mult * this.steps, ith, di, this.steps);
        // list[src] = Math.floor(ith + mult * di);
        colors[src] = BarColorSwap;
      },
      () => {
        list[src] = value;
        colors[src] = BarColorNormal;
      }
    );
  }

  private _partition ({targets, values}: Partition): Promise<any> {
    const list = this.list, colors = this.colors;
    const iths = targets.map((t) => list[t]);
    const di = targets.map((t, i) => (values[i] - list[t]));

    return this.loop(
      (mult) => {
        targets.forEach((t, i) => {
          list[t] = easeOutBounce(mult * this.steps, iths[i], di[i], this.steps);
          // list[t] = Math.floor(iths[i] + mult * di[i]);
          colors[t] = BarColorSwap;
        });
      },
      () => {
        targets.forEach((t, i) => {
          list[t] = values[i];
          colors[t] = BarColorNormal;
        });
      }
    );
  }

  private _insert ({src: i, dest: j}: Action): Promise<any> {
    // moving i into the j place, shifting the rest over to the right
    const list = this.list, colors = this.colors;
    const ths = list.slice(j, i + 1);
    const steps = 15;
    const deltas = ths
      .map((v, k) => ths[k === 0 ? (ths.length - 1) : k - 1] - v);

    return this.loop(
      (mult) => {
        for (let k = 0; k < ths.length; k++) {
          list[k + j] = easeOutBounce(mult * this.steps, ths[k], deltas[k], this.steps);
          // list[k + j] = Math.floor(ths[k] + mult * deltas[k]);
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
  private _swap ({src: i, dest: j}: Action): Promise<any> {
    const list = this.list, colors = this.colors;
    const [ith, jth] = [list[i], list[j]];
    const [di, dj] = [jth - list[i], ith - list[j]];

    return this.loop(
      (mult) => {
        [list[i], list[j]] = [
          easeOutBounce(mult * this.steps, ith, di, this.steps),
          easeOutBounce(mult * this.steps, jth, dj, this.steps)
        ];
        // [list[i], list[j]] = [ith + mult * di, jth + mult * dj].map(Math.floor);
        [colors[i], colors[j]] = [BarColorSwap, BarColorSwap];
      },
      () => {
        [list[i], list[j]] = [jth, ith];
        [colors[i], colors[j]] = [BarColorNormal, BarColorNormal];
      }
    );
  }
  private _compare ({src: i, dest: j}: Action): Promise<any> {
    const list = this.list, colors = this.colors;
    return this.loop(
      (mult) => [colors[i], colors[j]] = [BarColorCompare, BarColorCompare],
      () => [colors[i], colors[j]] = [BarColorNormal, BarColorNormal]
    );
  }

  private setCanvas () {
    let { canvas } = this,
      { width } = canvas.getBoundingClientRect();
    width = Math.max(width, this.list.length * (2 + 2 + 2));
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', Math.min(240, width * 9 / 16));
  }
  private renderBars (list = this.list) {
    if (!(document.hidden || this.isUnmounting)) {
      let { canvas } = this,
        width = parseInt(canvas.getAttribute('width'), 10),
        height = parseInt(canvas.getAttribute('height'), 10);
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      list.forEach(this._renderBars(context, width, height));
    }
  }
  private _renderBars (context: any, width: number, height: number, max: number = this.props.max) {
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

// t: current time, b: begInnIng value, c: change In value, d: duration
const easeOutBounce = (t, b, c, d) => {
  switch (true) {
    case ((t /= d) < (1 / 2.75)):
      return c * (7.5625 * t * t) + b;
    case (t < (2 / 2.75)):
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    case (t < (2.5 / 2.75)):
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    default:
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
};

// t: current time, b: begInnIng value, c: change In value, d: duration
const easeOutBack = (t, b, c, d, s = 1.70158) => (c * (( t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b);
