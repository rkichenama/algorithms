import * as React from 'react';

const ThemeSwitcher: React.StatelessComponent<{ themes: string[] }> = ({ themes }) => {
  const themer = (evt) => {
    evt.stopPropagation();
    let { title: toTheme } = evt.target;
    if (toTheme) {
      themes.forEach(function (theme) { document.body.classList.remove(theme); });
      document.body.classList.add(toTheme);
      document.dispatchEvent(new Event('cssthemechange'));
    }
  };

  return (
    <div className='row'>
      <div className='col-xs-offset-8 col-xs-4'>
        <div className='btn-toolbar pull-right' role='toolbar'>
          <div className='btn-group btn-group-xs' role='group' onClick={themer}>
            {
              themes.sort().map((theme) => (
                <button key={theme} type='button' className='btn btn-default text-capitalize' title={theme}>{theme}</button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
