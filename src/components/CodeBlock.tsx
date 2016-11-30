import * as React from 'react';
import * as hljs from 'highlight.js';
import { Metadata } from '../util/Metadata';

// hack to use the line numbers plugin for highlight.js
window['hljs'] = hljs;
require('highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js');

require('highlight.js/styles/github-gist.css');

interface CodeBlockProps {
  algorithm: string;
}

export class CodeBlock extends React.Component<CodeBlockProps, {}> {
  private _code: Node;

  componentDidMount () { this._runHighlight(); }
  componentDidUpdate () { this._runHighlight(); }
  private _runHighlight () { hljs.highlightBlock(this._code); hljs['lineNumbersBlock'](this._code); }

  render () {
    return (
      <pre><code className='typescript' ref={ d => this._code = d }>
        {Metadata.source(this.props.algorithm)}
      </code></pre>
    );
  }
}
