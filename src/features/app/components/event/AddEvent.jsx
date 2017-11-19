import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Datetime from 'react-datetime';
import { Link } from 'react-router';
import * as api from '../../../data/api';
import { FeeOptions } from './inputs/FeeOptions';

export class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      errorMessage: '',
      newEvent: {
        name: '',
        type: '',
        date: '',
        fee: '0',
        max_fee: '0',
        band_minimum: '0',
        cash: '0',
      },
    };
  }

  handleChange = (selectedDate) => {
    this.setState({
      dateChanged: true,
      newEvent: {
        ...this.state.newEvent,
        date: selectedDate.format('MM/DD/YYYY h:mm A'),
      },
    });
  }

  handleValueChange = (e) => {
    e.preventDefault();
    this.setState({
      newEvent: {
        ...this.state.newEvent,
        [e.target.id]: e.target.value,
      },
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newEvent.date === '') {
      this.setState({ error: true, errorMessage: 'No Date' });
      return;
    }
    api.addEvent(this.state.newEvent);
    window.location = '#/events';
  }
  render() {
    const errorMessage = () => {
      if (this.state.error) {
        return (
          <p className="error-message">{this.state.errorMessage}</p>
        );
      }
      return true;
    };
    const renderFeeOptions = n => (_.range(0, n, 10).map(index => (
      <FeeOptions
        handleChange={this.handleValueChange}
        key={index}
        option={index}
      />
    )));
    return (
      <div className="form-container">
        <h1 className="text-center page-header">Add Event</h1>
        <div className="form-group">
          <form>
            <label htmlFor="type">Name</label>
            <input className="form-control"type="text" name="type" id="name" onChange={this.handleValueChange} />
            <label htmlFor="type">Type</label>
            <select className="form-control" id="type" onChange={this.handleValueChange}>
              <option value="" />
              <option value="bal">Huntsville Bal Night</option>
              <option value="blues">Huntsville Blues Night</option>
              <option value="monthly">Monthly Dance</option>
            </select>

            <label htmlFor="date">Date</label><br />
            <Datetime
              id="date-picker"
              onChange={this.handleChange}
              readOnly
            />

            <div className="add-inputs">
              <label htmlFor="fee">Fee:</label><br />
              $
              <select id="fee" onChange={this.handleValueChange} >
                {renderFeeOptions(110)}
              </select>
            </div>

            <div className="add-inputs">
              <label htmlFor="max_fee">Max Fee:</label><br />
              $
              <select id="max_fee" onChange={this.handleValueChange} >
                {renderFeeOptions(110)}
              </select>
            </div>

            <div className="add-inputs">
              <label htmlFor="band_minimum">Band Minimum:</label><br />
              $
              <select size="1" id="band_minimum" onChange={this.handleValueChange} >
                {renderFeeOptions(1000)}
              </select>
            </div>

            <label htmlFor="cash">Starting Cashbox Amount</label>
            <input className="form-control" id="cash" type="text" name="cash" onChange={this.handleValueChange} />
            <button onClick={e => this.handleSubmit(e)} className="custom-buttons btn btn-primary">Submit</button>
            <Link to="events"><button className="custom-buttons btn btn-danger">Cancel</button></Link>
            <br />
            {errorMessage()}
          </form>
        </div>
      </div>
    );
  }
}
