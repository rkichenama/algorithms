import { Queue } from '../src/collections/Queue';

describe('Queue', () => {
  let stack: Queue;

  beforeEach(() => {
    stack = new Queue();
  });
  afterEach(() => {
    // delete stack;
  });

  it('should initially be empty', () => {
    expect(stack.toArray().length).toEqual(0);
  });

  it('should add stuff', () => {
    stack.push('hello dolly');
    expect(stack.toArray().length).toEqual(1);
  });

  it('should remove stuff', () => {
    stack.push('hello dolly');
    expect(stack.toArray().length).toEqual(1);
    stack.pop();
    expect(stack.toArray().length).toEqual(0);
  });

  it('should work like a queue', () => {
    stack.push(2);
    stack.push(3);
    expect(stack.toString()).toEqual('[2,3]');
    expect(stack.pop()).toEqual(2);
    expect(stack.toString()).toEqual('[3]');
  });
});
