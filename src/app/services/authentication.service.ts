import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails, TokenPayload, TokenResponse } from '../models/auth.model';
import { map } from 'rxjs/operators';
import { Api } from './api.service';

@Injectable()
export class AuthenticationService {
  private token: string;
  document: string = 'auth/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: Api
  ) { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  logout() {
    this.token = null;
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload: any;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  get isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  async request(type: 'login' | 'register', user: TokenPayload) {
    // const base = this.http.post(this.document + type, user);
    // // base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });

    // const request = base.pipe(
    //   map((data: TokenResponse) => {
    //     if (data.token) {
    //       this.saveToken(data.token);
    //     }
    //     return data;
    //   })
    // );

    // return request;


    const response = await this.http.post(this.api.domain + this.document + type, user)
      .pipe(
        map((data: TokenResponse) => {
          if (data.token) {
            this.saveToken(data.token);
          }
          return data;
        })
      )
      .toPromise();
    return response;
  }

  register(user: TokenPayload) {
    return this.request('register', user);
  }

  login(user: TokenPayload) {
    return this.request('login', user);
  }
}
