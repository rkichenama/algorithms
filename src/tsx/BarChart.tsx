import * as React from 'react';
import Component from './Component';

/**
 * draws a horizontal bar chart based on given list
 * @type {[type]}
 */
export default class BarChart extends Component<{}, {}> {
  private canvas: HTMLCanvasElement;
  constructor (props, context) {
    super(props, context);
  }
  render () {
    return (<canvas ref={canvas => this.canvas = canvas}></canvas>);
  }
  renderBars () {
    let
      { canvas } = this,
      { width, height} = canvas.getBoundingClientRect();
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    BarChart.updateBars(canvas, [], 0);
  }
  static updateBars (canvas: HTMLCanvasElement, heights: Array<number>, max: number, min: Number = 0) {
    const { width: w, height: h} = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    const width = w / heights.length;
    context.clearRect(0, 0, w, h);
    heights
      .map(h => ((h / max) * (h - 10)))
      .forEach((v: number, i, {length: count}) => {
        /* context.fillStyle = getComputedStyle(document.body).getPropertyValue(colors[i].bg); */
        // outline
        context.fillStyle = 'blue';
        context.fillRect(i * width + 1, 0, width - 2, h + 2);
        // inner
        context.fillStyle = 'orange';
        context.fillRect(i * width + 2, 1, width - 4, h);
      })
    ;
  }
}
