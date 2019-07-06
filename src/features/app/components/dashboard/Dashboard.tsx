import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import { YearlySummary } from './YearlySummary';
import { Metrics } from './Metrics';
import { Averages } from './Averages';
import { BalSummary } from './BalSummary';
import { BluesSummary } from './BluesSummary';
import { MonthlySummary } from './MonthlySummary';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import { IEvent } from '../../../../interfaces';

const Loading = require('react-loading-animation');

interface IDashboard {
  loading: boolean,
  net: number,
  income: number,
  expenses: number,
  revper: number,
  count: number,
  avgEvent: number,
  avgBandCost: number,
  avgVenueCost: number,
  pastEvents: { [eventId: string]: IEvent },
  numEvents: number,
  balData: number,
  bluesData: number,
  monthlyData: number,
}

export const Dashboard: FunctionComponent<IDashboard> = (props: IDashboard) => {
  const { loading, pastEvents } = props;
  const year = moment().format('L').split('/')[2];
  const [monthly, setMonthly] = useState<IEvent[]>([]);
  const [bal, setBal] = useState<IEvent[]>([]);
  const [blues, setBlues] = useState<IEvent[]>([]);

  useEffect(() => {
    let eventsArray = _.filter(pastEvents, ev => {
      return ev.type === 'monthly' && moment(ev.date).year() === 2019;
    }).map(ev => {
      return { ...ev, date: moment(ev.date).format('MMM YYYY')}
    });

    let balArray = _.filter(pastEvents, ev => {
      return ev.type === 'bal' && moment(ev.date).year() === 2019;
    }).map(ev => {
      return { ...ev, date: moment(ev.date).format('MMM YYYY')}
    });

    let bluesArray = _.filter(pastEvents, ev => {
      return ev.type === 'blues' && moment(ev.date).year() === 2019;
    }).map(ev => {
      return { ...ev, date: moment(ev.date).format('MMM YYYY')}
    });

    setMonthly(_.reverse(eventsArray));
    setBal(_.reverse(balArray));
    setBlues(_.reverse(bluesArray));

  }, [pastEvents])

  const renderPage = () => {
    if (loading === undefined || loading === true) {
      return <Loading />;
    }
    if (loading === false) {
      return (
        <div>
          <h3 className="text-center page-header">Dashboard</h3>
          <div className="dashboard-container">
            <div className="dash-row">
              <YearlySummary year={year} {...props} />
              <Metrics {...props} />
              <Averages {...props} />
            </div>
            <br /> <br />
            <div className="dash-row">
              <BalSummary {...props} />
              <BluesSummary {...props} />
              <MonthlySummary {...props} />
            </div>
          </div>
          {
            monthly &&
            <div>
              <section>
                <div style={{ marginTop: '30px', fontSize: '1.3em' }} className="text-center">Monthly Attendance</div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={monthly}
                    margin={{
                      top: 20, right: 10, left: 10, bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date">
                      <Label value="Date" offset={-20} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Line type="monotone" name="Count" dataKey="totalCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            </div>
          }

          {
            bal &&
            <div>
              <section>
                <div style={{ marginTop: '30px', fontSize: '1.3em' }} className="text-center">HBN Balboa Attendance</div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={bal}
                    margin={{
                      top: 20, right: 10, left: 10, bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date">
                      <Label value="Date" offset={-20} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Line type="monotone" name="Count" dataKey="totalCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            </div>
          }

          {
            blues &&
            <div>
              <section>
                <div style={{ marginTop: '30px', fontSize: '1.3em' }} className="text-center">HBN Blues Attendance</div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={blues}
                    margin={{
                      top: 20, right: 10, left: 10, bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date">
                      <Label value="Date" offset={-20} position="insideBottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                    <Line type="monotone" name="Count" dataKey="totalCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </section>
            </div>
          }
        </div>
      );
    }
    return true;
  };
  return (
    <div>
      {renderPage()}
    </div>
  );
}
