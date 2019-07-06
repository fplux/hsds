import * as React from 'react';
import { FunctionComponent } from 'react';

interface IAdminFeeProps {
  fee: any;
}

export const AdminFee: FunctionComponent<IAdminFeeProps> = (props: IAdminFeeProps) => (
  <div>
    <h1 className="text-center">Administrative Fee</h1>
    <table className="table-styles">
      <tbody>
        <tr>
          <td colSpan={5}>Administrative Fee</td>
          <td className="admin-fee">${props.fee}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
