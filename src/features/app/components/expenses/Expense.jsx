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
    const { expenseId, type, desc, notes, cost, percent, eventId, paid } = this.props;
    const parsedCost = cost.toFixed(2);
    const renderPercent = () => {
      if (type === 'Split') {
        return (
          <td>{ percent }%</td>
        );
      }
      return 'NA';
    };
    return (
      <tr>
        <td><Link onClick={e => this.handleClick(e)} to={`events/${eventId}/editexpense/${expenseId}`}>{desc}</Link></td>
        <td>{type}</td>
        <td>{notes}</td>
        {renderPercent()}
        <td>
          <input
            disabled={this.props.disabled}
            ref={(ref) => { this.checkbox = ref; }}
            checked={paid}
            type="checkbox"
            onChange={() => this.changeCheckBox(expenseId)}
          />
        </td>
        <td className="td-2">${parsedCost}</td>
      </tr>
    );
  }
}