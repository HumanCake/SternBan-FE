import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TicketComponent} from "./ticket/ticket.component";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Board} from "./board/board.model";
import {Observable} from "rxjs";
import {ColumnComponent} from "./column/column.component";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicketComponent, NgForOf, ColumnComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private _client: HttpClient) {}
  board: Board | undefined;
  title = 'kanban';

  getBoard(): Observable<Board>{
    //TODO move to configuration
    return this._client.get<Board>('http://localhost:8085/api/Kanban/123');
  }

  ngOnInit(): void {
    this.getBoard().subscribe(
      (response: Board) => {
        this.board = response;
        console.log(this.board);
      }
    );
  }

  updateBoard(updatedBoard: Board) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const updateUrl = 'http://localhost:8085/api/Kanban';

    this._client.put<Board>(updateUrl, updatedBoard, { headers, responseType: 'json' }).subscribe(
      (response: Board) => {
        console.log('Board updated successfully:', response);
     }
    );
  }
}
