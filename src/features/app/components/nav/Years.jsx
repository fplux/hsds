import React from 'react';
import { Link } from 'react-router';

export const Years = props => (
  <li>
    <Link onClick={props.closeMenu} to={`/reports/${props.year}`} className="link" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>
      {props.year}
    </Link>
  </li>
);
