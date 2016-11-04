import React from 'react';
import { Nav } from '../nav/Nav';
import '../../../../styles/index.scss';

export const App = (props) => {
  return (
    <div>
      <Nav />
      <div className="main-container">
        {props.children}
      </div>
    </div>
  );
};
