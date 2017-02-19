import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';

export class Tickets extends React.Component {
  handleModifyTicket(edit) {
    const { eventId, typeId, count, price } = this.props;
    const ticketId = document.getElementById(`count-${typeId}`);
    ticketId.classList.add('increased');
    setTimeout(() => {
      ticketId.classList.remove('increased');
    }, 250);

    api.modifyTicket(eventId, typeId, count, price, edit);
  }
  handleClick(e) {
    if (this.props.disabled === true) {
      e.preventDefault();
    }
  }
  render() {
    const { eventId, typeId } = this.props;
    return (
      <tr className="ticket-detail">
        <td><Link onClick={e => this.handleClick(e)} to={`events/${eventId}/editticket/${typeId}`}>{this.props.type}</Link></td>
        <td>${this.props.price}</td>
        <td>
          <button
            disabled={this.props.disabled}
            onClick={() => this.handleModifyTicket('add')}
            className="btn btn-success custom-button"
          >
            <i className="fi-plus" />
          </button>
        </td>
        <td>
          <button
            disabled={this.props.count === 0 || this.props.disabled}
            onClick={() => this.handleModifyTicket('remove')}
            className="btn btn-danger custom-button"
          ><i className="fi-minus" />
          </button>
        </td>
        <td id={`count-${typeId}`} className="td-1"><span>{this.props.count}</span></td>
        <td className="td-2"><span>${this.props.price * this.props.count}</span></td>
      </tr>
    );
  }
}

Tickets.propTypes = {
  eventId: React.PropTypes.string,
  typeId: React.PropTypes.string,
  count: React.PropTypes.number,
  price: React.PropTypes.string,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};
