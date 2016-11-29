import * as React from 'react';
import { List, Action } from '../collections/List';
import { ObservableSort } from '../algorithms/ObservableSort';
import { ListVisualization } from './ListVisualization';
import { ListCanvas } from './ListCanvas';
import { WikipediaService } from '../util/WikipediaService';

import * as hljs from 'highlight.js';

require("highlight.js/styles/github-gist.css");
import "./SortDetailCard.scss";

export interface SortDetailProps {
  list: any[];
  algorithm: string;
}

export interface SortDetailState {
  swaps: number;
  inserts: number;
  compares: number;
}

export class SortDetailCard extends React.Component<SortDetailProps, SortDetailState> {
  private list: List;
  private counts: any;
  private _swap: any;
  private _insert: any;
  private _compare: any;
  private _moves: any;
  private _desc: any;
  private _code: any;

  constructor (props: SortDetailProps) {
    super(props);
  }

  componentDidMount () {
    let sort = new ObservableSort(this.list);
    (new WikipediaService()).pullID(15205) //Insertion Sort
      .then((json) => {
        this._desc.innerHTML = json.text["*"];
        hljs.highlightBlock(this._code);
      });
    setTimeout(() => sort[this.props.algorithm](), 1000);
  }

  componentWillMount () { this.initList(); }
  componentWillReceiveProps (nextProps: SortDetailProps) { this.initList(nextProps); }

  initList ({ list }: SortDetailProps = this.props) {
    this.list = new List(list);
    this.counts = {
      s: 0, i: 0, c: 0, m: 0
    };
    this.list
      .filter(({type}) => /swap|insert|compare|assignment/.test(type))
      .distinctUntilChanged()
      .subscribe(this.calculate.bind(this));
  }

  calculate (action: Action) {
    const key = `${/assignment/.test(action.type) ? 'i': action.type[0]}`;
    this[`_${/assignment/.test(action.type) ? 'insert' : action.type}`].innerText = ++this.counts[key];
    if (/insert/.test(action.type)) {
      this.counts.m += (action.src - action.dest);
      this._moves.innerText = Math.ceil(this.counts.m  / this.counts.i);
    }
  }

  render () {
    return (
      <article className='card sort-detail'>
        <div className='flexCol'>
          <heading>{this.props.algorithm}</heading>
          <section className='flexRow hide'>
            <pre><code className='no-grow typescript' ref={ d => this._code = d }>
{`insertion_sort (list: any[]): any[] {
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
}`}
            </code></pre>
            <div className='wiki' ref={d => this._desc = d}>Description</div>
          </section>
          <section className='flexRow'>
            <dl className='no-grow'>
              <dt>Swaps</dt>
              <dd ref={d => this._swap = d}>-</dd>

              <dt>Inserts</dt>
              <dd ref={d => this._insert = d}>-</dd>

              <dt>Shifts</dt>
              <dd ref={d => this._moves = d}>-</dd>

              <dt>Comparisons</dt>
              <dd ref={d => this._compare = d}>-</dd>
            </dl>
            <ListCanvas list={this.list} />
          </section>
        </div>
      </article>
    );
  }
}
