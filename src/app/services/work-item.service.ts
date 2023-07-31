import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WorkItemService {
  constructor(private _http: HttpClient) {}

  token = localStorage.getItem('token');

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

  updateWorkItem(newData: string): Observable<any> {
    return this._http.put(
      `http://192.168.100.25:45455/api/workitem/workitems`,
      newData,
      { headers: this.headers }
    );
  }

  deleteWorkItem(id: number): Observable<any> {
    return this._http.delete(
      `http://192.168.100.25:45455/api/workitem/workitems/${id}`,
      { headers: this.headers }
    );
  }

  getWorkItems(): Observable<any> {
    return this._http.get(
      'http://192.168.100.25:45455/api/workitem/workitems/all'
    );
  }
}
