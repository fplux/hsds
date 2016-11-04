import React from 'react';
import * as api from '../../../data/api';
import * as actions from '../../../data/actions';

export class EditTicket extends React.Component {
  constructor(props) {
    super(props);
    const { id, ticketid } = this.props.params;
    api.fetchTicketDetails(id, ticketid);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { id, ticketid } = this.props.params;
    const ticketDetails = {
      type: this.type.value,
      price: this.price.value,
    };
    api.editTicketDetails(id, ticketid, ticketDetails);
    window.location = `#/events/${id}`;
  }
  handleRemove(e) {
    e.preventDefault();
    const { id, ticketid } = this.props.params;
    api.deleteTicket(id, ticketid);
    window.location = `#/events/${id}`;
  }
  handleCancel(e) {
    e.preventDefault();
    this.props.dispatch(actions.clearTicket());
    window.location = `#/events/${this.props.params.id}`;
  }
  render() {
    const renderForm = () => {
      if (this.props.loading === false) {
        const { price, type } = this.props.ticket;
        return (
          <div className="form-container">
            <button onClick={e => this.handleCancel(e)} className="button">Back to Event</button>
            <h1 className="text-center">Modify Ticket</h1>
            <form className="custom-form">
              <label htmlFor="type">Type</label>
              <input type="text" name="type" ref={(ref) => { this.type = ref; }} defaultValue={type} />
              <label htmlFor="notes">Price</label>
              <input type="text" name="notes" ref={(ref) => { this.price = ref; }} defaultValue={price} />
              <button onClick={e => this.handleSubmit(e)} className="custom-buttons button">Submit</button>
              <button onClick={e => this.handleCancel(e)} className="custom-buttons button">Cancel</button>
              <button onClick={e => this.handleRemove(e)} className="custom-buttons button alert">Remove</button>
            </form>
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
}

EditTicket.propTypes = {
  dispatch: React.PropTypes.func,
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    ticketid: React.PropTypes.string,
  }),
  ticket: React.PropTypes.shape({
    price: React.PropTypes.string,
    type: React.PropTypes.string,
  }),
  loading: React.PropTypes.bool,
};
