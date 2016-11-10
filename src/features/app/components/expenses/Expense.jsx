import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';

export class Expense extends React.Component {
  changeCheckBox(expenseId) {
    // update checkbox
    const { checked } = this.checkbox;
    const { eventId } = this.props;
    api.changeCheckBox(eventId, expenseId, checked);
  }
  handleClick(e) {
    if (this.props.disabled === true) {
      e.preventDefault();
    }
  }
  render() {
    const { expenseId, type, notes, cost, percent, eventId, paid } = this.props;
    return (
      <tr>
        <td><Link onClick={e => this.handleClick(e)} to={`events/${eventId}/editexpense/${expenseId}`}>{type}</Link></td>
        <td>{notes}</td>
        <td>{percent}%</td>
        <td>
          <input
            disabled={this.props.disabled}
            ref={(ref) => { this.checkbox = ref; }}
            checked={paid}
            type="checkbox"
            onChange={() => this.changeCheckBox(expenseId)}
          />
        </td>
        <td className="td-2">${cost}</td>
      </tr>
    );
  }
}

Expense.propTypes = {
  expenseId: React.PropTypes.string,
  type: React.PropTypes.string,
  notes: React.PropTypes.string,
  cost: React.PropTypes.number,
  percent: React.PropTypes.string,
  eventId: React.PropTypes.string,
  paid: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
};
