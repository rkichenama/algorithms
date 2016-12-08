import * as React from 'react';
import { Link } from 'react-router';

const Layout: React.StatelessComponent<{children: any[]}> = ({children}) => (
  <div>
    <div>
      <Link to='/'>sorts</Link> | <Link to='/style'>style</Link> | <Link to='/loading'>loading</Link>
    </div>
    { children }
  </div>
);

export default Layout;
