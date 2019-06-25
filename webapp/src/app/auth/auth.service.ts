import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserI } from '../jwt/user';
import { JwtResponseI } from '../jwt/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  AUTH_SERVER = 'http://localhost:5000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  login(user: UserI): Observable<JwtResponseI> {
    console.log(user);
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          console.log(res);
          this.saveToken(res.token, res.expiresIn);
        }

      }
    ));
  }
  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token),
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  public isExpired(token) {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    if (decoded.exp === undefined) {
      return true;
    }
    const datum = new Date(0);
    datum.setUTCSeconds(decoded.exp);
    return !(datum.valueOf() > new Date().valueOf());
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      if (this.isExpired(token)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
