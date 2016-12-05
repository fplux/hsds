import React from 'react';

export const BluesSummary = props => (
  <div className="summary">
    <div className="header">
      <h3>Blues Summary</h3>
    </div>
    <div className="first-column">
      <h4>Number of Events</h4>
      <p>{props.bluesData.numEvents}</p>
    </div>
    <div className="second-column">
      <h4>Admissions for the year</h4>
      <p>{props.bluesData.count}</p>
    </div>
    <div className="third-column">
      <h4>Average Attendance</h4>
      <p>{props.bluesData.avgAttendance}</p>
    </div>
  </div>
);

BluesSummary.propTypes = {
  bluesData: React.PropTypes.shape({
    numEvents: React.PropTypes.number,
    count: React.PropTypes.number,
    avgAttendance: React.PropTypes.number,
  }),
};
