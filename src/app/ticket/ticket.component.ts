import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { Ticket } from './ticket.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket!: Ticket;
  @Output() ticketUpdatedEmitter = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '60vw',
      height: '60vh',
      data: this.ticket,
      disableClose: false
    });

    dialogRef.componentInstance.modifiedTicket.subscribe((updatedTicket: Ticket) => {
      console.log('Ticket updated in the dialog:', updatedTicket);
      this.ticket = updatedTicket; // Update the parent component's ticket
      this.ticketUpdatedEmitter.emit();
    });

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
    MatDialogTitle,
    FormsModule,
    NgIf
  ]
})
export class DialogOverviewExampleDialog {
  protected localDescription: string | undefined;
  @Output()  modifiedTicket = new EventEmitter<Ticket>();
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public ticket: Ticket,
  ) {
    this.localDescription = ticket.description;
  }

  saveDescription() {
    this.ticket.description = this.localDescription;
    this.modifiedTicket.emit(this.ticket);
    console.log("Modified ticket = ", this.ticket);
  }
}
