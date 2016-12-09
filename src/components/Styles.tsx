import * as React from 'react';
import { Tabs } from './Tabs';

const Styles: React.StatelessComponent<{styles: string[]}> = ({styles = ['dark', 'light', 'flat', 'stormy', 'solaris']}) => {
  return (
    <Tabs>
      {
        styles.map((style) => (
          <article key={style} className={style} title={style}>
            <div className='card' style={{ color: 'var(--clr-color)', backgroundColor: 'var(--clr-white)', boxShadow: '0 0 2px 0 var(--clr-black) inset' }}>
              <div className={`flexRow`}>
                {
                  [
                    '--clr-background',
                    '--clr-color',
                    '--clr-highlight',
                    '--clr-accent',
                    '--clr-important',
                    '--clr-black',
                    '--clr-white',
                  ].map((clr) => (
                    <div key={clr} className='flexCol' data-center>
                      <div className='no-grow' style={{width: '96px', height: '96px', backgroundColor: `var(${clr})`}}></div>
                      <div>{clr}</div>
                    </div>
                  ))
                }
              </div>
              <Tabs>
                {
                  [
                    '--font-sans',
                    '--font-serif',
                  ].map((font) => (
                    <div key={font} className='flexCol' title={font}>
                      {
                        [
                          '--font-size-fine',
                          '--font-size-small',
                          '--font-size-medium',
                          '--font-size-large',
                          '--font-size-huge',
                        ].map((size) => [
                            '--font-weight-light',
                            '--font-weight-normal',
                            '--font-weight-bold',
                          ].map((weight) => (
                            <div className='flexRow' style={{fontFamily: `var(${font})`, fontSize: `var(${size})`, fontWeight: `var(${size})`}}>
                              {font.substring(font.lastIndexOf('-') + 1)}&nbsp;{weight.substring(weight.lastIndexOf('-') + 1)}&nbsp;{size.substring(size.lastIndexOf('-') + 1)}
                            </div>)
                          )
                        )
                      }
                    </div>
                  ))
                }
              </Tabs>
            </div>
          </article>
        ))
      }
    </Tabs>
  );
};

export default Styles;
