import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import * as api from '../../../data/api';
import * as shared from '../../../data/shared';

const Loading = require('react-loading-animation');

export class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.params;
    api.fetchEventDetails(id);
    this.state = {
      startDate: moment(),
      error: false,
    };
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  handleSubmit(e) {
    if (this.state.startDate === undefined) {
      e.preventDefault();
      this.setState({
        error: true,
      });
    } else {
      e.preventDefault();
      const { id } = this.props.params;
      const eventDetails = {
        name: this.name.value,
        date: this.state.startDate.format('L'),
        time: this.time.value,
        fee: this.fee.value,
        max_fee: this.max_fee.value,
        band_minimum: this.band_minimum.value,
        cash: parseInt(this.cash.value, 10),
      };
      api.editEventDetails(id, eventDetails);
      window.location = `#/events/${id}`;
    }
  }
  handleRemove(e) {
    e.preventDefault();
    if (shared.getConfirmation() === true) {
      const { id } = this.props.params;
      api.deleteEvent(id);
      window.location = '#/events/';
    }
  }
  render() {
    const errorMessage = () => {
      if (this.state.error) {
        return (
          <p className="error-message">You must enter a date</p>
        );
      }
      return true;
    };
    const renderForm = () => {
      if (this.props.loading === true) {
        return (
          <Loading />
        );
      }
      if (this.props.loading === false) {
        const { name, time, fee, max_fee, band_minimum, cash } = this.props.event;
        const { id } = this.props.params;
        return (
          <div className="form-container">
            <Link to={`events/${id}`}><button className="button">Back to Event</button></Link>
            <h1 className="text-center">Modify Event</h1>
            <form className="custom-form">
              <label htmlFor="type">Name</label>
              <input type="text" name="type" ref={(ref) => { this.name = ref; }} defaultValue={name} />
              <label htmlFor="date">Date</label>
              <DatePicker
                name="date"
                selected={this.state.startDate}
                onChange={newDate => this.handleChange(newDate)}
                placeholder="Select a date"
              />
              <label htmlFor="cost">Time</label>
              <input type="text" name="cost" ref={(ref) => { this.time = ref; }} defaultValue={time} />
              <label htmlFor="percent">Fee</label>
              <input type="text" name="percent" ref={(ref) => { this.fee = ref; }} defaultValue={fee} />
              <label htmlFor="percent">Max Fee</label>
              <input type="text" name="percent" ref={(ref) => { this.max_fee = ref; }} defaultValue={max_fee} />
              <label htmlFor="percent">Band Minimum</label>
              <input type="text" name="percent" ref={(ref) => { this.band_minimum = ref; }} defaultValue={band_minimum} />
              <label htmlFor="percent">Cash</label>
              <input type="text" name="percent" ref={(ref) => { this.cash = ref; }} defaultValue={cash} />
              <button onClick={e => this.handleSubmit(e)} className="custom-buttons button">Submit</button>
              <Link to={`events/${id}`}><button className="custom-buttons button">Cancel</button></Link>
              <button onClick={e => this.handleRemove(e)} className="custom-buttons button alert">Remove</button>
              <br />
              {errorMessage()}
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

EditEvent.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  loading: React.PropTypes.bool,
  event: React.PropTypes.shape({
    name: React.PropTypes.string,
    time: React.PropTypes.string,
    fee: React.PropTypes.string,
    max_fee: React.PropTypes.string,
    band_minimum: React.PropTypes.string,
    cash: React.PropTypes.number,
  }),
};
