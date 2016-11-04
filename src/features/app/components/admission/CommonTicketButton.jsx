import React from 'react';

export const CommonTicketButton = props => (
  <button
    className="custom-buttons button expanded"
    onClick={() => props.handleClick(props.id)}
  >
    {props.name} - ${props.price}
  </button>
);
