import * as React from 'react';

import './Loading.scss';

const LoadingAnimation = () => (
  <div className="loading-wrapper">
    <div className="loading"></div>
  </div>
);

export const Loading = (propName): any => (WrappedComponent) => (
  class Loading extends React.Component<{}, {}> {
    private startTime: any;
    private endTime: any;

    static isEmpty(prop) {
      return (
        prop === null || prop === undefined ||
        (prop.hasOwnProperty(length) && prop.length === 0) ||
        (prop.constructor === Object && Object.keys(prop).length === 0)
      );
    }
    componentDidMount () { this.startTime = new Date(); }
    componentWillUpdate() { this.endTime = new Date(); }
    render () {
      if (Loading.isEmpty(this.props[propName])) {
        return (<LoadingAnimation />);
      } else {
        let delta: number = (this.endTime - this.startTime) / 1000;
        return (<WrappedComponent {...this.props} time={ delta.toFixed(2) } />);
      }
    }
  }
);
