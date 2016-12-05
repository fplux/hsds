import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';
import { CommonTicketButton } from './CommonTicketButton';

export class AddTicket extends React.Component {
  constructor() {
    super();
    api.fetchCommonTickets();
    this.state = {
      successMessage: '',
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.props.params;
    const newTicket = {
      type: this.type.value,
      price: this.price.value,
      count: 0,
      total: 0,
    };
    api.addTicket(id, newTicket);
    window.location = `#/events/${id}`;
  }
  handleClick = (ticketId) => {
    const { id } = this.props.params;
    const ticket = this.props.tickets[ticketId];
    const newTicket = {
      type: ticket.name,
      price: ticket.price,
      count: 0,
      total: 0,
    };
    api.addTicket(id, newTicket);
    this.setState({
      successMessage: `${ticket.name} added!`,
    });

    // api.addTicket(id, newTicket);
  }
  render() {
    const renderCommonTickets = () => {
      switch (this.props.loading) {
        case false: {
          const { tickets } = this.props;
          return (
            Object.keys(tickets).map(ticket => (
              <CommonTicketButton
                key={ticket}
                id={ticket}
                handleClick={this.handleClick}
                {...tickets[ticket]}
              />
            ))
          );
        }
        default:
          return false;
      }
    };
    const { id } = this.props.params;
    return (
      <div className="form-container">
        <Link to={`events/${id}`}><button className="btn btn-primary custom-buttons">Back to Event</button></Link>
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center">Add New Ticket</h3>
            <div className="form-group">
              <form className="custom-form">
                <input className="form-control" type="text" ref={(ref) => { this.type = ref; }} placeholder="Ticket Type" autoFocus />
                <input className="form-control" type="text" ref={(ref) => { this.price = ref; }} placeholder="Price" />
                <button className="btn btn-primary custom-buttons" onClick={e => this.handleSubmit(e)}>Submit</button>
              </form>
            </div>
          </div>
          <div className="col-md-6 quick-add">
            <h3 className="text-center">Quick Add</h3>
            {renderCommonTickets()}
            <p className="success-message">{this.state.successMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}

AddTicket.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loading: React.PropTypes.bool,
  tickets: React.PropTypes.object, //eslint-disable-line
};
