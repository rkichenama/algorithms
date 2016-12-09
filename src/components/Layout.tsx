import * as React from 'react';
import { Link, IndexLink } from 'react-router';

const Layout: React.StatelessComponent<{children: any[], route: any}> = ({children, route}) => {
  const flatten = function(data) {
    let result = {};
    function recurse (cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        let i = 0, l = cur.length;
        for (; i < l; i++)
          recurse(cur[i], `${prop}[${i}]`);
        if (i === 0)
          result[prop] = [];
      } else {
        let isEmpty = true;
        for (let p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? `${prop}.${p}` : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, '');
    return result;
  };

  let flattenObj = flatten(route.childRoutes);

  return (
    <div>
      <div>
        <IndexLink to='/' activeClassName='active'>home</IndexLink>
        {
          Object.keys(flattenObj).map(key => {
            if (key.indexOf('path') !== -1) {
              return [<span> | </span>, <Link to={flattenObj[key]} activeClassName='active'>{flattenObj[key]}</Link>];
            }
          })
        }
      </div>
      { children }
    </div>
  );
};

export default Layout;
