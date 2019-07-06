import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import * as api from '../../../data/api';
import { AdminEvent } from './AdminEvent';
import * as shared from '../../../data/shared';

interface AdminProps {
  events: {}
}

export const Admin: FunctionComponent<AdminProps> = (props: AdminProps) => {
  const { events }  = props;
  useEffect(() => {
    api.fetchAdminDetails();
  }, []);

  const handleRemoveEvent = (eventId) => {
    if (shared.confirmDeleteEvent() === true) {
      api.deleteEvent(eventId);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const renderEvents = () =>
    Object.keys(events).map(e =>
      <AdminEvent
        key={e}
        eventId={e}
        removeEvent={handleRemoveEvent}
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
