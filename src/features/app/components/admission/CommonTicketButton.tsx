import * as React from 'react';
import { FunctionComponent } from 'react';

interface CommonTicketButtonProps {
  handleClick: (id: string) => void,
  name: string,
  price: string,
  id: string
}

export const CommonTicketButton: FunctionComponent<CommonTicketButtonProps> = (props: CommonTicketButtonProps) => (
  <button
    className="custom-buttons btn btn-primary"
    onClick={() => props.handleClick(props.id)}
  >
    {props.name} - ${props.price}
  </button>
);