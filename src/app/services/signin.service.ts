import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private _http: HttpClient) {}

  signIn(signinData: any): Observable<any> {
    return this._http.post(
      'http://192.168.100.25:45455/api/authentication/signin/',
      signinData
    );
  }

  signUp(signupData: any): Observable<any> {
    return this._http.post(
      'http://192.168.100.25:45455/api/authentication/signup/',
      signupData
    );
  }
}
