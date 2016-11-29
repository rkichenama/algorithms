import * as React from 'react';

import './Tabs.scss';

export class Tabs extends React.Component<{}, {}> {
  render () {
    return (
      <article className="card tab-container">

        <input id="tab1" type="radio" name="tabs" defaultChecked />
        <label htmlFor="tab1">Codepen</label>

        <input id="tab2" type="radio" name="tabs" />
        <label htmlFor="tab2">Dribbble</label>

        <section id="content1">Codepen</section>

        <section id="content2">Dribble</section>
      </article>
    );
  }
};
