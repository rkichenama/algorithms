import { Stack } from '../src/collections/Stack';

describe('Stack', () => {
  let stack: Stack;

  beforeEach(() => {
    stack = new Stack();
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

  it('should work like a stack', () => {
    stack.push(2);
    stack.push(3);
    expect(stack.toString()).toEqual('[3,2]');
    expect(stack.pop()).toEqual(3);
    expect(stack.toString()).toEqual('[2]');
  });
});
