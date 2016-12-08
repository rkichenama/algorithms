import * as React from 'react';

const Styles: React.StatelessComponent<{styles: string[]}> = ({styles = ['dark', 'light', 'flat', 'stormy', 'solaris']}) => {
  return (
    <article>
    {
      styles.map((style) => (
        <div key={style} className={`card ${style}`}>
          colors
          fonts, weights, and sizes
        </div>
      ))
    }
    </article>
  );
};

export default Styles;
