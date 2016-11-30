import './css/site.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SortDetailCard } from './components/SortDetailCard';
import { Tabs } from './components/Tabs';
import ThemeSwitcher from './components/ThemeSwitcher';
import { FetchService } from './util/FetchService';

require('./index.html');

document.addEventListener('DOMContentLoaded', (event) => {
  const arr = [];
  for (let i = 0; i < 100; i++)
    arr[i] = Math.floor(Math.random() * 10000) + 1;

  ReactDOM.render(
    <ThemeSwitcher themes={['dark', 'light', 'flat', 'stormy', 'solaris']} />,
    document.querySelector('heading')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'insertion'} />,
    document.querySelector('#h')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'selection'} />,
    document.querySelector('#i')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'shell'} />,
    document.querySelector('#j')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'shell_swap'} />,
    document.querySelector('#k')
  );
});
