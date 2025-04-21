// src/app/Services/board.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../board/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  //TODO move config
  private apiUrl = 'http://localhost:8085/api/Kanban';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }

  getBoard(boardId: string): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${boardId}`);
  }

  updateBoard(updatedBoard: Board): Observable<Board> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put<Board>(`${this.apiUrl}`, updatedBoard, { headers });
  }

  addColumn(boardId: string, columnTitle: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/${boardId}/columns/${columnTitle}`, {}, { headers });
  }
}
