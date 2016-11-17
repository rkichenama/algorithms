import "./css/site.scss";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SortDetailCard } from './components/SortDetailCard';

document.addEventListener('DOMContentLoaded', (event) => {
  const arr = [];
  for (let i = 0; i < 100; i++)
    arr[i] = Math.floor(Math.random() * 10000) + 1;

  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'insertion'} />,
    document.querySelector('#h')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'shell'} />,
    document.querySelector('#i')
  );
  ReactDOM.render(
    <SortDetailCard list={arr} algorithm={'selection'} />,
    document.querySelector('#j')
  );
});
