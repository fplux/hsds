import React from 'react';

export const YearlySummary = props => (
  <div className="summary">
    <div className="header">
      <h3>{props.year} Summary</h3>
    </div>
    <div className="first-column">
      <h4>Income</h4>
      <p>${props.income}</p>
    </div>
    <div className="second-column">
      <h4>Expenses</h4>
      <p>${props.expenses}</p>
    </div>
    <div className="third-column">
      <h4>Net</h4>
      <p>${props.net}</p>
    </div>
  </div>
);

YearlySummary.propTypes = {
  year: React.PropTypes.string,
  income: React.PropTypes.number,
  expenses: React.PropTypes.number,
  net: React.PropTypes.number,
};
