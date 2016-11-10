import React from 'react';
import * as api from '../../../data/api';

export class AddExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      percentDisabled: false,
      costDisabled: false,
    };
  }
  handleSubmit(button) {
    const { id } = this.props.params;

    let cost = 0;
    if (this.cost.value.length > 0) {
      cost = parseInt(this.cost.value, 10);
    } else {
      cost = 0;
    }

    const newExpense = {
      notes: this.notes.value,
      percent: this.percent.value,
      cost,
      type: this.type.value,
      paid: false,
    };

    api.addExpense(id, newExpense);
    if (button === 'Submit') {
      window.location = `#/events/${id}`;
    } else if (button === 'Add') {
      this.setState({
        message: 'Expense Added!',
      });
      this.notes.value = '';
      this.percent.value = '';
      this.cost.value = '';
      this.type.focus();
      this.setState({
        costDisabled: false,
        percentDisabled: false,
      });
    }
  }
  handleChange() {
    if (this.percent.value !== '') { this.setState({ costDisabled: true }); }
    if (this.percent.value === '') { this.setState({ costDisabled: false }); }
    if (this.cost.value !== '') { this.setState({ percentDisabled: true }); }
    if (this.cost.value === '') { this.setState({ percentDisabled: false }); }
  }
  handleCancel = (e) => {
    e.preventDefault();
    const { id } = this.props.params;
    window.location = `#/events/${id}`;
  }

  render() {
    const submit = 'Submit';
    const addAnother = 'Add';
    const { message } = this.state;
    const { id } = this.props.params;
    return (
      <div className="form-container">
        <button onClick={this.handleCancel} className="btn btn-primary custom-buttons">Back to Event</button>
        <h1 className="text-center">Create New Expense</h1>
        <div className="form-group">
          <form className="custom-form">
            <select className="form-control" ref={(ref) => { this.type = ref; }} autoFocus>
              <option value="Band">Band</option>
              <option value="Venue">Venue</option>
              <option value="Teacher">Teacher</option>
              <option value="DJ">DJ</option>
              <option value="Other">Other</option>
            </select>
            <input className="form-control" type="text" ref={(ref) => { this.notes = ref; }} placeholder="Notes..." />
            <input className="form-control" type="text" ref={(ref) => { this.percent = ref; }} disabled={this.state.percentDisabled} onChange={() => this.handleChange()} placeholder="Percent..." />
            <input className="form-control" type="text" ref={(ref) => { this.cost = ref; }} disabled={this.state.costDisabled} onChange={() => this.handleChange()} placeholder="Cost..." />
            <button className="btn btn-primary custom-buttons" onClick={() => this.handleSubmit(submit)} type="button">Save</button>
            <button className="btn btn-primary custom-buttons" onClick={() => this.handleSubmit(addAnother)} type="button">Save and Add</button>
            <button className="btn btn-danger custom-buttons" onClick={this.handleCancel}>Cancel</button>
            <br />
            {message}
          </form>
        </div>
      </div>
    );
  }
}
