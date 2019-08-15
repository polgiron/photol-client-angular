import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class Api {
  domain: string = 'https://photol-api.paulgiron.com/';
  // domain: string = 'http://localhost:3333/';

  constructor(
    private http: Http
  ) { }

  get(method: string) {
    return this.http.get(this.domain + method)
      .pipe(map((res: any) => res.json()))
      .pipe(catchError(this.handleError).bind(this))
      .toPromise().then(response => {
        console.log('-----API GET RESPONSE');
        console.log(response);
        return response;
      });
  }

  post(method: string, params: object) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    // if (data instanceof FormData) {
    //   options.headers.delete('Content-Type');
    // }

    return this.http.post(this.domain + method, params, options)
      .pipe(map((res: any) => res.json()))
      .pipe(catchError(this.handleError).bind(this))
      .toPromise().then(response => {
        console.log('-----API POST RESPONSE');
        console.log(response);
        return response;
      });
  }

  put(method: string, params: object) {
    return this.http.put(this.domain + method, params)
      .pipe(map((res: any) => res.json()))
      .pipe(catchError(this.handleError).bind(this))
      .toPromise().then(response => {
        console.log('-----API PUT RESPONSE');
        console.log(response);
        return response;
      });
  }

  delete(method: string) {
    return this.http.delete(this.domain + method)
      .pipe(map((res: any) => res.json()))
      .pipe(catchError(this.handleError).bind(this))
      .toPromise().then(response => {
        console.log('-----API DELETE RESPONSE');
        console.log(response);
        return response;
      });
  }

  public handleError = error => {
    console.error(error);
    return throwError('Server error');
  }
}
