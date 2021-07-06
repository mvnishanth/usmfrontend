import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { APIURL } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
    // 'Authorization': 'jwt-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  apiUrl = APIURL.APIURL;

  constructor(public http: HttpClient) { }

  login(credential) {
    return this.http.post(this.apiUrl + 'auth/signin', credential).pipe(
      catchError(this.handleError)
    );
  }
  signup(accountInfo) {
    return this.http.post(this.apiUrl + 'auth/signup', accountInfo).pipe(
      catchError(this.handleError)
    );
  }
  getallusers() {
    return this.http.get(this.apiUrl + 'auth/getallusers').pipe(
      catchError(this.handleError)
    );
  }
  deleteuser(accountInfo) {
    return this.http.post(this.apiUrl + 'auth/deleteuser', accountInfo).pipe(
      catchError(this.handleError)
    );
  }
  @Output() getUserName: EventEmitter<any> = new EventEmitter();

  getCall() {
    this.getUserName.emit(localStorage.getItem('token'));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.log('errorsss', error);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  post(method, data) {
    return this.http.post(`${this.apiUrl}${method}`, JSON.stringify(data), httpOptions)
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: Response) {
    console.log(error);
    return throwError(error);
  }
}
