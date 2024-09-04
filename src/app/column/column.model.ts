import {Ticket} from "../ticket/ticket.model";

export class Column {
  constructor(
    public title: string,
    public tickets?: Ticket[],
    public columns?: Column[]
  )
  {}
}
