import React from 'react';

export const CommonTicketButton = props => (
  <button
    className="custom-buttons btn btn-primary"
    onClick={() => props.handleClick(props.id)}
  >
    {props.name} - ${props.price}
  </button>
);

CommonTicketButton.propTypes = {
  handleClick: React.PropTypes.func,
  name: React.PropTypes.string,
  price: React.PropTypes.string,
  id: React.PropTypes.string,
};
