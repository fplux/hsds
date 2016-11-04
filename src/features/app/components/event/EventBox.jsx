import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';

export class EventBox extends React.Component {
  getConfirmation() {
    const retVal = confirm('Are you sure you want to delete this event?'); // eslint-disable-line
    if (retVal === true) {
      api.deleteEvent(this.props.eventKey);
    }
  }
  deleteEvent() {
    this.getConfirmation();
  }
  render() {
    const { eventKey, name, date, time, totalRevenue, totalExpenses, net } = this.props;
    return (
      <div className="event-box">
        <span onClick={() => this.deleteEvent()} className="delete-x">X</span>
        <Link to={`events/${eventKey}`} className="event-box-link">
          <div className="row">
            <div className="large-6 columns">
              <p><strong>{name}</strong></p>
              <p>{date}</p>
              <p>{time}</p>
            </div>
            <div className="large-6 columns">
              <p>Revenue: ${totalRevenue}</p>
              <p>Expenses: ${totalExpenses}</p>
              <p>Net: ${net}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

EventBox.propTypes = {
  eventKey: React.PropTypes.string,
  name: React.PropTypes.string,
  date: React.PropTypes.string,
  time: React.PropTypes.string,
  totalRevenue: React.PropTypes.number,
  totalExpenses: React.PropTypes.number,
  net: React.PropTypes.number,
};
