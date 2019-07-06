import * as React from 'react';
import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { Link, RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import { CommonTicketButton } from './CommonTicketButton';

interface AddTicketProps {
  loading: boolean,
  tickets: any,
  params: RouteInfo
}

export const AddTicket: FunctionComponent<AddTicketProps> = (props: AddTicketProps) => {
  const { loading, params, tickets } = props;
  const { id } = params; 
  const [ successMessage, setSuccessMessage] = useState<string>('');
  const typeRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    api.fetchCommonTickets();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      type: typeRef.current.value,
      price: priceRef.current.value,
      count: 0,
      total: 0,
    };
    api.addTicket(id, newTicket);
    window.location.href= `#/events/${id}`;
  };

  const handleClick = (ticketId) => {
    const ticket = tickets[ticketId];
    const newTicket = {
      type: ticket.name,
      price: ticket.price,
      count: 0,
      total: 0,
    };
    api.addTicket(id, newTicket);
    setSuccessMessage(`${ticket.name} added!`)
  };

  const renderCommonTickets = () => {
    switch (loading) {
      case false: {
        const { tickets } = props;
        return (
          Object.keys(tickets).map(ticket => (
            <CommonTicketButton
              key={ticket}
              id={ticket}
              handleClick={handleClick}
              {...tickets[ticket]}
            />
          ))
        );
      }
      default:
        return false;
    }
  };
  
  return (
    <div className="form-container">
      <Link to={`events/${id}`}><button className="btn btn-primary custom-buttons">Back to Event</button></Link>
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center">Add New Ticket</h3>
          <div className="form-group">
            <form className="custom-form">
              <input className="form-control" type="text" ref={typeRef} placeholder="Ticket Type" autoFocus />
              <input className="form-control" type="text" ref={priceRef} placeholder="Price" />
              <button className="btn btn-primary custom-buttons" onClick={e => handleSubmit(e)}>Submit</button>
            </form>
          </div>
        </div>
        <div className="col-md-6 quick-add">
          <h3 className="text-center">Quick Add</h3>
          {renderCommonTickets()}
          <p className="success-message">{successMessage}</p>
        </div>
      </div>
    </div>
  );

};
