import * as React from 'react';
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
import { Link, RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import * as helpers from '../../../data/helpers';
import * as shared from '../../../data/shared';
import { IEvent, IExpense } from '../../../../interfaces';

interface PreFinalizeEventProps {
  event: IEvent,
  closeFinalizeEvent: () => void,
  submit: (adminFee?: number) => void
}

export const PreFinalizeEvent: FunctionComponent<PreFinalizeEventProps> = (props: PreFinalizeEventProps) => {
  const { event, closeFinalizeEvent, submit } = props;
  const [ totalExpenses, setTotalExpenses ] = useState<number>(0);
  const [ initialized, setInitialized ] = useState<boolean>(false);
  const [ fixedExpenses, setFixedExpenses ] = useState<{ [expenseId: string]: IExpense }>(null);
  const [ splitExpenses, setSplitExpenses ] = useState<{ [expenseId: string]: IExpense }>(null);
  const [ requireAdminFee, setRequireAdminFee ] = useState<boolean>(false);  

  const adminFeeRef = useRef(null);

  useEffect(() => {
    setTotalExpenses(helpers.getTotalEventExpenses(event.expenses));
    setFixedExpenses(helpers.getFixedExpenses(event.expenses));
    setSplitExpenses(helpers.getSplitExpenses(event.expenses));
    setInitialized(true);
  }, []);


  const handleSelection = (value: string) => {
    if (value === "Yes") {
      setRequireAdminFee(true);
    } else {
      setRequireAdminFee(false);      
    }
  }

  if (initialized) {
    return (
      <div className="portal-modal">
        <div>
          <div className="link" onClick={closeFinalizeEvent}>Back to Event</div>
          <h2>Finalize Event</h2>
          <hr />
          <h4>The following is a quick breakdown of the income and expenses.</h4>
  
          <div className="breakdown">
            <p>Total Income: ${event.totalRevenue}</p>
            <p>Fixed Expenses: ${helpers.getTotalEventExpenses(fixedExpenses)}</p>
            <p>Net (available to split): ${event.totalRevenue - helpers.getTotalEventExpenses(fixedExpenses)}</p>
            <p>Band Minimum (if applicable) ${event.band_minimum}</p>
            <p>Current band payout ${helpers.findBandPayout(event.expenses)}</p>
          </div>
          
          {
            event.band_minimum &&
            <>
              <div>
                Do you want to apply an admin fee to this event?
              </div>
              <select onChange={(e) => handleSelection(e.target.value)}>
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>            
              </select>
            </>
          }

          {
            requireAdminFee &&
            <div>
              <label>How much?</label>
              <input className="fee" type="number" ref={adminFeeRef}/>
            </div>
          }

          <button onClick={() => submit(adminFeeRef.current ? parseInt(adminFeeRef.current.value, 10) : 0)}>Submit</button>
        </div>
      </div>
    );
  }

  return null;
};