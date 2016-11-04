import React from 'react';
import { Link } from 'react-router';
import * as api from '../../../data/api';
import * as actions from '../../../data/actions';
import { Admission } from '../admission/Admission';
import { Expenses } from '../expenses/Expenses';
import { AdminFee } from '../adminfee/AdminFee';
import { Cashbox } from '../cashbox/Cashbox';

const Loading = require('react-loading-animation');

export class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    api.fetchEventDetails(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.dispatch(actions.clearEvent());
  }
  handleClick(e) {
    if (this.props.disabled === true) {
      e.preventDefault();
    }
  }

  render() {
    const renderAdminFee = () => {
      const { fee } = this.props.event[0]; //eslint-disable-line
      if (fee > 0) {
        return (
          <AdminFee fee={fee} />
        );
      }
      return true;
    };
    const disabledMessage = () => {
      if (this.props.disabled === true) {
        return (
          <h5 className="text-center disabled-message">Editing this event is disabled</h5>
        );
      }
      return true;
    };
    const renderEvent = () => {
      if (this.props.event.loading === true) {
        return (
          <Loading />
        );
      }
      if (this.props.event.loading === false) {
        const event = this.props.event[0];
        const eventId = this.props.params.id;
        return (
          <div>
            <h3 className="text-center">
              {event.name} | {event.date}
              <Link onClick={e => this.handleClick(e)} className="edit" to={`events/${eventId}/edit`}>
                Edit Event
              </Link>
            </h3>
            {disabledMessage()}
            <Admission
              tickets={event.tickets}
              eventId={eventId}
              disabled={this.props.event.disabled}
              totalRevenue={event.totalRevenue}
              totalCount={event.totalCount}
            />
            {renderAdminFee()}
            <Expenses
              expenses={event.expenses}
              eventId={eventId}
              disabled={this.props.event.disabled}
            />
            <Cashbox cash={event.cash} endingCash={event.endingCash} net={event.net} />
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
  }
}

EventDetail.propTypes = {
  event: React.PropTypes.shape({
    loading: React.PropTypes.bool,
  }),
  disabled: React.PropTypes.bool,
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  dispatch: React.PropTypes.func,
};
