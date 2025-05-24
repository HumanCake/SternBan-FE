import {Component, OnInit} from '@angular/core';
import {Board} from "./board/board.model";
import {BoardComponent} from "./board/board.component";
import { BoardService } from './Services/board.service';
import {NgIf} from "@angular/common";
import {BoardsListComponent} from "./boards-list/boards-list.component";
import {catchError, of} from "rxjs";

@Component({
  imports: [BoardComponent, NgIf, BoardsListComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  standalone: true
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
  deSelectBoard() {
    this.selectedBoard = null;
    this.loadBoards();
  }
  async createNewBoard(boardTitle: string) {
    this.boardService.createBoard(boardTitle).pipe(
      catchError(error => {
        console.error('Error creating board:', error);
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log('Board created successfully:', response);
        this.loadBoards();
      }
    });
  }
}
