import * as React from 'react';
import { List } from '../collections/List';
import { Loading } from './Loading';

// http://sorting.at/
// http://aarondufour.com/tools/visualizer/
/*
 possible canvas that displays the current array and
 processes actions like
  swap
  insert
    # shifted is average of calculated movement
      insert (src, dest, arr)
  compare

 */

import './ListVisualization.scss';

export interface ListVisualizationProps {
  list: List;
}

export interface ListVisualizationState {
  list: any[];
}

@Loading('list')
export class ListVisualization extends React.Component<ListVisualizationProps, ListVisualizationState> {
  public listView: any;
  private doHeight: Function;

  constructor (props: ListVisualizationProps) {
    super(props);
  }

  componentWillMount () { this.initList(); }
  componentWillReceiveProps (nextProps: ListVisualizationProps) { this.initList(nextProps); }

  initList ({ list }: ListVisualizationProps = this.props) {
    this.doHeight = (n) => `${Math.floor((n / list.largest) * 100)}%`;
    this.setState({ list: list.asArray() },
      () => list
        .filter(({type}) => /complete/.test(type))
        .subscribe(
          action => {
            list.history()
              .forEach((action, i) => {
                switch (true) {
                  default: break;
                  case /insert/.test(action.type):
                  case /swap/.test(action.type):
                  case /assignment/.test(action.type):
                  case /compare/.test(action.type):
                    setTimeout(() => this[action.type](action), 100 * (i + .5)); break;
                }
                setTimeout(() => this.clearColors(), 100 * (i + .8));
              });
          }
        )
    );
  }

  clearColors () {
    const view = this.listView;
    view.querySelectorAll('div').forEach(i => {
      i.classList.remove('insert', 'swap', 'compare');
    });
  }

  compare ({src, dest}) {
    const view = this.listView;
    let S = view.querySelector(`div:nth-child(${src + 1})`), D = view.querySelector(`div:nth-child(${dest + 1})`);
    [S, D].forEach((T, i, a) => T.classList.add('compare'));
  }

  swap ({src, dest}) {
    const view = this.listView;
    let S = view.querySelector(`div:nth-child(${src + 1})`), D = view.querySelector(`div:nth-child(${dest + 1})`);
    [S, D].forEach((T) => T.classList.add('swap'));
    [
      S.style.height,
      D.style.height,
    ] = [
      D.style.height,
      S.style.height,
    ];
  }

  insert ({src, dest}) {
    const view = this.listView;
    const { height } = view.querySelector(`div:nth-child(${src + 1})`).style;
    let D = view.querySelector(`div:nth-child(${dest + 1})`);
    D.classList.add('insert');
    for (let i = src; i > dest; i--) {
      this.swap({src: i, dest: i - 1});
    }
    D.style.height = height;
  }

  assignment ({src, value}) {
    const view = this.listView;
    let S = view.querySelector(`div:nth-child(${src + 1})`);
    S.classList.add('insert');
    S.style.height = this.doHeight(value);
  }

  complete ({list}) { this.setState({ list }); }

  render () {
    // return (<div key={_} dangerouslySetInnerHTML={{__html: r}}></div>);
    const {list: arr} = this.state;
    return (
      <div className='flexRow list-view' ref={ (d) => this.listView = d }>
        {arr.map((_, i) => (
          <div key={i} style={{ height: this.doHeight(_) }}></div>
        ))}
      </div>
    );
  }
};
