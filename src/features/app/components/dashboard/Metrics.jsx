import React from 'react';

export const Metrics = props => (
  <div className="summary">
    <div className="header">
      <h3>Metrics</h3>
    </div>
    <div className="expenses">
      <h4>Number of Events</h4>
      <p>{props.numEvents}</p>
    </div>
    <div className="income">
      <h4>Admissions for the year</h4>
      <p>{props.count}</p>
    </div>
    <div className="expenses">
      <h4>Amount per Admission</h4>
      <p>${props.revper}</p>
    </div>
  </div>
);

Metrics.propTypes = {
  revper: React.PropTypes.string,
};
