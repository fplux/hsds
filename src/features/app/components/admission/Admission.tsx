import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';
import { Tickets } from './Tickets';
import { ITicket } from '../../../../interfaces';

interface AdmissionsProps {
  disabled: boolean,
  userClass: string,
  tickets: { [ticketId: string]: ITicket},
  eventId: string,
  totalRevenue: number,
  totalCount: number;
}

export const Admission: FunctionComponent<AdmissionsProps> = (props: AdmissionsProps) => {
  const { disabled, userClass, tickets, eventId, totalRevenue, totalCount } = props;
  const handleClick = (e: any) => {
    if (disabled === true) {
      e.preventDefault();
    }
  }

  const renderTickets = () => {
    if (tickets !== undefined) {
      return Object.keys(tickets).map((ticket) => {
        const ticketInfo = tickets[ticket];
        return (
          <Tickets key={ticket} typeId={ticket} {...props} {...ticketInfo} />
        );
      });
    }
    return true;
  };

  return (
    <div className="table-container">
      <h3 className={`${userClass} text-center table-header`}>Tickets</h3>
      <Link
        className="table-add-link"
        onClick={e => handleClick(e)}
        to={`events/${eventId}/addticket`}
      >
        <button className={`${userClass} btn btn-primary custom-add-btn`}>Add Tickets</button>
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
            <td colSpan={4}>Total Income</td>
            <td className="total-count"><span>{totalCount}</span></td>
            <td>${totalRevenue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );``
}