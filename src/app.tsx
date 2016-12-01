import './css/site.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import SortDetail from './components/SortDetail';

require('./index.html');

document.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(
    <ThemeSwitcher themes={['dark', 'light', 'flat', 'stormy', 'solaris']} />,
    document.querySelector('heading')
  );
  ReactDOM.render(
    <SortDetail />,
    document.querySelector('#sort-algorithms')
  );
});
