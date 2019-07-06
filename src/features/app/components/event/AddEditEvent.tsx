import * as React from 'react';
import { FunctionComponent, useState, useEffect, useRef } from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as Datetime from 'react-datetime';
import { Link, RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import { FeeOptions } from './inputs/FeeOptions';
import { IEvent } from '../../../../interfaces';

interface AddEditEventProps {
  params?: RouteInfo
}

class NewEvent implements IEvent {
  constructor(
    name: string,
    type: string,
    date: string,
    fee: number,
    max_fee: number,
    band_minimum: number,
    cash: number,
  ) {
    this.name = name;
    this.type = type;
    this.date = date;
    this.fee = fee;
    this.max_fee = max_fee;
    this.band_minimum = band_minimum;
    this.cash = cash;
  }

  name: string;
  type: string;
  date: string;
  fee: number;
  max_fee: number;
  band_minimum: number;
  cash: number;
}

export const AddEditEvent: FunctionComponent<AddEditEventProps> = (props: AddEditEventProps) => {
  const { params } = props;
  const { id } = params;

  const [ event, setEvent ] = useState<IEvent>(new NewEvent('', '', '', 0, 0, 0, 0));
  const [ error, setError ] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const [ dateChanged, setDateChanged ] = useState<boolean>(false);
  const [ editMode, setEditMode ] = useState<boolean>(false);

  const feeRef = useRef(null);
  const maxFeeRef = useRef(null);
  const cashRef = useRef(null);
  const bandMinimumRef = useRef(null);

  useEffect(() => {
    const handleEventUpdate = (event: IEvent) => {
      setEvent(event);
    } 

    if (params.id) {
      setEditMode(true);
      api.subscribeToEvent(params.id, handleEventUpdate);
    } else {
      setEditMode(false);
      setEvent(new NewEvent('', '', '', 0, 0, 0, 0));
    }

    return () => {
      setEditMode(false);
    }
  }, [params]);

  const handleChange = (selectedDate) => {
    if (typeof selectedDate === 'object') {
      setDateChanged(true);
      setEvent({ ...event, date: selectedDate.format('MM/DD/YYYY h:mm A') });
    }
  }

  const handleValueChange = (e) => {
    e.preventDefault();
    setEvent({ ...event, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    const eventObj: IEvent = {
      ...event,
      cash: parseInt(cashRef.current.value, 10),
      fee: parseInt(feeRef.current.value, 10),
      max_fee: parseInt(maxFeeRef.current.value, 10),
      band_minimum: parseInt(bandMinimumRef.current.value, 10),
    }
    e.preventDefault();
    if (eventObj.date === '') {
      setError(true);
      setErrorMessage('No Date');
      return;
    }
    let d = moment(eventObj.date);
    if (d < moment(Date.now())) {
      setError(true);
      setErrorMessage('The date is before the current date')
      return;
    }

    if (editMode) {
      api.editEventDetails(id, eventObj);  
    } else {
      api.addEvent(eventObj);    
    }

    window.location.href = '#/events';
  }

  const renderErrorMessage = () => {
    if (error) {
      return (
        <p className="error-message">{errorMessage}</p>
      );
    }
    return true;
  };
  const renderFeeOptions = n => (_.range(0, n, 10).map(index => (
    <FeeOptions
      handleChange={handleValueChange}
      key={index}
      option={index}
    />
  )));

  return (
    <div className="form-container">
      <h1 className="text-center page-header">{editMode ?  'Edit Event' : 'Add Event'}</h1>
      <div className="form-group">
        <form>
          <label htmlFor="type">Name</label>
          <input className="form-control"type="text" name="type" id="name" value={event && event.name} onChange={handleValueChange} />
          <label htmlFor="type">Type</label>
          <select className="form-control" id="type" value={event ? event.type : event.type} onChange={handleValueChange}>
            <option value="" />
            <option value="bal">Huntsville Bal Night</option>
            <option value="blues">Huntsville Blues Night</option>
            <option value="monthly">Monthly Dance</option>
          </select>

          <label htmlFor="date">Date</label><br />
          <Datetime
            value={event ? event.date : event.date}
            onChange={handleChange}
          />

          <div className="add-inputs">
            <label htmlFor="fee">Fee:</label><br />
            $
            <select 
              id="fee" 
              value={event ? event.fee.toString() : event.fee.toString()}
              onChange={handleValueChange}
              ref={feeRef}
            >
              {renderFeeOptions(110)}
            </select>
          </div>

          <div className="add-inputs">
            <label htmlFor="max_fee">Max Fee:</label><br />
            $
            <select 
              id="max_fee" 
              value={event ? event.max_fee.toString() : event.max_fee.toString()}
              onChange={handleValueChange}
              ref={maxFeeRef} 
            >
              {renderFeeOptions(110)}
            </select>
          </div>

          <div className="add-inputs">
            <label htmlFor="band_minimum">Band Minimum:</label><br />
            $
            <select 
              size={1} 
              id="band_minimum" 
              value={event ? event.band_minimum.toString() : event.band_minimum.toString()} 
              onChange={handleValueChange}
              ref={bandMinimumRef}
            >
              {renderFeeOptions(700)}
            </select>
          </div>

          <label htmlFor="cash">Starting Cashbox Amount</label>
          <input 
            className="form-control" 
            id="cash" type="text" 
            name="cash" 
            value={event ? event.cash.toString() : event.cash.toString()} 
            onChange={handleValueChange}
            ref={cashRef} 
          />
          <button onClick={e => handleSubmit(e)} className="custom-buttons btn btn-primary">Submit</button>
          <Link to="events"><button className="custom-buttons btn btn-danger">Cancel</button></Link>
          <br />
          {renderErrorMessage()}
        </form>
      </div>
    </div>
  );
}
