import * as React from 'react';
import { WikipediaService } from '../util/WikipediaService';
import { Metadata } from '../util/Metadata';
import { Loading } from './Loading';

import './WikiArticle.scss';

const LoadingWikiArticle: React.StatelessComponent<{ text: string }> = Loading('text')(({ text }) => {
  return (
    <div className='wiki' dangerouslySetInnerHTML={{ __html: text }}></div>
  );
});

class WikiArticle extends React.Component<{ articleId: number }, { text: string }> {
  constructor (props: any, context: any) {
    super(props, context);
    // this.state.text = '';
  }
  componentDidMount () { this.fetchArticle(); }
  componentWillReceiveProps (nextProps: any) { this.fetchArticle(nextProps); }
  private fetchArticle ({ articleId } = this.props) {
    (new WikipediaService()).pullID(articleId)
      .catch((err) => ({text: {'*': ''}}))
      .then((json) => this.setState({text: json.text['*']}))
      .catch((err) => {});
  }

  render () {
    return ( <LoadingWikiArticle {...this.state}/> );
  }
};

export default WikiArticle;
