import * as React from 'react';
import { List, Action } from '../collections/List';
import { ObservableSort } from '../algorithms/ObservableSort';
import { ListVisualization } from './ListVisualization';
import { ListCanvas } from './ListCanvas';
import { WikipediaService } from '../util/WikipediaService';
import { Metadata } from '../util/Metadata';
import { Tabs } from './Tabs';
import { CodeBlock } from './CodeBlock';

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
  public _startTime: any;
  public _elapsed: any;

  constructor (props: SortDetailProps) {
    super(props);
    this._elapsed = 0;
  }

  componentDidMount () {
    let { algorithm } = this.props;
    let sort = new ObservableSort(this.list);
    (new WikipediaService()).pullID(Metadata.wiki(algorithm))
      .catch((err) => ({text: {'*': ''}}))
      .then((json) => {
        this._desc.innerHTML = json.text["*"];
        hljs.highlightBlock(this._code);
      })
      .catch((err) => {});
    this._startTime = new Date();
    sort[algorithm]();
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
    this.list
      .filter(({type}) => /complete/.test(type))
      .subscribe(() => {
        let now: any = new Date(), stupid = (now - this._startTime);
        this._elapsed.innerText = stupid;
      });
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
    const { algorithm } = this.props;
    return (
      <article className='card sort-detail'>
        <div className='flexCol'>
          <heading>{this.props.algorithm}</heading>
          <Tabs>
            <section className='flexRow' title='Visualization'>
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
              <ListCanvas list={this.list} />
            </section>
            <CodeBlock {...{algorithm}} title='Typescript' />
            <section className='flexRow' title='Wiki'>
              <div className='wiki' ref={d => this._desc = d}>Description</div>
            </section>
          </Tabs>
        </div>
      </article>
    );
  }
}
