import React from 'react';
import * as api from '../../../data/api';

export class RemoveAdminFee extends React.Component {
  handleClick = () => {
    api.removeAdminFee(this.props.eventId);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick} className="btn btn-primary">Remove Admin Fee</button>
      </div>
    );
  }
}
