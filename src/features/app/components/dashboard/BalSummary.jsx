import React from 'react';

export const BalSummary = props => (
  <div className="summary">
    <div className="header">
      <h3>Bal Summary</h3>
    </div>
    <div className="expenses">
      <h4>Number of Events</h4>
      <p>{props.balData.numEvents}</p>
    </div>
    <div className="income">
      <h4>Admissions for the year</h4>
      <p>{props.balData.count}</p>
    </div>
    <div className="expenses">
      <h4>Average Attendance</h4>
      <p>{props.balData.avgAttendance}</p>
    </div>
  </div>
);

BalSummary.propTypes = {
  balData: React.PropTypes.shape({
    numEvents: React.PropTypes.number,
    count: React.PropTypes.number,
    avgAttendance: React.PropTypes.number,
  }),
};
