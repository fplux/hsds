import React from 'react';

export const MonthlySummary = props => (
  <div className="summary">
    <div className="header">
      <h3>Monthly Dances Summary</h3>
    </div>
    <div className="first-column">
      <h4>Number of Events</h4>
      <p>{props.monthlyData.numEvents}</p>
    </div>
    <div className="second-column">
      <h4>Admissions for the year</h4>
      <p>{props.monthlyData.count}</p>
    </div>
    <div className="third-column">
      <h4>Average Attendance</h4>
      <p>{props.monthlyData.avgAttendance}</p>
    </div>
  </div>
);

MonthlySummary.propTypes = {
  monthlyData: React.PropTypes.shape({
    numEvents: React.PropTypes.number,
    count: React.PropTypes.number,
    avgAttendance: React.PropTypes.number,
  }),
};
