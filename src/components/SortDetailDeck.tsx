import * as React from 'react';
import { SortDetailCard } from './SortDetailCard';
import { Loading } from './Loading';
import { Tabs } from './Tabs';

const SortDetailDeck: React.StatelessComponent<{ count: number, max: number }> = ({ count, max }) => {
  const arr = [];
  for (let i = 0; i < count; i++)
    arr[i] = Math.floor(Math.random() * max) + 1;
/*
*/
  return (
    <article className='sort-detail-deck'>
      <div className='flexRow'  style={{flexWrap: 'wrap'}}>
        <Tabs>
          <SortDetailCard {...{max}} list={arr} title={'quick Sort'} algorithm={'quick'} className='flexCol' />
          <SortDetailCard {...{max}} list={arr} title={'merge Sort'} algorithm={'merge'} className='flexCol' />
          <SortDetailCard {...{max}} list={arr} title={'shell Sort'} algorithm={'shell'} className='flexCol' />
          <SortDetailCard {...{max}} list={arr} title={'insertion Sort'} algorithm={'insertion'} className='flexCol' />
          <SortDetailCard {...{max}} list={arr} title={'selection Sort'} algorithm={'selection'} className='flexCol' />
          <SortDetailCard {...{max}} list={arr} title={'bubble Sort'} algorithm={'bubble'} className='flexCol' />
        </Tabs>
      </div>
    </article>
  );
};

export default Loading('count')(SortDetailDeck);
