import React from 'react';

export const HbnSummary = props => (
  <div className="summary">
    <div className="header">
      <h3>HBN Summary</h3>
    </div>
    <div className="expenses">
      <h4>Number of Events</h4>
      <p>{props.hbnData.numEvents}</p>
    </div>
    <div className="income">
      <h4>Admissions for the year</h4>
      <p>{props.hbnData.count}</p>
    </div>
    <div className="expenses">
      <h4>Average Attendance</h4>
      <p>{props.hbnData.avgAttendance}</p>
    </div>
  </div>
);

HbnSummary.propTypes = {
  HbnData: React.PropTypes.shape({
    numEvents: React.PropTypes.number,
    count: React.PropTypes.number,
    avgAttendance: React.PropTypes.number,
  }),
};
