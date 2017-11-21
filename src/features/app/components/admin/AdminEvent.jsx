import React from 'react';
import { Link } from 'react-router';

export const AdminEvent = props => (
  <div className="row">
    <i className="col-xs-1 fi-trash" onClick={() => props.removeEvent(props.eventId)} />
    <Link className="col-xs-6" to={`events/${props.eventId}`}>
      <span>{props.name}</span>
    </Link>
    <span className="col-xs-5">{props.date}</span>
  </div>
);

AdminEvent.propTypes = {
  date: React.PropTypes.string,
  name: React.PropTypes.string,
  eventId: React.PropTypes.string,
  removeEvent: React.PropTypes.func,
};
