import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WorkItemService {
  constructor(private _http: HttpClient) {}

  addBoard(data: WorkItem): Observable<any> {
    return this._http.post('http://localhost:3000/boards', data);
  }
}
