import './css/site.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
import ThemeSwitcher from './components/ThemeSwitcher';
import SortDetail from './components/SortDetail';
import Styles from './components/Styles';
import Layout from './components/Layout';
import { LoadingAnimation } from './components/Loading';

require('./index.html');

document.addEventListener('DOMContentLoaded', (event) => {
  const themes = ['dark', 'light', 'flat', 'stormy', 'solaris'];
  ReactDOM.render(
    <ThemeSwitcher themes={themes} />,
    document.querySelector('heading')
  );
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={SortDetail} />
        <Route path='style' component={Styles} />
        <Route path='*' component={LoadingAnimation} />
      </Route>
    </Router>,
    document.querySelector('main')
  );
  // ReactDOM.render(
  //   <SortDetail />,
  //   document.querySelector('#sort-algorithms')
  // );
  // https://github.com/ReactTraining/react-router/tree/master/examples/active-links
  // https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory
});
