import * as React from 'react';
import { FunctionComponent, useEffect, useRef } from 'react';
import { RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import * as actions from '../../../data/actions';
import * as shared from '../../../data/shared';
import { ITicket } from '../../../../interfaces';

interface EditTicketProps {
  params: RouteInfo,
  ticket: ITicket,
  loading: boolean,
  dispatch: any
}

export const EditTicket: FunctionComponent<EditTicketProps> = (props: EditTicketProps) => {
  const { id, ticketid } = props.params;
  const { ticket, loading, dispatch } = props;

  const typeRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    api.fetchTicketDetails(id, ticketid);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketDetails: ITicket = {
      type: typeRef.current.value,
      price: parseInt(priceRef.current.value, 10),
    };
    api.editTicketDetails(id, ticketid, ticketDetails);
    window.location.href = `#/events/${id}`;
  }

  const handleRemove = (e) => {
    e.preventDefault();
    if (shared.confirmDeleteTicket() === true) {
      api.deleteTicket(id, ticketid);
      window.location.href = `#/events/${id}`;
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(actions.clearTicket());
    window.location.href = `#/events/${id}`;
  }
  
  const renderForm = () => {
    if (loading === false) {
      const { price, type } = ticket;
      return (
        <div className="form-container">
          <button onClick={handleCancel} className="btn btn-primary custom-buttons">Back to Event</button>
          <h1 className="text-center">Modify Ticket</h1>
          <div className="form-group">
            <form>
              <label htmlFor="type">Type</label>
              <input className="form-control" type="text" name="type" ref={typeRef} defaultValue={type} />
              <label htmlFor="notes">Price</label>
              <input className="form-control" type="text" name="notes" ref={priceRef} defaultValue={price.toString()} />
              <button onClick={handleSubmit} className="btn btn-primary custom-buttons">Save</button>
              <button onClick={handleCancel} className="btn btn-primary custom-buttons">Cancel</button>
              <button onClick={handleRemove} className="btn btn-danger custom-buttons">Remove</button>
            </form>
          </div>
        </div>
      );
    }
    return true;
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
}
