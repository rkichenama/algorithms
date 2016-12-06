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

export interface SortDetailState {
  list: any[];
  algorithm: string;
  max: number;
}

export class SortDetailCard extends React.Component<SortDetailProps, SortDetailState> {
  componentWillMount () { this.initList(); }
  componentWillReceiveProps (nextProps: SortDetailProps) { this.initList(nextProps); }

  initList ({ list, algorithm, max = 100 }: SortDetailProps = this.props) {
    this.setState({ list, algorithm, max });
  }

  componentWillUnmount () { console.info('unmounting'); }
  componentDidMount () { console.info('mounting'); }

  render () {
    const { className, style } = this.props;
    return (
      <article className={`${className} card sort-detail`} style={style}>
        <heading>{this.props.algorithm} Sort</heading>
        <Tabs>
          <section className='flexRow' title='Visualization'>
            <ListCanvas {...this.state} />
          </section>
          <CodeBlock algorithm={this.state.algorithm} title='Typescript' />
          <section className='flexRow' title='Wiki'>
            <WikiArticle articleId={Metadata.wiki(this.state.algorithm)} />
          </section>
        </Tabs>
      </article>
    );
  }
}
