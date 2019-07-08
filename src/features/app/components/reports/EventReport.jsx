import React from 'react';
import { Link } from 'react-router';

export const EventReport = props => (
  <tr>
    <td><Link to={`events/${props.eventId}`}>{props.name}</Link></td>
    <td>{props.date}</td>
    <td>${props.net}</td>
  </tr>
);
