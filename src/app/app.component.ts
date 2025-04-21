import {Component, OnInit} from '@angular/core';
import {Board} from "./board/board.model";
import {BoardComponent} from "./board/board.component";
import { BoardService } from './Services/board.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  imports: [BoardComponent, NgForOf, NgIf],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  boards: Board[] = [];
  title = 'kanban';
  selectedBoard: Board | null = null;

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.loadBoards();
  }

  // Load all boards
  loadBoards(): void {
    this.boardService.getBoards().subscribe(boards => {
      this.boards = boards;
    });
  }

  // Select a specific board
  selectBoard(boardId: string): void {
    this.boardService.getBoard(boardId).subscribe(board => {
      this.selectedBoard = board;
    });
  }

  // Update the board
  updateBoard(updatedBoard: Board): void {
    this.boardService.updateBoard(updatedBoard).subscribe(
      response => {
        console.log('Board updated successfully:', response);
      },
      error => {
        console.error('Error updating board:', error);
      }
    );
  }

  // Add a column to the selected board
  addColumn(columnTitle: string): void {
    if (this.selectedBoard) {
      this.boardService.addColumn(this.selectedBoard.boardId, columnTitle).subscribe(
        response => {
          console.log('Column added successfully:', response);
          this.loadBoards(); // Refresh boards to include the new column
        },
        error => {
          console.error('Error adding column:', error);
        }
      );
    }
  }
}
