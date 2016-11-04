import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';

export class AddTicket extends React.Component {
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
  render() {
    const { id } = this.props.params;
    return (
      <div>
        <Link to={`events/${id}`}><button className="button">Back to Event</button></Link>
        <form className="custom-form">
          <input type="text" ref={(ref) => { this.type = ref; }} placeholder="Ticket Type" autoFocus />
          <input type="text" ref={(ref) => { this.price = ref; }} placeholder="Price" />
          <button type="button" className="button" onClick={e => this.handleSubmit(e)}>Submit</button>
        </form>
      </div>
    );
  }
}

AddTicket.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};
