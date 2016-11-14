import React from 'react';
import { EventReport } from './EventReport';

export class Reports extends React.Component {
  render() {
    const renderEvents = () => {
      if (this.props.loading === false) {
        const { events } = this.props;
        return Object.keys(events).map(event => (
          <EventReport key={event} eventId={event} {...events[event]} />
        ));
      }
      return true;
    };
    const renderTotal = () => {
      if (this.props.loading === false) {
        const { events } = this.props;
        const netArray = [];
        Object.keys(events).map((event) => {
          netArray.push(events[event].net);
          return netArray;
        });
        return netArray.reduce((a, b) => a + b);
      }
      return true;
    };
    return (
      <div>
        <h3 className="text-center page-header">Reports</h3>
        <table className="table-styles">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {renderEvents()}
            <tr>
              <td colSpan="2">Totals</td>
              <td>${renderTotal()}</td>
            </tr>
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
