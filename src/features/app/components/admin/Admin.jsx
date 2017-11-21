import React from 'react';
import * as api from '../../../data/api';
import { AdminEvent } from './AdminEvent';
import * as shared from '../../../data/shared';

export class Admin extends React.Component {
  constructor() {
    super();
    api.fetchAdminDetails();
  }
  handleRemoveEvent = (eventId) => {
    if (shared.confirmDeleteEvent() === true) {
      api.deleteEvent(eventId);
    }
  }
  handleChange = (e) => {
    e.preventDefault();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  render() {
    const { events } = this.props;
    const renderEvents = () =>
      Object.keys(events).map(e =>
        <AdminEvent
          key={e}
          eventId={e}
          removeEvent={this.handleRemoveEvent}
          {...events[e]}
        />);
    return (
      <div>
        <p className="text-center">Organization Administration page</p>
        <hr />
        <div className="admin-events-container">
          {renderEvents()}
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  admin: React.PropTypes.shape({
    bandSplit: React.PropTypes.string,
    venueSplit: React.PropTypes.string,
    adminFee: React.PropTypes.string,
    total: React.PropTypes.string,
    loading: React.PropTypes.bool,
  }),
};
