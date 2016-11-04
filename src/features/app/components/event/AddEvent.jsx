import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router';
import * as api from '../../../data/api';

export class AddEvent extends React.Component {
  constructor() {
    super();
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
    e.preventDefault();
    const newEvent = {
      name: this.name.value,
      date: this.state.startDate.format('L'),
      time: this.time.value,
      fee: this.fee.value,
      max_fee: this.max_fee.value,
      band_minimum: this.band_minimum.value,
      cash: parseInt(this.cash.value, 10),
    };
    api.addEvent(newEvent);
    window.location = '#/events';
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
    return (
      <div className="form-container">
        <h1 className="text-center">Add Event</h1>
        <form className="custom-form">
          <label htmlFor="type">Name</label>
          <input type="text" name="type" ref={(ref) => { this.name = ref; }} />
          <label htmlFor="date">Date</label>
          <DatePicker
            name="date"
            selected={this.state.startDate}
            onChange={newDate => this.handleChange(newDate)}
          />
          <label htmlFor="cost">Time</label>
          <input type="text" name="cost" ref={(ref) => { this.time = ref; }} />
          <label htmlFor="percent">Fee</label>
          <input type="text" name="percent" ref={(ref) => { this.fee = ref; }} />
          <label htmlFor="percent">Max Fee</label>
          <input type="text" name="percent" ref={(ref) => { this.max_fee = ref; }} />
          <label htmlFor="percent">Band Minimum</label>
          <input type="text" name="percent" ref={(ref) => { this.band_minimum = ref; }} />
          <label htmlFor="percent">Cash</label>
          <input type="text" name="percent" ref={(ref) => { this.cash = ref; }} />
          <button onClick={e => this.handleSubmit(e)} className="custom-buttons button">Submit</button>
          <Link to="events"><button type="button" className="custom-buttons button">Cancel</button></Link>
          <button onClick={() => this.handleRemove()} className="custom-buttons button alert">Remove</button>
          <br />
          {errorMessage()}
        </form>
      </div>
    );
  }
}
