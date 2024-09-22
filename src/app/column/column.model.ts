import {Ticket} from "../ticket/ticket.model";

export class Column {
  constructor(
    public ColumnId: string,
    public title: string,
    public tickets?: Ticket[],
    public columns?: Column[]
  )
  {}
}
