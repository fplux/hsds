import React from 'react';
import { Link } from 'react-router';
import { Expense } from '../expenses/Expense';

export class Expenses extends React.Component {
  handleClick(e) {
    if (this.props.disabled === true) {
      e.preventDefault();
    }
  }
  render() {
    const { expenses, eventId } = this.props;

    /* Render the expenses into a table */
    const renderExpenses = () => {
      if (expenses !== undefined) {
        return Object.keys(expenses).map((expense) => {
          const expenseInfo = expenses[expense];
          return (
            <Expense
              key={expense}
              eventId={eventId}
              expenseId={expense}
              {...this.props}
              {...expenseInfo}
            />
          );
        });
      }
      return true;
    };
    /* ************************************************ */

    const { totalExpenses } = this.props;
    const parsedTotal = totalExpenses.toFixed(0);
    return (
      <div>
        <h3 className="text-center table-header">Expenses</h3>
        <Link className="table-add-link" onClick={e => this.handleClick(e)} to={`events/${eventId}/addexpense`}>Add Expense</Link>
        <table className="table-styles">
          <thead>
            <tr>
              <th>Type</th>
              <th>Notes</th>
              <th>Percent</th>
              <th>Paid</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {renderExpenses()}
            <tr>
              <td colSpan="4">Total</td>
              <td>${parsedTotal}</td>
            </tr>
          </tbody>

        </table>
      </div>
    );
  }
}

Expenses.propTypes = {
  disabled: React.PropTypes.bool,
  expenses: React.PropTypes.object, // eslint-disable-line
  eventId: React.PropTypes.string,
};
