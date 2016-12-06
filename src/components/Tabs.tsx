import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './Tabs.scss';

export class Tabs extends React.Component<{}, {selected: number}> {
  constructor (props: any, context: any, private unq: string) {
    super(props, context);
    this.state = {
      selected: 0,
    };
    this.unq = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12);
  }
  render () {
    const [{ selected }, unq] = [this.state, this.unq];
    return (
      <article className='card tab-container'>
        {
          React.Children.map(this.props.children, (child: any, i) => [
            <input id={`${unq}_tab${i}`} type='radio' name={`${unq}_tabs`} value={i} checked={selected === i} onChange={ (evt) => this.setState({selected: parseInt(evt.target.value, 10)})}/>,
            <label htmlFor={`${unq}_tab${i}`}>{(!!child.props.title && child.props.title) || 'Tab'}</label>
          ])
        }
        <article>{this.props.children[this.state.selected]}</article>
      </article>
    );
  }
};
