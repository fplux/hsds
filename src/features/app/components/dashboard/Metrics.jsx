import React from 'react';

export const Metrics = props => (
  <div className="summary">
    <div className="header">
      <h3>Metrics</h3>
    </div>
    <div className="first-column">
      <h4>Number of Events</h4>
      <p>{props.numEvents}</p>
    </div>
    <div className="second-column">
      <h4>Admissions for the year</h4>
      <p>{props.count}</p>
    </div>
    <div className="third-column">
      <h4>Amount per Admission</h4>
      <p>${props.revper}</p>
    </div>
  </div>
);

Metrics.propTypes = {
  revper: React.PropTypes.string,
};
