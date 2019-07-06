import * as React from 'react';
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
import { RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import * as helpers from '../../../data/helpers';
import { IExpense, IEvent } from '../../../../interfaces';

interface AddExpenseProps {
  params: RouteInfo,
  config: any
}
export const AddExpense: FunctionComponent<AddExpenseProps> = (props: AddExpenseProps) => {
  const { params, config } = props;
  const { id } = params;
  const [ message, setMessage ] = useState<string>('');
  const [ percentDisabled, setPercentDisabled ] = useState<boolean>(false);
  const [ costDisabled, setCostDisabled ] = useState<boolean>(true);
  const [ expenses, setExpenses ] = useState<{ [expenseId: string]: IExpense }>(null);

  const typeRef = useRef(null);
  const costRef = useRef(null);
  const percentRef = useRef(null);
  const notesRef = useRef(null);
  const descRef = useRef(null);

  const submit = 'Submit';
  const addAnother = 'Add';

  useEffect(() => {
    const handleEventUpdate = (event: IEvent) => {
      setExpenses(event.expenses);
    }

    if (id) {
      api.subscribeToEvent(id, handleEventUpdate);
    }
  }, [id])
  
  const handleSubmit = (button) => {
    const percent = percentRef.current.value ? parseFloat(percentRef.current.value): 0;
    const cost = costRef.current.value ? parseFloat(costRef.current.value) : 0.00;
    const totalExpensesPercent = helpers.getSplitExpensesPercent(expenses);

    if (percent + totalExpensesPercent > 100) {
      const message = 'This would make the split percentage more than 100%, please adjust';
      setMessage(message);
      return;
    }

    const newExpense = {
      notes: notesRef.current.value,
      percent,
      cost,
      desc: descRef.current.value,
      type: typeRef.current.value,
      paid: false,
    };

    api.addExpense(id, newExpense);
    if (button === 'Submit') {
      window.location.href= `#/events/${id}`;
    } else if (button === 'Add') {
      notesRef.current.value = '';
      percentRef.current.value = '';
      costRef.current.value = '';
      descRef.current.focus();
      typeRef.current.value = 'Split';
      setCostDisabled(false);
      setPercentDisabled(false);
      setMessage('Expense Added!');
    }
  }

  const handleChange = () => {
    // reset values if necessary
    costRef.current.value = typeRef.current.value === 'Flat' ? costRef.current.value: '';
    percentRef.current.value = typeRef.current.value === 'Split' ? percentRef.current.value : '';

    setCostDisabled(typeRef.current.value === 'Split');
    setPercentDisabled(typeRef.current.value === 'Flat');
  }

  const handleCancel = (e) => {
    e.preventDefault();
    window.location.href = `#/events/${id}`;
  }

  const createExpenseTypeOptions = () => {
    const items = [];
    const types = config.expenseTypes;
    _.forIn(types, (t, index) => {
      items.push(<option key={index} value={t}>{t}</option>);
    });
    return items;
  }

  return (
    <div className="form-container">
      <button onClick={handleCancel} className="btn btn-primary custom-buttons">Back to Event</button>
      <h1 className="text-center">Create New Expense</h1>
      <div className="form-group">
        <form className="custom-form">
          <input className="form-control" type="text" ref={notesRef} placeholder="Details..." />
          <select className="form-control" defaultValue="Band" ref={descRef} autoFocus>
            <option value="Band">Band</option>
            <option value="Venue">Venue</option>
            <option value="Teacher">Teacher</option>
            <option value="DJ">DJ</option>
            <option value="HSDS">HSDS</option>
            <option value="Other">Other</option>
          </select>
          <select className="form-control" onChange={() => handleChange()} ref={typeRef} >
            {createExpenseTypeOptions()}
          </select>
          <input className="form-control" type="number" ref={percentRef} disabled={percentDisabled} placeholder="Percent..." />
          <input className="form-control" type="text" ref={costRef} disabled={costDisabled} placeholder="Cost..." />
          <button className="btn btn-primary custom-buttons" onClick={() => handleSubmit(submit)} type="button">Save</button>
          <button className="btn btn-primary custom-buttons" onClick={() => handleSubmit(addAnother)} type="button">Save and Add</button>
          <button className="btn btn-danger custom-buttons" onClick={handleCancel}>Cancel</button>
          <br />
          {message}
        </form>
      </div>
    </div>
  );
};