import React from 'react';

export const Averages = props => (
  <div className="summary">
    <div className="header">
      <h3>Yearly Averages</h3>
    </div>
    <div className="income">
      <h4>Average Band Cost</h4>
      <p>${props.avgBandCost}</p>
    </div>
    <div className="expenses">
      <h4>Average Venue Cost</h4>
      <p>${props.avgVenueCost}</p>
    </div>
    <div className="expenses">
      <h4>Average Attendance</h4>
      <p>{props.avgEvent}</p>
    </div>
  </div>
);

Averages.propTypes = {
  avgBandCost: React.PropTypes.string,
  avgVenueCost: React.PropTypes.string,
  avgEvent: React.PropTypes.number,
};
