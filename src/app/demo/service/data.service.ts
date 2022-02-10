import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public REST_API_SERVER = environment.url;

  datos: Observable<any>;
  headers;

  constructor(public http: HttpClient) {}

  getData(area: string, data = {}): Observable<any> {
    let httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders = httpHeaders.set('Accept', 'gzip');
    return this.http
      .get(this.REST_API_SERVER + area, {
        headers: httpHeaders,
        params: data
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
