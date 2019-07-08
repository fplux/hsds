export interface ITicket {
  count?: number,
  price: number,
  total?: number,
  type: string
}

export interface IExpense {
  cost: number,
  notes: string,
  paid: boolean,
  percent: number,
  type: string,
  desc: string
}

export interface IEvent {
  name: string,
  type: string,
  date: string,
  fee: number,
  max_fee: number,
  cash: number,
  band_minimum: number,
  expenses?: { [expenseId: string]: IExpense },
  tickets?: { [ticketId: string]: ITicket },
  totalExpenses?: number,
  finalized?: boolean,
  totalRevenue?: number,
  totalCount?: number,
  endingCash?: number,
  net?: number
}