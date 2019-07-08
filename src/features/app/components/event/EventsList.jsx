import React from 'react';
import { EventBox } from './EventBox';

const Loading = require('react-loading-animation');

export class EventsList extends React.Component {
  render() {
    const renderEvents = () => {
      switch (this.props.loading) {
        case false: {
          const { events } = this.props;
          return Object.keys(events).map((event) => {
            const eachEvent = events[event];
            return (
              <EventBox
                key={event}
                eventKey={event}
                {...eachEvent}
              />
            );
          });
        }
        default:
          return (
            <Loading />
          );
      }
    };

    return (
      <div>
        <h3 className="text-center page-header">Upcoming Events</h3>
        {renderEvents()}
      </div>
    );
  }
}
