import React from 'react';

export const AdminFee = props => (
  <div>
    <h1 className="text-center">Administrative Fee</h1>
    <table className="table-styles">
      <tbody>
        <tr>
          <td colSpan="5">Administrative Fee</td>
          <td className="admin-fee">${props.fee}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

AdminFee.propTypes = {
  fee: React.PropTypes.number,
};
