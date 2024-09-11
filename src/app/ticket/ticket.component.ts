import { Component, Inject, Input } from '@angular/core';
import { Ticket } from './ticket.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket!: Ticket;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '60vw', /* 60% of viewport width */
      height: '60vh', /* 60% of viewport height */
      data: this.ticket,
      disableClose: false
    });

    dialogRef.backdropClick().subscribe(_ => {
      console.log('pressed the backlog');
    })
    dialogRef.afterClosed().subscribe(_ => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ticket-dialog.html',
  styleUrls: ['ticket-dialog.css'],
  standalone: true,
  imports: [
    MatDialogTitle
  ]
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket,
  ) {}
}
