import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';

interface AdminEventProps {
  eventId: string;
  name: string;
  date: string;
  removeEvent: (eventId: string) => void,
}

export const AdminEvent: FunctionComponent<AdminEventProps> = (props: AdminEventProps) => (
  <div className="row">
    <i className="col-xs-1 fi-trash" onClick={() => props.removeEvent(props.eventId)} />
    <Link className="col-xs-6" to={`events/${props.eventId}`}>
      <span>{props.name}</span>
    </Link>
    <span className="col-xs-5">{props.date}</span>
  </div>
);