import * as React from 'react';
import { List, Action } from '../collections/List';
import { ObservableSort } from '../algorithms/ObservableSort';
import { ListVisualization } from './ListVisualization';

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

  constructor (props: SortDetailProps) {
    super(props);
  }

  componentDidMount () {
    let sort = new ObservableSort(this.list);
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
      .filter(({type}) => /swap|insert|compare/.test(type))
      .distinctUntilChanged()
      .subscribe(this.calculate.bind(this))
  }

  calculate (action: Action) {
    const key = `${action.type[0]}`;
    this[`_${action.type}`].innerText = ++this.counts[key];
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
          <section className='flexRow'>
            <code className='no-grow'>pseudocode</code>
            <div>Description</div>
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
            <ListVisualization list={this.list} />
          </section>
        </div>
      </article>
    );
  }
}
