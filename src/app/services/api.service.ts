import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils/utils';

@Injectable()
export class Api {
  // domain: string = 'https://photol-api.paulgiron.com/';
  domain: string = 'http://localhost:3333/';

  constructor(
    private http: HttpClient,
    private utils: Utils
  ) { }

  async get(method: string, data?: any) {
    const params = this.utils.serialize(data);
    const response = await this.http.get(this.domain + method + '?' + params)
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API GET RESPONSE');
    // console.log(response);
    return response;
  }

  async post(method: string, params: object) {
    const response = await this.http.post(this.domain + method, params)
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API POST RESPONSE');
    // console.log(response);
    return response;
  }

  async put(method: string, params: object) {
    const response = await this.http.put(this.domain + method, params)
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API PUT RESPONSE');
    // console.log(response);
    return response;
  }

  async delete(method: string) {
    const response = await this.http.delete(this.domain + method)
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API DELETE RESPONSE');
    // console.log(response);
    return response;
  }

  public handleError = error => {
    console.error(error);
    return throwError('Server error');
  }
}
