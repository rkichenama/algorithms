import * as React from 'react';
import { List } from '../collections/List';
import { ObservableSort } from '../algorithms/ObservableSort';
import { ListVisualization } from './ListVisualization';
import { ListCanvas } from './ListCanvas';
import { Metadata } from '../util/Metadata';
import { Tabs } from './Tabs';
import { CodeBlock } from './CodeBlock';
import WikiArticle from './WikiArticle';

import './SortDetailCard.scss';

export interface SortDetailProps {
  list: any[];
  algorithm: string;
  className: string;
  style: any;
  max: number;
}

export class SortDetailCard extends React.Component<SortDetailProps, {}> {
  private list: any[];

  componentWillMount () { this.initList(); }
  componentWillReceiveProps (nextProps: SortDetailProps) { this.initList(nextProps); }

  initList ({ list }: SortDetailProps = this.props) {
    this.list = list;
  }

  render () {
    const { algorithm, className, style, max = 100 } = this.props;
    return (
      <article className={`${className} card sort-detail`} style={style}>
        <heading>{this.props.algorithm}</heading>
        <Tabs>
          <section className='flexRow' title='Visualization'>
            <ListCanvas {...{max}} {...{algorithm}} list={this.list} />
          </section>
          <CodeBlock {...{algorithm}} title='Typescript' />
          <section className='flexRow' title='Wiki'>
            <WikiArticle articleId={Metadata.wiki(algorithm)} />
          </section>
        </Tabs>
      </article>
    );
  }
}
