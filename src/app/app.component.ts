import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Board} from "./board/board.model";
import {Observable} from "rxjs";
import {BoardComponent} from "./board/board.component";

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  board: Board | undefined;
  title = 'kanban';

  constructor(private _client: HttpClient) {
  }

  loadBoard(): void {
    this.getBoard().subscribe(
      (response: Board) => {
        this.board = response;
        console.log("Fetched board: ", this.board);
      }
    );
  }

  getBoard(): Observable<Board> {
    //TODO move to configuration
    return this._client.get<Board>('http://localhost:8085/api/Kanban/123');
  }

  ngOnInit(): void {
    this.loadBoard();
  }

  updateBoard(updatedBoard: Board) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const updateUrl = 'http://localhost:8085/api/Kanban';

    this._client.put<Board>(updateUrl, updatedBoard, {headers, responseType: 'json'}).subscribe(
      (response: Board) => {
        console.log('Board updated successfully:', response);
      }
    );
  }

  addColumn(columnTitle: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const updateUrl = `http://localhost:8085/api/Kanban/123/columns/${columnTitle}`;

    this._client.put(updateUrl, {}, {headers, responseType: 'json'}).subscribe(
      (response: any) => {
        console.log('Column added successfully:', response);
        this.loadBoard();
      }
    );
    console.log('Event for adding column called for column:', columnTitle);
  }
}
