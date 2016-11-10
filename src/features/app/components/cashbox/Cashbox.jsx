import React from 'react';

export const Cashbox = props => (
  <div className="table-container">
    <h3 className="text-center">Cashbox</h3>
    <table className="table-styles">
      <thead>
        <tr>
          <th>Beginning</th>
          <th>Ending</th>
          <th>Net</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${props.cash}</td>
          <td>${props.endingCash}</td>
          <td className="td-2">${props.net}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

Cashbox.propTypes = {
  cash: React.PropTypes.number,
  endingCash: React.PropTypes.number,
  net: React.PropTypes.number,
};
