import * as React from 'react';
import { SortDetailCard } from './SortDetailCard';
import { Loading } from './Loading';

const SortDetailDeck: React.StatelessComponent<{ count: number, max: number }> = ({ count, max }) => {
  const arr = [];
  for (let i = 0; i < count; i++)
    arr[i] = Math.floor(Math.random() * max) + 1;
/*
*/
  return (
    <article className='sort-detail-deck'>
      <div className='flexRow'  style={{flexWrap: 'wrap'}}>
        <SortDetailCard {...{max}} list={arr} algorithm={'quick'} className='flexCol' />
        <SortDetailCard {...{max}} list={arr} algorithm={'merge'} className='flexCol' />
        <SortDetailCard {...{max}} list={arr} algorithm={'shell'} className='flexCol' />
        <SortDetailCard {...{max}} list={arr} algorithm={'insertion'} className='flexCol' />
        <SortDetailCard {...{max}} list={arr} algorithm={'selection'} className='flexCol' />
        <SortDetailCard {...{max}} list={arr} algorithm={'bubble'} className='flexCol' />
      </div>
    </article>
  );
};

export default Loading('count')(SortDetailDeck);
