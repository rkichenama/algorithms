import * as React from 'react';
import SortDetailDeck from './SortDetailDeck';

export default class SortDetail extends React.Component<{}, { count: number, max: number }> {
  constructor (props: any, context: any) {
    super(props, context);
    this.state = {
      count: 250,
      max: 10000,
    };
  }
  private changeCount () {

  }
  render () {
/*
<input type='range' min='20' max='300' value={this.state.count} onChange={ (evt) => this.setState({count: parseInt(evt.target.value, 10), max: this.state.max})} />
<input type='range' min='1000' max='50000' value={this.state.max} onChange={ (evt) => this.setState({max: parseInt(evt.target.value, 10), count: this.state.count})} />

 */
    return (
      <div className='flexCol'>
        <heading>
        </heading>
        <SortDetailDeck {...this.state} />
      </div>
    );
  }
};
