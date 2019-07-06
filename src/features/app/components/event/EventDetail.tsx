import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FunctionComponent, useState, useEffect } from 'react';
import * as _ from 'lodash';
import { Link, RouteInfo } from 'react-router';
import * as api from '../../../data/api';
import { Admission } from '../admission/Admission';
import { Expenses } from '../expenses/Expenses';
import { AdminFee } from '../adminfee/AdminFee';
import { Cashbox } from '../cashbox/Cashbox';
import { RemoveAdminFee } from './RemoveAdminFee';
import * as shared from '../../../data/shared';
import { IEvent } from '../../../../interfaces';
import { PreFinalizeEvent } from './PreFinalizeEvent';


const Loading = require('react-loading-animation');

interface EventDetailProps {
  params: RouteInfo,
  disabled: boolean,
  user: any
}

export const EventDetail: FunctionComponent<EventDetailProps> = (props: EventDetailProps) => {
  const { params, disabled, user } = props;
  const { id } = params;
  const { role } = user;
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ event, setEvent ] = useState<IEvent>(null);
  const [ showFinalizeEvent, setShowFinalizeEvent ] = useState<boolean>(false);

  useEffect(() => {
    const handleEventUpdate = (ev: IEvent) => {
      setEvent(ev);
      setLoading(false);
    }

    api.subscribeToEvent(id, handleEventUpdate); // subscribe to this event details updating

    return () => api.unsubscribeToEvent(id);
  }, []);

  const handleClick = (e) => {
    if (disabled === true) {
      e.preventDefault();
    }
  }

  const submit = (adminFee?: number) => {
    if (adminFee !== undefined) {
      api.editEventDetails(id, {...event, fee: adminFee });
      api.finalizeEventDetailsWithFee(id, adminFee);
    }
    setShowFinalizeEvent(false);
  }

  const userClass = () => {
    if (role === 'admin') {
      return 'admin';
    }
    return 'user';
  };

  const renderAdminFee = () => {
    const { fee } = event; //eslint-disable-line
    if (fee > 0 && disabled === false) {
      return (
        <div>
          <RemoveAdminFee eventId={id} />
          <AdminFee fee={fee} />
        </div>
      );
    } else if (fee > 0 && disabled === true) {
      return (
        <AdminFee fee={fee} />
      );
    }
    return true;
  };

  const disabledMessage = () => {
    if (disabled === true) {
      return (
        <h5 className="text-center disabled-message">Editing this event is disabled</h5>
      );
    }
    return true;
  };

  const renderEvent = () => {
    if (loading === true) {
      return (
        <Loading />
      );
    }
    if (loading === false) {
      let sortedExpenses;
      let totalExpenses;
      if (event.expenses) {
        sortedExpenses = shared.orderExpenses(event.expenses);
        totalExpenses = event.totalExpenses;
      } else {
        sortedExpenses = {};
        totalExpenses = 0;
      }
      return (
        <div>
          <h2 className="text-center page-header">
            {event.name} | {event.date}
          </h2>
          <div className={`${userClass()} text-center edit flex-row flex-justify-space-between`}>
            <Link onClick={e => handleClick(e)} to={`events/${id}/edit`}>
              Edit Event
            </Link>
            <div className="link" onClick={() => setShowFinalizeEvent(true)}>
              Finalize Event
            </div>
          </div>
          {disabledMessage()}
          <Admission
            userClass={userClass()}
            tickets={event.tickets}
            eventId={id}
            disabled={event.disabled}
            totalRevenue={event.totalRevenue}
            totalCount={event.totalCount}
          />
          {renderAdminFee()}
          <Expenses
            userClass={userClass()}
            expenses={sortedExpenses}
            eventId={id}
            disabled={event.disabled}
          />
          <Cashbox
            userClass={userClass()}
            cash={event.cash}
            endingCash={event.endingCash}
            net={event.net}
          />
          {
            showFinalizeEvent && 
            ReactDOM.createPortal(
              <PreFinalizeEvent event={event}
                                closeFinalizeEvent={() => setShowFinalizeEvent(false)}
                                submit={submit}
              />, document.getElementById('app'))
          }
        </div>
      );
    }
    return true;
  };
  return (
    <div>
      {renderEvent()}
    </div>
  );
};