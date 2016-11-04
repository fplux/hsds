import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import * as api from '../../../data/api';

const Loading = require('react-loading-animation');

export class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.params;
    if (this.props.event.length === 0) {
      api.fetchEventDetails(id);
    }
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
  handleRemove() {
    const { id } = this.props.params;
    this.props.dispatch(deleteEvent(id));
    window.location = '#/events/';
  }
  render() {
    console.log(this.props);
    const errorMessage = () => {
      if (this.state.error) {
        return (
          <p className="error-message">You must enter a date</p>
        );
      }
    }
    const renderForm = () => {
      if (this.props.event.loading === true) {
        return (
          <Loading />
        );
      }
      if (this.props.event.loading === false) {
        const { name, date, time, fee, max_fee, band_minimum, cash } = this.props.event[0];
        const { id } = this.props.params;
        return (
          <div>
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
              <button type="button" onClick={e => this.handleSubmit(e)} className="button">Submit</button>
              <Link to={`events/${id}`}><button type="button" className="button">Cancel</button></Link>
              <button type="button" onClick={() => this.handleRemove()} className="button alert">Remove</button>
              <br />
              {errorMessage()}
            </form>
          </div>
        );
      }
    };
    return (
      <div>
        {renderForm()}
      </div>
    );
  }
}
