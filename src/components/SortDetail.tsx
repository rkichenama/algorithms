import * as React from 'react';
import SortDetailDeck from './SortDetailDeck';

import './SortDetail.scss';

const Spinner: React.StatelessComponent<{obj: Object, aspect: string, lo: number, hi: number, fn: Function}> = ({obj, aspect, lo, hi, fn}) => (
  <div className='input-group spinner'>
    <input type='text' className='form-control' value={obj[aspect]} onChange={ (evt) => fn(aspect, Math.min(hi, Math.max(lo, parseInt(evt.target.value, 10)))) } />
    <div className='input-group-btn-vertical'>
      <button className='btn btn-default' type='button' onClick={ (evt) => fn(aspect, Math.min(hi, obj[aspect] + 1)) }>
        <i className='glyphicon glyphicon-triangle-top'></i>
      </button>
      <button className='btn btn-default' type='button' onClick={ (evt) => fn(aspect, Math.max(lo, obj[aspect] - 1)) }>
        <i className='glyphicon glyphicon-triangle-bottom'></i>
      </button>
    </div>
  </div>
);

interface SortDetailState {
  count: number;
  max: number;
}

class SortDetailMenu extends React.Component<{ count: number, max: number, cb: Function }, SortDetailState> {
  constructor (props: any, context: any) {
    super(props, context);
    this.state = {
      count: props.count,
      max: props.max,
    };
  }
  private changeCount (aspect: string, value: number) {
    const state = this.state;
    state[aspect] = value;
    this.setState(state);
  }
  render () {
    return (
      <heading className='sorts-heading'>
        <article className='col-xs-4 pull-right'>
          <Spinner obj={this.state} aspect={'count'} lo={20} hi={300} fn={ this.changeCount.bind(this) } />
          <Spinner obj={this.state} aspect={'max'} lo={1000} hi={50000} fn={ this.changeCount.bind(this) } />
          <div className='btn-toolbar pull-right' role='toolbar'>
            <div className='btn-group' role='group' onClick={ () => this.props.cb(this.state) }>
              <button className='btn btn-default'>Set</button>
            </div>
          </div>
        </article>
      </heading>
    );
  }
}

export default class SortDetail extends React.Component<{}, SortDetailState> {
  private values: SortDetailState;

  constructor (props: any, context: any) {
    super(props, context);
    this.state = {
      count: 250,
      max: 10000,
    };
  }

  private changeState (state) {
    this.setState({count: null, max: 0}, () => setTimeout(() => this.setState(state), 2000));
  }

  render () {
    return (
      <div className='flexCol'>
        <SortDetailMenu {...this.state} cb={(state: SortDetailState) => this.changeState(state) } />
        <SortDetailDeck {...this.state} />
      </div>
    );
  }
};
