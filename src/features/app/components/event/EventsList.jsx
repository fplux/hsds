import React from 'react';
import { EventBox } from './EventBox';
import * as api from '../../../data/api';

const Loading = require('react-loading-animation');

export class EventsList extends React.Component {
  constructor() {
    super();
    api.fetchEvents();
  }
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
        <h3 className="text-center">Upcoming Events</h3>
        {renderEvents()}
      </div>
    );
  }
}

EventsList.propTypes = {
  loading: React.PropTypes.bool,
  events: React.PropTypes.object, //eslint-disable-line
};
