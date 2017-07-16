import React from 'react';
import { Link } from 'react-router';
import { Tickets } from './Tickets';

export class Admission extends React.Component {
  handleClick(e) {
    if (this.props.disabled === true) {
      e.preventDefault();
    }
  }
  render() {
    const { tickets, eventId } = this.props;
    const renderTickets = () => {
      if (tickets !== undefined) {
        return Object.keys(tickets).map((ticket) => {
          const ticketInfo = tickets[ticket];
          return (
            <Tickets key={ticket} typeId={ticket} {...this.props} {...ticketInfo} />
          );
        });
      }
      return true;
    };

    return (
      <div className="table-container">
        <h3 className={`${this.props.userClass} text-center table-header`}>Tickets</h3>
        <Link
          className="table-add-link"
          onClick={e => this.handleClick(e)}
          to={`events/${eventId}/addticket`}
        >
          <button className={`${this.props.userClass} btn btn-primary custom-add-btn`}>Add Tickets</button>
        </Link>
        <table className="table-styles">
          <thead>
            <tr>
              <th>Type</th>
              <th>Price</th>
              <th>Add</th>
              <th>Remove</th>
              <th>Count</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody id="tickets-table-body">
            {renderTickets()}
            <tr>
              <td colSpan="4">Total Income</td>
              <td className="total-count"><span>{this.props.totalCount}</span></td>
              <td>${this.props.totalRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Admission.propTypes = {
  totalCount: React.PropTypes.number,
  totalRevenue: React.PropTypes.number,
  tickets: React.PropTypes.object, // eslint-disable-line
  eventId: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  userClass: React.PropTypes.string,
};
