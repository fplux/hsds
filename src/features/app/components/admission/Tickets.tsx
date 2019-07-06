import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';

interface TicketsProps {
  eventId: string,
  typeId: string,
  count?: number,
  price: number,
  disabled: boolean,
  type: string
}

export const Tickets: FunctionComponent<TicketsProps> = (props: TicketsProps) => {
  const { eventId, typeId, count, price, type, disabled } = props;
  
  const handleModifyTicket = (edit) => {
    const ticketId = document.getElementById(`count-${typeId}`);
    ticketId.classList.add('increased');
    setTimeout(() => {
      ticketId.classList.remove('increased');
    }, 250);

    api.modifyTicket(eventId, typeId, count, price, edit);
  }

  const handleClick = (e) => {
    if (disabled === true) {
      e.preventDefault();
    }
  }

  return (
    <tr className="ticket-detail">
      <td><Link onClick={e => handleClick(e)} to={`events/${eventId}/editticket/${typeId}`}>{type}</Link></td>
      <td>${price}</td>
      <td>
        <button
          disabled={disabled}
          onClick={() => handleModifyTicket('add')}
          className="btn btn-success custom-button"
        >
          <i className="fi-plus" />
        </button>
      </td>
      <td>
        <button
          disabled={count === 0 || disabled}
          onClick={() => handleModifyTicket('remove')}
          className="btn btn-danger custom-button"
        ><i className="fi-minus" />
        </button>
      </td>
      <td id={`count-${typeId}`} className="td-1"><span>{count}</span></td>
      <td className="td-2"><span>${price * count}</span></td>
    </tr>
  );

}