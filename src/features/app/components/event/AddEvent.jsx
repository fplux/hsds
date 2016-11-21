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
      errorMessage: '',
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
      type: this.type.value,
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
        <h1 className="text-center page-header">Add Event</h1>
        <div className="form-group">
          <form>
            <label htmlFor="type">Name</label>
            <input className="form-control"type="text" name="type" ref={(ref) => { this.name = ref; }} />
            <label htmlFor="type">Type</label>
            <select className="form-control" ref={(ref) => { this.type = ref; }}>
              <option value="hbn">Huntsville Bal Night</option>
              <option value="monthly">Monthly Dance</option>
            </select>
            <label htmlFor="date">Date</label><br />
            <DatePicker
              name="date"
              selected={this.state.startDate}
              onChange={newDate => this.handleChange(newDate)}
            /><br />
            <label htmlFor="cost">Time</label>
            <input className="form-control" type="text" name="cost" ref={(ref) => { this.time = ref; }} />
            <label htmlFor="fee">Fee</label>
            <input className="form-control" type="text" name="fee" ref={(ref) => { this.fee = ref; }} />
            <label htmlFor="max_fee">Max Fee</label>
            <input className="form-control" type="text" name="max_fee" ref={(ref) => { this.max_fee = ref; }} />
            <label htmlFor="band_minimum">Band Minimum</label>
            <input className="form-control" type="text" name="band_minimum" ref={(ref) => { this.band_minimum = ref; }} />
            <label htmlFor="cash">Cash</label>
            <input className="form-control" type="text" name="cash" ref={(ref) => { this.cash = ref; }} />
            <button onClick={e => this.handleSubmit(e)} className="custom-buttons btn btn-primary">Submit</button>
            <Link to="events"><button className="custom-buttons btn btn-danger">Cancel</button></Link>
            <br />
            {errorMessage()}
            {this.state.errorMessage}
          </form>
        </div>
      </div>
    );
  }
}
