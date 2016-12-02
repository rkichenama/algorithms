import * as React from 'react';
import SortDetailDeck from './SortDetailDeck';

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
      <heading>
        <article className='col-xs-4 pull-right'>
          <input type='range' min='20' max='300' value={this.state.count} onChange={ (evt) => this.changeCount('count', parseInt(evt.target.value, 10)) } />
          <input type='range' min='1000' max='50000' value={this.state.max} onChange={ (evt) => this.changeCount('max', parseInt(evt.target.value, 10)) } />
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

  render () {
    return (
      <div className='flexCol'>
        <SortDetailMenu {...this.state} cb={(state: SortDetailState) => this.setState(state) } />
        <SortDetailDeck {...this.state} />
      </div>
    );
  }
};
