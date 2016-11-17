import { Sort } from '../../src/algorithms/Sort';

describe('Sort', () => {
  let arr: number[] = [], sorted: number[];

  beforeEach(() => {
    for (let i = 0; i < 10; i++)
      arr[i] = Math.floor(Math.random() * 10000) + 1;
    sorted = [...arr].sort((a, b) => a - b);
  });
  afterEach(() => {
    arr.length = 0; sorted.length = 0;
  })

  xit('should sort correctly with shell sort', () => expect((Sort.shell(arr)).join(',')).toEqual(sorted.join(',')));
  it('should sort correctly with insertion sort', () => expect((Sort.insertion(arr)).join(',')).toEqual(sorted.join(',')));
  it('should sort correctly with selection sort', () => expect((Sort.selection(arr)).join(',')).toEqual(sorted.join(',')));
  it('should sort correctly with bubble sort', () => expect((Sort.bubble(arr)).join(',')).toEqual(sorted.join(',')));
  it('should sort correctly with quick sort', () => expect((Sort.quick(arr)).join(',')).toEqual(sorted.join(',')));
});
