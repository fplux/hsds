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
            <div className="col-md-6">
              <p className="event-name"><strong>{name}</strong></p>
              <p><strong>Date:</strong> {date}</p>
            </div>
            <div className="col-md-6">
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
