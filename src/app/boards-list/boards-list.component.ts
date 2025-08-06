import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from "../board/board.model";


@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  imports: [],
  styleUrls: ['./boards-list.component.css'],
  standalone: true
})
export class BoardsListComponent {
  @Input() boards: Board[] = [];
  @Output() boardSelected = new EventEmitter<string>();

  selectBoard(boardId: string): void {
    this.boardSelected.emit(boardId);
  }
}
