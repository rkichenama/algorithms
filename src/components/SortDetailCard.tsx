import * as React from 'react';
import { List, Action } from '../collections/List';
import { ObservableSort } from '../algorithms/ObservableSort';
import { ListVisualization } from './ListVisualization';
import { ListCanvas } from './ListCanvas';
import { WikipediaService } from '../util/WikipediaService';
import { Metadata } from '../util/Metadata';
import { Tabs } from './Tabs';
import { CodeBlock } from './CodeBlock';
import WikiArticle from './WikiArticle';

import * as hljs from 'highlight.js';

require('highlight.js/styles/github-gist.css');
import './SortDetailCard.scss';

export interface SortDetailProps {
  list: any[];
  algorithm: string;
}

export class SortDetailCard extends React.Component<SortDetailProps, {}> {
  private list: List;

  componentWillMount () { this.initList(); }
  componentWillReceiveProps (nextProps: SortDetailProps) { this.initList(nextProps); }

  initList ({ list }: SortDetailProps = this.props) {
    this.list = new List(list);
  }

  render () {
    const { algorithm } = this.props;
    return (
      <article className='card sort-detail'>
        <div className='flexCol'>
          <heading>{this.props.algorithm}</heading>
          <Tabs>
            <section className='flexRow' title='Visualization'>
              <ListCanvas {...{algorithm}} list={this.list} />
            </section>
            <CodeBlock {...{algorithm}} title='Typescript' />
            <section className='flexRow' title='Wiki'>
              <WikiArticle articleId={Metadata.wiki(algorithm)} />
            </section>
          </Tabs>
        </div>
      </article>
    );
  }
}
