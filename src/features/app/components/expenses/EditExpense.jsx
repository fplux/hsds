import React from 'react';
import * as api from '../../../data/api';
import * as actions from '../../../data/actions';

export class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    const { expenseid, id } = this.props.params;
    api.fetchExpenseDetails(id, expenseid);
  }

  // Take the form submission and send it to the database
  handleSubmit = (e) => {
    e.preventDefault();
    const { id, expenseid } = this.props.params;
    const modifiedExpense = {
      type: this.type.value,
      notes: this.notes.value,
      cost: parseInt(this.cost.value, 10),
      percent: this.percent.value,
      paid: this.paid.checked,
    };
    api.editExpenseDetails(id, expenseid, modifiedExpense);
    window.location = `#/events/${id}`;
  }

  // Remove the entry from the database, and navigate to the /events page
  handleRemove = (e) => {
    e.preventDefault();
    const { expenseid, id } = this.props.params;
    api.removeExpense(id, expenseid);
    window.location = `#/events/${id}`;
  }

  // This function clears out the entry that was stored in Redux
  handleCancel = (e) => {
    e.preventDefault();
    const { id } = this.props.params;
    this.props.dispatch(actions.clearExpense());
    window.location = `#/events/${id}`;
  }
  render() {
    const renderForm = () => {
      const { loading } = this.props.expense;
      if (loading === false) {
        const { type, cost, notes, paid, percent } = this.props.expense;
        return (
          <div className="form-container">
            <button onClick={e => this.handleCancel(e)} className="btn btn-primary custom-buttons">Back to Event</button>
            <h2 className="text-center page-header">Modify Expense</h2>
            <div className="form-group">
              <form>
                <label htmlFor="type">Type</label>
                <input className="form-control" type="text" name="type" ref={(ref) => { this.type = ref; }} defaultValue={type} />
                <label htmlFor="notes">Notes</label>
                <input className="form-control" type="text" name="notes" ref={(ref) => { this.notes = ref; }} defaultValue={notes} />
                <label htmlFor="cost">Cost</label>
                <input className="form-control" type="text" name="cost" ref={(ref) => { this.cost = ref; }} defaultValue={cost} />
                <label htmlFor="percent">Percent</label>
                <input className="form-control" type="text" name="percent" ref={(ref) => { this.percent = ref; }} defaultValue={percent} />
                <label htmlFor="paid">Paid</label>
                <input className="form-control" type="checkbox" name="paid" ref={(ref) => { this.paid = ref; }} defaultChecked={paid} /><br />
                <button onClick={this.handleSubmit} className="btn btn-primary custom-buttons">Save</button>
                <button onClick={this.handleCancel} className="btn btn-primary custom-buttons">Cancel</button>
                <button onClick={this.handleRemove} className="btn btn-danger custom-buttons">Remove</button>
              </form>
            </div>
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

EditExpense.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    expenseid: React.PropTypes.string,
  }),
  dispatch: React.PropTypes.func,
  expense: React.PropTypes.shape({
    type: React.PropTypes.string,
    cost: React.PropTypes.number,
    notes: React.PropTypes.string,
    paid: React.PropTypes.bool,
    percent: React.PropTypes.string,
    loading: React.PropTypes.bool,
  }),
};
