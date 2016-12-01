import './css/site.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import SortDetailDeck from './components/SortDetailDeck';

require('./index.html');

document.addEventListener('DOMContentLoaded', (event) => {
  ReactDOM.render(
    <ThemeSwitcher themes={['dark', 'light', 'flat', 'stormy', 'solaris']} />,
    document.querySelector('heading')
  );
  ReactDOM.render(
    <SortDetailDeck count={250} />,
    document.querySelector('#sort-algorithms')
  );
});
