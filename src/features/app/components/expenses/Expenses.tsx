import * as React from 'react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';
import { Expense } from '../expenses/Expense';
import * as helpers from '../../../data/helpers';
import { IExpense } from '../../../../interfaces';

interface ExpensesProps {
  disabled: boolean,
  expenses: IExpense[],
  eventId: string,
  userClass: string
}

export const Expenses: FunctionComponent<ExpensesProps> = (props: ExpensesProps) => {
  const { expenses, eventId, disabled, userClass } = props;

  const handleClick = (e) => {
    if (disabled === true) {
      e.preventDefault();
    }
  }

  const totalExpenses = helpers.getTotalEventExpenses(expenses);
  const parsedTotal = totalExpenses.toFixed(2);
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
            {...props}
            {...expenseInfo}
          />
        );
      });
    }
    return true;
  };
  
  return (
    <div className={userClass}>
      <h3 className="text-center table-header">Expenses</h3>
      <Link
        className="table-add-link"
        onClick={e => handleClick(e)}
        to={`events/${eventId}/addexpense`}
      >
        <button className="custom-add-btn btn btn-primary">Add Expense</button>
      </Link>
      <table className="table-styles">
        <thead>
          <tr>
            <th>Desc</th>
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
            <td colSpan={3}>Total</td>
            <td colSpan={2}>{helpers.getSplitExpensesPercent(expenses)}%</td>
            <td>${parsedTotal}</td>
          </tr>
        </tbody>

      </table>
    </div>
  );
}
