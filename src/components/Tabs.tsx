import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './Tabs.scss';

const TransitionGroup = require('react/lib/ReactTransitionGroup');

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
        <Tab>
          {
            this.props.children[this.state.selected]
          }
        </Tab>
      </article>
    );
  }
};

class Tab extends React.Component<{ children: any[]}, {}> {
  private box: any;
  componentDidMount () { console.info('mounted'); }
  componentDidUpdate () { console.info('updated'); setTimeout(() => { this.box.style.display = 'block'; this.box.style.opacity = '1'; }, 750); }
  componentWillReceiveProps () { console.info('receive'); this.box.style.display = 'none'; this.box.style.opacity = '0'; }
  render () {
    return (
      <article ref={d => this.box = d} style={{transition: 'opacity .5s'}}>
        {
          this.props.children
        }
      </article>
    );
  }
}
