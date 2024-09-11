import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop, transferArrayItem, moveItemInArray, CdkDropList} from '@angular/cdk/drag-drop';
import { Board } from './board.model';
import { ColumnComponent } from '../column/column.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ColumnComponent, NgForOf],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board: Board | undefined;
  @Output() boardEmitter = new EventEmitter<Board>();
  @Output() boardUpdatedEmitter = new EventEmitter<Board>();

  dropListIds: string[] = [];

  // This method will be called when a drop list is initialized in the ColumnComponent
  registerDropList(dropList: CdkDropList) {
    if (dropList) {
      this.dropListIds.push(dropList.id);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("drop in board is called:", event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.board);
    this.boardEmitter.emit(this.board);
  }

  columnUpdated() {
    this.boardUpdatedEmitter.emit(this.board);
  }
}
