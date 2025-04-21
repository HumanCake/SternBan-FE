import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Board} from "../board/board.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent {
  @Input() boards: Board[] = [];
  @Output() boardSelected = new EventEmitter<string>();

  selectBoard(boardId: string): void {
    this.boardSelected.emit(boardId);
  }
}
