import * as React from 'react';
import { SortDetailCard } from './SortDetailCard';

const SortDetailDeck: React.StatelessComponent<{ count: number }> = ({ count = 50 }) => {
  const arr = [], max = 10000;
  for (let i = 0; i < count; i++)
    arr[i] = Math.floor(Math.random() * max) + 1;

  return (
    <article className='sort-detail-deck'>
      <div className="flexRow"  style={{flexWrap: "wrap"}}>
        <SortDetailCard {...{max}} list={arr} algorithm={'insertion'} className="flexCol" />
        <SortDetailCard {...{max}} list={arr} algorithm={'selection'} className="flexCol" />
        <SortDetailCard {...{max}} list={arr} algorithm={'shell'} className="flexCol" />
        <SortDetailCard {...{max}} list={arr} algorithm={'shell_swap'} className="flexCol" />
      </div>
    </article>
  );
};

export default SortDetailDeck;
