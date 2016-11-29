# TODOs

- [ ] test
- [ ] use tabs to differentiate the data for the sort algorithms
- [ ] dynamically load the wiki article and the typescript for the sort
- [x] use `requestAnimationFrame` for animation
- [ ] enforce a responsive page layout
- [ ] create the `Graph` and `DiGraph`
  - [ ] visualizations too
- [ ] figure out why origin is a refused for fetching
- [ ] 'Gracefully' handle old browsers and IE

## Animations

The animations should run in a queue, wherein each item is an Animation [stage, stage, stage...]. Each Stage then includes a setup, delay, breakdown steps. The setup will make alterations to the DOM, delay will monitor for the appropriate amount of time passage, and breakdown will alter the DOM; each will respectively add or remove classes or change something.

Assume the delay function will be fired once the collected end of all css transitions have accomplished.

```js
element.addEventListener('transitionend', function (event) {
  event.elapsedTime = 'the amount of time the transition has been running'
});

interface Stage {
  setup: Function;
  delay: Function;
  breakdown: Function;
}

class Animation {
  private stages: Stage[];

  addStage (...[setup = () => {}, delay = () => {}, breakdown = () => {}]) {
    this.stages.push({
      setup, delay, breakdown
    });
  }
}

```

To that end, likely need to change to canvas in order to take advantage of the speed using `requestAnimationFrame` will give. Perhaps have it tied to the actual event fired instead of a post process.
