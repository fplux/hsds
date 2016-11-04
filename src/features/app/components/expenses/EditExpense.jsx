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
  handleSubmit(e) {
    e.preventDefault();
    const { id, expenseid } = this.props.params;
    const modifiedExpense = {
      type: this.type.value,
      notes: this.notes.value,
      cost: parseInt(this.cost.value, 10),
      percent: this.percent.value,
      paid: this.paid.value,
    };
    api.editExpenseDetails(id, expenseid, modifiedExpense);
    window.location = `#/events/${id}`;
  }

  // Remove the entry from the database, and navigate to the /events page
  handleRemove(e) {
    e.preventDefault();
    const { expenseid, id } = this.props.params;
    api.removeExpense(id, expenseid);
    window.location = `#/events/${id}`;
  }

  // This function clears out the entry that was stored in Redux
  handleCancel(e) {
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
          <div>
            <button onClick={e => this.handleCancel(e)} className="button">Back to Event</button>
            <h1 className="text-center">Modify Expense</h1>
            <form className="custom-form">
              <label htmlFor="type">Type</label>
              <input type="text" name="type" ref={(ref) => { this.type = ref; }} defaultValue={type} />
              <label htmlFor="notes">Notes</label>
              <input type="text" name="notes" ref={(ref) => { this.notes = ref; }} defaultValue={notes} />
              <label htmlFor="cost">Cost</label>
              <input type="text" name="cost" ref={(ref) => { this.cost = ref; }} defaultValue={cost} />
              <label htmlFor="percent">Percent</label>
              <input type="text" name="percent" ref={(ref) => { this.percent = ref; }} defaultValue={percent} />
              <label htmlFor="paid">Paid</label>
              <input type="checkbox" name="paid" ref={(ref) => { this.paid = ref; }} defaultChecked={paid} /><br />
              <button onClick={e => this.handleSubmit(e)} className="button">Save</button>
              <button onClick={e => this.handleCancel(e)} className="button">Cancel</button>
              <button onClick={e => this.handleRemove(e)} className="button alert">Remove</button>
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

EditExpense.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
    expenseid: React.PropTypes.string,
  }),
  dispatch: React.PropTypes.func,
};
