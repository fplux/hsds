import * as React from 'react';
import { FunctionComponent } from 'react';

interface IAverages {
  avgBandCost: number,
  avgVenueCost: number,
  avgEvent: number
}

export const Averages: FunctionComponent<IAverages> = (props: IAverages) => (
  <div className="summary">
    <div className="header">
      <h3>Yearly Averages</h3>
    </div>
    <div className="first-column">
      <h4>Average Band Cost</h4>
      <p>${props.avgBandCost}</p>
    </div>
    <div className="second-column">
      <h4>Average Venue Cost</h4>
      <p>${props.avgVenueCost}</p>
    </div>
    <div className="third-column">
      <h4>Average Attendance</h4>
      <p>{props.avgEvent}</p>
    </div>
  </div>
);