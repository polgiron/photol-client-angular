import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class BaseApi {
  // domain: string = 'https://photol-api.paulgiron.com/';
  domain: string = 'http://localhost:3333/';

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
    return this.http.post(this.domain + method, params)
      .pipe(map((res: any) => res.json()))
      .pipe(catchError(this.handleError).bind(this))
      .toPromise().then(response => {
        console.log('-----API POST RESPONSE');
        console.log(response);
        return response;
      });
  }

  public handleError = error => {
    console.error(error);
    return throwError('Server error');
  }
}
