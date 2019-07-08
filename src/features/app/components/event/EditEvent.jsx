import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Datetime from 'react-datetime';
import { Link } from 'react-router';
import * as api from '../../../data/api';
import * as shared from '../../../data/shared';
import { FeeOptions } from './inputs/FeeOptions';

const Loading = require('react-loading-animation');

export class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    // convert the string date into a moment() object and set it to state
    const newDate = new Date(this.props.event.date);
    this.state = {
      error: false,
      errorMessage: '',
      newEvent: {
        name: this.props.event.name,
        type: this.props.event.type,
        date: moment(newDate),
        fee: this.props.event.fee,
        max_fee: this.props.event.max_fee,
        band_minimum: this.props.event.band_minimum,
        cash: this.props.event.cash,
      },
      dateChanged: false,
    };
  }

  /* Function to handle the change of the datepicker */
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

  /* Submit the form */
  handleSubmit(e) {
    let eventData = {};
    // if the date has not been changed, we need to convert it from a moment to a string
    if (this.state.dateChanged === false) {
      eventData = {
        ...this.state.newEvent,
        date: this.props.event.date,
      };
    } else {
      eventData = this.state.newEvent;
    }
    e.preventDefault();
    const { id } = this.props.params;
    api.editEventDetails(id, eventData);
    window.location = `#/events/${id}`;
  }

  /* Function to handle the removeal of an event */
  handleRemove(e) {
    e.preventDefault();
    if (shared.confirmDeleteEvent() === true) {
      const { id } = this.props.params;
      api.deleteEvent(id);
      window.location = '#/events/';
    }
  }

  /* Render the component */
  render() {
    const renderFeeOptions = n => (_.range(0, n, 10).map(index => (
      <FeeOptions
        handleChange={this.handleValueChange}
        key={index}
        option={index}
      />
    )));
    const renderForm = () => {
      if (this.props.loading === true) {
        return (
          <Loading />
        );
      }
      if (this.props.loading === false) {
        const { name, type, time, fee, max_fee, band_minimum, cash } = this.props.event;
        const { id } = this.props.params;
        return (
          <div className="form-container">
            <Link to={`events/${id}`}><button className="btn btn-primary custom-buttons">Back to Event</button></Link>
            <h1 className="text-center">Modify Event</h1>
            <div className="form-group">
              <form>
                <label htmlFor="type">Name</label>
                <input className="form-control"type="text" name="type" id="name" defaultValue={name} onChange={this.handleValueChange} />
                <label htmlFor="type">Type of Event</label>
                <select className="form-control" id="type" defaultValue={type} onChange={this.handleValueChange}>
                  <option value="" />
                  <option value="bal">Huntsville Bal Night</option>
                  <option value="blues">Huntsville Blues Night</option>
                  <option value="monthly">Monthly Dance</option>
                </select>

                <label htmlFor="date">Date & Time</label><br />
                <Datetime
                  defaultValue={this.state.newEvent.date}
                  id="date-picker"
                  onChange={this.handleChange}
                  readOnly
                />

                <div className="add-inputs">
                  <label htmlFor="fee">Fee:</label><br />
                  $
                  <select id="fee" defaultValue={fee} onChange={this.handleValueChange} >
                    {renderFeeOptions(110)}
                  </select>
                </div>

                <div className="add-inputs">
                  <label htmlFor="max_fee">Max Fee:</label><br />
                  $
                  <select id="max_fee" defaultValue={max_fee} onChange={this.handleValueChange} >
                    {renderFeeOptions(110)}
                  </select>
                </div>

                <div className="add-inputs">
                  <label htmlFor="band_minimum">Band Minimum:</label><br />
                  $
                  <select size="1" id="band_minimum" defaultValue={band_minimum} onChange={this.handleValueChange} >
                    {renderFeeOptions(700)}
                  </select>
                </div>
                <label htmlFor="cash">Starting Cashbox Amount</label>
                <input className="form-control" id="cash" type="text" name="cash" defaultValue={cash} onChange={this.handleValueChange} />
                <button onClick={e => this.handleSubmit(e)} className="btn btn-primary custom-buttons">Submit</button>
                <Link to={`events/${id}`}><button className="btn btn-primary custom-buttons">Cancel</button></Link>
                <button onClick={e => this.handleRemove(e)} className="btn btn-danger custom-buttons">Remove</button>
                <br />
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
}
