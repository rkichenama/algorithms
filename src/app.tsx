import './css/site.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import ThemeSwitcher from './components/ThemeSwitcher';
import SortDetail from './components/SortDetail';
import { LoadingAnimation } from './components/Loading';

require('./index.html');

document.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(
    <ThemeSwitcher themes={['dark', 'light', 'flat', 'stormy', 'solaris']} />,
    document.querySelector('heading')
  );
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={SortDetail} />
      <Route path='/loading' component={LoadingAnimation} />
    </Router>,
    document.querySelector('main')
  );
  // ReactDOM.render(
  //   <SortDetail />,
  //   document.querySelector('#sort-algorithms')
  // );
  // https://github.com/ReactTraining/react-router/tree/master/examples/active-links
});
