import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils/utils';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Api {
  constructor(
    private http: HttpClient,
    private utils: Utils,
    private auth: AuthenticationService
  ) {
    console.log(environment.domain);
  }

  async get(method: string, data?: any) {
    let url: string = environment.domain + method;
    if (data) {
      url += '?' + this.utils.serialize(data);
    }
    const response = await this.http.get(url, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API GET RESPONSE');
    // console.log(response);
    return response;
  }

  async post(method: string, params: object) {
    const response = await this.http.post(environment.domain + method, params, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API POST RESPONSE');
    // console.log(response);
    return response;
  }

  async put(method: string, params: object) {
    const response = await this.http.put(environment.domain + method, params, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
      .pipe(catchError(this.handleError).bind(this))
      .toPromise();
    // console.log('-----API PUT RESPONSE');
    // console.log(response);
    return response;
  }

  async delete(method: string) {
    const response = await this.http.delete(environment.domain + method, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } })
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
