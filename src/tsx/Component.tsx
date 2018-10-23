import * as React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Component<P, S> extends React.Component<P, S> {
  binding (...fns) { fns.forEach(fn => this[fn] = this[fn].bind(this)); }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
}
