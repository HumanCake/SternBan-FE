import {Component, EventEmitter, Input, Output, ViewChild, AfterViewInit} from '@angular/core';
import { Column } from './column.model';
import { TicketComponent } from '../ticket/ticket.component';
import { NgForOf } from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Ticket} from "../ticket/ticket.model";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
  imports: [TicketComponent, NgForOf, CdkDrag, CdkDropList],
  standalone: true
})
export class ColumnComponent implements AfterViewInit{
  @Input() column: Column | undefined;
  @Input() connectedTo: string[] = [];

  @Output() dropListRef = new EventEmitter<CdkDropList>();
  @Output() cdkDropListDropped = new EventEmitter<CdkDragDrop<any[]>>();

  @ViewChild(CdkDropList, { static: true }) dropList!: CdkDropList;

  ngAfterViewInit() {
    this.dropListRef.emit(this.dropList);
  }

  drop(event: CdkDragDrop<Ticket[] | undefined, any>) {
    // @ts-ignore
    this.cdkDropListDropped.emit(event);
  }
}
