import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WorkItemService {
  constructor(private _http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });

  addWorkItem(newData: string): Observable<any> {
    return this._http.post(
      'http://192.168.100.25:45455/api/workitem/workitems',
      newData,
      { headers: this.headers }
    );
  }
}
