import React from 'react';
import * as api from '../../../data/api';
import { EventReport } from './EventReport';

const Loading = require('react-loading-animation');

export class Reports extends React.Component {
  componentDidMount() {
    api.fetchPastEvents();
  }
  render() {
    const renderEvents = () => {
      switch (this.props.loading) {
        case false: {
          const { events } = this.props;
          return Object.keys(events).map(event => (
            <EventReport key={event} eventId={event} {...events[event]} />
          ));
        }
        default:
          return (
            <Loading />
          );
      }
    };
    return (
      <div>
        <p>Reports Page</p>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {renderEvents()}
          </tbody>
        </table>
      </div>
    );
  }
}

Reports.propTypes = {
  loading: React.PropTypes.bool,
  events: React.PropTypes.object, // eslint-disable-line
};
