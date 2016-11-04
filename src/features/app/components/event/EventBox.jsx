import React from 'react';
import { Link } from 'react-router';

export class EventBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: this.props.class,
    };
  }
  render() {
    const { eventKey, name, date, time, totalRevenue, totalExpenses, net } = this.props;
    return (
      <div className="event-box">
        <Link to={`events/${eventKey}`} className="event-box-link">
          <div className="row">
            <div className="large-6 columns">
              <p className="event-name"><strong>{name}</strong></p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time: </strong> {time}</p>
            </div>
            <div className="large-6 columns">
              <p><strong>Revenue:</strong> ${totalRevenue}</p>
              <p><strong>Expenses:</strong>${totalExpenses}</p>
              <p><strong>Net:</strong> ${net}</p>
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
  class: React.PropTypes.string,
};
